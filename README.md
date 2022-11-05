# Mikro-ORM bug reproduction: virtual properties required when seeding

When trying to seed database entity that has virtual properties, they are required and `InvalidFieldNameException` is thrown:

```sql
InvalidFieldNameException: insert into "user" (...) values (...) returning ..., "initials" - column "initials" does not exist
    at PostgreSqlExceptionConverter.convertException 
    (...\node_modules\@mikro-orm\postgresql\PostgreSqlExceptionConverter.js:36:24)
    ...
```

`initials` is a virtual property.

### Context

**Mikro-ORM:** v5.5.0

**Database:** PostgreSQL 14

**Metadata Provider:** ts-morph

### Steps

- Install dependencies with `yarn install`
- Create `.env` file based on `.env.example`
- Seed database with `npx mikro-orm migration:fresh --seed` or `npx mikro-orm seeder:run`

