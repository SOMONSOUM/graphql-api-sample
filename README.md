### Read Me Document

#### create file .env

```
PORT=8080
MYSQL_DEFAULT=mysql2://root:root@127.0.0.1:3306/db_name
```

### generate seeds data to database

```
knex seed:run
```

### create migrate schema

```
knex migrate:make add_table
```

### generate schema to database

```
knex migrate:latest
```
