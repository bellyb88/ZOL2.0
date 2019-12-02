f_xml = open('icd_fin.xml','r')
f_json = open('icd_json.json', 'w')

with f_xml as fx:
    x=0
    for line in fx:
        x =x+1
        nazwa = line[line.find('<nazwa>')+7:line.find('</nazwa>')]
        kod = line[line.find('<kod>')+5:line.find('</kod>')]
        new_line ='{ "pk":'+ str(x) +', "model": "app.Choroba", "fields": { "kod":"' +kod+ '", "nazwa":"' + nazwa+ '"  } }, \n'
        f_json.write(new_line)

    f_json.close()
