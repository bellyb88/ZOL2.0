# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import itertools
import datetime
import calendar
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView, View
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.shortcuts import render
from django.forms import formset_factory, modelformset_factory, inlineformset_factory, modelform_factory
from django.http import HttpResponse
from django.template import RequestContext
import django.contrib as auth_urls

from .models import *
from .forms import *
from .utils import karta_zgon_gen





# Get main object information
class GetPacjent():
    def dispatch(self, request, *args, **kwargs):
        self.pacjent = get_object_or_404(Pacjent, slug =kwargs['slug'])
        return super().dispatch(request, *args, **kwargs)



class CreatePacjentView(LoginRequiredMixin, CreateView):
    model = Pacjent
    template_name = 'app/pacjent/pacjent_form.html'
    fields = {'pesel','data_przyjecia', 'imie', 'nazwisko', 'nazwisko_rodowe', 'plec', 'miejsce_urodzenia', 'nr_dowodu', 'imiona_rodzicow'}
    initial = {'data_przyjecia': datetime.datetime.today().date()}

class PacjentUpdateBase(LoginRequiredMixin, UpdateView):
    model = Pacjent
    template_name = 'app/pacjent/pacjent_update.html'

class DowodUpdate(PacjentUpdateBase):
    fields = ['imie', 'nr_ksiegi','nazwisko', 'nazwisko_rodowe', 'pesel','adres' , 'plec', 'miejsce_urodzenia', 'imiona_rodzicow', 'nr_dowodu']

class LegZUSUpdate(PacjentUpdateBase):
    fields = ['nr_leg_zus', 'data_wydania_zus', 'data_waznosci_zus']

class WniosekUpdate(PacjentUpdateBase):
    fields = ['osoba_kontaktu', 'wysokosc_swiadczenia', 'data_przyjecia', 'tryb_przyjecia', 'data_skierowania', 'pwz_zlecajacego',
                'nazwa_szpitala','regon_szpitala',  'nr_rej_szpitala', 'nr_umowy_szpitala', 'oddzial_zlecajacego' ,'kod_oddzial_zlecajacego','nr_wew_oddzialu']


class MedyczneUpdate(PacjentUpdateBase):
    fields = ['wzrost', 'waga', 'epikryza', 'zalecenia', 'wyniki']

class ChorobyUpdate(LoginRequiredMixin, GetPacjent, CreateView):
    template_name = 'app/pacjent/choroba_update.html'
    form_class = ChorobowoscForm

    def get_context_data(self,*args,**kwargs):
        context = super().get_context_data(*args,**kwargs)
        context['chorobowosc'] = Chorobowosc.objects.all().filter(pacjent__exact=self.pacjent)
        return context

    def get_initial(self):
        initial = {'pacjent':self.pacjent.pesel}
        return initial

class ChorobyDelete(LoginRequiredMixin,GetPacjent, DeleteView):
    template_name = 'app/delete.html'
    model = Chorobowosc

    def get_success_url(self, **kwargs):
        return reverse_lazy('choroby_update', kwargs = {'slug': self.pacjent.slug})




class PacjentListView(LoginRequiredMixin, ListView):
    queryset = Pacjent.wszyscy.zywi()
    def dispatch(self,request,*args,**kwargs):
        return super().dispatch(request, *args, **kwargs)




class ArchiwumListView(LoginRequiredMixin, ListView):
    queryset = Pacjent.wszyscy.zmarli()
    template_name = 'pacjent_list.html'



class PacjentDetailView(DetailView):
    model = Pacjent
    template_name = 'app/pacjent/pacjent_detail.html'
    data = datetime.datetime.today().date()


    def get_context_data(self, **kwargs):
        object = self.get_object()
        context = super().get_context_data(**kwargs)
        context['chorobowosc'] = Chorobowosc.objects.all().filter(pacjent_id__exact = object.id)
        context['dekursus_lek'] = Dekursus_lek.objects.all().filter(pacjent_id__exact = object.id).order_by('data').first()
        context['pobyt'] = len(object.policz_pobyt())
        context['data'] = self.data
        context['wypisy'] = Wypis.objects.all().filter(pacjent__exact = object)
        context['przepustki'] = Przepustka.objects.all().filter(pacjent__exact = object)
        return context

