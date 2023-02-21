#!/bin/sh

# python manage.py makemigrations
# python manage.py migrate --fake admin zero
# python manage.py migrate --fake auth zero
# python manage.py migrate --fake contenttypes zero
# python manage.py migrate --fake sessions zero
# python manage.py migrate

# python manage.py collectstatic --noinput
# python ./usr/src/app/manage.py createsuperuser --noinput

# if [ $DEBUG = "True" ]

# then
#     python manage.py runserver 0.0.0.0:8000
# else
#     cd usr/src/app && gunicorn config.wsgi:application --bind 0.0.0.0:8000
# fi

# gunicorn config.wsgi:application --bind 0.0.0.0:8000
cd usr/src/app && gunicorn config.wsgi:application --bind 0.0.0.0:8000

exec "$@"