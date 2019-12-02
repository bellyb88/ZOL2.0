from django.utils import timezone
import re
from .models import Pacjent
from django.shortcuts import get_object_or_404

def default(request,*args, **kwargs):
    q = Pacjent.wszyscy.zywi()
    dzis = timezone.now
    pat = r'/\d+\d+\d+\d+\d+\d+\d+\d+\d+\d+\d/'
    result = re.findall(pat,str(request))
    if result:
        pacjent = get_object_or_404(Pacjent, slug = str(result)[3:-3])
        n = q.order_by('nazwisko').filter(nazwisko__gt=pacjent.nazwisko)
        p = q.order_by('-nazwisko').filter(nazwisko__lt=pacjent.nazwisko)
        if pacjent:
            return {'dzis':dzis, 'pacjent':pacjent, 'next':n, 'previous':p}
        else:
            return {'dzis':dzis}
    else:
        return {'dzis':dzis}
