const { promotions } = require('./data.backend.mock.json');
const discounts = require('./discounts.json');
const dishes = require('./dishes1.json');
const Mock = require('mockjs');

const data = Mock.mock({
    "data": function () {
        return promotions.data.map(({ discountId, targetDisheId, ...item }) => ({
            ...item,
            ...Mock.mock({
                description: {
                    zh: "@title(8, 12)",
                    es: "@title(8, 12)",
                    en: "@title(8, 12)",
                },
            }),
            targetDishes: dishes.find(({ id }) => id === targetDisheId)?._id || targetDisheId,
            category: dishes.find(({ id }) => id === targetDisheId)?.category || '',
            discount: discounts.find(({ id }) => id === discountId)?._id || discountId
        }));
    }
});
const path = "promotions.json"
const { writeFile } = require('fs');

writeFile(path, JSON.stringify(data, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});