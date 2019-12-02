

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
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
    "6 a.m.": "6h r\u00e1no", 
    "6 p.m.": "6h ve\u010der", 
    "April": "duben", 
    "August": "srpen", 
    "Available %s": "Dostupn\u00e9 polo\u017eky: %s", 
    "Cancel": "Storno", 
    "Choose": "Vybrat", 
    "Choose a Date": "Vyberte datum", 
    "Choose a Time": "Vyberte \u010das", 
    "Choose a time": "Vyberte \u010das", 
    "Choose all": "Vybrat v\u0161e", 
    "Chosen %s": "Vybran\u00e9 polo\u017eky %s", 
    "Click to choose all %s at once.": "Chcete-li najednou vybrat v\u0161echny polo\u017eky %s, klepn\u011bte sem.", 
    "Click to remove all chosen %s at once.": "Chcete-li najednou odebrat v\u0161echny vybran\u00e9 polo\u017eky %s, klepn\u011bte sem.", 
    "December": "prosinec", 
    "February": "\u00fanor", 
    "Filter": "Filtr", 
    "Hide": "Skr\u00fdt", 
    "January": "leden", 
    "July": "\u010dervenec", 
    "June": "\u010derven", 
    "March": "b\u0159ezen", 
    "May": "kv\u011bten", 
    "Midnight": "P\u016flnoc", 
    "Noon": "Poledne", 
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
    "November": "listopad", 
    "Now": "Nyn\u00ed", 
    "October": "\u0159\u00edjen", 
    "Remove": "Odebrat", 
    "Remove all": "Odebrat v\u0161e", 
    "September": "z\u00e1\u0159\u00ed", 
    "Show": "Zobrazit", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Seznam dostupn\u00fdch polo\u017eek %s. Jednotliv\u011b je lze vybrat tak, \u017ee na n\u011b v r\u00e1me\u010dku klepnete a pak klepnete na \u0161ipku \"Vybrat\" mezi r\u00e1me\u010dky.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Seznam vybran\u00fdch polo\u017eek %s. Jednotliv\u011b je lze odebrat tak, \u017ee na n\u011b v r\u00e1me\u010dku klepnete a pak klepnete na \u0161ipku \"Odebrat mezi r\u00e1me\u010dky.", 
    "Today": "Dnes", 
    "Tomorrow": "Z\u00edtra", 
    "Type into this box to filter down the list of available %s.": "Chcete-li filtrovat ze seznamu dostupn\u00fdch polo\u017eek %s, za\u010dn\u011bte ps\u00e1t do tohoto pole.", 
    "Yesterday": "V\u010dera", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Byla vybr\u00e1na operace a jednotliv\u00e1 pole nejsou zm\u011bn\u011bn\u00e1. Patrn\u011b hled\u00e1te tla\u010d\u00edtko Prov\u00e9st sp\u00ed\u0161e ne\u017e Ulo\u017eit.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Byla vybr\u00e1na operace, ale dosud nedo\u0161lo k ulo\u017een\u00ed zm\u011bn jednotliv\u00fdch pol\u00ed. Ulo\u017e\u00edte klepnut\u00edm na tla\u010d\u00edtko OK. Pak bude t\u0159eba operaci spustit znovu.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "V jednotliv\u00fdch pol\u00edch jsou neulo\u017een\u00e9 zm\u011bny, kter\u00e9 budou ztraceny, pokud operaci provedete.", 
    "one letter Friday\u0004F": "P", 
    "one letter Monday\u0004M": "P", 
    "one letter Saturday\u0004S": "S", 
    "one letter Sunday\u0004S": "N", 
    "one letter Thursday\u0004T": "\u010c", 
    "one letter Tuesday\u0004T": "\u00da", 
    "one letter Wednesday\u0004W": "S"
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

