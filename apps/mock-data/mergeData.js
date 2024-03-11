const enums = require('./enums.json');
const discounts = require('./discounts.json');
const options = require('./options.json');
const ingredients = require("./ingredients.json");
const mainData = require('./data.backend.mock.json');
const categories = require('./menucategories.json');

const data = mainData.dishes.data.map((item) => {
    item.ingredients = item.ingredients.map((str) => ingredients.find(({ id }) => id === str)?._id || str);
    if (item.discount) {
        item.discount = discounts.find(({ _id, id }) => id === item.discount)?._id || item.discount;
    }
    item.category = categories.find(({ id }) => id === item.categoryId)?._id || item.categoryId;
    item.allergens = item.allergens.map((id) => enums.find(({ key }) => key === id)?._id || id);
    item.options = item.options.map((id) => options.find(({ key }) => key === id)?._id || id);
    item.tags = item.tags.map((id) => enums.find(({ key, groupKey }) => groupKey === "TAGS" && key === id)?._id || id);
    delete item.categoryId;
    return item;
});

const path = "dishes.json"
const { writeFile } = require('fs');

writeFile(path, JSON.stringify(data, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});

