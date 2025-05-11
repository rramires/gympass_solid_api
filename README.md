# gympass_solid_api

GymPass style API using SOLID standards

#### To create a Postgres instance in Docker for development:

```sh
docker run --name gympass-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker123 -e POSTGRESQL_DATABASE=gympass-db -p 5432:5432 bitnami/postgresql:latest
```

To view running containers

```sh
docker ps
```

To see the containers that have already been created/run

```sh
docker ps -a
```

- It will list in descending order of creation

To rerun use the ID or name

```sh
docker start gympass-pg
```

To see if you actually ran

```sh
docker ps
```

To remove the container

```sh
docker rm gympass-pg
```

To see if it really removed

```sh
docker ps -a
```

#### To run Prisma migrations:

```sh
npx prisma migrate dev
```
