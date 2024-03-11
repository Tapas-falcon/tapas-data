var Mock = require('mockjs');

const data = require('./orders.mock.json');

const orders = data.data;
const userIDs = ["6550b874f541b57f1d22bd28", "65563053f7199a64653e9587", "657464647a64b37492df4abc"];

const store = Mock.mock({
    "data|20-50": [{
        id: "@id",
        description: {
            zh: "@title(5, 8)",
            es: "@title(5, 8)",
            en: "@title(5, 8)",
        },
        name: {
            zh: "@title(3)",
            es: "@title(3)",
            en: "@title(3)",
        },
        address: function () {
            return Mock.Random.region() + Mock.Random.province() + Mock.Random.city()
        },

        tel: function () { return Mock.mock(/\d{11}/); },
        "mangager|1": userIDs
    }]
});

const revenues = Mock.mock({
    "data": [{
        id: "@id",
        date: new Date("2024-01-29"),
      
        orders:[],
        taotal_cash: 0,
        taotal_pos: 0,
        total_cash_withdrawal: 0,
        
        taotal_tax: []
      
        // // 报告人
        // @Prop({
        //   type: Types.ObjectId,
        //   ref: 'UserInfo',
        // })
        // report_by: UserInfo;
      
        // // 报告状态枚举， GroupObjId: 65b693db2216a45b2c0fd2b2
        // @Prop({
        //   type: Types.ObjectId,
        //   ref: 'Enums',
        // })
        // status: Enums;
      
        // @Prop({
        //   type: Types.ObjectId,
        //   ref: 'Store',
        // })
        // shopId: Store;
    }]
});



const { writeFile } = require('fs');


writeFile("./store.mock.json", JSON.stringify(store, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to store');
});
