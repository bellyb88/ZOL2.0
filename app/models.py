# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.urls import reverse
from django.contrib.auth.models import AbstractUser, Group
from django.db.models import Q
import datetime
from django.db import models
from .validators import *
from .managers import *
from django.core.exceptions import ValidationError
import pytz
import calendar
from django.utils import timezone
import itertools
from django.shortcuts import get_object_or_404

from django.db.models.signals import post_save
from django.dispatch import receiver



utc = pytz.timezone('Europe/Warsaw')




def date_validator(data):
    try:
        data = data.date()
    except:
        pass
    return data

#User Model
class CustomUser(AbstractUser):
    department_choices = (('lekarz','lekarz'),('pielegniarka', 'pielegniarka'),('psycholog','psycholog'),('farmaceuta','farmaceuta'),('administracja','administracja'))

    PWZ = models.CharField(max_length=10, blank = True, unique=True)
    department = models.CharField(max_length=20, choices = department_choices)
    def get_username(self):
        return self.first_name+ ' '+ self.last_name

#auto add to goup same as department
@receiver(models.signals.post_save, sender=CustomUser)
def post_save_user_signal_handler(sender, instance, created, **kwargs):
    if created:
        group = Group.objects.get(name=instance.department)
        instance.groups.add(group)
        instance.save()

#App Models
class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    modified = models.DateTimeField(auto_now = True)

    class Meta:
        abstract = True

class Choroba(models.Model):
    kod = models.CharField(max_length=6)
    nazwa = models.CharField(max_length=100)

    def __str__(self):
        return self.kod + " " +self.nazwa

#Main Model
class Pacjent(BaseModel):
#--Choices
    plec_choices = (('M', 'Mezczyzna'),('K','Kobieta'))
    tryb_choices = (('PILNY', 'PILNY'),('STABILNY','STABILNY'))

#--Default
    slug = models.SlugField()
#--Dowod osobisty
    imie = models.CharField(max_length=50)
    nazwisko = models.CharField(max_length=50)
    nazwisko_rodowe = models.CharField(max_length = 50, blank = True)
    pesel = models.CharField(max_length=11, validators = [validate_pesel], unique = True)
    plec = models.CharField(max_length=1, choices=plec_choices)
    adres =models.CharField(max_length=500, blank=True)
    miejsce_urodzenia = models.CharField(max_length = 50, blank = True)
    imiona_rodzicow = models.CharField(max_length = 100, blank = True)
    nr_dowodu = models.CharField(max_length = 10, blank = True, validators = [validate_IDnr])
#--Legitymacja ZUS
    nr_leg_zus = models.CharField(max_length = 24, blank = True, validators = [validate_nr_leg_zus])
    data_wydania_zus = models.DateField(null = True, blank = True)
    data_waznosci_zus = models.DateField(null = True, blank = True)
#--Wniosek
    nr_ksiegi = models.CharField(max_length=9, blank=True)
    osoba_kontaktu = models.TextField(blank=True, verbose_name=("Osoba do kontaktu"))
    wysokosc_swiadczenia = models.PositiveSmallIntegerField(null = True, blank = True)
    data_przyjecia = models.DateField()
    tryb_przyjecia =  models.CharField(max_length = 8, choices=tryb_choices, blank = True)
    data_skierowania =  models.DateField(null = True, blank = True)
    pwz_zlecajacego =models.IntegerField(null = True, blank = True, validators = [validate_PWZ])
    oddzial_zlecajacego = models.CharField(max_length = 50, blank = True, verbose_name=('Nazwa oddziału kierującego'))
    kod_oddzial_zlecajacego = models.CharField(max_length = 4, blank = True, verbose_name=("Kod oddziału VIII"))
    regon_szpitala = models.CharField(max_length = 9, blank = True)
    nazwa_szpitala = models.CharField(max_length = 60, blank = True)
    nr_rej_szpitala = models.CharField(max_length = 12, blank = True, verbose_name=("Numer rejestracyjny szpitala I"))
    nr_umowy_szpitala = models.CharField(max_length = 10, blank = True, verbose_name=("Numer umowy szpitala"))
    nr_wew_oddzialu = models.CharField(max_length = 3, blank = True, verbose_name=("Kod oddziału VII"))
