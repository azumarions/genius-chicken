# backend/web-back/Dockerfile
# set base image
FROM python:3.7

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set work directory
WORKDIR /usr/src/app

# install dependencies
COPY ./entrypoint.sh ./usr/src/app/
COPY ./requirements.txt ./usr/src/app/
RUN python3 -m pip install --upgrade pip setuptools
RUN pip install -r ./usr/src/app/requirements.txt

RUN chmod +x ./usr/src/app/entrypoint.sh

# Copy project
COPY . ./usr/src/app/

ENTRYPOINT ["sh", "./usr/src/app/entrypoint.sh"]

EXPOSE 8000