import { describe, it, beforeAll, expect } from "vitest";
import request from "supertest";
import { createTestApp } from "../TestApp";

let server: any;

describe("Authentication E2E", () => {
    beforeAll(async () => {
        server = await createTestApp();
    });

    it("should return 401 when JWT token is missing", async () => {
        const response = await request(server)
            .get("/api/v1/protected");
        expect(response.status).toBe(401);
    });

});
