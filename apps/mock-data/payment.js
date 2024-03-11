var Mock = require('mockjs');
const data = require('./orders.mock.json');
const orders = data.data;
const bOrders = require('./orders.json');
const userIDs = ["6550b874f541b57f1d22bd28", "65563053f7199a64653e9587", "657464647a64b37492df4abc"];

const payments = orders.filter(({ status }) => status = "Completed").map(({ id, totalPrice, discounts, items, modifyHistory }) => Mock.mock({
    id: "@id",
    orderId: bOrders.find(({id:bid})=>bid===id)?._id,
    "paymentMethod|1": ["65ba74ca12aef5fe630d085e", "65ba74ca12aef5fe630d085f", "65ba74ca12aef5fe630d0860"],
    "status|1": ["65ba775512aef5fe630d0862", "65ba775512aef5fe630d0863", "65ba775512aef5fe630d0864", "65ba775512aef5fe630d0865", "65ba775512aef5fe630d0866", "65ba775512aef5fe630d0867", "65ba775512aef5fe630d0868"],
    "totalPrice": totalPrice,
    discounts,
    tax: function () {
        const tax = {};
        items.forEach(({ taxRate, price, options, quantity }) => {
            const rate = taxRate ?? 0;
            if (!tax[rate]) {
                tax[rate] = { tax: rate, total: 0 };
            }
            tax[rate].total += ((price ?? 0) + options.map(({ extra }) => extra ? parseFloat(extra) : 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) * quantity * (1 + rate);
        });
        return Object.values(tax);
    },
    "operateUser|1": userIDs,
    "customer": null,
    actualAmout: Math.ceil(totalPrice),
    createdAt: modifyHistory.slice(-1).pop().modifiedAt,
    updatedAt: modifyHistory.slice(-1).pop().modifiedAt,
}));

const { writeFile } = require('fs');
const path = './payments.backend.mock.json';


writeFile(path, JSON.stringify(payments, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to payments');
});
