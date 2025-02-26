#!/bin/bash

check_db() {
 	export PGPASSWORD=${DB_PASS}
	until psql -h ${DB_HOST} -U ${DB_USER} -c 'SELECT 1'; do
        echo "Waiting for Postgres..."
        sleep 2
    done
}


check_db

echo "Running makemigrations..."
/usr/local/bin/python /app/srcs/backendmicro/backendmicro/manage.py makemigrations
echo "Running migrate..."
/usr/local/bin/python /app/srcs/backendmicro/backendmicro/manage.py migrate


exec /usr/bin/supervisord