

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    "%(sel)s of %(cnt)s selected": [
      "Zaznaczono %(sel)s z %(cnt)s", 
      "Zaznaczono %(sel)s z %(cnt)s", 
      "Zaznaczono %(sel)s z %(cnt)s", 
      "Zaznaczono %(sel)s z %(cnt)s"
    ], 
    "6 a.m.": "6 y.b.", 
    "6 p.m.": "6 po po\u0142udniu", 
    "April": "Kwiecie\u0144", 
    "August": "Sierpie\u0144", 
    "Available %s": "%s sydd ar gael", 
    "Cancel": "Diddymu", 
    "Choose": "Dewis", 
    "Choose a Date": "Wybierz Dat\u0119", 
    "Choose a Time": "Wybierz Czas", 
    "Choose a time": "Dewiswch amser", 
    "Choose all": "Dewis y cyfan", 
    "Chosen %s": "Y %s a ddewiswyd", 
    "Click to choose all %s at once.": "Cliciwch i ddewis pob %s yr un pryd.", 
    "Click to remove all chosen %s at once.": "Cliciwch i waredu pob %s sydd wedi ei ddewis yr un pryd.", 
    "December": "Grudzie\u0144", 
    "February": "Luty", 
    "Filter": "Hidl", 
    "Hide": "Cuddio", 
    "January": "Stycze\u0144", 
    "July": "Lipiec", 
    "June": "Czerwiec", 
    "March": "Marzec", 
    "May": "Maj", 
    "Midnight": "Canol nos", 
    "Noon": "Canol dydd", 
    "Note: You are %s hour ahead of server time.": [
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin\u0119 do przodu w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godziny do przodu w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do przodu w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do przodu w stosunku do czasu serwera."
    ], 
    "Note: You are %s hour behind server time.": [
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin\u0119 do ty\u0142u w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godziny do ty\u0142u w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do ty\u0142u w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do ty\u0142u w stosunku do czasu serwera."
    ], 
    "November": "Listopad", 
    "Now": "Nawr", 
    "October": "Pa\u017adziernik", 
    "Remove": "Gwaredu", 
    "Remove all": "Gwaredu'r cyfan", 
    "September": "Wrzesie\u0144", 
    "Show": "Dangos", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Dyma restr o'r %s sydd ar gael.  Gellir dewis rhai drwyeu dewis yn y blwch isod ac yna clicio'r saeth \"Dewis\" rhwng y ddau flwch.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Dyma restr o'r %s a ddewiswyd. Gellir gwaredu rhai drwy eu dewis yn y blwch isod ac yna clicio'r saeth \"Gwaredu\" rhwng y ddau flwch.", 
    "Today": "Heddiw", 
    "Tomorrow": "Fory", 
    "Type into this box to filter down the list of available %s.": "Teipiwch yn y blwch i hidlo'r rhestr o %s sydd ar gael.", 
    "Yesterday": "Ddoe", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Rydych wedi dewis gweithred ac nid ydych wedi newid unrhyw faes.  Rydych siwr o fod yn edrych am y botwm 'Ewch' yn lle'r botwm 'Cadw'.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Rydych wedi dewis gweithred ond nid ydych wedi newid eich newidiadau i rai meysydd eto.  Cliciwch 'Iawn' i gadw.  Bydd rhaid i chi ail-redeg y weithred.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Mae ganddoch newidiadau heb eu cadw mewn meysydd golygadwy.  Os rhedwch y weithred fe gollwch y newidiadau.", 
    "one letter Friday\u0004F": "P", 
    "one letter Monday\u0004M": "P", 
    "one letter Saturday\u0004S": "S", 
    "one letter Sunday\u0004S": "N", 
    "one letter Thursday\u0004T": "C", 
    "one letter Tuesday\u0004T": "W", 
    "one letter Wednesday\u0004W": "\u015a"
  };
  for (var key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      var value = django.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      var value = django.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value[django.pluralidx(count)];
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      var value = django.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "N j, Y, P", 
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d", 
      "%m/%d/%Y %H:%M:%S", 
      "%m/%d/%Y %H:%M:%S.%f", 
      "%m/%d/%Y %H:%M", 
      "%m/%d/%Y", 
      "%m/%d/%y %H:%M:%S", 
      "%m/%d/%y %H:%M:%S.%f", 
      "%m/%d/%y %H:%M", 
      "%m/%d/%y"
    ], 
    "DATE_FORMAT": "N j, Y", 
    "DATE_INPUT_FORMATS": [
      "%d-%m-%Y"
    ], 
    "DECIMAL_SEPARATOR": ".", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "F j", 
    "NUMBER_GROUPING": "0", 
    "SHORT_DATETIME_FORMAT": "m/d/Y P", 
    "SHORT_DATE_FORMAT": "m/d/Y", 
    "THOUSAND_SEPARATOR": ",", 
    "TIME_FORMAT": "P", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y"
  };

    django.get_format = function(format_type) {
      var value = django.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }

}(this));