#--Medyczne
    wzrost = models.PositiveSmallIntegerField(null = True, blank = True)
    waga = models.PositiveSmallIntegerField(null = True, blank = True)
    epikryza = models.TextField(blank=True)
    zalecenia = models.TextField(blank=True)
    wyniki = models.TextField(blank=True)
    chorobowosc = models.ManyToManyField(Choroba, through = 'Chorobowosc',related_name='pacjent_choroba', symmetrical = False)
    choroby = models.TextField(blank=True)
#--Managers
    wszyscy = WszyscyManager()


    class Meta:
        verbose_name_plural = "Pacjenci"
        verbose_name = "Pacjent"
        ordering = ['nazwisko']

    def save(self, *args, **kwargs):
        self.slug = self.pesel
        try:
            self.nr_ksiegi = str(str(int(Pacjent.wszyscy.latest('created').nr_ksiegi[:-5])+1)+"/"+str(datetime.datetime.today().year))
        except:
            self.nr_ksiegi = '00/0000'
        return super(Pacjent, self).save( *args, **kwargs)


    def get_absolute_url(self):
        return reverse('pacjent_detail', args=[str(self.slug)])


#Policz wszystkie dni od poczatku pobytu
    def policz_pobyt(self):
        dates=[]
        zacznij = self.data_przyjecia

        try:
            skoncz = self.zgon.data
        except:
            skoncz = datetime.datetime.today().date()

        delta = int((skoncz - zacznij).days)

        for i in range(delta+1):
            if  skoncz >= zacznij:
                dates.append(zacznij)
            zacznij += datetime.timedelta(days=1)
        return dates

#Policz dni pobytu w zadanym okresie
    def pobyt_w_miesiacu(self,data_od, data_do):
        data_od = date_validator(data_od)
        data_do = date_validator(data_do)
        return set([ date for date in self.policz_pobyt() if data_do >= date >= data_od])

#Rozlicz konkretnego pacjenta w podanych datach
    def rozlicz(self,data_od, data_do):
        data_od = date_validator(data_od)
        data_do = date_validator(data_do)

        dni_wypis = set(itertools.chain.from_iterable([el.days_in_month(data_od, data_do) for el in self.wypis_set.all()]))
        dni_przepustka = set(itertools.chain.from_iterable([el.days_in_month(data_od, data_do) for el in self.przepustka_set.all()]))
        dni_zywienie_6 = set(itertools.chain.from_iterable([el.days_in_month(data_od, data_do) for el in self.zywienie_set.all().filter(glasgow__gt=8)]))
        dni_zywienie_7 = set(itertools.chain.from_iterable([el.days_in_month(data_od, data_do) for el in self.zywienie_set.all().filter(glasgow__lte=8)]))

        dni_pobyt = self.pobyt_w_miesiacu(data_od,data_do) - dni_wypis - dni_przepustka
        dni_zywienie_6.intersection_update(dni_pobyt)
        dni_zywienie_7.intersection_update(dni_pobyt)
        dni_pobyt = dni_pobyt - dni_zywienie_6 - dni_zywienie_7
        return dni_pobyt, dni_zywienie_6, dni_zywienie_7, dni_wypis, dni_przepustka


    def __str__(self):
        dzis = datetime.datetime.today().date()
        return self.nazwisko + " " +self.imie

class Chorobowosc(models.Model):
    pacjent = models.ForeignKey(Pacjent, on_delete=models.CASCADE, related_name = 'pacjent_obiekt')
    choroba = models.ForeignKey(Choroba, on_delete=models.CASCADE)

    def get_absolute_url(self):
        return reverse('choroby_update', kwargs =  {'slug':self.pacjent.slug} )


