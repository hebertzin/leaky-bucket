## Architecture

This project will follow **Clean Architecture** to ensure high maintainability, scalability, and separation of concerns.

### Key Concepts

- **Domain Layer**: Contains pure business logic (entities, interfaces, enums). This layer is framework-agnostic.
- **Application Layer**: Handles use cases and orchestrates how domain models interact. It defines the app’s business rules.
- **Infrastructure Layer**: Deals with external services (PostgreSQL, Kafka, Elasticsearch) and framework-specific implementations.

### Benefits of this Approach

- Easier to test and maintain.
- Clear separation of concerns.
- Reusable and decoupled business logic.
- Infrastructure can be swapped without affecting core logic.