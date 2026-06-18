#!/bin/bash
set -e

until python -c "
import os
import psycopg2
psycopg2.connect(
    dbname=os.environ.get('DB_NAME', 'employ_management'),
    user=os.environ.get('DB_USER', 'postgres'),
    password=os.environ.get('DB_PASSWORD', ''),
    host=os.environ.get('DB_HOST', 'db'),
    port=os.environ.get('DB_PORT', '5432'),
)
" 2>/dev/null; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

python manage.py migrate --noinput
python manage.py collectstatic --noinput

if [ "$1" = "runserver" ]; then
    exec python manage.py runserver 0.0.0.0:8000
fi

exec "$@"
