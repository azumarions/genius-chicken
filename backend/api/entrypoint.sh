#!/bin/sh

# python ./usr/src/app/manage.py makemigrations --noinput
# python ./usr/src/app/manage.py migrate --noinput
# python ./usr/src/app/manage.py collectstatic --noinput

# if [ $DEBUG = "True" ]

# then
#     python ./usr/src/app/manage.py runserver 0.0.0.0:8000
# else
#     cd usr/src/app && gunicorn config.wsgi:application --bind 0.0.0.0:8000
# fi

cd usr/src/app && gunicorn config.wsgi:application --bind 0.0.0.0:8000

exec "$@"