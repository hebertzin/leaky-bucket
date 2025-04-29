import { AuthenticationMiddleware } from "../../../presentation/middlewares/AuthenticationMiddleware";
import { logging } from "../../logging/Logging";
import { JwtManager } from "../../security/Jwt";

export const makeAuthenticationMiddlewareFactory = () => {
    const jwt = new JwtManager()
    const isAuthorizedMiddleware = new AuthenticationMiddleware(jwt, logging)
    return isAuthorizedMiddleware;
};
