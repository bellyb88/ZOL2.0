# -*- coding: utf-8 -*-
from django.core.exceptions import ValidationError


def validate_pesel(value):
    sum = int(value[0])*1 + int(value[1])*3 + int(value[2])*7 + int(value[3])*9 + int(value[4])*1 + int(value[5])*3 + int(value[6])*7 + int(value[7])*9 + int(value[8])*1 + int(value[9])*3 + int(value[10])*1
    if sum % 10 != 0:
        raise ValidationError('Suma kontrolna bledna. PESEL niepoprawny')

def validate_PWZ(value):
    if len(str(value)) != 7 or not str(value).isdigit():
        raise ValidationError('PWZ powinien składać sie z 7 cyfr')

def validate_IDnr(value):
    value = value.replace(" ","")
    if not (len(value)==9 and value[0:2].isalpha() and value[3:].isdigit()):
         raise ValidationError('Nieprawidłowy nr dowodu')

def validate_nr_leg_zus(value):
    value = value.replace(" ","")
    list = [value[2],value[5],value[7],value[14]]
    for x in list:
        if x!='/':
            raise ValidationError('Nieprawidłowy nr legitymacji ZUS')
    if not(len(value)==17 and value[6].isalpha()):
        raise ValidationError('Nieprawidłowy nr legitymacji ZUS')
