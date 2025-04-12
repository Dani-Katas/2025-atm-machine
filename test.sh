echo "Performing POST request to create an event"
curl 'http://localhost:3000/api/events' \
--header 'Content-Type: application/json' \
--data '{
  "id": "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
  "name": "First Event"
}'
echo ""

echo "Performing GET request to retrieve the event"
curl 'http://localhost:3000/api/events/123'
echo ""

echo "Performing GET request to retrieve the list of events"
curl 'http://localhost:3000/api/events?offset=10'
echo ""

echo "Performing POST with errors"
curl 'http://localhost:3000/api/events' \
--header 'Content-Type: application/json' \
--data '{
  "id": "wrong-uuid",
  "name": "First Event"
}'
echo ""

echo "Performing GET request to retrieve the list of events with errors"
curl 'http://localhost:3000/api/events?offset=asdf'
echo ""
