echo "Performing POST request to create a speaker"
curl 'http://localhost:8000/api/speakers' \
--header 'Content-Type: application/json' \
--data '{
  "id": "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
  "name": "First Speaker"
}'
echo ""

echo "Performing GET request to retrieve the speaker"
curl 'http://localhost:8000/api/speakers/123'
echo ""

echo "Performing GET request to retrieve the list of speakers"
curl 'http://localhost:8000/api/speakers?offset=10'
echo ""

echo "Performing POST with errors"
curl 'http://localhost:8000/api/speakers' \
--header 'Content-Type: application/json' \
--data '{
  "id": "wrong-uuid",
  "name": "First Speaker"
}'
echo ""

echo "Performing GET request to retrieve the list of speakers with errors"
curl 'http://localhost:8000/api/speakers?offset=asdf'
echo ""
