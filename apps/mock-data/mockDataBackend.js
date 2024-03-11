const fs = require('fs');
var Mock = require('mockjs')

const imgArr = {
    "MCSM": [
        "65a9747a66ef642d0cf0edd8",
        "65a974c766ef642d0cf0edda",
        "65a974ee66ef642d0cf0eddc",
        "65a9750666ef642d0cf0edde",
        "65a9752266ef642d0cf0ede0",
        "65a9753a66ef642d0cf0ede2",
        "65a9755566ef642d0cf0ede4",
        "65a9757666ef642d0cf0ede6",
        "65a975a466ef642d0cf0ede8",
        "65a975c166ef642d0cf0edea",
    ],
    "MCP": [
        "65a975e666ef642d0cf0edec",
        "65a975fa66ef642d0cf0edee",
        "65a9761166ef642d0cf0edf0",
        "65a9762366ef642d0cf0edf2",
        "65a9764366ef642d0cf0edf4",
        "65a9765966ef642d0cf0edf6",
        "65a9766e66ef642d0cf0edf8",
        "65a9770c66ef642d0cf0edfa",
        "65a9772366ef642d0cf0edfc",
        "65a9773a66ef642d0cf0edfe",
    ],
    "MCSO": [
        "65a9775d66ef642d0cf0ee00",
        "65a9777466ef642d0cf0ee02",
        "65a9778c66ef642d0cf0ee05",
        "65a977c066ef642d0cf0ee07",
        "65a977da66ef642d0cf0ee09",
        "65a9783666ef642d0cf0ee0b",
        "65a9784c66ef642d0cf0ee0d",
        "65a9786466ef642d0cf0ee0f",
        "65a9787866ef642d0cf0ee11",
        "65a9788f66ef642d0cf0ee13",
    ],
    "MCBE": [
        "65a978be66ef642d0cf0ee15",
        "65a97cea66ef642d0cf0ee17",
        "65a97cfd66ef642d0cf0ee19",
        "65a97d1266ef642d0cf0ee1b",
        "65a97d2d66ef642d0cf0ee1d",
        "65a97d7166ef642d0cf0ee1f",
        "65a97d8666ef642d0cf0ee21",
        "65a97da266ef642d0cf0ee23",
        "65a97f4f66ef642d0cf0ee25",
        "65a97f7266ef642d0cf0ee27",
        "65a97f8b66ef642d0cf0ee29",
        "65a97fa366ef642d0cf0ee2b",
        "65a97fb766ef642d0cf0ee2d",
        "65a97fcd66ef642d0cf0ee2f",
        "65a97fe766ef642d0cf0ee31",
    ],
    "MCS": [
        "65a9808966ef642d0cf0ee33",
        "65a980be66ef642d0cf0ee35",
        "65a980d466ef642d0cf0ee37",
        "65a980fc66ef642d0cf0ee39",
        "65a9811666ef642d0cf0ee3b",
        "65a9815966ef642d0cf0ee3d",
        "65a9817e66ef642d0cf0ee3f",
        "65a9819066ef642d0cf0ee41",
        "65a981a466ef642d0cf0ee43",
        "65a981b966ef642d0cf0ee45",
    ],
    "MCC": [
        "65a981e666ef642d0cf0ee47",
        "65a981fc66ef642d0cf0ee49",
        "65a9820e66ef642d0cf0ee4b",
        "65a9822366ef642d0cf0ee4d",
        "65a9823666ef642d0cf0ee4f",
        "65a9824a66ef642d0cf0ee51",
        "65a9827766ef642d0cf0ee53",
        "65a982ae66ef642d0cf0ee55",
        "65a982c066ef642d0cf0ee57",
        "65a982d366ef642d0cf0ee59",
    ],
    "MCPZZ": [
        "65a9839c66ef642d0cf0ee5d",
        "65a983b366ef642d0cf0ee5f",
        "65a983c666ef642d0cf0ee61  ",
        "65a983db66ef642d0cf0ee6b",
        "65a983f766ef642d0cf0ee6d",
        "65a9840a66ef642d0cf0ee6f",
        "65a9841f66ef642d0cf0ee71",
        "65a9843166ef642d0cf0ee73",
        "65a9844366ef642d0cf0ee75",
        "65a9845466ef642d0cf0ee77",
    ],
    "MCM": [
        "65a9847066ef642d0cf0ee79",
        "65a9848866ef642d0cf0ee7b",
        "65a984ec66ef642d0cf0ee7f",
        "65a984cc66ef642d0cf0ee7d",
        "65a9853c66ef642d0cf0ee83",
        "65a9851166ef642d0cf0ee81",
        "65a9856866ef642d0cf0ee85",
        "65a9857e66ef642d0cf0ee87",
        "65a9859066ef642d0cf0ee89",
        "65a985a566ef642d0cf0ee8b",
    ],
    "MCIC": [
        "65a985bc66ef642d0cf0ee8d",
        "65a985d266ef642d0cf0ee8f",
        "65a985e566ef642d0cf0ee91",
        "65a985fa66ef642d0cf0ee93",
        "65aa053666ef642d0cf0eeb0",
        "65aa055366ef642d0cf0eeb1",
        "65aa056966ef642d0cf0eeb2",
        "65aa058066ef642d0cf0eeb3",
        "65aa059766ef642d0cf0eeb4",
        "65aa05ac66ef642d0cf0eeb5",
    ],
    "MCSNX": [
        "65aa063f66ef642d0cf0eeb6",
        "65aa065666ef642d0cf0eeb7",
        "65aa066c66ef642d0cf0eeb8",
        "65aa068366ef642d0cf0eeb9",
        "65aa069c66ef642d0cf0eeba",
        "65aa069c66ef642d0cf0eeba",
        "65aa06c866ef642d0cf0eebb",
        "65aa06e466ef642d0cf0eebc",
        "65a9863166ef642d0cf0ee97",
        "65aa06f966ef642d0cf0eebd",
    ],
    "MCB": [
        "65aa071566ef642d0cf0eebe",
        "65aa073866ef642d0cf0eebf",
        "65a9874566ef642d0cf0eeae",
        "65aa076766ef642d0cf0eec0",
        "65aa078666ef642d0cf0eec1",
        "65aa079c66ef642d0cf0eec2",
        "65aa07ad66ef642d0cf0eec3",
        "65aa07be66ef642d0cf0eec4",
        "65aa07d866ef642d0cf0eec5",
        "65a9864666ef642d0cf0ee99",
        "65aa07ea66ef642d0cf0eec6",
        "65aa080566ef642d0cf0eec7",
        "65aa081966ef642d0cf0eec8",
        "65aa083366ef642d0cf0eec9",
        "65aa084966ef642d0cf0eeca",
    ]
};

