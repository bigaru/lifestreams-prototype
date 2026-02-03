
# Quick Start

Run app
```bash
docker compose -f ./docker-compose-dev.yml up -d

SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun
```

for backend `http://localhost:8080`
for db management `http://localhost:9000`
