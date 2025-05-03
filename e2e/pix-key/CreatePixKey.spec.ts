import { describe, it, beforeAll, expect, afterAll, afterEach } from "vitest";
import request from "supertest";
import { createTestApp } from "../TestApp";
import { HttpStatusCode } from "../../src/domain/HttpStatus";
import { MongoDBClient } from "../../src/infra/database/MongoDBClient";
import { env } from "../../src/infra/env/Env";

let server: any;
let client: any;
let token: string;

describe("/api/v1/pix/query E2E", () => {
    beforeAll(async () => {
        const mongoClient = new MongoDBClient({
            uri: env.MONGO_URI,
            dbName: env.MONGO_DB_NAME
        });

        await mongoClient.connect();
        client = mongoClient.getDatabase();
        server = await createTestApp();

        await request(server).post("/api/v1/users").send({
            email: "pixuser@example.com",
            password: "12345678",
            name: "Pix User"
        });

        const login = await request(server).post("/api/v1/authentication").send({
            email: "pixuser@example.com",
            password: "12345678"
        });

        token = login.body.data.token;
    });

    it("Should create a pix key when authenticated", async () => {
        const response = await request(server)
            .post("/api/v1/pix/query")
            .set("Authorization", `Bearer ${token}`)
            .send({
                type: "EMAIL",
                key: "pix.email@examplee2etest.com",
                bank: "Inter"
            });

        expect(response.body.message).toBe("Pix key created successfully");
    });

    it("Should return 400 when email is invalid", async () => {
        const response = await request(server)
            .post("/api/v1/pix/query")
            .set("Authorization", `Bearer ${token}`)
            .send({
                type: "EMAIL",
                key: "@examplee2etest.com",
                bank: "Inter"
            });

        expect(response.status).toBe(HttpStatusCode.BadRequest);
        expect(response.body).toMatchObject({
            error: "Invalid data",
            details: [
                {
                    "message": "Invalid email format"
                }
            ]
        });
    });

    it("Should return 209 when pix key already exist", async () => {
        const existentPixKey = "hebertzinbackend@gmail.com"
        const response = await request(server)
            .post("/api/v1/pix/query")
            .set("Authorization", `Bearer ${token}`)
            .send({
                type: "EMAIL",
                key: existentPixKey,
                bank: "Inter"
            });

        expect(response.status).toBe(HttpStatusCode.Conflict);
        expect(response.body.message).toBe("Pix key already exists");
        expect(response.body.code).toBe(HttpStatusCode.Conflict);
    });

    it("Should return 401 if no token is provided", async () => {
        const response = await request(server)
            .post("/api/v1/pix/query")
            .send({
                type: "email",
                key: "unauthorized@example.com"
            });

        expect(response.status).toBe(HttpStatusCode.Unauthorized);
    });

    afterEach(async () => {
        await client.collection("pix_keys").deleteOne({ key: "pix.email@examplee2etest.com" });
        await client.collection("pix_keys").deleteOne({ key: "unauthorized@example.com" });
    });

    afterAll(async () => {
        await client.collection("users").deleteOne({ email: "pixuser@example.com" });
    });
});
