
from django.urls import path, include
from .views import *
from .utils import *
from django.contrib.auth import views as auth_views

urlpatterns = [

    path('pacjent_create/', CreatePacjentView.as_view(), name='pacjent_create'),
    path('<slug>/dowod_update', DowodUpdate.as_view(), name='dowod_update'),
    path('<slug>/legzus_update', LegZUSUpdate.as_view(), name='legzus_update'),
    path('<slug>/wniosek_update', WniosekUpdate.as_view(), name='wniosek_update'),
    path('<slug>/medyczne_update', MedyczneUpdate.as_view(), name='medyczne_update'),
    path('<slug>/choroby_update/', ChorobyUpdate.as_view(), name='choroby_update'),
    path('<slug>/choroby_delete/<pk>', ChorobyDelete.as_view(), name='choroby_delete'),


    path('', PacjentListView.as_view(), name='index'),
    path('archiwum/', ArchiwumListView.as_view(), name='archiwum'),
    path('rozlicz/', RozliczView.as_view(), name='rozlicz'),


    path('<slug>/', PacjentDetailView.as_view(), name='pacjent_detail'),
    path('<slug>/karta_przyjecia', DokumentyKartaPrzyjeciaView.as_view(), name='karta_przyjecia'),
    path('<slug>/karta_informacyjna', DokumentyKartaInformacyjnaView.as_view(), name='karta_informacyjna'),
    path('<slug>/zlecenie_transportu', DokumentyZlecenieTransportuView.as_view(), name='zlecenie_transportu'),

    path('<slug>/dekursus_lek', Dekursus_lekCreateView.as_view(), name='dekursus_lek' ),
    path('<slug>/dekursus_piel', Dekursus_pielCreateView.as_view(), name='dekursus_piel' ),
    path('<slug>/dekursus_psych', Dekursus_psychCreateView.as_view(), name='dekursus_psych' ),
    path('<slug>/norton', NortonCreateView.as_view(), name='norton' ),
    path('<slug>/barthel', BarthelCreateView.as_view(), name='barthel' ),
    path('<slug>/odlezyna', OdlezynaCreateView.as_view(), name='odlezyna' ),
    path('<slug>/<pk>/ocena', OcenaOdlezynyCreateView.as_view(), name='ocena' ),



    path('<slug>/dekursus_lek_update/<pk>', Dekursus_lekUpdateView.as_view(), name='dekursus_lek_update' ),
    path('<slug>/dekursus_piel_update/<pk>', Dekursus_pielUpdateView.as_view(), name='dekursus_piel_update' ),
    path('<slug>/dekursus_psych_update/<pk>', Dekursus_psychUpdateView.as_view(), name='dekursus_psych_update' ),
    path('<slug>/norton_update/<pk>', NortonUpdateView.as_view(), name='norton_update' ),
    path('<slug>/barthel_update/<pk>', BarthelUpdateView.as_view(), name='barthel_update' ),
    path('<slug>/odlezyna_update/<pk>', OdlezynaUpdateView.as_view(), name='odlezyna_update' ),


    path('<slug>/dekursus_lek_delete/<pk>', Dekursus_lekDeleteView.as_view(), name='dekursus_lek_delete' ),
    path('<slug>/dekursus_piel_delete/<pk>', Dekursus_pielDeleteView.as_view(), name='dekursus_piel_delete' ),
    path('<slug>/dekursus_psych_delete/<pk>', Dekursus_psychDeleteView.as_view(), name='dekursus_psych_delete' ),
    path('<slug>/norton/<pk>', NortonDeleteView.as_view(), name='norton_delete' ),
    path('<slug>/barthel/<pk>', BarthelDeleteView.as_view(), name='barthel_delete' ),
    path('<slug>/odlezyna/<pk>', OdlezynaDeleteView.as_view(), name='odlezyna_delete' ),
    path('<slug>/<pk>/ocena_delete', OcenaOdlezynyDeleteView.as_view(), name='ocena_delete' ),


    path('<slug>/zgon', ZgonCreateView.as_view(), name='zgon' ),
    path('<slug>/zgon_pdf', zgon_pdf, name='zgon_pdf' ),
    path('<slug>/zgon_update', ZgonUpdateView.as_view(), name='zgon_update' ),
    path('<slug>/zgon_delete', ZgonDeleteView.as_view(), name='zgon_delete' ),

    path('<slug>/zywienie', ZywienieCreateView.as_view(), name='zywienie' ),
    path('<slug>/zywienie_detail/<pk>', ZywienieDetailView.as_view(), name='zywienie_detail' ),
    path('<slug>/zywienie_update/<pk>', ZywienieUpdateView.as_view(), name='zywienie_update' ),
    path('<slug>/zywienie_delete/<pk>', ZywienieDeleteView.as_view(), name='zywienie_delete' ),

    path('<slug>/wypis', WypisCreateView.as_view(), name='wypis' ),
    path('<slug>/wypis_detail/<pk>', WypisDetailView.as_view(), name='wypis_detail' ),
    path('<slug>/wypis_update/<pk>', WypisUpdateView.as_view(), name='wypis_update' ),
    path('<slug>/wypis_delete/<pk>', WypisDeleteView.as_view(), name='wypis_delete' ),

    path('<slug>/przepustka', PrzepustkaCreateView.as_view(), name='przepustka' ),
    path('<slug>/przepustka_detail/<pk>', PrzepustkaDetailView.as_view(), name='przepustka_detail' ),
    path('<slug>/przepustka_update/<pk>', PrzepustkaUpdateView.as_view(), name='przepustka_update' ),
    path('<slug>/przepustka_delete/<pk>', PrzepustkaDeleteView.as_view(), name='przepustka_delete' ),

    path('accounts/login', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout', auth_views.LogoutView.as_view(), name='logout'),



    ]
