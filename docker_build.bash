DOCKER_BUILDKIT=1 docker build --no-cache --secret id=env,src=.env -t arturoalcaniz/front-service:latest -t arturoalcaniz/front-service:$(npm pkg get version | tr -d '"') -f Dockerfile .. --network host
if [ "$1" ]
  then
    printf $1 | docker login --username arturoalcaniz --password-stdin
fi
docker push arturoalcaniz/front-service:$(npm pkg get version | tr -d '"')
docker push arturoalcaniz/front-service:latest
