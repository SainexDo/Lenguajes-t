Django-admin startproject Myapp
control + shift + p = Python select interpreter y seleccionar el que sale .venv recomendado

Comando para iniciar el docker = docker build -t mysite . # crea la imagen, necesita el punto
docker compose up -d

Python .\manage.py startapp polls #Crea una carpeta polls, son recursos
python manage.py migrate
python manage.py makemigrations polls #Crea una migracion

python manage.py createmigration polls #Crea una migracion
python .\manage.py sqlmigrate polls 0001
python manage.py migrate

python .\manage.py shell        #Terminal del Django 
python .\manage.py createsuperuser      #Para crear un admin
python manage.py runserver 8080

pip install mysqlclient
pip install Django
pip freeze > requirements.txt

docker compose up -d