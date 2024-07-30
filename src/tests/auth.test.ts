import request from "supertest";
import { expect } from "chai";
import { app } from "../app";

describe("Auth API", () => {
  let token: string;

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body).to.have.property("username", "testuser");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    token = res.body.token;
  });

  it("should access a protected route", async () => {
    const res = await request(app)
      .get("/api/auth/protected")
      .set("Authorization", token);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "This is a protected route");
    expect(res.body).to.have.property("user");
  });

  it("should fail to access a protected route without a token", async () => {
    const res = await request(app).get("/api/auth/protected");

    expect(res.status).to.equal(401);
  });
});
