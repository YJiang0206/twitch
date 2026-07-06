#generate image recipe
# linux version + java
FROM eclipse-temurin:21-jre

# create an app entry
WORKDIR /app

# copy file to app folder
COPY build/libs/twitch-0.0.1-SNAPSHOT.jar app.jar

# when system boot, it will run jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

# create docker builder
# clean first then build java
# use docker build create docker image can run in the platform with tag twitch latest
# check if it build with our idea
#docker buildx create --use
#
#./gradlew clean bootJar -x test
#
#docker buildx build --platform=linux/amd64 -t {repository_base_uri}/twitch:latest --load .
#
#docker inspect --format='{{.Architecture}}' {repository_base_uri}/twitch:latest
