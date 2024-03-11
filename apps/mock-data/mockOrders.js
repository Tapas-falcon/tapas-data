var Mock = require('mockjs');

const data = require('./data.backend.mock.json');

const discount = require('./discounts.json');

const desks = [
    {
        "_id": "6582fb67044cb156d83f842c"
    },
    {
        "_id": "6582fb67044cb156d83f842a"
    },
    {
        "_id": "6582fb67044cb156d83f842d"
    },
    {
        "_id": "6582fb67044cb156d83f842b"
    },
    {
        "_id": "6582fb67044cb156d83f8430"
    },
    {
        "_id": "6582fb67044cb156d83f8432"
    },
    {
        "_id": "6582fb67044cb156d83f8431"
    },
    {
        "_id": "6582fb67044cb156d83f8433"
    },
    {
        "_id": "6582fb67044cb156d83f8434"
    },
    {
        "_id": "6582fb67044cb156d83f8435"
    },
    {
        "_id": "6582fb67044cb156d83f8437"
    },
    {
        "_id": "6582fb67044cb156d83f8436"
    },
    {
        "_id": "6582fb67044cb156d83f8438"
    },
    {
        "_id": "6582fb67044cb156d83f8439"
    },
    {
        "_id": "6582fb67044cb156d83f843a"
    },
    {
        "_id": "6582fb67044cb156d83f843b"
    },
    {
        "_id": "6582fb67044cb156d83f842f"
    },
    {
        "_id": "6582fb67044cb156d83f842e"
    },
    {
        "_id": "6582fb67044cb156d83f843e"
    },
    {
        "_id": "6582fb67044cb156d83f843f"
    },
    {
        "_id": "6582fb67044cb156d83f8440"
    },
    {
        "_id": "6582fb67044cb156d83f8441"
    },
    {
        "_id": "6582fb67044cb156d83f8442"
    },
    {
        "_id": "6582fb67044cb156d83f8443"
    },
    {
        "_id": "6582fb67044cb156d83f8444"
    },
    {
        "_id": "6582fb67044cb156d83f8445"
    },
    {
        "_id": "6582fb67044cb156d83f8446"
    },
    {
        "_id": "6582fb67044cb156d83f8447"
    },
    {
        "_id": "6582fb67044cb156d83f8448"
    },
    {
        "_id": "6582fb67044cb156d83f8449"
    },
    {
        "_id": "6582fb67044cb156d83f844a"
    },
    {
        "_id": "6582fb67044cb156d83f844b"
    },
    {
        "_id": "6582fb67044cb156d83f844c"
    },
    {
        "_id": "6582fb67044cb156d83f844d"
    },
    {
        "_id": "6582fb67044cb156d83f844e"
    },
    {
        "_id": "6582fb67044cb156d83f843c"
    },
    {
        "_id": "6582fb67044cb156d83f844f"
    },
    {
        "_id": "6582fb67044cb156d83f8451"
    },
    {
        "_id": "6582fb67044cb156d83f8452"
    },
    {
        "_id": "6582fb67044cb156d83f8454"
    },
    {
        "_id": "6582fb67044cb156d83f8455"
    },
    {
        "_id": "6582fb67044cb156d83f843d"
    },
    {
        "_id": "6582fb67044cb156d83f8458"
    },
    {
        "_id": "6582fb67044cb156d83f8456"
    },
    {
        "_id": "6582fb67044cb156d83f8457"
    },
    {
        "_id": "6582fb67044cb156d83f8459"
    },
    {
        "_id": "6582fb67044cb156d83f845a"
    },
    {
        "_id": "6582fb67044cb156d83f8450"
    },
    {
        "_id": "6582fb67044cb156d83f8453"
    }
];

const dIds = desks.map(({ _id }) => _id);

const userIDs = ["6550b874f541b57f1d22bd28", "65563053f7199a64653e9587", "657464647a64b37492df4abc"];

