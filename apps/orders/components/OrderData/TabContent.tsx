import {OrderListTable} from "@/components/OrderListTable";
import Paging from "@/components/Paging";
import {IOrderDataTabContentProps,} from "../../state/orderList/state";
import {useTranslations} from "next-intl";
import {useRecoilState} from "recoil";
import {orderDataParamsState, orderTabResultState} from "@/state/order/order.atoms";
import {useDeepCompareEffect} from "ahooks";
import {useOrderListStateFromContext} from "@/hooks/orderListHooks";
import {useContext, useState} from "react";
import {orderListContext} from "@/state/orderList/state";
import {TextButton} from "@tapas/ui/Button";
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import {Box, CircularProgress, Menu, MenuItem, Typography} from "@mui/joy";
import IconButton from '@mui/joy/IconButton';
import {EllipsisVerticalIcon} from '@heroicons/react/24/solid'
import {getStoresStatistics, getStoresStatisticsX} from "@/api/orderDataAPI";
import {
  dataToStoresTabList,
  getRetailAnalyticsTabsData,
  orderDataParamsToQuery,
} from "@/components/OrderData/data/TabSData";
import {FxValue} from "@/components/OrderData/filter/types";
import {priceFormat} from "@/utils";
import openDetailsModal from "@/components/base/DetailsModal";
import moment from "moment/moment";
import {queryReq} from "@/api/types";
import {DetailsModalProps} from "@/components/base/types";
import {renderDetailsModalItem} from "@/components/OrderData/Render";
import {useRouter} from "next/router";
import {TabsDataItem} from "@/components/OrderData/type";
import {isOrders} from "@/components/OrderData/data/FilterData";

/**
 * 3.29 目前存在问题
 * 排序问题
 * 时间显示问题
 * 针对列表的排序
 * 部分视图筛选还不对 可能是fill引起的
 */

/**
 * 待做功能表
 * -1.查询行和列的统计Api的以及汇总数据弹窗
 * 2.table滚动问题
 * 3.选择日期不足时候的提示问题
 * 4.前端日期列表展示问题
 * -5.数据填充问题
 * -6.分页减去1、5
 * -7.当页数据纵向数据 todo 这里考虑在limit之后
 * 8.导出数据接口
 * 9.样式问题（可以后面适配分辨率的时候统一调整）
 * 10.翻译问题(可以在样式之前统一做)
 * 11.针对列表的排序
 */

export const TabContent: React.FC<IOrderDataTabContentProps> = ({
  tableHeader,
  tableHeaderPlaceholder,
  FilterListContent=()=>(<></>),
  filterList,
  tabName
}) => {
  const t = useTranslations("common");
  const orderDataTranslate = useTranslations("orderData");
  const route = useRouter();

  let [orderTabState,setOrderTabState]=useRecoilState(orderTabResultState);
  const { context, setContext, key } = useContext(orderListContext);
  const [orderDataParams,setOrderDataParams]=useRecoilState(orderDataParamsState);
  const [columns,setColumns]=useState([]);
  const [footer,setFooter]=useState([]);
  const [loading,setLoading]=useState(false);
  const { currentPage, setCurrentPage, totalPage, setTotalPage,pageSize,setPageSize,total,setTotal } =
    useOrderListStateFromContext(context);
  const [fxValueY,setFxValueY]=useState({loading:false,data:null});

  let tabs:TabsDataItem[]=getRetailAnalyticsTabsData();
  let {tab:queryTabName=tabs[0].name}=route.query;
  const _isOrders=isOrders(queryTabName as string);
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


  const openCurrentDetailsYModal=()=>{
    if(_isOrders)return;
    const renderItem=(colKey:string, value:number, item:any)=>{
      return (['orders'].includes(item.type)?value:priceFormat(value)).toString();
    };
    openCurrentDetailsXYModal({
      name:"All stores",
      status:"Revenue",
      desc:"All Date",
      tableList:[
        {
          header:true,
          columns:[
            {title:'Type',column:"name"},
            {title:'Total Sum',column:"sum",renderItem},
            {title:'Total Mean',column:"mean",renderItem},
          ],
          data:[],
        }
      ]
    },[],{values:FxValue.ALLY});
  }
  console.log(moment,'12321');
  const openCurrentDetailsXYModal=(props:DetailsModalProps,range:string[],fx:{values:FxValue,params?:Record<string, any>}={values:FxValue.X},stores?:string[])=>{
    if(_isOrders){
      //跳转到orders页面
      route.push({
        pathname: `/order-data`,
        query: { stores,tab:'orderDetailsList' }
      });
      return ;
    }
    //需要给后台去统计
    const modalData={
      childrenProps:{

        tableList:[
          {
            header:false,
            columns:[
              {title:"name",column:"name",renderItem:renderDetailsModalItem},
              {title:"total",column:"value",renderItem:renderDetailsModalItem},
            ],
            data:[] as any,
          }
        ],
        ...props
      }
    };
    let params:queryReq={
      filters:[
        {
          field:'stores',
          values:stores||orderDataParams.stores,
        },
        {
          field:"dateRadius",
          values:range
        },
        {
          field:'dateRadiusView',
          values:orderDataParams.dateRadiusView
        },
        {
          ...fx,
          field:'fx',
        }
      ]
    };
    const modal=openDetailsModal(modalData);

    getStoresStatisticsX({...params,page:queryTabName as string}).then(({data})=>{
      modalData.childrenProps.tableList[0].data=data.data;
      modal.hookUpdate(modalData);
    })
  }

  const onUpdate=()=>{
    console.log('tab onUpdate...',currentPage,pageSize,orderDataParams);
    setLoading(true);
    //移动到getStoresStatistics 里面
    getStoresStatistics({
      ...orderDataParamsToQuery(orderDataParams),
      page:queryTabName as string,
      pageInfo:{
        pageIndex:currentPage,
        pageSize
      }
    }).then(async (res)=>{
      let table=dataToStoresTabList(res.data.data.data,orderDataParams,openCurrentDetailsXYModal,queryTabName as string);
      setColumns(table.columns);
      setFooter(table.footer);
      let {pageIndex}=res.data.data;
      if(currentPage!==pageIndex){
        onPagingChange(pageIndex);
      }
      setOrderTabState({...res.data.data,data:table.list});

    }).finally(()=>{
      setLoading(false);
    })
    if(orderDataParams.fx===FxValue.Y){
      setFxValueY({loading:true,data:null });
      getStoresStatistics({
        ...orderDataParamsToQuery(orderDataParams,true),
        page:queryTabName as string,
      }).then(({data:res})=>{
        setFxValueY({loading:false,data:res.data });
      },()=>{
        setFxValueY({loading: false,data: {totalSumY:0,totalMeanY:0}});
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
        footer={footer}
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
        <Typography className={`w-44 text-center leading-6 border-0 border-l border-solid border-stone-300 cursor-pointer font-bold`} sx={{color:'primary.200'}} onClick={openCurrentDetailsYModal} level={`body-xs`}>
          Total sum: {priceFormat(fxValueY.data?.totalSumY,_isOrders?'':'€',_isOrders?0:2)}
        </Typography>
        <Typography className={`w-44 text-center leading-6 border-0 border-l border-solid border-stone-300 cursor-pointer font-bold`} sx={{color:'neutral.540'}} onClick={openCurrentDetailsYModal} level={`body-xs`}>
          Total mean: {priceFormat(fxValueY.data?.totalMeanY,_isOrders?'':'€',_isOrders?0:2)}
        </Typography>
      </Box>
    </>
  );
};
