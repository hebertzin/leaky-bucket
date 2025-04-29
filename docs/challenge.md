This challenge has as focus on implementing a leaky bucket strategy similar to the leaky bucket from BACEN.

## Deliverables
- [x] A node js http server
- [x] Koa server
- [x] Creation of users
- [x] Password hash
- [x] Persistence with mongoDB
- [x] Database with docker
- [x] Implement an authentication of users with a Bearer Token
- [x] This token must be sent in the request Authorization
- [ ] A multi-tenancy strategy to be the owner of requests. For example, you could have users, and each user will have 10 tokens
- [ ] A leaky bucket strategy completed

- [ ] A mutation that simulates a query of a pix key

### Leaky Bucket Strategy
- The query starts with 10 query tokens.
- Each request must consume 1 token. If success it keeps your token, if failed it must decrease 1 token from tokens.
- Every hour 1 token is added to the total number of tokens available for request
- 10 is the max limit of tokens
- Simulate requests validating token strategy with Jest to show that the leaky bucket works
- Generate a postman of the API to be consumed