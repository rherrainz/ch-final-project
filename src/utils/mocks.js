import { faker } from "faker-js/faker";

export const fakeProducts = () => {
  const mockProduct = {
    id: faker.database.mongoObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.alphanumeric(6),
    price: faker.commerce.price(1, 5000),
    status: faker.datatype.boolean(),
    stock: faker.datatype.number(100),
    category: faker.commerce.department(),
    thumbnails: [
      { img1: faker.image.imageUrl() },
      { img2: faker.image.imageUrl() },
      { img3: faker.image.imageUrl() },
    ],
  };

  return mockProduct;
};
