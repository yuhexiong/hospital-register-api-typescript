# Hospital Register Api

## Overview

- Language: TypeScript
- Web FrameWork: Express
- DataBase: MariaDB v10.9

## ENV

copy .env.example and rename as .env

```bash
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

# port 
PORT=

# swagger
SWAGGER_MOUNT_PATH=/api

```

## Run

### install dependencies

```bash

npm install

```

### run migration file

```bash

npm run migration:run

```

### run

```bash

npm run start

```

## API

### patient

- `POST /patient`：新增一位病人
- `GET /patient/name/{name}`：由姓名取得符合的病人, 支援正規表達式搜尋
- `GET /patient/{id}`：由id取得一位病人
- `GET /patients`：取得所有病人
- `PUT /patient/{id}`：修改一位病人
- `DELETE /patient/{id}`：刪除一位病人

### doctor

- `POST /doctor`：新增一位醫師
- `GET /doctor/{id}`：由id取得一位醫師
- `GET /doctors`：取得所有醫師
- `PATCH /doctor/{id}/{name}`：修改一位醫師名字

### reservation

- `POST /reservation/list`：新增一張預約班表, 預設可預約, 總看診號50, 不足的給號類別依是否可預約給預設
- `POST /reservation`：預約門診, 依給號類別和預約來源決定是否預約成功
- `GET /reservation/{year}/{month}`：取得指定月分所有預約班表
- `PATCH /reservation/{reservationDetailId}/{type}`：修改預約給號類別