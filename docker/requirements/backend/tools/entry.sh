#!/bin/bash

echo "Running makemigrations..."
/usr/local/bin/python manage.py makemigrations
echo "Running migrate..."
/usr/local/bin/python manage.py migrate


exec /usr/bin/supervisord