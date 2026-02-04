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
        for (const topic of body) {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.img_url).toBe("string");
        }
      });
  });
});
describe("/api/articles", () => {
  test("GET:200 - responds with the correct articles array with additional comment_count column", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        for (const article of body) {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        }
      });
  });
});
