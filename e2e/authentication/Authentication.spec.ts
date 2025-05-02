import { describe, it, beforeAll, expect } from "vitest";
import request from "supertest";
import { createTestApp } from "../TestApp";
import { HttpStatusCode } from "../../src/domain/HttpStatus";

let server: any;

describe("/api/v1/authentication E2E", () => {
    beforeAll(async () => {
        server = await createTestApp();
    });

    it("should return 401 when invalid credentials", async () => {
        const response = await request(server)
            .post("/api/v1/authentication")
            .send({ email: "hebertsantosdeveloper@gmail.com", password: "20304050" });
        expect(response.status).toBe(HttpStatusCode.Unauthorized);
        expect(response.body.message).toBe("Invalid credentials")
    });

    it("should return 404 when user not found in database", async () => {
        const response = await request(server)
            .post("/api/v1/authentication")
            .send({ email: "invalidUser@gmail.com", password: "20304050" });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User does not exist")
    });

    it("Should return 400 when password are missing", async () => {
        const response = await request(server)
            .post("/api/v1/authentication")
            .send({ email: "hebertsantosdeveloper@gmail.com", password: "" });
        expect(response.body).toMatchObject({
            error: "Invalid data",
            details: [
                {
                    "message": "Password muist have at least 8 digits"
                }
            ]

        });
    });

    it("Should return 400 when email are missing", async () => {
        const response = await request(server)
            .post("/api/v1/authentication")
            .send({ email: "", password: "20304050" });
        expect(response.body).toMatchObject({
            error: "Invalid data",
            details: [
                {
                    "message": "Must be a valid email"
                },
                {
                    "message": "Email is required"
                }
            ]

        });
    });

    it("Should return a token if user exist and generate a token", async () => {
        const response = await request(server)
            .post("/api/v1/authentication")
            .send({ email: "hebertzin@gmail.com", password: "20304050" });
        expect(response.body.code).toBe(HttpStatusCode.Ok)
        expect(response.body.message).toBe("Authentication successful")
        expect(response.body.data.token).toBeDefined()
    });
});
