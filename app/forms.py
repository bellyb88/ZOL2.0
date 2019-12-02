# -*- coding: utf-8 -*-
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import *
from django import forms
from django.forms import ModelForm, ModelChoiceField, CharField, DateField, TimeField
from django.forms.widgets import TimeInput, DateInput, TextInput, SplitDateTimeWidget, MultipleHiddenInput, Select,RadioSelect, HiddenInput, SelectMultiple
import datetime
from calendar import monthrange
from django.forms.models import formset_factory, modelform_factory
import pytz

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = '__all__'

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = '__all__'


class OdlezynaForm(forms.ModelForm):
    class Meta:
        model = Odlezyna
        fields = '__all__'

class NortonForm(forms.ModelForm):
    class Meta:
        model = Norton
        fields = '__all__'
        widgets = {
        'pacjent': forms.HiddenInput(),
        'user': forms.HiddenInput(),
        'fizykalny': forms.RadioSelect}

class ChorobowoscForm(ModelForm):
    class Meta:
        model = Chorobowosc
        fields = ('pacjent', 'choroba')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['choroba'] = CharField()
        self.fields['pacjent'] = CharField(widget = forms.HiddenInput(), required = False)

    def clean(self,**kwargs):
        cleaned_data = super().clean()
        cleaned_data['pacjent'] = Pacjent.wszyscy.get(pesel = cleaned_data.get('pacjent'))
        var = str(cleaned_data.get('choroba')).partition(',')
        try:
            cleaned_data['choroba'] = Choroba.objects.get(kod=var[0].upper())
        except:
            msg= u'Nie podano kodu ICD10 lub nie ma go w słowniku'
            self.add_error('choroby',msg)




class DatesForm(forms.Form):
    data_od = forms.CharField(widget = forms.DateInput(format = ('%d-%m-%Y')))
    data_do = forms.CharField(widget = forms.DateInput(format = ('%d-%m-%Y')))






class ZgonForm(ModelForm):
    class Meta:
        model = Zgon
        fields = ('user','data','godzina','wyjsciowa','wtorna', 'bezposrednia')

    def __init__(self,*args, **kwargs):
        super(ZgonForm, self).__init__(*args, **kwargs)
        self.fields['user'] =  ModelChoiceField(queryset=CustomUser.objects.all().filter(department__exact = 'lekarz'),label='Stwierdzający')
        self.fields['data'].format = '%d-%m-%Y'
        self.fields['godzina'].format = '%H:%M'
        self.fields['wyjsciowa'] = CharField()
        self.fields['wtorna'] = CharField()
        self.fields['bezposrednia'] = CharField()


    def clean(self,**kwargs):
        cleaned_data = super(ZgonForm, self).clean()
        for rozpoznanie in ['wyjsciowa','wtorna','bezposrednia']:
            var = str(cleaned_data.get(rozpoznanie)).partition(',')
            try:
                cleaned_data[rozpoznanie] = Choroba.objects.get(kod=var[0].upper())
            except:
                msg= u'Nie podano kodu ICD10 lub nie ma go w słowniku'
                self.add_error(rozpoznanie,msg)



#PeriodBAse Forms################################
#Create

class PeriodBaseForm(ModelForm):
    class Meta:
        fields = '__all__'
        widgets = {
        'pacjent': forms.HiddenInput(),
        'user': forms.HiddenInput()}

    def __init__(self,*args, **kwargs):
        super(PeriodBaseForm, self).__init__(*args, **kwargs)
        self.fields['data_od_time_min'] = CharField(widget = Select(choices=  ((i, str(i).zfill(2)) for i in range(0, 60, 5))))
        self.fields['data_od_time_hour'] = CharField(widget = Select(choices=  ((i, str(i).zfill(2)) for i in range(24))))
        self.fields['data_do_time_hour'] = CharField(widget = Select(choices=  ((i, str(i).zfill(2)) for i in range(24))))
        self.fields['data_do_time_min'] = CharField(widget = Select(choices=  ((i, str(i).zfill(2)) for i in range(0, 60, 5))))
        self.fields['data_od'] = DateField()
        self.fields['data_do'] = DateField()
        self.fields['data_od'].format = '%d-%m-%Y'
        self.fields['data_do'].format = '%d-%m-%Y'
        self.fields['data_do'].required = False


    def clean(self,*args, **kwargs):
        cleaned_data = super().clean(*args, **kwargs)
        data_od = cleaned_data.get('data_od')
        data_do = cleaned_data.get('data_do')
        cleaned_data['data_od'] = datetime.datetime(int(data_od.year), int(data_od.month), int(data_od.day), int(cleaned_data.get('data_od_time_hour')), int(cleaned_data.get('data_od_time_min')), tzinfo=pytz.UTC)
        if data_do:
            cleaned_data['data_do'] = datetime.datetime(int(data_do.year), int(data_do.month), int(data_do.day), int(cleaned_data.get('data_do_time_hour')), int(cleaned_data.get('data_do_time_min')), tzinfo=pytz.UTC)
        return cleaned_data

class ZywienieForm(PeriodBaseForm):
    class Meta(PeriodBaseForm.Meta):
        model = Zywienie


class WypisForm(PeriodBaseForm):
    class Meta(PeriodBaseForm.Meta):
        model = Wypis

    def clean(self,*args, **kwargs):
        cleaned_data = super().clean(*args, **kwargs)
        if cleaned_data.get('tryb') == 'Koniec pobytu':
            pacjent = cleaned_data.get('pacjent')
            data  = cleaned_data.get('data_od')
            godzina_od = int(cleaned_data.get('data_od_time_hour'))
            min_od = int(cleaned_data.get('data_od_time_min'))
            user = cleaned_data.get('user')
            zgon = Zgon()
            zgon.user = user
            zgon.pacjent = pacjent
            zgon.data = data.date()
            zgon.godzina = datetime.time(godzina_od, min_od)
            zgon.save()



class PrzepustkaForm(PeriodBaseForm):
    class Meta(PeriodBaseForm.Meta):
        model = Przepustka




#Update

class UpdatePeriodBaseForm(PeriodBaseForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['data_od_time_min'].initial = self.instance.data_od.minute
        self.fields['data_od_time_hour'].initial = self.instance.data_od.hour
        if self.instance.data_do:
            self.fields['data_do_time_hour'].initial = self.instance.data_do.hour
            self.fields['data_do_time_min'].initial = self.instance.data_do.minute

class ZywienieUpdateForm(UpdatePeriodBaseForm):
    class Meta(PeriodBaseForm.Meta):
        model = Zywienie


class WypisUpdateForm(UpdatePeriodBaseForm):
    class Meta(PeriodBaseForm.Meta):
        model = Wypis


class PrzepustkaUpdateForm(UpdatePeriodBaseForm):
    class Meta(PeriodBaseForm.Meta):
        model = Przepustka
###########################################################33
