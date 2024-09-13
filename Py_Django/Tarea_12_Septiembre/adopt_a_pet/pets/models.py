
from django.db import models

class Owner(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    age = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def str(self):
        return self.name

class Animal(models.Model):
    id = models.BigAutoField(primary_key=True)
    age = models.FloatField()
    color = models.CharField(max_length=100)
    weight = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def str(self):
        return self.species

class Pet(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    owner = models.ForeignKey('Owner', related_name='pets', on_delete=models.CASCADE)
    animal = models.ForeignKey('Animal', on_delete=models.CASCADE)
    adoption_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def str(self):
        return self.name