const dishesObjeIds = ["65acc71b79a38f0321016690", "65acc71b79a38f0321016691", "65acc71b79a38f0321016692", "65acc71b79a38f0321016693", "65acc71b79a38f0321016694", "65acc71b79a38f0321016695", "65acc71b79a38f0321016696", "65acc71b79a38f0321016697", "65acc71b79a38f0321016698", "65acc71b79a38f0321016699", "65acc71b79a38f032101669a", "65acc71b79a38f032101669b", "65acc71b79a38f032101669c", "65acc71b79a38f032101669d", "65acc71b79a38f032101669e", "65acc71b79a38f032101669f", "65acc71b79a38f03210166a0", "65acc71b79a38f03210166a1", "65acc71b79a38f03210166a2", "65acc71b79a38f03210166a3", "65acc71b79a38f03210166a4", "65acc71b79a38f03210166a5", "65acc71b79a38f03210166a6", "65acc71b79a38f03210166a7", "65acc71b79a38f03210166a8", "65acc71b79a38f03210166a9", "65acc71b79a38f03210166aa", "65acc71b79a38f03210166ab", "65acc71b79a38f03210166ac", "65acc71b79a38f03210166ad", "65acc71b79a38f03210166ae", "65acc71b79a38f03210166af", "65acc71b79a38f03210166b0", "65acc71b79a38f03210166b1", "65acc71b79a38f03210166b2", "65acc71b79a38f03210166b3", "65acc71b79a38f03210166b4", "65acc71b79a38f03210166b5", "65acc71b79a38f03210166b6", "65acc71b79a38f03210166b7", "65acc71b79a38f03210166b8", "65acc71b79a38f03210166b9", "65acc71b79a38f03210166ba", "65acc71b79a38f03210166bb", "65acc71b79a38f03210166bc", "65acc71b79a38f03210166bd", "65acc71b79a38f03210166be", "65acc71b79a38f03210166bf", "65acc71b79a38f03210166c0", "65acc71b79a38f03210166c1", "65acc71b79a38f03210166c2", "65acc71b79a38f03210166c3", "65acc71b79a38f03210166c4", "65acc71b79a38f03210166c5", "65acc71b79a38f03210166c6", "65acc71b79a38f03210166c7", "65acc71b79a38f03210166c8", "65acc71b79a38f03210166c9", "65acc71b79a38f03210166ca", "65acc71b79a38f03210166cb", "65acc71b79a38f03210166cc", "65acc71b79a38f03210166cd", "65acc71b79a38f03210166ce", "65acc71b79a38f03210166cf", "65acc71b79a38f03210166d0", "65acc71b79a38f03210166d1", "65acc71b79a38f03210166d2", "65acc71b79a38f03210166d3", "65acc71b79a38f03210166d4", "65acc71b79a38f03210166d5", "65acc71b79a38f03210166d6", "65acc71b79a38f03210166d7", "65acc71b79a38f03210166d8", "65acc71b79a38f03210166d9", "65acc71b79a38f03210166da", "65acc71b79a38f03210166db", "65acc71b79a38f03210166dc", "65acc71b79a38f03210166dd", "65acc71b79a38f03210166de", "65acc71b79a38f03210166df", "65acc71b79a38f03210166e0", "65acc71b79a38f03210166e1", "65acc71b79a38f03210166e2", "65acc71b79a38f03210166e3", "65acc71b79a38f03210166e4", "65acc71b79a38f03210166e5", "65acc71b79a38f03210166e6", "65acc71b79a38f03210166e7", "65acc71b79a38f03210166e8", "65acc71b79a38f03210166e9", "65acc71b79a38f03210166ea", "65acc71b79a38f03210166eb", "65acc71b79a38f03210166ec", "65acc71b79a38f03210166ed", "65acc71b79a38f03210166ee", "65acc71b79a38f03210166ef", "65acc71b79a38f03210166f0", "65acc71b79a38f03210166f1", "65acc71b79a38f03210166f2", "65acc71b79a38f03210166f3", "65acc71b79a38f03210166f4", "65acc71b79a38f03210166f5", "65acc71b79a38f03210166f6", "65acc71b79a38f03210166f7", "65acc71b79a38f03210166f8", "65acc71b79a38f03210166f9", "65acc71b79a38f03210166fa", "65acc71b79a38f03210166fb", "65acc71b79a38f03210166fc", "65acc71b79a38f03210166fd", "65acc71b79a38f03210166fe", "65acc71b79a38f03210166ff", "65acc71b79a38f0321016700", "65acc71b79a38f0321016701", "65acc71b79a38f0321016702", "65acc71b79a38f0321016703", "65acc71b79a38f0321016704", "65acc71b79a38f0321016705", "65acc71b79a38f0321016706", "65acc71b79a38f0321016707", "65acc71b79a38f0321016708", "65acc71b79a38f0321016709", "65acc71b79a38f032101670a", "65acc71b79a38f032101670b", "65acc71b79a38f032101670c", "65acc71b79a38f032101670d", "65acc71b79a38f032101670e", "65acc71b79a38f032101670f", "65acc71b79a38f0321016710", "65acc71b79a38f0321016711", "65acc71b79a38f0321016712", "65acc71b79a38f0321016713", "65acc71b79a38f0321016714", "65acc71b79a38f0321016715", "65acc71b79a38f0321016716", "65acc71b79a38f0321016717", "65acc71b79a38f0321016718", "65acc71b79a38f0321016719", "65acc71b79a38f032101671a", "65acc71b79a38f032101671b", "65acc71b79a38f032101671c", "65acc71b79a38f032101671d", "65acc71b79a38f032101671e", "65acc71b79a38f032101671f", "65acc71b79a38f0321016720", "65acc71b79a38f0321016721", "65acc71b79a38f0321016722", "65acc71b79a38f0321016723", "65acc71b79a38f0321016724", "65acc71b79a38f0321016725", "65acc71b79a38f0321016726", "65acc71b79a38f0321016727", "65acc71b79a38f0321016728", "65acc71b79a38f0321016729", "65acc71b79a38f032101672a", "65acc71b79a38f032101672b", "65acc71b79a38f032101672c", "65acc71b79a38f032101672d", "65acc71b79a38f032101672e", "65acc71b79a38f032101672f", "65acc71b79a38f0321016730", "65acc71b79a38f0321016731", "65acc71b79a38f0321016732", "65acc71b79a38f0321016733", "65acc71b79a38f0321016734", "65acc71b79a38f0321016735", "65acc71b79a38f0321016736", "65acc71b79a38f0321016737", "65acc71b79a38f0321016738", "65acc71b79a38f0321016739", "65acc71b79a38f032101673a", "65acc71b79a38f032101673b", "65acc71b79a38f032101673c", "65acc71b79a38f032101673d", "65acc71b79a38f032101673e", "65acc71b79a38f032101673f", "65acc71b79a38f0321016740", "65acc71b79a38f0321016741", "65acc71b79a38f0321016742", "65acc71b79a38f0321016743", "65acc71b79a38f0321016744", "65acc71b79a38f0321016745", "65acc71b79a38f0321016746", "65acc71b79a38f0321016747", "65acc71b79a38f0321016748", "65acc71b79a38f0321016749", "65acc71b79a38f032101674a", "65acc71b79a38f032101674b", "65acc71b79a38f032101674c", "65acc71b79a38f032101674d", "65acc71b79a38f032101674e", "65acc71b79a38f032101674f", "65acc71b79a38f0321016750", "65acc71b79a38f0321016751", "65acc71b79a38f0321016752", "65acc71b79a38f0321016753", "65acc71b79a38f0321016754", "65acc71b79a38f0321016755"];

