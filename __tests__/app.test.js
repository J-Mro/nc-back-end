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
  describe("GET", () => {
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
      return Promise.all(requests);
    });
  });
});
describe("/api/articles", () => {
  describe("GET", () => {
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
      return Promise.all(requests);
    });
  });
  describe("/api/articles/:article_id", () => {
    describe("GET", () => {
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
      describe("Error Handling", () => {
        test("GET:404 - responds with an error message 'Article ID not found' when the url includes an article_id that does not exist", () => {
          return request(app)
            .get("/api/articles/50")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Article ID not found");
            });
        });
      });
    });
    describe("PATCH", () => {
      test("PATCH: 200 - responds with an article when passed a valid article_id into the path", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: 1 })
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
      test("PATCH:200 - responds with the updated article votes value for a given article id", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            const article = body;
            expect(article.article_id).toBe(2);
            expect(article.votes).toBe(1);
          });
      });
      describe("Error Handling", () => {
        test("PATCH:404 - responds with an error message when the article_id does not exist", () => {
          return request(app)
            .patch("/api/articles/50")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Article ID not found");
            });
        });
        test("PATCH:400 - responds with an error message when the request body is an empty object", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Request body is empty");
            });
        });
        test("PATCH:400 - responds with an error message when the request body is an object that has an invalid key with a numeric value", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_vots: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Request body is empty");
            });
        });
        test("PATCH:400 - responds with an error message when the request body is an object that has a valid key with a string value", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: "one" })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Increase votes must be a number");
            });
        });
      });
    });
    describe("Invalid Methods", () => {
      test("INVALID-METHOD: 405 - responds with an error message when passed a valid path with an undefined method", () => {
        const invalidMethods = ["delete", "post"];
        const requests = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/articles/2")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("Invalid method");
            });
        });
      });
    });
    describe("/api/articles/:article_id/comments", () => {
      describe("GET", () => {
        test("GET:200 - responds with an object with a key of comments and the value of an array of comments for the given article id", () => {
          return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body).toBeObject();
              expect(body.comments).toBeArray();
              for (const comment of body.comments) {
                expect(comment.comment_id).toBeNumber();
                expect(comment.votes).toBeNumber();
                expect(comment.created_at).toBeString();
                expect(comment.author).toBeString();
                expect(comment.body).toBeString();
                expect(comment.article_id).toBeNumber();
              }
            });
        });
        test("GET:200 - responds with an object with a key of comments and a value of an array of all comment objects for the given id with the most recent comments first", () => {
          return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).toBeSortedBy("created_at", {
                descending: true,
              });
            });
        });
        test("GET:200 - responds with a user-friendly message when a valid article id is passed that has no associated comments", () => {
          return request(app)
            .get("/api/articles/13/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).toBe("No comments yet!");
            });
        });
        describe("Error Handling", () => {
          test("GET: 404 - responds with an error message when the article_id does not exist", () => {
            return request(app)
              .get("/api/articles/500/comments")
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe("Article ID not found");
              });
          });
        });
      });
      describe("POST", () => {
        test("POST:201 - responds with a comment sent with the request", () => {
          return request(app)
            .post("/api/articles/12/comments")
            .send({ username: "butter_bridge", body: "test" })
            .expect(201)
            .then(({ body }) => {
              expect(body.comment_id).toBeNumber();
              expect(body.article_id).toBeNumber();
              expect(body.body).toBeString();
              expect(body.votes).toBeNumber();
              expect(body.author).toBeString();
              expect(body.created_at).toBeString();
            });
        });
        test("POST: 201 - responds with the correct parameters from the request", () => {
          return request(app)
            .post("/api/articles/12/comments")
            .send({ username: "butter_bridge", body: "test" })
            .expect(201)
            .then(({ body }) => {
              expect(body.article_id).toBe(12);
              expect(body.body).toBe("test");
              expect(body.author).toBe("butter_bridge");
            });
        });
        describe("Error Handling", () => {
          test("POST: 404 - responds with an error message when the article_id does not exist", () => {
            return request(app)
              .post("/api/articles/500/comments")
              .send({ username: "butter_bridge", body: "test" })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe("Article ID not found");
              });
          });
          test("POST: 404 - responds with an error message when the request body contains a user that does not exist", () => {
            return request(app)
              .post("/api/articles/12/comments")
              .send({ username: "butter", body: "test" })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe("User not found");
              });
          });
          test("POST: 400 - responds with an error message when the request body contains a comment body that is an empty string", () => {
            return request(app)
              .post("/api/articles/12/comments")
              .send({ username: "butter_bridge", body: "" })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe("Please enter your comment!");
              });
          });
          test("POST: 400 - responds with an error message when the request body contains a comment body that is a string of whitespace", () => {
            return request(app)
              .post("/api/articles/12/comments")
              .send({ username: "butter_bridge", body: "        " })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe("Please enter your comment!");
              });
          });
        });
      });
      describe("Invalid Methods", () => {
        test("INVALID-METHOD: 405 - responds with an error message when passed a valid path with an undefined method", () => {
          const invalidMethods = ["delete", "patch"];
          const requests = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/articles/2/comments")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).toBe("Invalid method");
              });
          });
          return Promise.all(requests);
        });
      });
    });
  });
});
describe("/api/users", () => {
  describe("GET", () => {
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
    describe("Error handling", () => {
      test("GET:404 - responds with an error message when passed an invalid path", () => {
        return request(app)
          .get("/api/use")
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
          [method]("/api/users")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid method");
          });
      });
      return Promise.all(requests);
    });
  });
});