const promotionsIMG = [
    "65a9837d66ef642d0cf0ee5b",
    "65a9861466ef642d0cf0ee95",
    "65a9866666ef642d0cf0ee9b",
    "65a9869c66ef642d0cf0eea1",
    "65a986b266ef642d0cf0eea3",
    "65a986c466ef642d0cf0eea5",
    "65a9872366ef642d0cf0eeab",
    "65a9870066ef642d0cf0eea9",
    "65a986db66ef642d0cf0eea7",
    "65a9868766ef642d0cf0ee9f"];

const allergensMock = [
    {
        id: "658bd7ba71c4ebfad4062453",
        "description": { "zh": "含麸质谷物", "es": "Cereales con gluten", "en": "Cereals with gluten" },
        "groupKey": "ALLERGENS",
        "icon": "GlutenIcon",
        "img": "",
        "key": "GLUTEN",
        "name": { "zh": "麸质", "es": "Gluten", "en": "Gluten" }
    },
    {
        id: "658bd7ba71c4ebfad4062454",
        "description": { "zh": "甲壳类和甲壳类产品", "es": "Crustáceos y productos a base de crustáceos", "en": "Crustaceans and crustacean products" },
        "groupKey": "ALLERGENS",
        "icon": "CrustaceanIcon",
        "img": "",
        "key": "CRUSTACEANS",
        "name": { "zh": "甲壳类", "es": "Crustáceos", "en": "Crustaceans" }
    },
    {
        id: "658bfa8b71c4ebfad4062458",
        "description": { "zh": "鸡蛋及其衍生产品", "es": "Huevos y productos derivados", "en": "Eggs and derived products" },
        "groupKey": "ALLERGENS",
        "icon": "EggsIcon",
        "img": "",
        "key": "EGGS",
        "name": { "zh": "鸡蛋", "es": "Huevos", "en": "Eggs" }
    },
    {
        id: "658bfa8b71c4ebfad4062459",
        "description": { "zh": "鱼和鱼制品", "es": "Pescado y productos a base de pescados", "en": "Fish and fish- based products" },
        "groupKey": "ALLERGENS",
        "icon": "FishIcon",
        "img": "",
        "key": "FISH",
        "name": { "zh": "鱼", "es": "Pescado", "en": "Fish" }
    },
    {
        id: "658bfa8b71c4ebfad406245a",
        "description": { "zh": "花生、花生制品和坚果", "es": "Cacahuetes, productos a base de cacahuetes y frutos secos", "en": "Peanuts, peanut - based products and nuts" },
        "groupKey": "ALLERGENS",
        "icon": "PeanutsIcon",
        "img": "",
        "key": "PEANUTS",
        "name": { "zh": "花生", "es": "Cacahuetes", "en": "Peanuts" }
    },
    {
        id: "658bfa8b71c4ebfad406245b",
        "description": { "zh": "大豆和大豆制品", "es": "Soja y productos a base de soja", "en": "Soy and soy - based products" },
        "groupKey": "ALLERGENS",
        "icon": "SoyIcon",
        "img": "",
        "key": "SOY",
        "name": { "zh": "大豆", "es": "Soja", "en": "Soy" }
    },
    {
        id: "658bfa8b71c4ebfad406245c",
        "description": { "zh": "牛奶及其衍生物（包括乳糖）", "es": "Leche y sus derivados(incluida la lactosa)", "en": "Milk and its derivatives(including lactose)" },
        "groupKey": "ALLERGENS",
        "icon": "LactoseIcon",
        "img": "",
        "key": "DAIRY",
        "name": { "zh": "奶制品", "es": "Lácteos", "en": "Dairy" }
    },
    {
        id: "658bfa8b71c4ebfad406245d",
        "description": { "zh": "坚果及其衍生产品", "es": "Frutos de cáscara y productos derivados", "en": "Nuts and derived products" },
        "groupKey": "ALLERGENS",
        "icon": "NutsIcon",
        "img": "",
        "key": "NUTS",
        "name": { "zh": "坚果", "es": "Frutos con cáscara", "en": "Nuts" }
    },
    {
        id: "658bfa8b71c4ebfad406245e",
        "description": { "zh": "芹菜及其衍生产品", "es": "Apio y productos derivados", "en": "Celery and derived products" },
        "groupKey": "ALLERGENS",
        "icon": "CeleryIcon",
        "img": "",
        "key": "CELERY",
        "name": { "zh": "芹菜", "es": "Apio", "en": "Celery" }
    },
    {
        id: "658bfa8b71c4ebfad406245f",
        "description": { "zh": "芥末和芥末制品", "es": "Mostaza y productos a base de mostaza", "en": "Mustard and mustard - based products" },
        "groupKey": "ALLERGENS",
        "icon": "MustardIcon",
        "img": "",
        "key": "MUSTARD",
        "name": { "zh": "芥末", "es": "Mostaza", "en": "Mustard" }
    },
    {
        id: "658bfa8b71c4ebfad4062460",
        "description": { "zh": "芝麻粒或种子及芝麻制品", "es": "Granos o semillas de sésamo y productos a base de sésamo", "en": "Sesame grains or seeds and sesame - based products" },
        "groupKey": "ALLERGENS",
        "icon": "SesameIcon",
        "img": "",
        "key": "SESAME",
        "name": { "zh": "芝麻", "es": "Sésamo", "en": "Sesame" }
    },
    {
        id: "658bfa8b71c4ebfad4062461",
        "description": { "zh": "二氧化硫和亚硫酸盐", "es": "Dióxido de azufre y sulfitos", "en": "Sulfur dioxide and sulfites" },
        "groupKey": "ALLERGENS",
        "icon": "SO2Icon",
        "img": "",
        "key": "SULFITES",
        "name": { "zh": "亚硫酸盐", "es": "Sulfitos", "en": "Sulfites" }
    },
    {
        id: "658bfa8b71c4ebfad4062462",
        "description": { "zh": "羽扇豆和羽扇豆制品", "es": "Altramuces y productos a base de altramuces", "en": "Lupins and lupin - based products" },
        "groupKey": "ALLERGENS",
        "icon": "LupinIcon",
        "img": "",
        "key": "SULFITES",
        "name": { "zh": "羽扇豆", "es": "Altramuces", "en": "Lupins" }
    },
    {
        id: "658bfa8b71c4ebfad4062463",
        "description": { "zh": "软体动物和甲壳动物以及基于这些的产品", "es": "Moluscos y crustáceos y productos a base de estos", "en": "Molluscs and crustaceans and products based on these" },
        "groupKey": "ALLERGENS",
        "icon": "MolluscIcon",
        "img": "",
        "key": "MOLLUSKS",
        "name": { "zh": "软体动物", "es": "Moluscos", "en": "Mollusks" }
    },
];

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