const dishes = data.dishes.data.map((item, index) => ({ ...item, _id: dishesObjeIds[index] }));
const bOptions = require('./options.json');

const Random = (min, max, count) => {
    if (count === 0) {
        return [];
    }
    if (count < 0 || !count) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    const arr = [];
    do {
        for (let i = 0; i < (count - arr.length); i++) {
            let random = Random(min, max);
            if (arr.indexOf(random, 0) === -1) {
                arr.push(random);
            } else {
                break
            }
        }
    } while (arr.length != count);
    return arr;
}

let tmp = [];

const discountValFormat = (num, percentage) => Math.floor(num * percentage * 100) / 100;

const padEnd = (num, padEnd, str) => {
    const n = padEnd ?? 2;
    const fStr = str ?? '0';
    const [integer, decimal] = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toString().split('.'); // 在计算前需要四舍五入计算一个保留n位的小鼠位数，避免计算差值位数过多
    return `${integer}.${(decimal ?? '').padEnd(n, fStr)}`;
};

const orders = Mock.mock({
    "data|150-200": [{
        id: "@id",
        "tableId|1": dIds,
        // "waiterId|1": userIDs,
        "customerId": "@id",
        "gustNum": "@natural(2, 8)",
        "status|1": ["Ongoing", "Completed", "Cancel"],
        "subStatus|1": ["Submitted", "Awaiting payment", "Completed"],
        "items": function () {
            tmp = [];
            const indexes = Random(0, dishes.length - 1, Random(1, 20));
            indexes.map((index) => {
                const { _id, name, description, price, options, isTaxInclude, taxRate, discount } = dishes[index];
                let selectedOptions = [];
                let tmp1 = [];
                options.forEach((id) => {
                    const groupKeyVal = bOptions.find(({ _id }) => _id === id)?.key ?? "";
                    if (groupKeyVal) {
                        tmp1 = tmp1.concat(bOptions.filter(({ groupKey }) => groupKey === groupKeyVal))
                    }
                });
                let indexes = []
                if (tmp1.length === 1) {
                    indexes = [0]
                }
                if (tmp1.length > 1) {
                    indexes = Random(0, tmp1.length - 1, Random(0, tmp1.length - 1));
                }


                if (tmp1.length > 0 && indexes.length > 0) {
                    const res = [];
                    selectedOptions = indexes.map((id) => tmp1[id]);
                }

                tmp.push({
                    dishesId: _id,
                    // name,
                    // description,
                    // isTaxInclude,
                    price,
                    taxRate,
                    discount,
                    options: selectedOptions.map(({ _id, extra }) => ({ optionId: _id, extra })),
                    quantity: Random(1, 5)
                });
            });
            return tmp.map(({ dishesId, quantity, options, discount, taxRate, price }) => ({ dishesId, quantity, options, discount, taxRate, price }));
        },
        discounts: [],
        modifyHistory: function () {
            return [];
        },
        totalPrice: function () {
            return Math.ceil(tmp.map(({ price, quantity, options, discount, taxRate }) => {
                let res = price * quantity;
                if (discount) {
                    let metDiscountLimit = false;
                    switch (discount.limitType) {
                        case "65aa19ff79a38f03210161ef": // 数量出发条件
                            metDiscountLimit = quantity >= discount.limitValue;
                            break;
                        case "65aa19ff79a38f03210161f0": // 购买总价格触发条件
                            metDiscountLimit =
                                price * quantity >= discount.limitValue;
                            break;
                        default:
                            break;
                    }
                    if (quantity > 0 && metDiscountLimit) {
                        res = 0;
                        // 满足触发条件
                        switch (discount.type) {
                            case "65aa19ff79a38f03210161ec": // 百分比
                                res += (price - discountValFormat(price, discount.value)) * quantity;
                                break;
                            case "65aa19ff79a38f03210161ed": // 数额
                            default:
                                res += (price - discount.value) * quantity;
                                break;
                        }
                    }
                }
                const optionsValue = options.map(({ extra }) => extra ? parseFloat(extra) : 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0) * quantity;
                return (res + optionsValue) * (1 + taxRate);
            }).reduce((accumulator, currentValue) => accumulator + currentValue, 0) * Math.pow(10, 2)) / Math.pow(10, 2);
        },
        createdAt: new Date(`2024-01-29*} ${Random(0, 24)}:${Random(0, 60)}:${Random(0, 60)}`),
        updatedAt: new Date(`2024-01-29} ${Random(0, 24)}:${Random(0, 60)}:${Random(0, 60)}`),
    }]
});

