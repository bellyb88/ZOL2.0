# Generated by Django 2.2.7 on 2019-11-05 08:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pacjent',
            name='choroby',
        ),
        migrations.AddField(
            model_name='pacjent',
            name='choroby',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.Choroba'),
        ),
    ]