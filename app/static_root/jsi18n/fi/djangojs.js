

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n != 1);
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
    "6 a.m.": "06", 
    "6 p.m.": "18:00", 
    "April": "huhtikuu", 
    "August": "elokuu", 
    "Available %s": "Mahdolliset %s", 
    "Cancel": "Peruuta", 
    "Choose": "Valitse", 
    "Choose a Date": "Valitse p\u00e4iv\u00e4m\u00e4\u00e4r\u00e4", 
    "Choose a Time": "Valitse kellonaika", 
    "Choose a time": "Valitse kellonaika", 
    "Choose all": "Valitse kaikki", 
    "Chosen %s": "Valitut %s", 
    "Click to choose all %s at once.": "Klikkaa valitaksesi kaikki %s kerralla.", 
    "Click to remove all chosen %s at once.": "Klikkaa poistaaksesi kaikki valitut %s kerralla.", 
    "December": "joulukuu", 
    "February": "helmikuu", 
    "Filter": "Suodatin", 
    "Hide": "Piilota", 
    "January": "tammikuu", 
    "July": "hein\u00e4kuu", 
    "June": "kes\u00e4kuu", 
    "March": "maaliskuu", 
    "May": "toukokuu", 
    "Midnight": "24", 
    "Noon": "12", 
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
    "November": "marraskuu", 
    "Now": "Nyt", 
    "October": "lokakuu", 
    "Remove": "Poista", 
    "Remove all": "Poista kaikki", 
    "September": "syyskuu", 
    "Show": "N\u00e4yt\u00e4", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "T\u00e4m\u00e4 on lista saatavillaolevista %s. Valitse allaolevasta laatikosta haluamasi ja siirr\u00e4 ne valittuihin klikkamalla \"Valitse\"-nuolta laatikoiden v\u00e4lill\u00e4.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "T\u00e4m\u00e4 on lista valituista %s. Voit poistaa valintoja valitsemalla ne allaolevasta laatikosta ja siirt\u00e4m\u00e4ll\u00e4 ne takaisin valitsemattomiin klikkamalla \"Poista\"-nuolta laatikoiden v\u00e4lill\u00e4.", 
    "Today": "T\u00e4n\u00e4\u00e4n", 
    "Tomorrow": "Huomenna", 
    "Type into this box to filter down the list of available %s.": "Kirjoita t\u00e4h\u00e4n listaan suodattaaksesi %s-listaa.", 
    "Yesterday": "Eilen", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Olet valinnut toiminnon etk\u00e4 ole tehnyt yht\u00e4\u00e4n muutosta yksitt\u00e4isiss\u00e4 kentiss\u00e4. Etsit todenn\u00e4k\u00f6isesti Suorita-nappia Tallenna-napin sijaan.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Olet valinnut toiminnon, mutta et ole viel\u00e4 tallentanut muutoksiasi yksitt\u00e4isiin kenttiin. Paina OK tallentaaksesi. Sinun pit\u00e4\u00e4 suorittaa toiminto uudelleen.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Sinulla on tallentamattomia muutoksia yksitt\u00e4isiss\u00e4 muokattavissa kentiss\u00e4. Jos suoritat toiminnon, tallentamattomat muutoksesi katoavat.", 
    "one letter Friday\u0004F": "Pe", 
    "one letter Monday\u0004M": "Ma", 
    "one letter Saturday\u0004S": "La", 
    "one letter Sunday\u0004S": "Su", 
    "one letter Thursday\u0004T": "To", 
    "one letter Tuesday\u0004T": "Ti", 
    "one letter Wednesday\u0004W": "Ke"
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

