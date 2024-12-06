# Services

`docker-compose].yml`

Khởi động các service chính:

```bash
docker compose up -d
```

## API embedding

Đã build sẵn image `qxnam/embedding-api`

- localhost: localhost:8000

## Superset (Dashboard)

Cần thực hiện các lệnh trong `pipeline/configs/superset/init.sh` để khởi tạo user đăng nhập.

- localhost: localhost:8088

Thông tin đăng nhập:

- user: admin
- password: admin

## debezium-ui (Change Data Capture)

- localhost: localhost:8085

## kafka-ui (Event streaming)

- localhost: localhost:8081

## flink (ETL)

- localhost: localhost:28081

## airflow (Generate data)

- localhost: localhost:13005

## portainer (Manager container)

- localhost: localhost:29011
