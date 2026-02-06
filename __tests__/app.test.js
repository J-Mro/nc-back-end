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
  describe("GET:", () => {
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
    describe("Error handling", () => {
      test("GET:404 - responds with an error message when passed an invalid path", () => {
        return request(app)
          .get("/api/topic")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Path not found");
          });
      });
    });
  });
  describe("Invalid Methods", () => {
    test("INVALID-METHOD: 405 - responds with an error message when passed a valid path with an undefined method", () => {
      const invalidMethods = ["delete", "post", "patch"];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid method");
          });
      });
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
  describe("Invalid Methods", () => {
    test("INVALID-METHOD: 405 - responds with an error message when passed a valid path with an undefined method", () => {
      const invalidMethods = ["delete", "post", "patch"];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid method");
          });
      });
    });
  });
  describe("/api/articles/:article_id", () => {
    test("GET:200 - responds with the correct article with the correct :article_id", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          const article = body;
          expect(article.article_id).toBe(2);
          expect(typeof article.author).toBe("string");
          expect(typeof article.body).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
    });
    test("GET:404 - responds with an error message 'Article ID not found' when the url includes an article_id that does not exist", () => {
      return request(app)
        .get("/api/articles/50")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Resource not found");
        });
    });
  });
});
describe("/api/users", () => {
  test("GET:200 - responds with correct users array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        for (const user of body) {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        }
      });
  });
});
