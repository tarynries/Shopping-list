process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let fruit = { name: "Banana", price: 1.00 };

beforeEach(function () {
    items.push(fruit);
})

afterEach(function () {
    items.length = 0;
});

describe("GET /items", function () {
    test("get a list of items", async function () {
        const resp = await request(app).get('/items')
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ items: [fruit] })
    });
});

describe("GET /items/:name", function () {
    test("get a single item", async function () {
        const resp = await request(app).get(`/items/${fruit.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: fruit })
    });
    // test("Responds with 404 if can't find cat", async function () {
    //     const resp = await request(app).get(`/cats/0`);
    //     expect(resp.statusCode).toBe(404);
    // });
});

describe("POST /items", function () {
    test("create a new item", async function () {
        const resp = await request(app).post('/items').send({ name: "cookie", price: 3.00 });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            item: { name: "cookie", price: 3.00 }
        });
    });
});


describe("PATCH /items/:name", function () {
    test("updates a single item", async function () {
        const resp = await request(app)
            .patch(`/items/${fruit.name}`)
            .send({ name: "raspberry" });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { name: "raspberry" }
        });
    });


});

describe("DELETE /items", function () {
    test("deletes a single item", async function () {
        const resp = await request(app).delete(`items/${fruit.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" })
    })
});
