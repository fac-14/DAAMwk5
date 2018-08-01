const test = require("tape");
const supertest = require("supertest");
const router = require("./routes");

test("initialise test", (t) => {
  const x = 5;
  t.equal(x, 5, "Checking that test module running correctly. Both answers should be 5");
  t.end();
});

test("home route returns status 200 and an html doc", (t) => {
    supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type", /html/)
    .end((err, res) => {
        t.error(err, "no error");
        t.equal(res.statusCode, 200, "Should return 200");
        t.end();
    })
});

