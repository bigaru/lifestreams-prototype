
# Quick Start

Run app
```bash
docker compose -f ./docker-compose-dev.yml up --build -d

SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun

docker compose -f ./docker-compose-dev.yml down -v
```

for backend `http://localhost:8080`
for db management `http://localhost:9000`


## Create Docker
see https://docs.spring.io/spring-boot/gradle-plugin/packaging-oci-image.html

```bash
./gradlew bootBuildImage --imageName=ghcr.io/bigaru/lifestreams-prototype:0.0.1
```

example API call
```
http://localhost:8080/api/v1/datastreams/last/d5412a03-1f23-4507-ace2-d9a342d41c93?categoryId=1&page=0&window=day
```
