// import Image from 'next/image'
import { ReactNode, useEffect, useState } from "react";
import { Box, Sheet } from "@mui/joy";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

import Nav from "@tapas/ui/Nav";
import Header from "@tapas/ui/Header";
import logo from "../public/tapas-logo-1.png";
import { headerState, usersState } from "@/state/atoms";
import getSwitchUserModal from "@/components/SwitchUser";
import { queryOperators, selRolesState } from "@/state/selectors";
import { DishesPERMS } from "@/state/roles/types";
import { SessionKeys } from "@/state/order/types";

// const mockUser = [
//   { id: '1', name: "MT", photo: "/avatar01.jpg", email: "Geo***les@liaopastel.net" },
//   { id: '2', name: "HJ", photo: "/avatar02.jpg", email: "Bet***.kj@gmail.net" },
//   {
//     id: '3', name: "AD",
//     photo: "/tapas-logo-1.png",
//     email: "Ada***ysj@outlook.com",
//     selected: true,
//   },
//   { id: '4', name: "LP", photo: "", email: "Li***.pu@qq.com" },
//   { id: '6550b874f541b57f1d22bd28', name: "withdraw测试员", photo: "", email: "Li***.min@withdraw.com" },
// ];

export type LayoutProps = {
  children?: ReactNode;
  secondaryNav?: ReactNode;
};

export default function Layout({ children, secondaryNav }: LayoutProps) {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const { title, showBack, showSearch } = useRecoilValue(headerState);
  const [users, setUsers] = useRecoilState(usersState);

  // // 获取点餐人员信息
  const dataLoadable = useRecoilValueLoadable(
    queryOperators({
      filters: [{ field: "job_id", values: ["4"] }],
      lang: "",
    })
  );
  useEffect(() => {
    if (dataLoadable?.state === "hasValue") {
      setUsers(dataLoadable.contents);
    }
  }, [dataLoadable]);
  
  const router = useRouter();
  // 这里是因为SSR的时候没有sessionStorage，因此需要放到useEffect里面
  // TODO: 考虑next.config.js里是否要将一些component改成client mode
  useEffect(() => {
    sessionStorage.setItem(SessionKeys.Language, router.locale);
  }, []);

  const { modal, openModal, setModelOpen } = getSwitchUserModal();

  // 订阅权限
  const permisssions = useRecoilValue(selRolesState("SecondaryPERMS"));

  const onNav = (path: string) => {
    switch (path) {
      case "/ordering":
        (permisssions as DishesPERMS[]).includes("TableSetStep") // 是配置有桌子选择步骤
          ? router.push(`${path}/table-list`)
          : router.push(`${path}/dishes`);
        break;
      default:
        router.push(path);
        break;
    }
  };
  const handleLogin = () => {
    // step2 switch user
    handleSwitchUser();
  };
  const handleLogout = () => {
    setUsers([]);
  };
  const handleSwitchUser = () => {
    openModal({
      initialVal: "",
      onCancel: () => {
        // do nothing
        setModelOpen(false);
      },
      onSwitched: (tempUsers) => {
        setUsers(tempUsers ?? []);
        setModelOpen(false);
      },
    });
    // setUsers([])
  };

  return (
    <Sheet
      variant="plain" // plain will apply bg-color var(--joy-palette-primary-100) which extends in themeProvider
      sx={(theme) => ({
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "stretch",
        justifyContent: "space-between",
        minHeight: "100vh",
      })}
    >
      {/* Left navigation bar */}
      <Nav
        className="hidden md:flex"
        iconImg={<Image src={logo} alt="icon of tapas" fill={true}></Image>}
        path={router.pathname.substring(1)}
        onNav={onNav}
        collapse={menuCollapse}
        onCollapseChange={(v) => setMenuCollapse(v)}
      />
      {/* 2nd navigation bar */}
      {secondaryNav && <Box className="grow-0">{secondaryNav}</Box>}
      {/* Main content area */}
      <Box className="grow flex flex-col items-stretch max-h-screen w-0 flex-1">
        <Header
          className="grow-0 bg-transparent"
          pageTitle={title}
          showBack={showBack}
          showSearch={showSearch}
          users={users}
          onMenuClick={() => setMenuCollapse(!menuCollapse)}
          onBackClick={() => router.back()}
          onLogin={() => handleLogin()}
          onLogout={() => handleLogout()}
          onSwitchUser={() => handleSwitchUser()}
        />
        {/* content slot. min-height:0 to make content fit containter*/}
        <Box className="grow min-h-0 flex overflow-hidden">{children}</Box>
      </Box>
      {/* Switch User Modal */}
      {modal}
    </Sheet>
  );
}
