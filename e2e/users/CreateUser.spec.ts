import { describe, it, beforeAll, expect, afterAll, afterEach } from "vitest";
import request from "supertest";
import { createTestApp } from "../TestApp";
import { HttpStatusCode } from "../../src/domain/HttpStatus";
import { MongoDBClient } from "../../src/infra/database/MongoDBClient";
import { env } from "../../src/infra/env/Env";

let server: any;
let client: any;


describe("/api/v1/users E2E", () => {
    beforeAll(async () => {
        const mongoClient = new MongoDBClient({
            uri: env.MONGO_URI,
            dbName: env.MONGO_DB_NAME
        });

        await mongoClient.connect();
        client = mongoClient.getDatabase();
        server = await createTestApp();
    });

    it("should return 209 user already exist in database", async () => {
        const response = await request(server)
            .post("/api/v1/users")
            .send({ email: "hebertzin@gmail.com", password: "20304050", name: "Hebert santos" });
        expect(response.status).toBe(HttpStatusCode.Conflict);
        expect(response.body.message).toBe("User already exists")
    });

    it("Should return 400 when email is missing", async () => {
        const response = await request(server)
            .post("/api/v1/users")
            .send({ email: "", password: "20304050", name: "hebert santos" });
        expect(response.status).toBe(HttpStatusCode.BadRequest)
        expect(response.body).toMatchObject({
            error: "Invalid data",
            details: [
                {
                    "message": "Must be a valid email address"
                },
                {
                    "message": "Email is required"
                }
            ]

        });
    });

    it("Should return 400 when password is missing", async () => {
        const response = await request(server)
            .post("/api/v1/users")
            .send({ email: "hebertfullstack@gmail.com", password: "", name: "hebert santos" });
        expect(response.status).toBe(HttpStatusCode.BadRequest)
        expect(response.body).toMatchObject({
            error: "Invalid data",
            details: [
                {
                    "message": "Password must be at least 8 characters long"
                }
            ]

        });
    });

    it("Should return 400 when name is missing", async () => {
        const response = await request(server)
            .post("/api/v1/users")
            .send({ email: "hebertfullstack@gmail.com", password: "20304050", name: "" });
        expect(response.status).toBe(HttpStatusCode.BadRequest)
        expect(response.body).toMatchObject({
            error: "Invalid data",
            details: [
                {
                    "message": "Name is required"
                }
            ]

        });
    });

    it("Should return 400 when  email is invalid", async () => {
        const response = await request(server)
            .post("/api/v1/users")
            .send({ email: "@gmail.com", password: "20304050", name: "Jebert santos" });
        expect(response.status).toBe(HttpStatusCode.BadRequest)
        expect(response.body).toMatchObject({
            error: "Invalid data",
            details: [
                {
                    "message": "Must be a valid email address"
                }
            ]

        });
    });

    it("Should return 201 and create user correctly", async () => {
        const email = "hebertbackend@gmail.com";

        const response = await request(server)
            .post("/api/v1/users")
            .send({ email: email, password: "20304050", name: "Hebert santos" });

        expect(response.body.code).toBe(HttpStatusCode.Created)
        expect(response.body.data.id).toBeDefined()
    });

    afterEach(async () => {
        await client.collection("users").deleteOne({ email: "hebertbackend@gmail.com" });
    });

});
