const payements = require('./payments.json');
const data = require('./orders.mock.json');
var Mock = require('mockjs');
const orders = data.data;
const bOrders = require('./orders.json');

const status = ["65b693db2216a45b2c0fd2b3", "65b693db2216a45b2c0fd2b4", "65b693db2216a45b2c0fd2b5", "65b693db2216a45b2c0fd2b6", "65b693db2216a45b2c0fd2b7"];

const userIDs = ["6550b874f541b57f1d22bd28", "65563053f7199a64653e9587", "657464647a64b37492df4abc"];

const stores = ["65b78bd34b1dfe66ae015758",
    "65b78bd34b1dfe66ae015759",
    "65b78bd34b1dfe66ae01575a",
    "65b78bd34b1dfe66ae01575b",
    "65b78bd34b1dfe66ae01575c",
    "65b78bd34b1dfe66ae01575d",
    "65b78bd34b1dfe66ae01575e",
    "65b78bd34b1dfe66ae01575f",
    "65b78bd34b1dfe66ae015760",
    "65b78bd34b1dfe66ae015761",
    "65b78bd34b1dfe66ae015762",
    "65b78bd34b1dfe66ae015763",
    "65b78bd34b1dfe66ae015764",
    "65b78bd34b1dfe66ae015765",
    "65b78bd34b1dfe66ae015766",
    "65b78bd34b1dfe66ae015767",
    "65b78bd34b1dfe66ae015768",
    "65b78bd34b1dfe66ae015769",
    "65b78bd34b1dfe66ae01576a",
    "65b78bd34b1dfe66ae01576b",
    "65b78bd34b1dfe66ae01576c",
    "65b78bd34b1dfe66ae01576d",
    "65b78bd34b1dfe66ae01576e",
    "65b78bd34b1dfe66ae01576f",
    "65b78bd34b1dfe66ae015770",
    "65b78bd34b1dfe66ae015771",
    "65b78bd34b1dfe66ae015772",
    "65b78bd34b1dfe66ae015773",
    "65b78bd34b1dfe66ae015774",
    "65b78bd34b1dfe66ae015775",
    "65b78bd34b1dfe66ae015776",
    "65b78bd34b1dfe66ae015777",
    "65b78bd34b1dfe66ae015778",
    "65b78bd34b1dfe66ae015779",
    "65b78bd34b1dfe66ae01577a",
    "65b78bd34b1dfe66ae01577b",
    "65b78bd34b1dfe66ae01577c",
    "65b78bd34b1dfe66ae01577d",
    "65b78bd34b1dfe66ae01577e",
    "65b78bd34b1dfe66ae01577f",
    "65b78bd34b1dfe66ae015780",
    "65b78bd34b1dfe66ae015781"];

const RPT = {};

payements.forEach(({ createdAt, _id, orderId }) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const key = `${year}-${month}-${day}`;
    if (!RPT[key]) {
        RPT[key] = Mock.mock({
            "id": "@id",
            "date": new Date(key),
            "payments": [],
            "orders": [],
            "taotal_cash": 0,
            taotal_pos: 0,
            total_cash_withdrawal: Math.random(100, 200),
            taotal_tax: 0,
            "report_by|1": userIDs,
            "shopId|1": stores,
            "status|1": status,
        });
    }
    RPT[key].payments.push(_id);
    RPT[key].orders.push(orderId);
});

const { writeFile } = require('fs');
const path = './revenues.backend.mock.json';

const res = Object.values(RPT).map((item) => {
    item.payments.forEach((id) => {
        const pay = payements.find(({ _id }) => _id === id);
        if (pay.status === "65ba775512aef5fe630d0863") {
            switch (pay.paymentMethod) {
                case "65ba74ca12aef5fe630d085e":
                    item.taotal_cash += parseFloat(pay.totalPrice);

                    orders.find(({ id: oid }) => oid === bOrders.find(({ _id }) => _id === pay.orderId).id).items.forEach(({ taxRate, price, options, quantity }) => {
                        if (taxRate > 0) {
                            item.taotal_tax += ((price ?? 0) + options.map(({ extra }) => extra ? parseFloat(extra) : 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) * quantity * taxRate;
                        }
                    });
                    break;
                case "65ba74ca12aef5fe630d085f":
                case "65ba74ca12aef5fe630d0860":
                    item.taotal_pos += parseFloat(pay.totalPrice);
                    orders.find(({ id: oid }) => oid === bOrders.find(({ _id }) => _id === pay.orderId).id).items.forEach(({ taxRate, price, options, quantity }) => {
                        if (taxRate > 0) {
                            item.taotal_tax += ((price ?? 0) + options.map(({ extra }) => extra ? parseFloat(extra) : 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) * quantity * taxRate;
                        }
                    });
                    break;
                default:
                    break;
            }
        } 
        // else if (pay.status === "65ba775512aef5fe630d0865" || pay.status === "65ba775512aef5fe630d0867") {
        //     switch (pay.paymentMethod) {
        //         case "65ba74ca12aef5fe630d085e":
        //             item.taotal_cash -= parseFloat(pay.totalPrice);
        //             orders.find(({ id: oid }) => oid === bOrders.find(({ _id }) => _id === pay.orderId).id).items.forEach(({ taxRate, price, options, quantity }) => {
        //                 if (taxRate > 0) {
        //                     item.taotal_tax -= ((price ?? 0) + options.map(({ extra }) => extra ? parseFloat(extra) : 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) * quantity * taxRate;
        //                 }
        //             });
        //             break;
        //         case "65ba74ca12aef5fe630d085f":
        //         case "65ba74ca12aef5fe630d0860":
        //             item.taotal_pos -= parseFloat(pay.totalPrice);
        //             orders.find(({ id: oid }) => oid === bOrders.find(({ _id }) => _id === pay.orderId).id).items.forEach(({ taxRate, price, options, quantity }) => {
        //                 if (taxRate > 0) {
        //                     item.taotal_tax -= ((price ?? 0) + options.map(({ extra }) => extra ? parseFloat(extra) : 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) * quantity * taxRate;
        //                 }
        //             });
        //             break;
        //         default:
        //             break;
        //     }
        // }
    });
    return item;
});


writeFile(path, JSON.stringify(res, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to revenues');
});
