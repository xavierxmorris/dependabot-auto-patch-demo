const request = require("supertest");
const app = require("../src/index");

describe("GET /health", () => {
  it("returns status ok with dependency versions", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.versions).toHaveProperty("express");
    expect(res.body.versions).toHaveProperty("lodash");
    expect(res.body.versions).toHaveProperty("axios");
    expect(res.body.versions).toHaveProperty("dayjs");
  });
});

describe("GET /api/users", () => {
  it("returns users grouped by role", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("admin");
    expect(res.body).toHaveProperty("user");
    expect(res.body.admin).toHaveLength(2);
    expect(res.body.user).toHaveLength(2);
  });
});

describe("GET /api/time", () => {
  it("returns time in multiple formats", async () => {
    const res = await request(app).get("/api/time");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("utc");
    expect(res.body).toHaveProperty("unix");
    expect(res.body).toHaveProperty("formatted");
  });
});