#Base for zgon, dekursus pielegniarki, lekarza i psychologa
class PointBase(BaseModel):
    data = models.DateField(default = timezone.now)
    pacjent = models.ForeignKey(Pacjent, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)

    class Meta:
        abstract = True

    def __str__(self):
        return str(self.id)

    def get_absolute_url(self):
        return reverse(str(self.__class__.__name__).lower(), kwargs =  {'slug':self.pacjent.slug} )



class Odlezyna(BaseModel):
    lokalizacja = models.CharField(max_length=200)
    pacjent = models.ForeignKey(Pacjent, on_delete=models.CASCADE)

    def __str__(self):
        return  self.lokalizacja

    def get_absolute_url(self):
        return reverse('odlezyna', kwargs =  {'slug':self.pacjent.slug} )


class OcenaOdlezyny(BaseModel):
    stopien_choices = ((1,'I stopień – blednące po lekkim ucisku zaczerwienienie, które jest efektem reaktywnego przekrwienia.'),
                        (2,'II stopień – nieblednące zaczerwienienie, rumień nie ustępuje po zniesieniu ucisku.'),
                        (3,'III stopień – uszkodzenie pełnej grubości skóry do tkanki podskórnej.'),
                        (4,'IV stopień – uszkodzenie obejmuje tkankę podskórną.'),
                        (5,'V stopień – głębsza martwica obejmuje głębsze tkanki.'))

    odlezyna = models.ForeignKey(Odlezyna, on_delete = models.CASCADE)
    data = models.DateField(default = timezone.now)
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    stopien = models.PositiveSmallIntegerField(choices= stopien_choices)
    interwencja = models.TextField(blank = True)

    def get_absolute_url(self):
        return reverse('odlezyna', kwargs =  {'slug':self.odlezyna.pacjent.slug} )


class Norton(PointBase):
    fizykalny_choices = ((4,'4.Dobry'),(3,'3.Dość dobry'),(2,'2.Średni'),(1,'1.Bardzo ciężki'))
    swiadomosc_choices = ((4,'4.Pełna przytomność i świadomość'),(3,'3.Apatia dobry'),(2,'2.Zaburzenia świadomośći'),(1,'1.Stupor lub śpiączka'))
    aktywnosc_choices = ((4,'4.Chodzi samodzielnie'),(3,'3.Chodzi z asystą'),(2,'2.Porusza sie na wózku'),(1,'1.Leżący'))
    samodzielnosc_choices = ((4,'4.Pełna'),(3,'3.Organiczona'),(2,'2.Bardzo ograniczona'),(1,'1.Całkowita niesprawność'))
    zwieracze_choices = ((4,'4.Pełna sprawność'),(3,'3.Sporadyczne moczenie'),(2,'2.Zazwyczaj nietrzymanie moczu'),(1,'1.Całkowita nietrzymanie stolca'))

    fizykalny = models.PositiveSmallIntegerField(choices = fizykalny_choices, verbose_name = 'Stan fizykalny', default=4)
    swiadomosc = models.PositiveSmallIntegerField(choices = swiadomosc_choices, verbose_name = 'Stan świadomośći', default=4)
    aktywnosc = models.PositiveSmallIntegerField(choices = aktywnosc_choices, verbose_name = 'Aktywność (przemieszczanie sie)', default=4)
    samodzielnosc = models.PositiveSmallIntegerField(choices = samodzielnosc_choices, verbose_name = 'Samodzielność przy zmianie pozycji', default=4)
    zwieracze = models.PositiveSmallIntegerField(choices = zwieracze_choices, verbose_name = 'Czynność zwieraczy', default=4)
    suma = models.PositiveSmallIntegerField(null=True)

    def save(self):
        self.suma = sum([self.fizykalny, self.swiadomosc, self.aktywnosc, self.samodzielnosc, self.zwieracze])
        return super().save()

