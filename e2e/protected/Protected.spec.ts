import { describe, it, beforeAll, expect } from "vitest";
import request from "supertest";
import { createTestApp } from "../TestApp";
import { HttpStatusCode } from "../../src/domain/HttpStatus";

let server: any;

describe("/api/v1/protected E2E", () => {
    beforeAll(async () => {
        server = await createTestApp();
    });

    it("should return 401 when JWT token is missing", async () => {
        const response = await request(server)
            .get("/api/v1/protected");
        expect(response.status).toBe(HttpStatusCode.Unauthorized);
    });

});
