import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080");

const productMock = {
  title: "test",
  price: 10,
  stock: 10,
  description: "test",
  category: "test",
  code: "test",
};

const userMock1 = {
  first_name: "test",
  last_name: "test",
  email: "test@mockmail.com",
  age: 10,
  password: "test",
};

const userMock2 = {
  first_name: "test",
  last_name: "test",
  email: "test@mockmail.com",
  age: 10,
  password: "test",
};

describe("Test /api/products", () => {
  it("Test método GET all products", async () => {
    const response = await request.get("/api/products");
    expect(response._body).to.have.property("status");
    expect(response._body).to.have.property("payload");
    expect(response._body.payload).to.be.an("array");
    expect(response._body.payload).to.not.have.lengthOf(0);
  });
  it("Test POST un product", async () => {
    const response = await request.post("/api/products").send(productMock);
    expect(response._body.product).to.have.property("_id");
  });
  it("Test GET un product by id", async () => {
    const createProduct = await request.post("/api/products").send(productMock);
    const pid = createProduct._body.product._id;
    const response = await request.get(`/api/products/${pid}`);
    expect(response._body.product).to.have.property("_id");
  });
});

describe("Test /api/users/registro", () => {
  it("Test GET un user by id", async () => {
    const createUser = await request
      .post("/api/users/registro")
      .send(userMock1);
    const idUser = createUser._body.newUser._id;
    const response = await request.get(`/api/sessions/current/${idUser}`);
    expect(response._body.user).to.have.property("full_name");
    expect(response._body.user).to.have.property("email");
    expect(response._body.user).to.have.property("cart");
    expect(response._body.user).to.have.property("role");
  });
  it("Test POST un nuevo carrito", async () => {
    const createUser = await request
      .post("/api/users/registro")
      .send(userMock2);
    const idUser = createUser._body.newUser._id;
    const createCart = await request.post("/api/carts");
    const _id = createCart._body.cart._id;
    const response = await request.post(`/api/sessions/${idUser}/cart/${_id}`);
    expect(response._body.user).to.have.property("cart");
    expect(response._body.user.cart).to.not.have.lengthOf(0);
  });
});
