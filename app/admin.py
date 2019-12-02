# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import *
from .forms import *


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    prepopulated_fields = {'username':('PWZ',)}
    fieldsets = (
        (None, {'fields': ('is_superuser','username','first_name','last_name','email','PWZ','department', 'password', 'is_active', 'groups')}),
    )
    add_fieldsets = (
        (None, {'fields': ('is_superuser','username','first_name','last_name','email','PWZ','department', 'password1', 'password2', 'is_active')}),
    )
    list_display = ('last_name','first_name','email','PWZ','department','is_active')




@admin.register(Pacjent)
class PacjentAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('pesel',)}
    fieldsets = (
        (None, {'fields': ('imie','nazwisko','pesel','plec','data_przyjecia','slug','nr_ksiegi', 'choroby')}),
    )


admin.site.register(Dekursus_lek)
admin.site.register(Dekursus_piel)
admin.site.register(Dekursus_psych)
admin.site.register(Wypis)
admin.site.register(Przepustka)
admin.site.register(Zywienie)
admin.site.register(Zgon)
admin.site.register(Norton)
