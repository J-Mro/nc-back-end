const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});
//before test, this will seed data everytime so we have fresh data everytime

afterAll(() => {
  return db.end();
});

describe("/api/topics", () => {
  test("GET:200 - responds with the correct topics array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        const sampleTopic = body[0];
        expect(typeof sampleTopic.slug).toBe("string");
        expect(typeof sampleTopic.description).toBe("string");
        expect(typeof sampleTopic.img_url).toBe("string");
      });
  });
});
