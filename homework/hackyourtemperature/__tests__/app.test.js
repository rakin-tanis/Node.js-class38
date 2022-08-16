import app from "../app/app.js";
import supertest from "supertest";
import dotenv from "dotenv";

const request = supertest(app);

describe("GET /", () => {
  it("it should return 200 status code", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("POST /weather", () => {
  it("it should return 200 status code", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "amsterdam" });
    expect(response.status).toBe(200);
  });

  it("it should contain the temperature of the city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "amsterdam" });
    const regex =
      /The temperature in Amsterdam: ([0-9]{1,2}([.][0-9]{1,2})?)°C/g;
    expect(String(response.text).match(regex)).toBeTruthy();
  });

  it("it should return 404 as a status code when gibberish city name is given", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "a gibberish city name" });
    expect(response.status).toBe(404);
  });

  it("it should return error message when gibberish city name is given", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "a gibberish city name" });
    expect(response.text.includes("city not found")).toBeTruthy();
  });

  it("it should return 500 as a status code when city name is not given", async () => {
    const response = await request.post("/weather");
    expect(response.status).toBe(400);
  });

  it("it should contain error message when city name is not given", async () => {
    const response = await request.post("/weather");
    expect(response.text.includes("city name can not be empty")).toBeTruthy();
  });

  it("it should return 500 as a status code when any other exception thrown by weather api", async () => {
    dotenv.config();
    process.env.API_KEY = 2;
    const response = await request
      .post("/weather")
      .send({ cityName: "amsterdam" });
    expect(response.status).toBe(500);
  });
});
