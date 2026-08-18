# Database Architecture & Schema

This project utilizes **PostgreSQL** with **SQLAlchemy ORM** and **Alembic** migrations.

## Entity Relationship Model

```
+--------------------------------------------------------------------+
|                         analysis_sessions                          |
+--------------------------------------------------------------------+
| id (UUID, PK)                                                      |
| filename (VARCHAR)                                                 |
| uploaded_at (TIMESTAMP)                                            |
| message_count (INTEGER)                                            |
| user_count (INTEGER)                                               |
+--------------------------------------------------------------------+
           | 1                                        | 1
           |                                          |
           | N                                        | N
+----------------------------+             +-------------------------+
|         chat_users         |             |        messages         |
+----------------------------+             +-------------------------+
| id (UUID, PK)              | 1         N | id (UUID, PK)           |
| session_id (UUID, FK)      |-------------| session_id (UUID, FK)   |
| username (VARCHAR)         |             | user_id (UUID, FK)      |
| message_count (INTEGER)    |             | timestamp (TIMESTAMP)   |
+----------------------------+             | text (TEXT)             |
                                           | has_media (BOOLEAN)     |
                                           | has_link (BOOLEAN)      |
                                           | is_system (BOOLEAN)     |
                                           +-------------------------+
```

## Running Migrations

```bash
cd backend
# Upgrade to latest migration head
alembic upgrade head

# Generate a new migration
alembic revision --autogenerate -m "description"
```
