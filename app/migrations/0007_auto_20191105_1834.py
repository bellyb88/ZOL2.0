# Generated by Django 2.2.7 on 2019-11-05 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20191105_1658'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pacjent',
            name='pozostale_choroby',
        ),
        migrations.RemoveField(
            model_name='pacjent',
            name='choroby',
        ),
        migrations.AddField(
            model_name='pacjent',
            name='choroby',
            field=models.TextField(blank=True),
        ),
    ]
