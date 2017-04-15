chmod 775 setup.sh

echo "[BUILD] Making response"
if [ ! -d "response" ]; then
    touch response
fi