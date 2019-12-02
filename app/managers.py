from django.db import models
from .models import *
from django.db.models import Q
from collections import defaultdict

class WszyscyQuerySet(models.QuerySet):
    def emeryci(self):
        return self.filter(nr_leg_zus__icontains='E')

    def rencisci(self):
        return self.filter(nr_leg_zus__icontains='R')

    def zmarli(self):
        return self.filter(zgon__isnull=False)

    def zywi(self):
        return self.filter(zgon__isnull=True)

    def rozliczani(self, data_od, data_do):
        q = self.filter(data_przyjecia__lte = data_do).exclude(zgon__data__lt = data_od)
        return q

    def rozliczenie(self, data_od, data_do):
        q = self.rozliczani(data_od, data_do)
        suma_pobyt = 0
        suma_sonda_6 = 0
        rozliczenie = []
        suma_sonda_7 = 0
        for i in q:
            suma_pobyt += len(i.rozlicz(data_od,data_do)[0])
            suma_sonda_6 += len(i.rozlicz(data_od,data_do)[1])
            suma_sonda_7 += len(i.rozlicz(data_od,data_do)[2])
        return [suma_pobyt,suma_sonda_6,suma_sonda_7]

class WszyscyManager(models.Manager):
    def get_queryset(self):
        return WszyscyQuerySet(self.model, using=self._db)

    def emeryci(self):
        return self.get_queryset().emeryci()

    def rencisci(self):
        return self.get_queryset().rencisci()

    def zmarli(self):
        return self.get_queryset().zmarli()

    def zywi(self):
        return self.get_queryset().zywi()

    def rozliczenie(self, data_od, data_do):
        return self.get_queryset().rozliczenie(data_od, data_do)

    def rozliczani(self, data_od, data_do):
        return self.get_queryset().rozliczani(data_od, data_do)
