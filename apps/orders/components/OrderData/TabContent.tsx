import { OrderListTable } from "@/components/OrderListTable";
import Paging from "@/components/Paging";
import {
  IOrderDataTabContentProps,
} from "../../state/orderList/state";
import { useTranslations } from "next-intl";
import {useRouter} from "next/router";
import {useRecoilState, useRecoilValue} from "recoil";
import {orderDataParamsState, orderTabResultState} from "@/state/order/order.atoms";
import {useDeepCompareEffect} from "ahooks";
import {useOrderListStateFromContext} from "@/hooks/orderListHooks";
import {useContext, useEffect, useReducer, useState} from "react";
import { orderListContext } from "@/state/orderList/state";
import {TextButton} from "@tapas/ui/Button";
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import {Box, CircularProgress, Menu, MenuItem, Typography} from "@mui/joy";
import IconButton from '@mui/joy/IconButton';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import {getStoresStatistics} from "@/api/orderData";
import {OrderTabResultState} from "@/state/order/types";
import {dataToStoresTabList, orderDataParamsToQuery,} from "@/components/OrderData/data/TabSData";
import {FxValue} from "@/components/OrderData/filter/types";
import {priceFormat} from "@/utils";
import openDetailsModal from "@/components/base/DetailsModal";

export const TabContent: React.FC<IOrderDataTabContentProps> = ({
  tableHeader,
  tableHeaderPlaceholder,
  FilterListContent=()=>(<></>),
  filterList,
  tabName
}) => {
  const t = useTranslations("common");
  const orderDataTranslate = useTranslations("orderData");
  let [orderTabState,setOrderTabState]=useRecoilState(orderTabResultState);
  const { context, setContext, key } = useContext(orderListContext);
  const [orderDataParams,setOrderDataParams]=useRecoilState(orderDataParamsState);
  const [columns,setColumns]=useState([]);
  const [loading,setLoading]=useState(false);
  const { currentPage, setCurrentPage, totalPage, setTotalPage,pageSize,setPageSize,total,setTotal } =
    useOrderListStateFromContext(context);
  const [fxValueY,setFxValueY]=useState({loading:false,data:null});
  const onPagingChange = (pageIndex: number) => {
    setOrderDataParams({
      ...orderDataParams,
      pageIndex,
    });
    setCurrentPage(pageIndex);
  };
  const onPageSizeChange=(pageSize:number)=>{
    setOrderDataParams({
      ...orderDataParams,
      pageSize,
    });
    setPageSize(pageSize);
  }
  const clearConditions=()=>{
    setOrderDataParams({});
  }

  const openCurrentDetailsModal=()=>{
    openDetailsModal({
      childrenProps:{
        name:"Jan 29, 2024",
        status:"Revenue",
        desc:"Jan. 29, 2024",
        tableList:[
          {
            columns:[
              {title:"Total sum",column:"n1",tdProps:{className:"text-left"},thProps:{className:"text-left"}},
              {title:"sum",column:"n2",tdProps:{className:"text-right"},thProps:{className:"text-right"}},
              {title:"Total mean",column:"n3",tdProps:{className:"text-right",thProps:{className:"text-right"}}},
            ],
            data:[
              {
                n1:'1.0',
                n2:'2.0',
                n3:'3.0',
              }
            ]
          }
        ]
      }
    });
  }

  const onUpdate=()=>{
    console.log('tab onUpdate...',currentPage,pageSize,orderDataParams);
    setLoading(true);
    //移动到getStoresStatistics 里面
    getStoresStatistics({
      ...orderDataParamsToQuery(orderDataParams),
      pageInfo:{
        pageIndex:currentPage,
        pageSize
      }
    }).then(async (res)=>{
      let table=dataToStoresTabList(res.data.data.data,orderDataParams,openCurrentDetailsModal);
      //是否还要添加横向统计
      setColumns(table.columns);

      setOrderTabState({...res.data.data,data:table.list});
    }).finally(()=>{
      setLoading(false);
    })
    if(orderDataParams.fx===FxValue.Y){
      setFxValueY({loading:true,data:null });
      getStoresStatistics(orderDataParamsToQuery(orderDataParams,true)).then(({data:res})=>{
        setFxValueY({loading:false,data:res.data });
      },()=>{
        setFxValueY({loading: false,data: {totalPriceSumY:0,totalPriceMeanY:0}});
      })
    }else {
      setFxValueY({loading:false,data:null });
    }
  }

  useDeepCompareEffect(onUpdate,[currentPage,pageSize,orderDataParams]);
  return (
    <>
      {/* 筛选列表 */}
      <div
        ref={filterList}
        className="sticky top-0 mt-3 px-6 z-[999] box-border"
        style={{
          background: "var(--Sheet-background)",
        }}
      >
        <div className="flex flex-row justify-between">
          <div className={`flex flex-row gap-2`}>
            <FilterListContent/>
          </div>
          <div className={`flex flex-row gap-2`}>
            <TextButton
              text="Reset"
              onClick={clearConditions}
            />
            <Dropdown>
              <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                sx={{ borderRadius: 100 }}
              >
                <EllipsisVerticalIcon/>
              </MenuButton>
              <Menu placement="bottom-end">
                <MenuItem>
                  <span className={`text-base`}>Export current table only</span>
                </MenuItem>
                <MenuItem>
                  <span className={`text-base`}>Export all</span>
                </MenuItem>
              </Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <Box display={loading?'flex':'none'} alignItems="center" justifyContent='center'>
        <CircularProgress />
      </Box>
      <OrderListTable
        columns={columns as any}
        orders={orderTabState.data}
        tableHeader={tableHeader}
        tableHeaderPlaceholder={tableHeaderPlaceholder}
        paging={
          <Paging
            current={orderTabState.pageIndex}
            total={orderTabState.totalCount}
            pageSizeChange={(pageSize) => onPageSizeChange(pageSize)}
            onChange={(pageIndex) => onPagingChange(pageIndex)}
          />
        }
      ></OrderListTable>
      <Box className={`absolute left-0 w-full bottom-12 flex justify-end bg-white h-6 ${!fxValueY.data?'hidden':''}`}>
        <Typography className={`w-44 text-center leading-6 border-0 border-l border-solid border-stone-300 cursor-pointer`} onClick={openCurrentDetailsModal} level={`body-xs`}>
          Total sum: {priceFormat(fxValueY.data?.totalPriceSumY)}
        </Typography>
        <Typography className={`w-44 text-center leading-6 border-0 border-l border-solid border-stone-300 cursor-pointer`} onClick={openCurrentDetailsModal} level={`body-xs`}>
          Total mean: {priceFormat(fxValueY.data?.totalPriceMeanY)}
        </Typography>
      </Box>
    </>
  );
};
