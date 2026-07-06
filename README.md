# Twitch Discovery

A full-stack web application for discovering Twitch content. Browse popular games, search for a game, explore its live streams, videos, and clips, save favorites, and receive recommendations shaped by your interests.

## Features

- Browse the current top games on Twitch
- Search for Twitch content by game name
- View streams, videos, and clips in one interface
- Register, sign in, and sign out with session-based authentication
- Save and remove favorite content
- Get personalized recommendations based on favorited games
- Fall back to popular-game recommendations for guests and new users
- Cache Twitch API results with Caffeine to reduce repeated requests
- Persist users and favorites in MySQL

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Ant Design, Create React App |
| Backend | Java 21, Spring Boot, Spring MVC |
| Security | Spring Security, JDBC authentication |
| Data | MySQL, Spring Data JDBC |
| External API | Twitch Helix API, Spring Cloud OpenFeign, OAuth 2.0 client credentials |
| Caching | Caffeine |
| Tooling | Gradle, Docker, Docker Compose |

## Architecture

The React client calls the Spring Boot REST API. The backend authenticates users against MySQL, stores favorite records, and uses an OAuth 2.0 client-credentials flow to request data from the Twitch Helix API.

```text
React client  ->  Spring Boot API  ->  Twitch Helix API
                        |
                        +--------->  MySQL
```

Recommendations use up to three games from a user's favorites and exclude content the user has already saved. When no favorites are available, the service uses Twitch's top games as recommendation seeds.

## Prerequisites

- Java 21
- Node.js and npm
- Docker and Docker Compose, or a local MySQL server
- A Twitch developer application with a client ID and client secret

Create an application in the [Twitch Developer Console](https://dev.twitch.tv/console/apps) to obtain API credentials.

## Run locally

### 1. Start MySQL

The included Compose configuration starts MySQL on port `3306` with the development password expected by the application:

```bash
docker compose up -d db
```

### 2. Configure Twitch credentials

Set the following environment variables in the terminal where you will run the backend:

```bash
export TWITCH_CLIENT_ID="your-client-id"
export TWITCH_CLIENT_SECRET="your-client-secret"
```

The database connection can also be customized:

| Variable | Default | Description |
| --- | --- | --- |
| `DATABASE_URL` | `localhost` | MySQL host |
| `DATABASE_PORT` | `3306` | MySQL port |
| `DATABASE_USERNAME` | `root` | MySQL username |
| `DATABASE_PASSWORD` | `secret` | MySQL password |
| `DATABASE_INIT` | `always` | Spring SQL initialization mode |

> [!WARNING]
> The development schema drops and recreates the application tables when `DATABASE_INIT=always`. After the first initialization, use `DATABASE_INIT=never` if you want local data to survive backend restarts.

### 3. Start the backend

From the repository root:

```bash
./gradlew bootRun
```

The API starts at [http://localhost:8080](http://localhost:8080).

### 4. Start the frontend

In a second terminal:

```bash
cd twitchfe
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The development server proxies API requests to port `8080`.

## API overview

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/game` | Public | Return Twitch's top games |
| `GET` | `/game?game_name={name}` | Public | Find a game by name |
| `GET` | `/search?game_id={id}` | Public | Return streams, videos, and clips for a game |
| `GET` | `/recommendation` | Optional | Return guest or personalized recommendations |
| `POST` | `/register` | Public | Create a user account |
| `POST` | `/login` | Public | Start an authenticated session |
| `POST` | `/logout` | Public | End the current session |
| `GET` | `/favorite` | Required | Return the current user's favorites |
| `POST` | `/favorite` | Required | Add a favorite |
| `DELETE` | `/favorite` | Required | Remove a favorite |

JSON responses use `snake_case` property names.

## Build and test

Run the backend tests:

```bash
./gradlew test
```

Run the frontend tests:

```bash
cd twitchfe
npm test
```

Create a production frontend bundle:

```bash
cd twitchfe
npm run build
```

Create the executable backend JAR:

```bash
./gradlew clean bootJar
```

The JAR is generated under `build/libs/`.

## Docker image

Build the application JAR first, then build and run the backend image:

```bash
./gradlew clean bootJar
docker build -t twitch-discovery .
docker run --rm -p 8080:8080 \
  -e TWITCH_CLIENT_ID="your-client-id" \
  -e TWITCH_CLIENT_SECRET="your-client-secret" \
  -e DATABASE_URL="host.docker.internal" \
  -e DATABASE_INIT="never" \
  twitch-discovery
```

## Project structure

```text
.
├── src/main/java/com/laioffer/twitch
│   ├── db/              # JDBC repositories and entities
│   ├── external/        # Twitch API client and models
│   ├── favorite/        # Favorite management
│   ├── item/            # Game-content search
│   ├── recommendation/  # Recommendation logic
│   └── user/            # Registration and user lookup
├── src/main/resources
│   ├── database-init.sql
│   └── public/          # Production frontend assets
├── src/test/            # Backend tests
├── twitchfe/            # React frontend source
├── docker-compose.yml   # Local MySQL service
└── Dockerfile           # Backend container image
```

## License

This project does not currently include a license.
