import { getOrderAPI } from "@/api/ordersAPI";
import PageTransition from "@/components/PageTransition";
import { useHeaderState } from "@/hooks/useHeaderState";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { CheckCircleFilledIcon, ErrorFilledIcon } from "@tapas/ui/icons";
import { Order, OrderStatus } from "@/state/order/types";
import { getCurrentOrderByOrderId } from "@/components/OrderList/util";
import { Tag } from "@tapas/ui/TableCard";
import { OrderTotalItem, calcOrdersTotalTable } from "@/components/Dishes/util";
import { Table, Typography } from "@mui/joy";

const InfoItem = ({ label, value }: any) => {
    return (
        <div className="flex justify-between items-center w-full font-['Bricolage Grotesque']">
            <div className="text-black text-opacity-60 text-sm font-normal whitespace-nowrap mr-2">{label}</div>
            <div className="text-black text-opacity-50 text-sm font-normal overflow-hidden text-ellipsis">{value}</div>
        </div>
    );
};

const OrderItem = ({ item }: { item: any }) => {
    return (
        <div className="px-6 flex items-center justify-between w-full font-['Bricolage Grotesque'] text-black text-opacity-50 text-sm font-medium">
            <div className="w-[70%] flex items-center">
                <img
                    src={item.image}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex flex-col justify-between">
                    <div>{item.name}</div>
                    <div>€{item.price}</div>
                </div>
            </div>
            <div className="text-black text-opacity-50 text-sm font-normal w-[10%] text-right">x{item.quantity}</div>
            {/* total */}
            <div className="text-black text-opacity-50 text-sm font-normal w-[10%] text-right">€{(item.price * item.quantity).toFixed(2)}</div>
        </div>
    );
};

const OrderGroup = ({ item, index }: { item: any, index: number }) => {

    return (<>
        {
            index > 0 && <div className="pt-6 flex flex-col gap-3 pb-3 px-6">
                <div className="text-black text-opacity-90 text-sm font-medium font-['Bricolage Grotesque']">Additional order</div>
                <div className="flex justify-between text-black text-opacity-50 text-sm font-normal font-['Bricolage Grotesque']">
                    <span>Created by</span>
                    <span>{item.createdBy}</span>
                </div>
                <div className="flex justify-between text-black text-opacity-50 text-sm font-normal font-['Bricolage Grotesque']">
                    <span>Created on</span>
                    <span>{new Date(item.modifyTime).toLocaleString()}</span>
                </div>
            </div>
        }
        {/* group header */}
        <div className="flex justify-between items-center px-6 text-black text-opacity-50 text-xs font-bold font-['Bricolage Grotesque']">
            <div className="w-[70%]">Description</div>
            <div className="w-[10%]">Quantity</div>
            <div className="w-[10%] text-right">Total</div>
        </div>
        {
            item?.items?.map((dish: any, index: any) => {
                return <OrderItem key={`dish-${dish.id}-${index}`} item={dish} />
            })
        }
        <div className="h-[4px] bg-black bg-opacity-20" />
    </>);
}

const PaymentItem = ({ label, value }: any) => {
    return <div className="flex flex-col gap-1 w-[30%]">
        <span className="text-black text-opacity-50 text-xs font-normal font-['Bricolage Grotesque']">{label}</span>
        <span className="text-black text-opacity-90 text-sm font-normal font-['Bricolage Grotesque']">{value}</span>
    </div>
};

interface CurOrderType extends Order {
    status: string;
    subStatus: string;
}

