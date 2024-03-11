import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

import { useHeaderState } from '@/hooks/useHeaderState';
import PageTransition from '@/components/PageTransition';
import { Tabs, TabList, tabClasses, Tab, Sheet, Table, TabPanel } from '@mui/joy';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { OngoingTabContent } from '@/components/OrderList/OngoingTabContent';
import { useOrderListContextState, useTableScroll } from '@/hooks/orderListHooks';
import { orderListContext } from '@/state/orderList/state';
import { CompletedTabContent } from '@/components/OrderList/CompletedTabContent';
import { CanceledTabContent } from '@/components/OrderList/CanceledTabContent';



export default function OrderData() {
	const t = useTranslations('common')
	useHeaderState({ title: t('RetailData') });
	const orderDataTranslate = useTranslations('orderData');
	const route = useRouter();
	const {filterList, tableHeader, tableHeaderPlaceholder, onScroll} = useTableScroll();
	const tabs:{name:string,context:any}[]=[
		{name:"Revenue",context:null},
		{name:"Orders",context:null},
		{name:"ConsumptionCost",context:null},
		{name:"LaborCost",context:null},
		{name:"PurchaseCost",context:null},
		{name:"Profit",context:null},
		{name:"FixedCost",context:null},
		{name:"AccountingErrors",context:null},
	];
	for (let tab of tabs){
		tab.context=useOrderListContextState(tab.name);
	}
	const clearContext = () => {
		tabs.forEach(tab=>tab.context.setContext({}))
	}

	return (
		<PageTransition className='w-full max-w-full'>
			<div className="w-full max-w-full overflow-x-hidden relative" onScroll={(e) => onScroll()}>
				<Tabs className="w-full min-h-full" 
					onChange={(event, value) => route.push(`/order-data?tab=${value}`)}
					defaultValue={tabs[0].name}>
					<TabList underlinePlacement="bottom" variant="plain" sx={{
						// '--Tab-indicatorColor': '#F55523'
						'--variant-plainActiveColor': 'var(--text-text-primary, rgba(0, 0, 0, 0.87))',
						'--variant-plainActiveBg': 'transparent',
						[`.${tabClasses.root}[aria-selected="true"]`]: {
							'--Tab-indicatorColor': 'var(--border-border-active, #F55523) !important'
						},
					}} className="text-sm font-semibold font-['Bricolage Grotesque'] px-6">
						{
							tabs.map(tab=><Tab value={tab.name}>{orderDataTranslate(tab.name)}</Tab>)
						}

					</TabList>
					{
						tabs.map(tab=>(
							<TabPanel value={tab.name} className='p-0'>
								<orderListContext.Provider value={tab.context}>
									<OngoingTabContent
										tableHeader={tableHeader}
										tableHeaderPlaceholder={tableHeaderPlaceholder}
										filterList={filterList}/>
								</orderListContext.Provider>
							</TabPanel>
						))
					}
				</Tabs>
			</div>
		</PageTransition>
	)
}

export async function getStaticProps({ locale, ...props }: GetStaticPropsContext) {
	return {
		props: {
			// You can get the messages from anywhere you like. The recommended
			// pattern is to put them in JSON files separated by locale and read
			// the desired one based on the `locale` received from Next.js.
			messages: (await import(`../../i18n/${locale}.json`)).default
		}
	};
}
