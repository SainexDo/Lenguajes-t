# Generated by Django 5.1.1 on 2024-09-12 21:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pets', '0003_remove_pet_name_alter_pet_id'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Pet',
        ),
    ]