// const operates = require('./operates.json');
// const mc = require('./operates.mock.json');
// orders.data = orders.data.map((order) => ({
//     ...order,
//     modifyHistory: mc.filter((operate) => operate.orderId === order.id).map((item) =>
//         operates.find(({ id }) => item.id === id)._id)
// }));

const opreates = [];
orders.data.forEach((order) => {
    const operatesCount = Random(1, 10);
    if (operatesCount === 1) {
        const dateTime = new Date(`2024-01-29 ${Random(1, 23)}:${Random(1, 55)}:${Random(1, 55)}`);
        const d = Mock.mock({
            "id": "@id",
            "modifiedBy|1": userIDs,
            modifiedAt: dateTime,
            "orderId": order.id,
            operationType: "create",
            modifyContent: order.items.map(({ taxRate, ...item }) => item),
        });
        order.modifyHistory.push(d);
        opreates.push(d);
    } else {
        let date = new Date(`2024-01-29 ${Random(1, 23)}:${Random(1, 55)}:${Random(1, 55)}`);

        const obj = {};
        order.items.forEach((item) => {
            obj[item.dishesId] = { quantity: item.quantity, options: item.options }
        });

        const used = {};
        for (var i = operatesCount; i >= 0; i--) {
            const times = Random(60000, 3600000);
            // const dateTime = new Date(`2024-01-29*} ${Random(0, 24)}:${Random(0, 60)}:${Random(0, 60)}`);
            date = new Date(date.getTime() + times);
            const n = Random(1, order.items.length);
            // const lastItmesLen = order.modifyHistory.map(({ }) => { })
            // console.log(date);
            const operate = {
                "id": "@id",
                "modifiedBy|1": userIDs,
                "orderId": order.id,
                modifiedAt: date,
                "operationType": i === operatesCount ? "create" : "update",
                modifyContent: [],
            };
            if (Object.values(used).length === order.items.length) {
                if (!order.items.some(({ dishesId, quantity, options }) => used[dishesId].quantity !== quantity || options.length !== used[dishesId].options.length)) {
                    break;
                } else {
                    order.items.forEach((item) => {
                        const obj = {};
                        if (item.quantity !== used[item.dishesId].quantity) {
                            obj.newCount = i == 0 ? (item.quantity - used[item.dishesId].quantity) : Random(1, item.quantity - used[item.dishesId].quantity);
                            used[item.dishesId].quantity += obj.newCount;
                        }
                        if (item.options.length !== used[item.dishesId].options.length) {
                            if (i === 0) {
                                obj.options = order.items.options?.filter((option, index) => index >= used[item.dishesId].options.length) ?? [];
                                used[item.dishesId].optionis = item.options.length;
                            } else {
                                const n = Random(1, item.options.length - used[item.dishesId].options);
                                obj.options = order.items.options?.filter((option, index) => index >= used[item.dishesId].options.length && (index - used[item.dishesId].options.length) <= n) ?? [];
                                used[item.dishesId].optionis += n;
                            }
                        }
                        if (obj.newCount || obj.options) {
                            operate.modifyContent.push({
                                dishesId: item.dishesId,
                                quantity: obj.newCount ?? 0,
                                options: obj.options ?? []
                            });
                        }
                    });
                }
            } else if (Object.values(used).length > n) {
                if (Object.values(used).length < order.items.length) {
                    const newItemCount = Random(1, order.items.length - Object.values(used).length);
                    for (var c = 1; c <= newItemCount; c++) {
                        const target = order.items[Object.values(used).length + c - 1];
                        if (target) {
                            const { price, taxRate, ...others } = target;
                            const count = Random(1, others.quantity);
                            const oCount = Random(1, others.options.length - 1);
                            const options = others.options.filter((option, index) => index <= oCount);
                            operate.modifyContent.push({
                                ...others,
                                quantity: count,
                                options: options
                            });
                            used[others.dishesId] = { quantity: count, options };
                        }
                    }
                }
            } else {
                for (var c = 1; c <= (n - Object.values(used).length); c++) {
                    const target = order.items[Object.values(used).length + c - 1];
                    if (target) {
                        const { price, taxRate, ...others } = target;
                        const count = Random(1, others.quantity);
                        const oCount = Random(1, others.options.length);
                        const options = others.options.filter((option, index) => index <= oCount);
                        operate.modifyContent.push({
                            ...others,
                            quantity: count,
                            options: options
                        });
                        used[others.dishesId] = { quantity: count, options };
                    }
                }
            }

            if (operate.modifyContent.length > 0) {
                const history = Mock.mock(operate);
                order.modifyHistory.push(history);
                opreates.push(history);
            }
        }
    }
});

const { writeFile } = require('fs');
const path = './orders.mock.json';


writeFile(path, JSON.stringify(orders, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to orders');
});


const operatePath = './operates.mock.json';


writeFile(operatePath, JSON.stringify(opreates, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to opreates');
});