export default function OrderDetail({
    messages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const orderDetailTranslate = useTranslations("orderDetail");
    const orderListTranslate = useTranslations("orderList");
    const commonTranslate = useTranslations("common");
    useHeaderState({
        title: orderDetailTranslate("OrderDetail"),
        showBack: true,
        showSearch: false,
    });
    const router = useRouter();
    const [orderState, setOrderState] = useState<CurOrderType & {
        createdBy: string, 
        createdAt: string,
        orderType: string,
        payment: any,
    }>(null);
    const [totalTable, setTotalTable] = useState<OrderTotalItem[]>([]);
    useEffect(() => {
        console.log("router", router.query);
        //todo 这里理论上应该只执行一次 但是执行了多次
        if(!router.query.id)return;
        getCurrentOrderByOrderId(router.query.id as string).then((curOrder) => {
            console.log(curOrder, "curOrder")
            setOrderState(curOrder);
            const res = calcOrdersTotalTable(curOrder.orders)
            setTotalTable(res);
            console.log("totalTable", res);
        });
    }, []);




    return (<PageTransition>
        <div className="w-full flex max-h-full">
            {/* 左边部分 */}
            <div className="h-full inline-block w-[45.7%] box-border overflow-y-auto">
                {/* order info block */}
                {/* order info header */}
                <div className="px-6 py-4 flex justify-between items-center border-solid border border-b-0 border-black border-opacity-10">
                    <div className="text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque']">{orderDetailTranslate("OrderInfo")}</div>
                    <div className="flex">
                        {orderState?.status === OrderStatus.Cancel && <ErrorFilledIcon size={18} color="#F05F5F" />}
                        {orderState?.status === OrderStatus.Completed && <CheckCircleFilledIcon size={18} color="#57B07B" />}
                        <div className="text-black text-opacity-90 text-sm font-normal font-['Bricolage Grotesque'] ml-1">{orderState?.status}</div>
                    </div>
                </div>
                {/* order info detail */}
                <div className="px-6 pb-3 border-solid border border-t-0 border-black border-opacity-10 flex-col justify-start items-start gap-3 flex">
                    {/* order id */}
                    <InfoItem label={orderListTranslate("OrderID")} value={orderState?.id} />
                    {/* created by */}
                    <InfoItem label={orderListTranslate("CreatedBy")} value={orderState?.createdBy} />
                    {/* created on */}
                    <InfoItem label={orderListTranslate("CreatedOn")} value={orderState?.createdAt} />
                    {/* order type */}
                    {orderState?.orderType && <InfoItem label={commonTranslate("OrderType")} value={orderState?.orderType} />}
                    {/* No. of guests */}
                    <InfoItem label={commonTranslate("NoOfGuests")} value={orderState?.guestsNum + " guests"} />
                    {/* Table info */}
                    <InfoItem label={orderDetailTranslate("TableInfo")} value={
                        orderState?.tableInfo?.type?.map((type, index) => {
                            return <Tag text={type.name} key={index} className={index>0?"ml-2":""} />
                        })
                    } />
                </div>
                {/* dishes */}
                <div className="border-solid border border-t-0 border-black border-opacity-10">
                    {/* dishes list */}
                    <div className="flex flex-col">
                        {/* orderState?.orders中存放的是每一个group数据 */}
                        {orderState?.orders?.map((item, index) => {
                            return <OrderGroup key={`order-${(item as any).id}-${index}`} item={item} index={index}></OrderGroup>
                        })}
                    </div>
                </div>
                {/* total table */}
                <div className="pt-6 pb-28">
                    <div className="py-3 px-6 border-0 border-b border-black border-opacity-10 border-solid flex justify-between items-center text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque']">
                        <span>Total</span>
                        <span>€{totalTable.reduce((acc, cur) => acc + cur.total, 0).toFixed(2)}</span>
                    </div>
                    {/* 表头 */}
                    <Table
                        borderAxis="none"
                        sx={{
                            "& tr > *": { textAlign: "right" },
                            "& tfoot td": { borderTop: "1px solid rgba(0,0,0,0.1)" },
                            "--TableCell-footBackground": "transparent",
                        }}
                    >
                        <thead>
                            <tr>
                                <th>IVA%</th>
                                <th>BASE IMP</th>
                                <th>IMP IVA</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalTable.map((row, idx) => (
                                <tr key={idx}>
                                    <td>{row.iva}</td>
                                    <td>
                                        €
                                        <Typography level="body-md" className="inline">
                                            {row.baseImp}
                                        </Typography>
                                    </td>
                                    <td>
                                        €
                                        <Typography level="body-md" className="inline">
                                            {row.impIva}
                                        </Typography>
                                    </td>
                                    <td>
                                        €
                                        <Typography level="body-md" className="inline">
                                            {row.total}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <Typography level="body-md">
                                        €
                                        {totalTable.reduce((s, r) => s + r.baseImp, 0).toFixed(2)}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography level="body-md">
                                        €{totalTable.reduce((s, r) => s + r.impIva, 0).toFixed(2)}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography level="body-md">
                                        €{totalTable.reduce((s, r) => s + r.total, 0).toFixed(2)}
                                    </Typography>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>

            </div>
            {/* 右边部分 */}
            <div className="h-full inline-block flex-1 px-6 overflow-y-auto">
                {/* Payment info */}
                <div className="py-4 text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque']">Payment info</div>
                {/* info box */}
                <div className="flex w-full">
                    {/* img box */}
                    <div className="flex flex-col items-center justify-around w-[8.75rem] p-3 box-border bg-black bg-opacity-5 rounded-xl">
                        <img src="/images/credit-card.png" width={56} height={56} className="rounded-full" />
                        <div className="text-black text-opacity-50 text-sm font-normal text-center">{orderListTranslate("MembershipID")}: {"3847xxxx9870".substr(0,4)+"***"+"3847xxxx9870".substr("3847xxxx9870".length-4,4)}</div>
                        <div className="w-20 h-10"></div>
                    </div>
                    {/* info */}
                    <div className="pl-4 flex flex-col gap-6 flex-1">
                        <div className="flex justify-between">
                            <PaymentItem label={orderListTranslate("TotalAmountDue")} value={"€" + orderState?.payment?.totalPrice} />
                            <PaymentItem label={orderListTranslate("TotalAmountPaid")} value={"€" + orderState?.payment?.actualAmout} />
                            <PaymentItem label={commonTranslate("PaymentMethod")} value={orderState?.payment?.paymentMethod.name} />
                        </div>
                        <div className="flex justify-between">
                            <PaymentItem label={commonTranslate("MembershipCheckout")} value="Disabled" />
                            <PaymentItem label={orderListTranslate("DiscountAmout")} value={orderState?.payment?.discounts?.reduce((a:any,b:any) => a+b, 0).toFixed(2)} />
                            <PaymentItem label={orderListTranslate("CheckoutBy")} value="Checkout by" />
                        </div>
                        <div className="flex justify-between">
                            <PaymentItem label={orderListTranslate("CheckoutOn")} value={orderState?.payment?.updatedAt} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageTransition>
    )
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
