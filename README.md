# Hospital Register Api

### Frontend Web - [Accounting Web JavaScript](https://github.com/yuhexiong/accounting-web-vue3-javascript)

Automatically run CronJob to generate last month report on 1st of every month.  
Automatically generate swagger by comment in router.

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