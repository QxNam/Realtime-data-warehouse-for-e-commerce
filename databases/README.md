Vì tách ra 2 file docker-compose nên dùng network extenal.

Tạo trước network trên máy:

```bash
docker network create iuhkart-network
```

# Các database bao gồm:

`docker-compose.yml`

Khởi động các database chính:

```bash
docker compose -f docker-compose.yml up -d
```

Thông tin kết nối:

**local**

- postgres-database:

  - host: `localhost`
  - port: `5432`
  - user:
  - password:
  - database: `postgres`
- mongo:

  - host: `localhost`
  - port: `27017`
  - database: `demo`
  - collection: `items`
- clickhouse:

  - host: `localhost`
  - port: `8123`
  - user:
  - password:
  - database: `default`
- qdrant:

  - host: `localhost`
  - port: `6334`

UI: localhost:6334[/dashboard](https://qdrant.iuhkart.systems/dashboard)

- minio:
  user: `$MINIO_ROOT_USER`
  password: `$MINIO_ROOT_PASSWORD`
