#!/bin/sh

# python manage.py makemigrations --noinput
# python manage.py migrate --noinput
# python manage.py collectstatic --noinput
# python ./usr/src/app/manage.py createsuperuser --noinput

# if [ $DEBUG = "True" ]

# then
#     python manage.py runserver 0.0.0.0:8000
# else
#     cd usr/src/app && gunicorn config.wsgi:application --bind 0.0.0.0:8000
# fi

gunicorn config.wsgi:application --bind 0.0.0.0:8000

exec "$@"