class DokumentyKartaPrzyjeciaView(PacjentDetailView):
    template_name = 'app/dokumenty/karta_przyjecia.html'

class DokumentyKartaInformacyjnaView(PacjentDetailView):
    template_name = 'app/dokumenty/karta_informacyjna.html'

class DokumentyZlecenieTransportuView(PacjentDetailView):
    template_name = 'app/dokumenty/zlecenie_transportu.html'

#Rozlicz ######################################################
class RozliczView(LoginRequiredMixin, ListView):
    data = datetime.datetime.today().date()
    template_name = 'app/rozlicz.html'
    form_class = DatesForm
    initial = {'data_od' : data.replace(day=1), 'data_do': data}
    queryset = {}



    def get_query(self, data_od, data_do):
        query = []
        self.queryset['rozliczenie'] = Pacjent.wszyscy.rozliczenie(data_od,data_do)
        for elem in Pacjent.wszyscy.rozliczani(data_od, data_do):
            roz = []
            wypis_set = list(elem.wypis_set.all())
            przepustka_set = list(elem.przepustka_set.all())
            zywienie_set = list(elem.zywienie_set.all())
            p = Rozliczany()
            p.pacjent = elem
            roz  = elem.rozlicz(data_od, data_do)
            p.dni_2 = len(roz[0])
            p.dni_6 = len(roz[1])
            p.dni_7 = len(roz[2])
            p.dni_wypis = len(roz[3])
            p.dni_przepustka = len(roz[4])
            if hasattr(p.pacjent, 'zgon') and  data_od <= p.pacjent.zgon.data <= data_do:
                p.zgon_data = p.pacjent.zgon.data
            if data_od <= p.pacjent.data_przyjecia <= data_do:
                p.przyjecie_data = p.pacjent.data_przyjecia
            query.append(p)

            def approve(y, x):
                if getattr(x,'data_do') == None:
                    return bool(x.data_od.date() <= y <= self.data )
                elif x.data_do:
                    return bool(x.data_od.date() <= y <= x.data_do.date() )

            def remove(x,set):
                set.remove(x)
                return x

            p.wypisy = [ remove(x,wypis_set) for y in roz[3] for x in wypis_set if approve(y,x) ]
            p.przepustki = [ remove(x,przepustka_set) for y in roz[4] for x in przepustka_set if approve(y,x) ]
            p.zywienie_6  = [ remove(x,zywienie_set) for y in roz[1] for x in zywienie_set if approve(y,x)]
            p.zywienie_7 = [ remove(x,zywienie_set) for y in roz[2] for x in zywienie_set if approve(y,x)]

        self.queryset['object_list'] = query
        return self.queryset


    def get(self,request,*args,**kwargs):
        form = self.form_class(initial = self.initial)
        queryset = self.get_query(self.data.replace(day=1),self.data)
        return render(request, self.template_name, {'form':form, 'queryset':queryset})


    def post(self,request,*args,**kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            data_od =datetime.datetime.strptime(form.cleaned_data['data_od'],'%d-%m-%Y').date()
            data_do =datetime.datetime.strptime(form.cleaned_data['data_do'],'%d-%m-%Y').date()
            queryset = self.get_query(data_od, data_do)
            return render(request, self.template_name, {'form':form, 'queryset':queryset})


#Zgon###############################################################
class ZgonCreateView(LoginRequiredMixin,GetPacjent, CreateView):
    form_class = ZgonForm
    template_name = 'app/zgon/zgon_form.html'

    def get_context_data(self,**kwargs):
        context = super().get_context_data(**kwargs)
        from django.apps import apps
        try:
            context['pacjent_zgon'] = Zgon.objects.get(pacjent = self.pacjent)
        except:
            pass
        return context

    def form_valid(self,form):
        form.instance.pacjent = self.pacjent
        return super().form_valid(form)

class ZgonUpdateView(LoginRequiredMixin,GetPacjent, UpdateView):
    form_class = ZgonForm
    template_name = 'app/zgon/zgon_update.html'

    def get_object(self):
        return get_object_or_404(Zgon, pacjent = self.pacjent)

    def get_initial(self):
        try:
            wyjsciowa = self.object.wyjsciowa.kod +', '+ self.object.wyjsciowa.nazwa
        except:
            wyjsciowa = ''
        try:
            wtorna = self.object.wtorna.kod +', '+  self.object.wtorna.nazwa
        except:
            wtorna = ''
        try:
            bezposrednia = self.object.bezposrednia.kod +', '+ self.object.bezposrednia.nazwa
        except:
            bezposrednia = ''

        initial = {
        'wyjsciowa':wyjsciowa,
         'wtorna':wtorna,
         'bezposrednia': bezposrednia}
        return initial

class ZgonDeleteView(LoginRequiredMixin,GetPacjent, DeleteView):
    template_name = 'app/period_base/delete.html'

    def get_object(self):
        return get_object_or_404(Zgon, pacjent = self.pacjent)

    def get_success_url(self, **kwargs):
        object = self.get_object()
        return reverse_lazy('pacjent_detail', kwargs = {'slug': object.pacjent.slug})


def zgon_pdf(request, slug):
    pacjent = get_object_or_404(Pacjent,pesel = slug)
    from django.conf import settings
    def removeNonAscii(s): return "".join(i for i in s if ord(i)<128)
    path = settings.BASE_DIR +'/app/static/karty/'+ removeNonAscii(pacjent.imie)+"_"+removeNonAscii(pacjent.nazwisko)+"_kz" +".pdf"
    try:
        open(path, 'rb')
    except:
        #from app.utils
        karta_zgon_gen(pacjent)

    with open(path, 'rb') as pdf:
        response = HttpResponse(pdf.read(), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename={}_kz.pdf'.format(removeNonAscii(pacjent.imie)+"_"+removeNonAscii(pacjent.nazwisko))
        return response


# End zgon##########################################################

# Period Model Section##########################################################
########### Create#######################
class PeriodBaseCreateView(LoginRequiredMixin, GetPacjent, CreateView):
    template_name = 'app/period_base/period_form.html'

    def get_initial(self):
        initial = {
        'pacjent':self.pacjent,
         'user':self.request.user,
         'data_od' : timezone.now(),}
        return initial

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all'] = eval(self.model.__name__).objects.all().filter(pacjent_id__exact = self.pacjent.id).order_by('-data_od')
        context['class'] = str(self.model.__name__).lower()
        return context

class ZywienieCreateView(PeriodBaseCreateView):
    form_class = ZywienieForm
    model = Zywienie

class WypisCreateView(PeriodBaseCreateView):
    form_class = WypisForm
    model = Wypis

class PrzepustkaCreateView(PeriodBaseCreateView):
    form_class = PrzepustkaForm
    model = Przepustka

#################Detail#####################
class ZywienieDetailView(DetailView):
    template_name = 'app/period_base/period_detail.html'
    model = Zywienie

class WypisDetailView(DetailView):
    template_name = 'app/period_base/period_detail.html'
    model = Wypis

class PrzepustkaDetailView(DetailView):
    template_name = 'app/period_base/period_detail.html'
    model = Przepustka

##################Update####################
class PeriodBaseUpdateView(LoginRequiredMixin, GetPacjent, UpdateView):
    template_name = 'app/period_base/period_update.html'
    def get_context_data(self,**kwargs):
        context = super().get_context_data(**kwargs)
        context['class'] = self.get_object().__class__.__name__.lower()
        return context


class ZywienieUpdateView(PeriodBaseUpdateView):
    model = Zywienie
    form_class = ZywienieUpdateForm

class WypisUpdateView(PeriodBaseUpdateView):
    model = Wypis
    form_class = WypisUpdateForm

class PrzepustkaUpdateView(PeriodBaseUpdateView):
    model = Przepustka
    form_class = PrzepustkaUpdateForm

#################Delete#########################


class PeriodBaseDeleteView(LoginRequiredMixin, DeleteView):
    template_name = 'app/period_base/delete.html'

    def get_success_url(self, **kwargs):
        object = self.get_object()
        return reverse_lazy((object.__class__.__name__).lower(), kwargs = {'slug': object.pacjent.slug})

class ZywienieDeleteView(PeriodBaseDeleteView):
    model = Zywienie

class WypisDeleteView(PeriodBaseDeleteView):
    model = Wypis

class PrzepustkaDeleteView(PeriodBaseDeleteView):
    model = Przepustka
# End Period Model Section##############################################################




# PointBase Section-------------------------------------------------------
class PointBaseCreateView(LoginRequiredMixin,GetPacjent, CreateView):

    def form_valid(self, form):
        form.instance.pacjent = self.pacjent
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        objects = eval(self.model.__name__).objects.all().filter(pacjent_id__exact = self.pacjent.id).order_by('-data')
        context['objects'] = objects
        context['aktualny'] = bool(objects.filter(data__exact = datetime.datetime.today().date()))
        return context


class PointBaseUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    template_name = 'app/dekursusy/dekursus_update.html'

    def form_valid(self,form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def test_func(self):
        object = self.get_object()
        return object.user.department == self.request.user.department


class PointBaseDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    template_name = 'app/delete.html'

    def get_success_url(self, **kwargs):
        object = self.get_object()
        return reverse_lazy((object.__class__.__name__).lower(), kwargs = {'slug': object.pacjent.slug})

    def test_func(self):
        object = self.get_object()
        return object.user == self.request.user

# Dekursus Section #######################################################################
#########Dekursus create

class Dekursus_lekCreateView(PointBaseCreateView):
    model = Dekursus_lek
    template_name = 'app/dekursusy/dekursus_lek.html'
    fields = ['tresc', 'data', 'important']


class Dekursus_pielCreateView(PointBaseCreateView):
    model = Dekursus_piel
    fields = ['tresc','data']
    template_name = 'app/dekursusy/dekursus_piel.html'

class Dekursus_psychCreateView(PointBaseCreateView):
    model = Dekursus_psych
    fields = ['tresc','data']
    template_name = 'app/dekursusy/dekursus_psych.html'

#########Dekursus update

class Dekursus_lekUpdateView(PointBaseUpdateView):
    fields = ['tresc','data', 'important']
    model = Dekursus_lek


class Dekursus_pielUpdateView(PointBaseUpdateView):
    model = Dekursus_piel
    fields = ['tresc','data']

class Dekursus_psychUpdateView(PointBaseUpdateView):
    model = Dekursus_psych
    fields = ['tresc','data']

##########Dekursus delete

class Dekursus_lekDeleteView(PointBaseDeleteView):
    model = Dekursus_lek

class Dekursus_pielDeleteView(PointBaseDeleteView):
    model = Dekursus_piel

class Dekursus_psychDeleteView(PointBaseDeleteView):
    model = Dekursus_psych

#End Dekursus Section #####################################################################

#Scales Section#######################
#Create Scale########################
class NortonCreateView(PointBaseCreateView):
    fields = ['data', 'fizykalny' , 'swiadomosc', 'aktywnosc', 'samodzielnosc', 'zwieracze']
    model = Norton
    template_name = 'app/pielegniarskie/norton.html'

    def get_initial(self):
        initial = super().get_initial()
        last = eval(self.model.__name__).objects.all().filter(pacjent_id__exact = self.pacjent.id)
        if last:
            initial['fizykalny'] = last.latest('data').fizykalny
            initial['swiadomosc'] = last.latest('data').swiadomosc
            initial['aktywnosc'] = last.latest('data').aktywnosc
            initial['samodzielnosc'] = last.latest('data').samodzielnosc
            initial['zwieracze'] = last.latest('data').zwieracze
        else:
            pass
        return initial

class BarthelCreateView(PointBaseCreateView):
    fields = ['data','posilki', 'przemieszczanie', 'higiena', 'wc', 'mycie', 'poruszanie', 'schody', 'ubieranie', 'stolec', 'mocz']
    model = Barthel
    template_name = 'app/pielegniarskie/barthel.html'

    def get_initial(self):
        initial = super().get_initial()
        last = eval(self.model.__name__).objects.all().filter(pacjent_id__exact = self.pacjent.id)
        if last:
            initial['posilki'] = last.latest('data').posilki
            initial['przemieszczanie'] = last.latest('data').przemieszczanie
            initial['higiena'] = last.latest('data').higiena
            initial['wc'] = last.latest('data').wc
            initial['mycie'] = last.latest('data').mycie
            initial['poruszanie'] = last.latest('data').poruszanie
            initial['schody'] = last.latest('data').schody
            initial['ubieranie'] = last.latest('data').ubieranie
            initial['stolec'] = last.latest('data').stolec
            initial['mocz'] = last.latest('data').mocz
        else:
            pass
        return initial


class OdlezynaCreateView(LoginRequiredMixin, GetPacjent, CreateView):
    model = Odlezyna
    fields = ['lokalizacja']
    template_name = 'app/pielegniarskie/odlezyna.html'

    def form_valid(self, form):
        form.instance.pacjent = self.pacjent
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        odlezyny = Odlezyna.objects.all().filter(pacjent__exact = self.pacjent)
        context['odlezyny'] = odlezyny

        return context

class OcenaOdlezynyCreateView(CreateView):
    model = OcenaOdlezyny
    fields = ['data','stopien','interwencja']
    template_name = 'app/pielegniarskie/ocena.html'

    def dispatch(self,request,*args, **kwargs):
        print(request)
        self.odlezyna = get_object_or_404(Odlezyna, id = kwargs['pk'])
        return super().dispatch(request,*args, **kwargs)

    def form_valid(self, form, **kwargs):
        print(form)
        form.instance.user = self.request.user
        form.instance.odlezyna = self.odlezyna
        return super().form_valid(form)



#Update Scale################
class NortonUpdateView(PointBaseUpdateView):
    fields = ['data', 'fizykalny' , 'swiadomosc', 'aktywnosc', 'samodzielnosc', 'zwieracze']
    model = Norton
    template_name = 'app/pielegniarskie/pielegniarskie_update.html'

class BarthelUpdateView(PointBaseUpdateView):
    fields = ['data','posilki', 'przemieszczanie', 'higiena', 'wc', 'mycie', 'poruszanie', 'schody', 'ubieranie', 'stolec', 'mocz']
    model = Barthel
    template_name = 'app/pielegniarskie/pielegniarskie_update.html'

class OdlezynaUpdateView(LoginRequiredMixin, UpdateView):
    fields = ['lokalizacja' ]
    model = Odlezyna
    template_name = 'app/pielegniarskie/pielegniarskie_update.html'

#Delete Scale########################
class NortonDeleteView(PointBaseDeleteView):
    model = Norton

class BarthelDeleteView(PointBaseDeleteView):
    model = Barthel

class OdlezynaDeleteView(LoginRequiredMixin, DeleteView):
    template_name = 'app/delete.html'
    model = Odlezyna

    def get_success_url(self):
        return reverse('odlezyna', kwargs =  {'slug':self.get_object().pacjent.slug} )

class OcenaOdlezynyDeleteView(PointBaseDeleteView):
    model = OcenaOdlezyny

    def get_success_url(self):
        return reverse('odlezyna', kwargs =  {'slug':self.get_object().odlezyna.pacjent.slug} )
