# LIFEstreams prototype

## Backend
Requirements:
- Java SDK 21

Recommended Tools:
- IntelliJ IDEA for Kotlin support
- Docker Compose 5

### Quick Start
- setup database `docker compose -f ./docker-compose-dev.yml up --build -d`
- install dependencies `./gradlew build`
- start spring boot `SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun`
- clean up database fully `docker compose -f ./docker-compose-dev.yml down -v`
- backend runs under `http://localhost:8080`
- adminer runs under `http://localhost:9000`

## Create Docker
see https://docs.spring.io/spring-boot/gradle-plugin/packaging-oci-image.html

```bash
./gradlew bootBuildImage --imageName=ghcr.io/bigaru/lifestreams-prototype:0.0.1
```


## Web
Requirements:
- Node.js v24

### Quick Start
- install dependencies `npm ci`
- start dev mode `npm run dev`


## Mobile
Requirements:
- Node.js v24
- Android Studio and JDK
	- please follow this guide: https://docs.expo.dev/workflow/android-studio-emulator/
	- it also works without Watchman

If the android device is not recognized from your computer, then try installing udev rules:
- on ubuntu: `apt-get install android-sdk-platform-tools-common`
- more information: https://developer.android.com/studio/run/device#setting-up

### Quick Start
- install dependencies `npm ci`
- start dev mode `npm run android`
- check if android device is found `adb devices`
- forward api calls from the emulator to the backend running on local machine `adb reverse tcp:8080 tcp:8080`

### Installation
to install the production app (without the expo dev mode wrapper), proceed as follows
```sh
npx expo prebuild -p android

cd android
./gradlew assembleRelease

adb install -r app/build/outputs/apk/release/app-release.apk
```
