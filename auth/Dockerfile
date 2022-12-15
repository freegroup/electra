#FROM python:3.7.4-alpine3.10

# Pull an image by digest (immutable identifier)
# you can retrieve the sha has like ...
#  docker pull  python:3.8.6-slim-buster && docker image ls --digests | grep 3.8.6-slim-buster
#
FROM python@sha256:0944c626f71b2f44ed45c13761f3cb97d75566261ade2b2d34f6ce2987dacbcb

# create a non "root" user to run the app
# See https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Alpine
#RUN addgroup beaker && \
#    adduser -D -G beaker beaker
# Debian
RUN addgroup beaker && \
    adduser --gecos "" --ingroup beaker --disabled-password beaker

COPY /python /app/src
COPY requirements.txt /app
WORKDIR /app

RUN pip3 install -r ./requirements.txt && \
    chown -R beaker:beaker /app

EXPOSE 8080
USER beaker

CMD ["python", "-u", "src/main.py"]
