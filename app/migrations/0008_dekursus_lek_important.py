# Generated by Django 2.2.7 on 2019-11-05 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20191105_1834'),
    ]

    operations = [
        migrations.AddField(
            model_name='dekursus_lek',
            name='important',
            field=models.BooleanField(null=True),
        ),
    ]
