# -*- coding: ISO-8859-1 -*-
from io import BytesIO
from django.conf import settings
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from PyPDF2 import PdfFileWriter, PdfFileReader



def karta_zgon_gen(pacjent):
    def removeNonAscii(s): return "".join(i for i in s if ord(i)<128)
    imie = pacjent.imie
    nazwisko = pacjent.nazwisko
    nazwisko_rodowe = pacjent.nazwisko_rodowe
    nr_dowodu = pacjent.nr_dowodu
    pesel = pacjent.pesel
    plec = pacjent.plec
    miejsce_urodzenia = pacjent.miejsce_urodzenia
    data_zgonu = str(pacjent.zgon.data)
    godzina_zgonu = str(pacjent.zgon.godzina)
    data_urodzenia = str('19'+pacjent.pesel[0]+pacjent.pesel[1]+'.'+pacjent.pesel[2]+pacjent.pesel[3]+'.'+pacjent.pesel[4]+pacjent.pesel[5])
    przyczyna_wtorna = pacjent.zgon.wtorna
    przyczyna_wyjsciowa = pacjent.zgon.wyjsciowa
    przyczyna_bezposrednia = pacjent.zgon.bezposrednia
    stwierdzajacy_zgon = pacjent.zgon.user

    pdfmetrics.registerFont(TTFont('regular', settings.BASE_DIR+'/app/static/regular.ttf'))

    buffer = BytesIO()


    p = canvas.Canvas(buffer, pagesize=A4)
    p.setFont('regular',10)

    p.drawString(170, 660, "{}".format(nazwisko))
    p.drawString(170, 632, "{}".format(nazwisko_rodowe))
    p.drawString(100, 595, "{}".format(imie))
    p.drawString(430, 595, "{}".format(pesel))
    p.drawString(200, 562, "{}".format(nr_dowodu))
    p.drawString(227, 540, "{}".format(data_zgonu[0:4]))
    p.drawString(353, 540, "{}".format(data_zgonu[5:7]))
    p.drawString(303, 540, "{}".format(data_zgonu[8:10]))
    p.drawString(420, 540, "{}".format(godzina_zgonu[0:2]))
    p.drawString(467, 540, "{}".format(godzina_zgonu[3:5]))

    p.drawString(227, 490, "{}".format(data_urodzenia[0:4]))
    p.drawString(353, 490, "{}".format(data_urodzenia[5:7]))
    p.drawString(303, 490, "{}".format(data_urodzenia[8:10]))
    if plec == 'M':
        p.line('120','433','180','433')
        p.line('120','423','180','423')
        p.line('120','433','120','423')
        p.line('180','423','180','433')

    else:
        p.line('120','423','180','423')
        p.line('120','413','180','413')
        p.line('120','423','120','413')
        p.line('180','413','180','423')

    p.drawString(227, 292, "{}".format(miejsce_urodzenia))
    p.drawString(90, 185, "{}".format(przyczyna_bezposrednia))

    p.showPage()


    p.setFont('regular',10)
    p.drawString(70, 768, "{}".format(przyczyna_wtorna))
    p.drawString(70, 712, "{}".format(przyczyna_wyjsciowa))
    p.drawString(70, 552, "{}".format('lek. '+stwierdzajacy_zgon.first_name+' '+stwierdzajacy_zgon.last_name))

    p.drawString(120, 418, "{}".format(data_zgonu[0:4]))
    p.drawString(243, 418, "{}".format(data_zgonu[5:7]))
    p.drawString(193, 418, "{}".format(data_zgonu[8:10]))
    p.showPage()
    p.save()

    buffer.seek(0)
    new_pdf = PdfFileReader(buffer)
    existing_pdf = PdfFileReader(open(settings.BASE_DIR+"/app/static/karta.pdf", "rb"))

    page = existing_pdf.getPage(0)
    page.mergePage(new_pdf.getPage(0))

    page_two = existing_pdf.getPage(1)
    page_two.mergePage(new_pdf.getPage(1))



    output = PdfFileWriter()
    output.addPage(page)
    output.addPage(page_two)
    output_stream = open(settings.BASE_DIR+"/app/static/karty/"+ removeNonAscii(pacjent.imie)+"_"+removeNonAscii(pacjent.nazwisko)+"_kz" +".pdf", "wb")
    output.write(output_stream)
    output_stream.close()