const ingredientsMock = Mock.mock({
    "data|150-200": [{
        "icon": "",
        "id": "@id",
        "img": "",
        "price": "@float(1, 30, 2, 2)",
        "weight": "@natural(200, 1000)",
        "description": {
            zh: "@title(8,15)",
            es: "@title(8,15)",
            en: "@title(8,15)",
        },
        "name": {
            zh: "@title(3)",
            es: "@title(3)",
            en: "@title(3)",
        },
        "unit|1": ["658c292171c4ebfad4062465", "658c292171c4ebfad4062466"]
    }]
});

const TagsMock = Mock.mock({
    "data|10-20": [{
        key: '@id',
        description: {
            zh: "@title(5,10)",
            es: "@title(5,10)",
            en: "@title(5,10)",
        },
        name: {
            zh: "@title(1)",
            es: "@title(1)",
            en: "@title(1)",
        },
        icon: '',
        img: '',
        groupKey: 'TAGS',
    }]
});

const OptionGroupMock = Mock.mock({
    "data|10-20": [{
        key: '@id',
        description: {
            zh: "@title(5,10)",
            es: "@title(5,10)",
            en: "@title(5,10)",
        },
        name: {
            zh: "@title(2)",
            es: "@title(2)",
            en: "@title(2)",
        },
        icon: '',
        img: '',
        "selectType|1": ['65aa107d79a38f03210161e2', '65aa107d79a38f03210161e3'],
        groupKey: '',
    }]
});

