#!/bin/bash
# change postgres to env variable
check_db() {
 	export PGPASSWORD="postgres"
	until psql -h "postgres" -U "postgres" -c 'SELECT 1'; do
        echo "Waiting for Postgres..."
        sleep 2
    done
}

# Run database connection check
check_db

echo "Running makemigrations..."
/usr/local/bin/python /app/srcs/backendmicro/backendmicro/manage.py makemigrations
echo "Running migrate..."
/usr/local/bin/python /app/srcs/backendmicro/backendmicro/manage.py migrate


exec /usr/bin/supervisord