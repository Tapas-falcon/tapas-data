import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

import { useHeaderState } from '@/hooks/useHeaderState';
import PageTransition from '@/components/PageTransition';
import {Tabs, TabList, tabClasses, Tab, Sheet, Table, TabPanel, Typography} from '@mui/joy';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { OngoingTabContent } from '@/components/OrderList/OngoingTabContent';
import { useOrderListContextState, useTableScroll } from '@/hooks/orderListHooks';
import { orderListContext } from '@/state/orderList/state';
import { CompletedTabContent } from '@/components/OrderList/CompletedTabContent';
import { CanceledTabContent } from '@/components/OrderList/CanceledTabContent';
import {TabContent} from "@/components/OrderData/TabContent";
import React, {useEffect, useState} from "react";
import {IOrderListTablePropsColumns} from "@/components/OrderListTable";
import {RetailAnalyticsFilter} from "@/components/OrderData/filter";
import {useRecoilState} from "recoil";
import {orderDataParamsState, orderTabResultState} from "@/state/order/order.atoms";
import {renderSumDetailsItem} from "@/components/OrderData/Render";
import openConfirmModal from "@/components/base/ConfirmModal";
import {openValuesExcludedModal} from "@/components/OrderData/modal/ValuesExcludedModal";
import openDetailsModal from "@/components/base/DetailsModal";
import {
	belongToOrderDetailTabs,
	getRetailAnalyticsTabsData, OrderDetailsEnum
} from "@/components/OrderData/data/TabSData";
import {TabsDataItem} from "@/components/OrderData/type";
import {headerState} from "@/state/atoms";
import {OrderDetail} from "@/components/OrderData/OrderDetail";
import {getStores} from "@/api/orderDataAPI";


export default function OrderData() {


	const t = useTranslations('common')
	const [header, setHeader] = useRecoilState(headerState)
	//useHeaderState({ title: t('RetailAnalytics') });

	const orderDataTranslate = useTranslations('orderData');
	const route = useRouter();


	const {filterList, tableHeader, tableHeaderPlaceholder, onScroll} = useTableScroll();
	let [orderTabState,setOrderTabState]=useRecoilState(orderTabResultState);
	const [orderDataParams,setOrderDataParams]=useRecoilState(orderDataParamsState);

	let tabs:TabsDataItem[]=getRetailAnalyticsTabsData();
	for (let tab of tabs){
		tab.context=useOrderListContextState(tab.name);
		tab.FilterListContent=RetailAnalyticsFilter;
	}
	let {tab:queryTabName=tabs[0].name}=route.query;

	const [tabName,setTabName]=useState<string>(queryTabName as string);

	/**
	 * 测试数据
	 */
	const columns:IOrderListTablePropsColumns[]=[
		{title:"",column:"date"},
		{title:"Store A",column:"storeA",renderItem:renderSumDetailsItem,tdProps:{onClick:()=>{
					route.push(`/order-data?tab=orderDetailsList&id=1`);

				}}},
	];
	const datalist=[
		{
			date:"Jan 29, 2024",
			storeA:"5094.71",
			orderId:"121",
			details:[
				{name:"name1",value:"123"},
				{name:"name2",value:"123r4"},
				{name:"line"},
				{name:"name3",value:"123"},
			]
		}
	];
	//end


	useEffect(() => {
		setTabName(queryTabName as string);

		if(belongToOrderDetailTabs(queryTabName as OrderDetailsEnum)){
			setHeader({
				title:t(queryTabName),
				showBack: true,
				showSearch: true
			});
		}else {
			setHeader({
				showBack:false,
				showSearch:true,
				title: t(queryTabName)
			})
		}

	}, [route.query]);
	useEffect(() => {
		//setOrderTabState({...orderTabState,data:datalist});

	}, []);


	return (
		<PageTransition className='w-full max-w-full'>
			<div className="w-full max-w-full overflow-x-hidden relative" onScroll={(e) => onScroll()}>
				<Tabs className="w-full min-h-full"
							defaultValue={tabName}
							value={tabName}
					onChange={(event, value) => route.push(`/order-data?tab=${value}`)}>
					{
						!belongToOrderDetailTabs(tabName as OrderDetailsEnum)&&(
							<TabList  underlinePlacement="bottom" variant="plain" sx={{
								// '--Tab-indicatorColor': '#F55523'
								'--variant-plainActiveColor': 'var(--text-text-primary, rgba(0, 0, 0, 0.87))',
								'--variant-plainActiveBg': 'transparent',
								[`.${tabClasses.root}[aria-selected="true"]`]: {
									'--Tab-indicatorColor': 'var(--border-border-active, #F55523) !important'
								},
							}} className="text-sm font-semibold font-['Bricolage Grotesque'] px-6">
								{
									tabs.map(tab=>belongToOrderDetailTabs(tab.name as OrderDetailsEnum)?null:<Tab value={tab.name}>{orderDataTranslate(tab.name)}</Tab>)
								}

							</TabList>
						)
					}

					{
						tabs.map(tab=>(
							<TabPanel value={tab.name} className='p-0'>
								<orderListContext.Provider value={tab.context}>
									<TabContent
										tabName={tab.name}
										filterList={filterList}
										tableHeader={tableHeader}
										tableHeaderPlaceholder={tableHeaderPlaceholder}
										FilterListContent={tab.FilterListContent}/>
								</orderListContext.Provider>
							</TabPanel>
						))
					}
					<TabPanel value={"orderDetails"} className='p-0'>
						<OrderDetail/>
					</TabPanel>
				</Tabs>
			</div>
		</PageTransition>
	)
}