const OptionsMock = Mock.mock({
    "data|30-50": [{
        key: '@id',
        description: {
            zh: "@title(5,10)",
            es: "@title(5,10)",
            en: "@title(5,10)",
        },
        name: {
            zh: "@title(4)",
            es: "@title(4)",
            en: "@title(4)",
        },
        "state|1": ['active', 'disabled'],
        extra: function () {
            const hasExtra = Random(0, 1) === 1;
            if (hasExtra) {
                return Mock.mock("@float(0, 1.5, 2, 2)");
            }
            return undefined;
        },
        icon: '',
        img: '',
        "groupKey|1": OptionGroupMock.data.map(({ key }) => key),
    }]
});

const discountRules = [];

var dishes = Mock.mock({
    "data|150-200": [{
        "id": '@id',
        "categoryId": '@pick(["MCSM", "MCB", "MCP", "MCSO", "MCBE","MCS", "MCC","MCPZZ", "MCM","MCIC","MCSNX"])',
        description: {
            zh: "@title(10, 20)",
            es: "@title(10, 20)",
            en: "@title(10, 20)",
        },
        name: {
            zh: "@title()",
            es: "@title()",
            en: "@title()",
        },
        "disabled": "@boolean(3, 7, true)",
        "ingredients": function () {
            const indexes = Random(0, ingredientsMock.data.length - 1, Random(3, 8));
            return indexes.map((index) => (ingredientsMock.data[index].id));
        },
        "image": function () {
            const arr = imgArr[this.categoryId];
            return arr[Random(0, arr.length - 1)];
        },
        price: "@float(1, 50, 2, 2)",
        isTaxInclude: "@boolean(3, 7, true)",
        "taxRate|1": [0, 0.1, 0.2, 0.15],
        "tags": function () {
            const arr = Random(0, TagsMock.data.length - 1, Random(0, 5)) ?? [];
            return arr.map((index) => (TagsMock.data[index].key));
        },
        "allergens": function () {
            const arr = Random(0, allergensMock.length - 1, Random(0, 5)) ?? [];
            return arr.map((index) => (allergensMock[index].key));
        },
        discount: function () {
            const price = this.price;
            const random = Random(0, 1);
            if (random === 1) {
                const mock = Mock.mock({
                    "type|1": ["65aa19ff79a38f03210161ec", "65aa19ff79a38f03210161ed"],
                    value: function () {
                        if (this.type === '65aa19ff79a38f03210161ec') {
                            return Mock.mock("@float(0, 0.9, 2, 2)");
                        }
                        return Mock.mock(`@float(1, ${price}, 2,2)`);
                    },
                    "limitType|1": ["65aa19ff79a38f03210161f0", "65aa19ff79a38f03210161ef", "65aa19ff79a38f03210161f1"],
                    "limitValue": function () {
                        switch (this.limitType) {
                            case '65aa19ff79a38f03210161f0':
                                return Mock.mock({
                                    "number": `@float(${[price]}, ${price * 3}, 2,2)`
                                }).number;
                            case 'combo':
                                return 0;
                            default: return Mock.mock({
                                "number|1-20": 20
                            }).number;
                        }
                    },
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
                    status: "65aa1ef979a38f03210161fa",
                    id: "@id",
                    startAt: new Date("2023-12-5"),
                    endAt: new Date("2024-2-10"),
                });
                const existItemIndex = discountRules.findIndex(({ type, value, limitType, limitValue }) => type === mock.type && value === mock.value && limitType === mock.limitType && limitValue === mock.limitValue);
                if (existItemIndex >= 0) {
                    return discountRules[existItemIndex].id;
                } else {
                    discountRules.push(mock);
                    return mock.id;
                }
            }
            return undefined;
        },
        options: function () {
            const randomArr = Random(0, OptionGroupMock.data.length - 1, Random(0, 5)) ?? [];
            const arr = randomArr.map((index) => OptionGroupMock.data[index].key);
            return arr;
        }
    }]
});