class Barthel(PointBase):
    posilki_choices = ((0,'0-nie jest w stanie samodzielnie jeść'),(5,'5-potrzebuje pomocy lub wymaga zmodyfikowanej diety '),(10,'10-samodzielny, niezależny '))
    przemieszczanie_choices = ((0,'0- nie jest w stanie, nie zachowuje równowagi przy siadaniu'),(5,'5-większa pomoc. może siedzieć'),(10,'10-mniejsza pomoc'),(15,'15-samodzielny'))
    higiena_choices = ((0,'0- potrzebuje pomocy przy wykonywaniu czynności osobistych '),(5,'5-niezależny'))
    wc_choices = ((0,'0-zależny'),(5,'5-częściowo zależny'),(10,'10-niezależny'))
    mycie_choices = ((0,'0-zależny'),(5,'5-niezależny'))
    poruszanie_choices = ((0,'0-nie porusza się'),(5,'5-niezależny poruszający się na wózku'),(10,'10-spacery z pomocą jednej osoby, na odległość > 50m '),(15,'15-niezależny >50m'))
    schody_choices = ((0,'0-nie jest samodzielny '),(5,'5-potrzebuje pomocy '),(10,'10-samodzielny'))
    ubieranie_choices = ((0,'0-zależny'),(5,'5- potrzebuje pomocy'),(10,'10-niezależny'))
    stolec_choices = ((0,'0-nie panuje nad oddawaniem stolca'),(5,'5-przypadkowe zdarzenia bezwiednego oddawania stolca,'),(10,'10-kontroluje oddawanie stolca'))
    mocz_choices = ((0,'0- nie panuje nad oddawaniem moczu, cewnik'),(5,'5- przypadkowe zdarzenia bezwiednego oddawania moczu'),(10,'10- kontroluje oddawanie moczu'))

    posilki = models.PositiveSmallIntegerField(choices = posilki_choices, default = 0, verbose_name = 'Spożywanie posiłków  ')
    przemieszczanie = models.PositiveSmallIntegerField(choices = przemieszczanie_choices, default = 0, verbose_name = 'Przemieszczanie się (z łóżka na krzesło i z powrotem / siadanie)  ')
    higiena = models.PositiveSmallIntegerField(choices = higiena_choices, default = 0, verbose_name = 'Utrzymanie higieny osobistej  ')
    wc = models.PositiveSmallIntegerField(choices = wc_choices, default = 0, verbose_name = 'Korzystanie z toalety (WC)  ')
    mycie = models.PositiveSmallIntegerField(choices = mycie_choices, default = 0, verbose_name = 'Mycie, kąpiel całego ciała ')
    poruszanie = models.PositiveSmallIntegerField(choices = poruszanie_choices, default = 0, verbose_name = 'Poruszanie się (po powierzchniach płaskich)  ')
    schody = models.PositiveSmallIntegerField(choices = schody_choices, default = 0, verbose_name = 'Wchodzenie i schodzenie po schodach  ')
    ubieranie = models.PositiveSmallIntegerField(choices = ubieranie_choices, default = 0, verbose_name = 'Ubieranie i rozbieranie się. ')
    stolec = models.PositiveSmallIntegerField(choices = stolec_choices, default = 0, verbose_name = 'Kontrolowanie stolca / zwieracza odbytu ')
    mocz = models.PositiveSmallIntegerField(choices = mocz_choices, default = 0, verbose_name = 'Kontrolowanie moczu / zwieracza pęcherza moczowego  ')
    suma = models.PositiveSmallIntegerField(null=True)

    def save(self):
        self.suma = sum([self.posilki, self.przemieszczanie, self.higiena, self.wc, self.mycie, self.poruszanie, self.schody, self.ubieranie, self.stolec, self.mocz])
        return super().save()

