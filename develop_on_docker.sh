echo "DELETING APP VOLUME"
docker volume rm rest_app

echo "RUNNING FRESH CONTAINERS"
docker-compose -f docker-compose.yml up --build