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
### Mock Data
For imports in `backend/db/init/03_import_health_data.sql`,  files should be located under `backend/db/init/data/(hr1.json)`.

```json
// hr1.json
[
	[1771628400000, 60],
	[1771628520000, 60],
	...
	[1771714680000, 58]
]
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

### Mock Data
For imports in `mobile/store/index.tsx`,  files should be located under `mobile/data/(hr1.json|step1.json)`.

```json
// hr1.json
[
	[1771628400000, 60],
	[1771628520000, 60],
	...
	[1771714680000, 58]
]
```
```json
// step1.json
[
	{
		"startGMT": "2026-02-22T23:00:00.0",
		"endGMT": "2026-02-22T23:15:00.0",
		"steps": 0,
		"pushes": 0,
		"primaryActivityLevel": "sleeping",
		"activityLevelConstant": true
	},
	...
]
```