class Zgon(PointBase):
    pacjent = models.OneToOneField(Pacjent, on_delete = models.CASCADE, primary_key = True)
    wyjsciowa = models.ForeignKey(Choroba, on_delete=models.CASCADE, related_name='wyjsciowa_przyczyna', blank=True, null=True)
    wtorna = models.ForeignKey(Choroba, on_delete=models.CASCADE, related_name='wtorna_przyczyna', blank=True, null=True)
    bezposrednia = models.ForeignKey(Choroba, on_delete=models.CASCADE, related_name='bezposrednia_przyczyna', blank=True, null=True)
    godzina = models.TimeField()

    class Meta:
        verbose_name_plural = "Zgony"

    def __str__(self):
        return self.pacjent.nazwisko + " "+ self.pacjent.imie+" - "+ str(self.data)

    def get_absolute_url(self):
        return reverse('zgon', kwargs={'slug':self.pacjent.slug})

class Dekursus_lek(PointBase):
    tresc = models.TextField()
    important = models.BooleanField(default=False)
    class Meta:
        verbose_name_plural = "Dekursysy lekarskie"
        verbose_name = "Dekursus lekarski"

class Dekursus_piel(PointBase):
    tresc = models.TextField()
    class Meta:
        verbose_name_plural = "Dekursysy pielęgniarskie"
        verbose_name = "Dekursus pielęgniarski"

class Dekursus_psych(PointBase):
    tresc = models.TextField()
    class Meta:
        verbose_name_plural = "Dekursysy psychologa"
        verbose_name = "Dekursus psychologa"

#Base for wypis, przepustka, zywienie
class PeriodBase(BaseModel):
    data_od = models.DateTimeField(default = timezone.now, null=True)
    data_do = models.DateTimeField(blank=True, null=True)
    pacjent = models.ForeignKey(Pacjent, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)

    class Meta:
        abstract=True
        ordering = ['-data_od']

    def get_absolute_url(self):
        return reverse(str(self.__class__.__name__).lower(), kwargs={'slug':self.pacjent.slug})

    def clean(self,*args, **kwargs):
        class_name = str(self.__class__.__name__).lower()+"_set"
        q = getattr(self.pacjent, class_name).all().exclude(id__exact=self.id)
        przedzial_otwarty = q.filter(data_do__isnull=True)
        przedzial_zamkniety = q.filter(data_do__isnull=False)
        if przedzial_otwarty.filter(data_od__lte=self.data_od) \
         or przedzial_zamkniety.filter(data_od__lte=self.data_od).filter(data_do__gte=self.data_od):
            raise ValidationError("Data rozpoczecia pokrywa sie z juz istniejacym: {}".format(class_name[:-4]))
        elif self.data_do and (przedzial_otwarty.filter(data_od__lte=self.data_do) \
         or przedzial_zamkniety.filter(data_od__lte=self.data_do).filter(data_do__gte=self.data_do)):
            raise ValidationError("Data zakonczenia pokrywa sie z juz istniejacym: {}".format(class_name[:-4]))
        elif self.data_do and przedzial_zamkniety.filter(data_od__gte = self.data_od).filter(data_do__lte=self.data_do):
            raise ValidationError("Okresy {} zawieraja sie w sobie".format(class_name[:-4]))
        else:
            return super().clean(*args,**kwargs)

    def save(self, *args, **kwargs):
        class_name = str(self.__class__.__name__).lower()+"_set"
        q = getattr(self.pacjent, class_name).all().exclude(id__exact=self.id)
        if q.filter(data_od__gte=self.data_od):
            self.data_do = q.filter(data_od__gte=self.data_od).order_by('data_od').first().data_od - datetime.timedelta(days=1)
        if self.data_od.date() < self.pacjent.data_przyjecia:
            self.data_od = self.pacjent.data_przyjecia
        try:
            if self.data_do.date() > self.pacjent.zgon.data:
                self.data_do = self.pacjent.zgon.data
            return super().save(*args, **kwargs)
        except:
            return super().save(*args, **kwargs)


    def list_of_dates(self):
        try:
            self.data_do = self.data_do.date()
        except:
            self.data_do = utc.localize(datetime.datetime.today()).date()
        dates=[]
        self.data_od = self.data_od.date()
        delta = int((self.data_do - self.data_od).days)
        zacznij = self.data_od
        for i in range(delta+1):
            if  self.data_do >=zacznij:
                dates.append(zacznij)
            zacznij = zacznij + datetime.timedelta(days=1)
        return dates


    def days_in_month(self, data_od, data_do):
        data_od = date_validator(data_od)
        data_do = date_validator(data_do)
        return frozenset(date for date in self.list_of_dates() if data_do >= date > data_od)


    def __str__(self):
        data_od = str(date_validator(self.data_od))
        data_do = str(date_validator(self.data_do))

        return self.pacjent.imie + " "+ self.pacjent.nazwisko+" : "+data_od+ " - "+ data_do




