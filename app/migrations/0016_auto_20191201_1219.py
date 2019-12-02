# Generated by Django 2.2.7 on 2019-12-01 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_auto_20191201_0959'),
    ]

    operations = [
        migrations.AddField(
            model_name='norton',
            name='suma',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='norton',
            name='aktywnosc',
            field=models.PositiveSmallIntegerField(choices=[(4, '4.Chodzi samodzielnie'), (3, '3.Chodzi z asystą'), (2, '2.Porusza sie na wózku'), (1, '1.Leżący')], default=4, verbose_name='Aktywność (przemieszczanie sie)'),
        ),
        migrations.AlterField(
            model_name='norton',
            name='fizykalny',
            field=models.PositiveSmallIntegerField(choices=[(4, '4.Dobry'), (3, '3.Dość dobry'), (2, '2.Średni'), (1, '1.Bardzo ciężki')], default=4, verbose_name='Stan fizykalny'),
        ),
        migrations.AlterField(
            model_name='norton',
            name='samodzielnosc',
            field=models.PositiveSmallIntegerField(choices=[(4, '4.Pełna'), (3, '3.Organiczona'), (2, '2.Bardzo ograniczona'), (1, '1.Całkowita niesprawność')], default=4, verbose_name='Samodzielność przy zmianie pozycji'),
        ),
        migrations.AlterField(
            model_name='norton',
            name='swiadomosc',
            field=models.PositiveSmallIntegerField(choices=[(4, '4.Pełna przytomność i świadomość'), (3, '3.Apatia dobry'), (2, '2.Zaburzenia świadomośći'), (1, '1.Stupor lub śpiączka')], default=4, verbose_name='Stan świadomośći'),
        ),
        migrations.AlterField(
            model_name='norton',
            name='zwieracze',
            field=models.PositiveSmallIntegerField(choices=[(4, '4.Pełna sprawność'), (3, '3.Sporadyczne moczenie'), (2, '2.Zazwyczaj nietrzymanie moczu'), (1, '1.Całkowita nietrzymanie stolca')], default=4, verbose_name='Czynność zwieraczy'),
        ),
    ]
