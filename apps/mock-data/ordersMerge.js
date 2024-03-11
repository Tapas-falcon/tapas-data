const orders = require('./orders.mock.json');
const operates = require('./operates.json');
const mc = require('./operates.mock.json');
orders.data = orders.data.map(({ items, ...order }) => ({
    ...order,
    modifyHistory: mc.filter((operate) => operate.orderId === order.id).map((item) =>
        item.id).map((id) => operates.find(({ id: oid }) => oid === id)?._id ?? ''),
    createdAt: (() => {
        let res = '';
        mc.filter((operate) => operate.orderId === order.id).map((item) =>
            item.id).find((id) => operates.find(({ id: oid, operationType, modifiedAt }) => {
                if (oid === id && operationType === 'create') {
                    res = modifiedAt;
                    return true;
                }
                return false
            }));
        return res;
    })(),
    updatedAt: mc.filter((operate) => operate.orderId === order.id).map((item) => item.id).map((id) => operates.find(({ id: oid }) => oid === id)).slice(-1).pop()?.modifiedAt ?? '',
}));


const { writeFile } = require('fs');
const path = './orders.backend.mock.json';


writeFile(path, JSON.stringify(orders, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to orders');
});
