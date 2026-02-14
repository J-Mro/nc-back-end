const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});

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
    test("GET:200 - responds with an array of articles with the correct data types", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at")
        .expect(200)
        .then(({ body }) => {
          for (const article of body) {
            expect(article.article_id).toBeNumber();
            expect(article.title).toBeString();
            expect(article.topic).toBeString();
            expect(article.author).toBeString();
            expect(article.created_at).toBeString();
            expect(article.votes).toBeNumber();
            expect(article.article_img_url).toBeString();
          }
        });
    });
    test("GET:200 - responds with an array of articles with a default sort by created_at", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("GET:200 - responds with an array of articles sorted by a given column", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes", { descending: true });
        });
    });
    test("GET:200 - responds with an array of articles in ascending order of created_by", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at"); // default order is ascending
        });
    });
    test("GET:200 - responds with an array of articles in a given order sorted by a given column", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes");
        });
    });
    test("GET:200 - responds with an array of articles with the correct data types when passed a valid topic in the query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          for (const article of body) {
            expect(article.article_id).toBeNumber();
            expect(article.title).toBeString();
            expect(article.topic).toBeString();
            expect(article.author).toBeString();
            expect(article.created_at).toBeString();
            expect(article.votes).toBeNumber();
            expect(article.article_img_url).toBeString();
          }
        });
    });
    test("GET:200 - responds with an array of articles filtered by a given topic when passed a valid topic in the query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          for (const article of body) {
            expect(article.topic).toBe("mitch");
          }
        });
    });
    test("GET:200 - responds with an array of all articles when query is passed no topic", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at&order=desc")
        .expect(200)
        .then(({ body }) => {
          const expected = [
            {
              author: "icellusedkars",
              title: "Eight pug gifs that remind me of mitch",
              article_id: 3,
              topic: "mitch",
              created_at: "2020-11-03T09:12:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "2",
            },
            {
              author: "icellusedkars",
              title: "A",
              article_id: 6,
              topic: "mitch",
              created_at: "2020-10-18T01:00:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "1",
            },
            {
              author: "icellusedkars",
              title: "Sony Vaio; or, The Laptop",
              article_id: 2,
              topic: "mitch",
              created_at: "2020-10-16T05:03:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
            {
              author: "butter_bridge",
              title: "Moustache",
              article_id: 12,
              topic: "mitch",
              created_at: "2020-10-11T11:24:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
            {
              author: "butter_bridge",
              title: "Another article about Mitch",
              article_id: 13,
              topic: "mitch",
              created_at: "2020-10-11T11:24:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
            {
              author: "rogersop",
              title: "UNCOVERED: catspiracy to bring down democracy",
              article_id: 5,
              topic: "cats",
              created_at: "2020-08-03T13:14:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "2",
            },
            {
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "11",
            },
            {
              author: "butter_bridge",
              title: "They're not exactly dogs, are they?",
              article_id: 9,
              topic: "mitch",
              created_at: "2020-06-06T09:10:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "2",
            },
            {
              author: "rogersop",
              title: "Seven inspirational thought leaders from Manchester UK",
              article_id: 10,
              topic: "mitch",
              created_at: "2020-05-14T04:15:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
            {
              author: "rogersop",
              title: "Student SUES Mitch!",
              article_id: 4,
              topic: "mitch",
              created_at: "2020-05-06T01:14:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
            {
              author: "icellusedkars",
              title: "Does Mitch predate civilisation?",
              article_id: 8,
              topic: "mitch",
              created_at: "2020-04-17T01:08:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
            {
              author: "icellusedkars",
              title: "Am I a cat?",
              article_id: 11,
              topic: "mitch",
              created_at: "2020-01-15T22:21:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
            {
              author: "icellusedkars",
              title: "Z",
              article_id: 7,
              topic: "mitch",
              created_at: "2020-01-07T14:08:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
            },
          ];
          expect(body).toEqual(expected);
        });
    });
    test("GET:200 - responds with an array of articles sorted by a given column, in a given order, filtered by a given topic", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=asc&topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes");
          for (const article of body) {
            expect(article.topic).toBe("mitch");
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
    test("GET:404 - responds with an error if the requested column does not exist", () => {
      return request(app)
        .get("/api/articles?sort_by=hey")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("This column does not exist");
        });
    });
    test("GET:400 - responds with an error if the requested order is passed a non-valid string", () => {
      return request(app)
        .get("/api/articles?order=good")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid order");
        });
    });
    test("GET:404 - responds with an error if the requested topic does not exist", () => {
      return request(app)
        .get("/api/articles?topic=iDontExist")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("This topic does not exist");
        });
    });
    test("GET:404 - responds with an error if the requested topic is not assigned a value in the url query", () => {
      return request(app)
        .get("/api/articles?topic=")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("This topic does not exist");
        });
    });
    test("GET:404 - responds with an error if passed a mispelling of the key topic", () => {
      return request(app)
        .get("/api/articles?topc=mitch")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid key");
        });
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
              expect(body.msg).toBe(
                "Request body must have a valid key and value",
              );
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
        test("PATCH:400 - responds with an error message when the request body is an object that has a valid key with a decimal value", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: 1.1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Increase votes must be an integer");
            });
        });
        test("PATCH:400 - responds with an error message when the request body is an object that has a valid property but additional keys", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: 1, hello: 2 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe(
                "Request body must be an object with a single key-value pair",
              );
            });
        });
        test("PATCH:400 - responds with an error message when the request body is an object that has a valid property with a value of zero", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: 0 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Value must be non-zero");
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
describe("/api/comments", () => {
  describe("/api/comments/:comment_id", () => {
    describe("DELETE", () => {
      test("DELETE:204 - responds with a 204 sendStatus when used on a valid path", () => {
        return request(app).delete("/api/comments/1").expect(204);
      });
      describe("Error Handling", () => {
        test("DELETE:400 - responds with an error message when passed an invalid ID", () => {
          return request(app)
            .delete("/api/comments/fifty")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Invalid ID");
            });
        });
        test("DELETE:404 - responds with an error message when passed a non-existent comment_id", () => {
          return request(app)
            .delete("/api/comments/50")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Comment not found");
            });
        });
        test("DELETE:404 - responds with a 404 when used on a valid path for a record that has already been deleted", () => {
          return request(app)
            .delete("/api/comments/1")
            .expect(204)
            .then(() => {
              return request(app)
                .delete("/api/comments/1")
                .expect(404)
                .then(({ body }) => {
                  expect(body.msg).toBe("Comment not found");
                });
            });
        });
      });
    });
    describe("Invalid Methods", () => {
      test("INVALID-METHOD: 405 - responds with an error message when passed a valid path with an undefined method", () => {
        const invalidMethods = ["get", "post"];
        const requests = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/comments/2")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("Invalid method");
            });
        });
      });
    });
  });
});
