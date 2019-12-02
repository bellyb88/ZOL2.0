

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4);
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
      "Zaznaczono %(sel)s z %(cnt)s", 
      "%(sel)s de %(cnt)s  roghnaithe"
    ], 
    "6 a.m.": "6 a.m.", 
    "6 p.m.": "6 po po\u0142udniu", 
    "April": "Kwiecie\u0144", 
    "August": "Sierpie\u0144", 
    "Available %s": "%s ar f\u00e1il", 
    "Cancel": "Cealaigh", 
    "Choose": "Roghnaigh", 
    "Choose a Date": "Wybierz Dat\u0119", 
    "Choose a Time": "Wybierz Czas", 
    "Choose a time": "Roghnaigh am", 
    "Choose all": "Roghnaigh ioml\u00e1n", 
    "Chosen %s": "Roghn\u00f3far %s", 
    "Click to choose all %s at once.": "Clice\u00e1il anseo chun %s go l\u00e9ir a roghn\u00fa.", 
    "Click to remove all chosen %s at once.": "Clice\u00e1il anseo chun %s go l\u00e9ir roghnaithe a scroiseadh.", 
    "December": "Grudzie\u0144", 
    "February": "Luty", 
    "Filter": "Scagaire", 
    "Hide": "Folaigh", 
    "January": "Stycze\u0144", 
    "July": "Lipiec", 
    "June": "Czerwiec", 
    "March": "Marzec", 
    "May": "Maj", 
    "Midnight": "Me\u00e1n o\u00edche", 
    "Noon": "N\u00f3in", 
    "Note: You are %s hour ahead of server time.": [
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin\u0119 do przodu w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godziny do przodu w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do przodu w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do przodu w stosunku do czasu serwera.", 
      "Tabhair faoi deara: T\u00e1 t\u00fa %s uair a chloig roimh am an frioth\u00e1la\u00ed."
    ], 
    "Note: You are %s hour behind server time.": [
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin\u0119 do ty\u0142u w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godziny do ty\u0142u w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do ty\u0142u w stosunku do czasu serwera.", 
      "Uwaga: Czas lokalny jest przesuni\u0119ty o %s godzin do ty\u0142u w stosunku do czasu serwera.", 
      "Tabhair faoi deara: T\u00e1 t\u00fa %s uair a chloig taobh thiar am an frioth\u00e1la\u00ed."
    ], 
    "November": "Listopad", 
    "Now": "Anois", 
    "October": "Pa\u017adziernik", 
    "Remove": "Bain amach", 
    "Remove all": "Scrois gach ceann", 
    "September": "Wrzesie\u0144", 
    "Show": "Taispe\u00e1n", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Is \u00e9 seo an liosta %s ar f\u00e1il. Is f\u00e9idir leat a roghn\u00fa roinnt ag roghn\u00fa acu sa bhosca th\u00edos agus ansin clice\u00e1il ar an saighead \"Roghnaigh\" idir an d\u00e1 bosca\u00ed.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Is \u00e9 seo an liosta de %s roghnaithe. Is f\u00e9idir leat iad a bhaint amach m\u00e1 roghnaionn t\u00fa cuid acu sa bhosca th\u00edos agus ansin clice\u00e1il ar an saighead \"Bain\" idir an d\u00e1 bosca\u00ed.", 
    "Today": "Inniu", 
    "Tomorrow": "Am\u00e1rach", 
    "Type into this box to filter down the list of available %s.": "Scr\u00edobh isteach sa bhosca seo a scagadh s\u00edos ar an liosta de %s ar f\u00e1il.", 
    "Yesterday": "Inn\u00e9", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "T\u00e1 gn\u00edomh roghnaithe agat, ach n\u00edl do aithrithe sabhailte ar cuid de na r\u00e9\u00edmse. Is d\u00f3cha go bhfuil t\u00fa ag iarraidh an cnaipe T\u00e9 n\u00e1 an cnaipe S\u00e1bh\u00e1il.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "T\u00e1 gn\u00edomh roghnaithe agat, ach n\u00edl do aithrithe sabhailte ar cuid de na r\u00e9\u00edmse. Clic OK chun iad a s\u00e1bh\u00e1il.  Caithfidh t\u00fa an gn\u00edomh a rith ar\u00eds.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "T\u00e1 aithrithe nach bhfuil sabhailte ar chuid do na r\u00e9imse.  M\u00e1 ritheann t\u00fa gn\u00edomh, caillfidh t\u00fa do chuid aithrithe.", 
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

