
# Quick Start

Run app
```bash
docker compose -f ./docker-compose-dev.yml up -d

SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun
```

for backend `http://localhost:8080`
for db management `http://localhost:9000`


## Create Docker
see https://docs.spring.io/spring-boot/gradle-plugin/packaging-oci-image.html

```bash
./gradlew bootBuildImage --imageName=ghcr.io/bigaru/lifestreams-prototype:0.0.1
```