const promotionsMock = Mock.mock({
    "data|80-120": [function () {
        const mock = Mock.mock(
            {
                id: "@id",
                name: {
                    zh: '@title(5, 10)',
                    es: '@title(5, 10)',
                    en: '@title(5, 10)',
                },
                "img|1": promotionsIMG,
                targetDisheId: function () {

                    const index = Random(0, dishes.data.length - 1);
                    return dishes.data[index].id;
                },

                startAt: new Date("2023-12-5"),
                endAt: new Date("2024-2-10")
            });
        const discount = Mock.mock({
            "type|1": ["65aa19ff79a38f03210161ec", "65aa19ff79a38f03210161ed"],
            value: function () {
                if (this.type === '65aa19ff79a38f03210161ec') {
                    return Mock.mock("@float(0, 0.9, 2, 2)");
                }
                return Mock.mock(`@float(1, ${dishes.data.find(({ id }) => id === mock.targetDisheId).price}, 2,2)`);
            },
            "limitType|1": ["65aa19ff79a38f03210161f0", "65aa19ff79a38f03210161ef", "65aa19ff79a38f03210161f1"],
            "limitValue": function () {
                switch (this.limitType) {
                    case '65aa19ff79a38f03210161f0':
                        return Mock.mock({
                            "number": `@float(${[dishes.data.find(({ id }) => id === mock.targetDisheId).price]}, ${dishes.data.find(({ id }) => id === mock.targetDisheId).price * 3}, 2,2)`
                        }).number;
                    case '65aa19ff79a38f03210161f1':
                        return 0;
                    default: return Mock.mock({
                        "number|1-20": 20
                    }).number;
                }
            },
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
            status: "65aa1ef979a38f03210161fa",
            id: "@id",
            startAt: new Date("2023-12-5"),
            endAt: new Date("2024-2-10"),
        });
        const existItemIndex = discountRules.findIndex(({ type, value, limitType, limitValue }) => type === discount.type && value === discount.value && limitType === discount.limitType && limitValue === discount.limitValue);
        if (existItemIndex >= 0) {
            mock.discountId = discountRules[existItemIndex].id;
        } else {
            discountRules.push(discount);
            mock.discountId = discount.id;
        }
        return mock;

    }]

});

const { writeFile } = require('fs');

const path = './data.backend.mock.json';

const data = {
    dishes,
    promotions: promotionsMock,
    tags: TagsMock,
    discountRules,
    options: [...OptionGroupMock.data, ...OptionsMock.data],
    ingredientsMock: ingredientsMock
}

writeFile(path, JSON.stringify(data, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});


