import { faker } from "@faker-js/faker";

export const generateProduct = () => {
    const arregloproducts = [];
    for (let i = 0; i < 100; i++) {      
      const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.urlLoremFlickr({ category: 'fashion' }),
        code: faker.string.alphanumeric(5),
        stock: faker.number.int(100),
    };
    arregloproducts.push(product);
    }      
    return arregloproducts;
};