class Zywienie(PeriodBase):
    dieta_choices = (('Nutrison','Nutrison'),('Cubison','Cubison'),('Diason','Diason'),('Mix','Mix'),('Naprzemienna','Naprzemienna'))

    dieta = models.CharField(max_length=10, choices = dieta_choices)
    dieta_objetosc = models.CharField(max_length=4)
    woda_objetosc = models.CharField(max_length=4)
    glasgow = models.PositiveSmallIntegerField()
    class Meta:
        verbose_name_plural = "Zlecenia żywienia"


class Wypis(PeriodBase):
    tryb_choices = (('Zakończenie procesu terapeutycznego lub diagnostycznego', 'Zakończenie procesu terapeutycznego lub diagnostycznego'),
    ('Skierowanie do dalszego leczenia w lecznictwie ambulatoryjnym','Skierowanie do dalszego leczenia w lecznictwie ambulatoryjnym'),
    ('Skierowanie do dalszego leczenia w innym szpitalu','Skierowanie do dalszego leczenia w innym szpitalu'),
    ('Wypisanie na własne żądanie','Wypisanie na własne żądanie'),
    ('Osoba leczona samowolnie opuściła ZOL','Osoba leczona samowolnie opuściła ZOL'),
    ('Wypisanie na podstawie art. 221 pkt 3 ustawy o ZOZ','Wypisanie na podstawie art. 221 pkt 3 ustawy o ZOZ'),
    ('Zgon pacjenta','Zgon pacjenta'),
    ('Osoba leczona, która samowolnie opuściła podmiot leczniczy','Osoba leczona, która samowolnie opuściła podmiot leczniczy'),
    ('Koniec pobytu','Koniec pobytu')
    )

    miejsce_wypisu = models.CharField(max_length=100, blank=True)
    przyczyna_wypisu = models.TextField(blank=True)
    tryb = models.CharField(max_length=100, choices=tryb_choices)
    class Meta:
        verbose_name_plural = "Wypisy"



class Przepustka(PeriodBase):
    tresc = models.TextField(blank=True)
    class Meta:
        verbose_name_plural = "Przepustki"


class Rozliczany(models.Model):
    class Meta:
        abstract = True
    pacjent = models.OneToOneField(Pacjent, on_delete = models.CASCADE, primary_key = True)
    dni_2 = models.PositiveSmallIntegerField(null = True, blank = True)
    dni_6 = models.PositiveSmallIntegerField(null = True, blank = True)
    dni_7 = models.PositiveSmallIntegerField(null = True, blank = True)
    dni_wypis =models.PositiveSmallIntegerField(null = True, blank = True)
    dni_przepustka =models.PositiveSmallIntegerField(null = True, blank = True)
    zgon_data = models.DateField(null = True, blank = True)
    przyjecie_data = models.DateField(null = True, blank = True)
    wypisy = []
    przepustki =[]
    zywienie_6 = []
    zywienie_7 = []
