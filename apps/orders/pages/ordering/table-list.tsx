import { use, useEffect, useState } from "react";
import {
  GetStaticPropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { useTranslations } from "next-intl";

import { TableCard, TableStatus, ITableCardProps } from "@tapas/ui/TableCard";
import { ISelectItem, Select } from "@tapas/ui/Select";
import { TextButton } from "@tapas/ui/Button";
import { useHeaderState } from "@/hooks/useHeaderState";
import getSwitchUserModal from "@/components/SwitchUser";
import getNumberDialog from "@/components/NumberDialog";
import { NoData } from "@tapas/ui/NoData";

import PageTransition from "@/components/PageTransition";
import { useRecoilState } from "recoil";
import { User } from "@/state/type";
import { DeskStatus, TableBase, TableType } from "@/state/order/types";
import {
  queryDeskCountEachStatus,
  queryDeskTypes,
  queryDesks,
  queryMaxDeskCapactity,
  updateDeskStatus,
} from "@/api/deskAPI";
import {
  currentTableDataSelector,
  selCurOperator,
  selCurOrderOperate,
} from "@/state/selectors";
import { useRouter } from "next/router";

type DeskType = ITableCardProps & TableBase;

function useDeskTypesRequest(t: any): [ISelectItem[], ...rest: any] {
  const [deskTypes, setDeskTypes] = useState<ISelectItem[]>([]);
  useEffect(() => {
    const defaultType: ISelectItem = {
      key: "default",
      text: t("AllTypes"),
    };

    queryDeskTypes()
      .then((data) =>
        data.map((item: TableType) => {
          return {
            key: item._id,
            text: item.name,
          };
        })
      )
      .then((data) => setDeskTypes([defaultType, ...data]));
  }, []);
  return [deskTypes, setDeskTypes];
}

function useDeskMaxCapacityRequest(t: any): [ISelectItem[], ...rest: any] {
  const [deskMaxCapacity, setDeskMaxCapacity] = useState<ISelectItem[]>([]);
  useEffect(() => {
    const defaultType: ISelectItem = {
      key: "default",
      text: t("Capacity"),
    };

    queryMaxDeskCapactity()
      .then((data) => {
        return new Array(data || 0).fill(0).map((_, index) => {
          return {
            key: index + 1,
            text: `${index + 1} - ${t("Person")}`,
          };
        });
      })
      .then((data) => setDeskMaxCapacity([defaultType, ...data]));
  }, []);
  return [deskMaxCapacity, setDeskMaxCapacity];
}

function useDeskRequest(t: any) {
  // get all desk data
  const [desks, setDesks] = useState<
    (DeskType & { statusColor: "green" | "red" | "yellow" | "slate" })[]
  >([]);
  const [status, setStatus] = useState("default");
  const [type, setType] = useState("default");
  const [capacity, setCapacity] = useState("default");
  useEffect(() => {
    let url = "";

    const query = [];
    if (status !== "default") {
      query.push(`status=${status.toLowerCase()}`);
    }
    if (type !== "default") {
      query.push(`typeid=${type}`);
    }
    if (capacity !== "default") {
      query.push(`capacity=${capacity}`);
    }
    if (query.length > 0) {
      url += `?${query.join("&")}`;
    }

    queryDesks(url)
      .then((data) =>
        data.map((item: TableBase) => {
          const types = item.type.map((type: any) => type.name) || [];
          types.push(item.size + " - " + t("Person"));

          const statusMap: { [key: string]: TableStatus } = {
            [TableStatus.Available.toLowerCase()]: t("Available"),
            [TableStatus.Cleaning.toLowerCase()]: t("Cleaning"),
            [TableStatus.InUse.toLowerCase()]: t("InUse"),
            [TableStatus.Reserved.toLowerCase()]: t("Reserved"),
          };

          const statusColor: any = {
            [TableStatus.Available.toLowerCase()]: "green",
            [TableStatus.Cleaning.toLowerCase()]: "yellow",
            [TableStatus.InUse.toLowerCase()]: "red",
            [TableStatus.Reserved.toLowerCase()]: "slate",
          };
          const prop: DeskType & {
            statusColor: "green" | "red" | "yellow" | "slate";
          } = {
            ...item,
            tableText: item.name,
            tags: types,
            status: statusMap[item.status]!,
            available: item.status === TableStatus.Available.toLowerCase(),
            statusColor: statusColor[item.status],
          };
          return prop;
        })
      )
      .then((data) => setDesks(data));
  }, [status, type, capacity]);
  return {
    desks,
    setDesks,
    queryType: type,
    setQueryType: setType,
    queryStatus: status,
    setQueryStatus: setStatus,
    queryCapacity: capacity,
    setQueryCapacity: setCapacity,
  };
}

function useStatusInfoRequest(depedency: Array<any> = []) {
  const [statusInfo, setStatusInfo] = useState([]);

  useEffect(() => {
    queryDeskCountEachStatus().then((data) => setStatusInfo(data));
  }, depedency);

  return [statusInfo];
}

export default function TableList({
  messages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const t = useTranslations("tableList");
  const router = useRouter();
  useHeaderState({ title: t("Ordering") });

  // get all desk types data
  const [deskTypes, setDeskTypes] = useDeskTypesRequest(t);

  const {
    desks,
    setDesks,
    setQueryType,
    setQueryStatus,
    setQueryCapacity,
    queryStatus,
    queryType,
    queryCapacity,
  } = useDeskRequest(t);

  const status = [
    {
      key: "default",
      text: t("AllStatus"),
    },
    {
      key: TableStatus.Available,
      text: t("Available"),
    },
    {
      key: TableStatus.Cleaning,
      text: t("Cleaning"),
    },
    {
      key: TableStatus.InUse,
      text: t("InUse"),
    },
    {
      key: TableStatus.Reserved,
      text: t("Reserved"),
    },
  ];

  // 订阅/更新当前order下信息；
  const [, setCurOrder] = useRecoilState(selCurOrderOperate("curOrder"));

  const [capacity] = useDeskMaxCapacityRequest(t);

  const [statusInfo] = useStatusInfoRequest([desks]);

  const { modal, openModal, setModelOpen } = getSwitchUserModal();

  const onUserSwitch = () => {
    return new Promise<User | null>((resolve) => {
      openModal({
        initialVal: "",
        onCancel: () => {
          // do nothing
          setModelOpen(false);
          resolve(null);
        },
        onSwitched: (users) => {
          const choosedUser = users.find((u) => u.selected) ?? users[0];
          setModelOpen(false);
          resolve(choosedUser || null);
        },
      });
    });
  };

  const {
    modal: numberDialog,
    openModal: openNumberDialog,
    setModelOpen: setNumberDialogModelOpen,
  } = getNumberDialog();
  const [currentTable, setCurrentTable] = useRecoilState(
    currentTableDataSelector("currentTableData")
  );

  const onTableItemClick = (index: number) => {
    let userSwitchedByManual = false;
    let choosedUser: User | null = null;
    if (!desks[index]!.available) {
      return;
    }
    openNumberDialog({
      initialVal: "",
      onCancel: () => {
        // do nothing
        setNumberDialogModelOpen(false);
      },
      onClose: async (action, param) => {
        switch (action) {
          // switch-user情况下, 标记为手动切换用户，不再自动弹出切换用户dialog
          case "switch-user":
            userSwitchedByManual = true;
            choosedUser = await onUserSwitch();

            break;
          // order情况下，如果未切换过用户，则先弹出切换用户dialog
          case "order":
            if (!userSwitchedByManual) {
              choosedUser = await onUserSwitch();
            }
            if (choosedUser) {
              // TODO: 发送请求，更新桌子状态
              const guestNumber = Number(param);
              const choosedDesk = JSON.parse(JSON.stringify(desks[index]));
              const userId = choosedUser.email;

              // // 更新桌子状态
              const updateStatus = await updateDeskStatus(
                choosedDesk._id,
                DeskStatus.IN_USE
              );
              if (!updateStatus) {
                return;
              }
              // 更新table-list信息
              desks[index]!.src = choosedUser.photo;
              desks[index]!.available = false;
              desks[index]!.status = TableStatus.InUse;
              setDesks([...desks]);

              setNumberDialogModelOpen(false);

              choosedDesk.operator_id = choosedUser.id;
              choosedDesk.guestNumber = guestNumber;
              setCurrentTable(choosedDesk);

              // 初始化新订单 并赋值桌子信息和操作人信息
              setCurOrder({
                order: {
                  items: [],
                  recommends: [],
                  createdBy: choosedUser,
                },
                operateIndex: 0,
                guestsNum: Number(param),
                tableInfo: choosedDesk,
              });

              // 跳转至点餐
              router.push("/ordering/dishes");

              // TODO: 将对应信息存储到全局state
            }
            break;
        }
      },
    });
  };

  return (
    <PageTransition>
      <div className="w-full px-6 flex flex-col max-h-full overflow-y-auto">
        {/* 统计信息条 */}

        <div className="w-full flex rounded-xl bg-black bg-opacity-5 h-[88px] py-2 mb-10">
          {/* available 信息 */}
          {/* border-right: 1px solid rgba(255, 255, 255, 0.50); */}
          {statusInfo?.map((info: { status: string; count: number }, index) => {
            const border =
              index === statusInfo.length - 1
                ? ""
                : "border-solid border-r border-l-0 border-t-0 border-b-0 border-white border-opacity-50";
            return (
              <div
                key={index}
                className={`p-4 ${border} flex-col justify-center items-end gap-1 inline-flex flex-1`}
              >
                <div className="text-black text-opacity-90 text-2xl font-semibold font-['Bricolage Grotesque']">
                  {info.count}
                </div>
                <div className="text-black text-opacity-50 text-xs font-normal font-['Bricolage Grotesque']">
                  {t(`TableCountMsg:${info.status}`)}{" "}
                </div>
              </div>
            );
          })}
        </div>
        {/* select bar */}
        <div className="w-full flex justify-between py-2">
          {/* select box */}
          <div className="inline-flex gap-2">
            <Select
              value={queryType}
              items={deskTypes.map(({ key, text }) => ({
                key,
                text:
                  typeof text === "string"
                    ? text
                    : text?.[router.locale ?? "es"] || "",
              }))}
              onChange={(e, val) => {
                setQueryType(val!);
              }}
            />
            <Select
              value={queryStatus}
              items={status}
              onChange={(e, val) => {
                setQueryStatus(val!);
              }}
            />
            <Select
              value={queryCapacity}
              items={capacity}
              onChange={(e, val) => {
                setQueryCapacity(val!);
              }}
            />
          </div>
          {/* reset button */}
          <TextButton
            text="Reset"
            onClick={() => {
              setQueryType("default");
              setQueryStatus("default");
              setQueryCapacity("default");
            }}
          />
        </div>
        {/* table list */}
        <div className="justify-start items-start gap-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full pt-2 pb-12 relative flex-1">
          {desks.length > 0 ? (
            /* 有数据 */
            desks.map((item, i: number) => (
              <TableCard
                key={i}
                onClick={() => onTableItemClick(i)}
                sx={{ width: "100%", height: "112px" }}
                tableText={
                  typeof item.name === "string"
                    ? item.name
                    : item.name?.[router.locale ?? "es"] ?? ""
                }
                available={item.available}
                status={item.status}
                tags={item.tags.map((item) =>
                  typeof item === "string"
                    ? item
                    : item?.[router.locale ?? "es"] ?? ""
                )}
                src={item.src}
                note={item.note}
                statusColor={item.statusColor}
              />
            ))
          ) : (
            /* 没数据 */
            <NoData
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
              title="No results found"
              description="Please adjust your filters above to view more results."
            />
          )}
        </div>
        {modal}
        {numberDialog}
      </div>
    </PageTransition>
  );
}

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`@/i18n/${locale}.json`)).default,
    },
  };
};
