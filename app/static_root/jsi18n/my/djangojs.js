

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=0;
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
    "6 a.m.": "\u1019\u1014\u1000\u103a\u1046\u1014\u102c\u101b\u102e", 
    "6 p.m.": "6 po po\u0142udniu", 
    "April": "Kwiecie\u0144", 
    "August": "Sierpie\u0144", 
    "Available %s": "%s \u1000\u102d\u102f\u101b\u101a\u1030\u1014\u102d\u102f\u1004\u103a", 
    "Cancel": "\u1015\u101a\u103a\u1016\u103b\u1000\u103a", 
    "Choose": "\u101b\u103d\u1031\u1038", 
    "Choose a Date": "Wybierz Dat\u0119", 
    "Choose a Time": "Wybierz Czas", 
    "Choose a time": "\u1021\u1001\u103b\u102d\u1014\u103a\u101b\u103d\u1031\u1038\u1015\u102b", 
    "Choose all": "\u1021\u102c\u1038\u101c\u1036\u102f\u1038\u101b\u103d\u1031\u1038", 
    "Chosen %s": "%s \u101b\u103d\u1031\u1038\u1015\u103c\u102e\u1038", 
    "Click to choose all %s at once.": "%s \u1021\u102c\u1038\u101c\u1036\u102f\u1038\u1000\u102d\u102f\u1010\u1005\u103a\u1000\u103c\u102d\u1019\u103a\u1010\u100a\u103a\u1038\u1016\u103c\u1004\u103a\u1037\u101b\u103d\u1031\u1038\u1001\u103b\u101a\u103a\u101b\u1014\u103a\u1000\u101c\u1005\u103a\u1014\u103e\u102d\u1015\u103a\u104b", 
    "Click to remove all chosen %s at once.": "%s \u1021\u102c\u1038\u101c\u1036\u102f\u1038\u1000\u102d\u102f\u1010\u1005\u103a\u1000\u103c\u102d\u1019\u103a\u1010\u100a\u103a\u1038\u1016\u103c\u1004\u103a\u1037\u1016\u101a\u103a\u101b\u103e\u102c\u1038\u101b\u1014\u103a\u1000\u101c\u1005\u103a\u1014\u103e\u102d\u1015\u103a\u104b", 
    "December": "Grudzie\u0144", 
    "February": "Luty", 
    "Filter": "\u1005\u102e\u1005\u1005\u103a\u1019\u103e\u102f", 
    "Hide": "\u1016\u102f\u1036\u1038\u1000\u103d\u101a\u103a", 
    "January": "Stycze\u0144", 
    "July": "Lipiec", 
    "June": "Czerwiec", 
    "March": "Marzec", 
    "May": "Maj", 
    "Midnight": "\u101e\u1014\u103a\u1038\u1001\u1031\u102b\u1004\u103a", 
    "Noon": "\u1019\u103d\u1014\u103a\u1038\u1010\u100a\u103a\u1037", 
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
    "Now": "\u101a\u1001\u102f", 
    "October": "Pa\u017adziernik", 
    "Remove": "\u1016\u101a\u103a\u101b\u103e\u102c\u1038", 
    "Remove all": "\u1021\u102c\u1038\u101c\u1036\u102f\u1038\u1016\u101a\u103a\u101b\u103e\u102c\u1038", 
    "September": "Wrzesie\u0144", 
    "Show": "\u1015\u103c\u101e", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "%s \u101e\u100a\u103a\u101b\u101a\u1030\u1014\u102d\u102f\u1004\u103a\u101e\u1031\u102c\u1005\u102c\u101b\u1004\u103a\u1038\u1016\u103c\u1005\u103a\u104b \u1021\u1031\u102c\u1000\u103a\u1016\u1031\u102c\u103a\u1015\u103c\u1015\u102b\u1018\u1030\u1038\u1019\u103b\u102c\u1038\u1010\u103d\u1004\u103a\u1021\u1001\u103b\u102d\u102f\u1037\u1000\u102d\u102f\u101b\u103d\u1031\u1038\u1001\u103b\u101a\u103a\u1014\u102d\u102f\u1004\u103a\u1015\u103c\u102e\u1038\u1018\u1030\u1038\u1014\u103e\u1005\u103a\u1001\u102f\u1000\u103c\u102c\u1038\u101b\u103e\u102d\"\u101b\u103d\u1031\u1038\"\u1019\u103b\u102c\u1038\u1000\u102d\u102f\u1000\u101c\u1005\u103a\u1014\u103e\u102d\u1015\u103a\u104b", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "%s \u101e\u100a\u103a\u101b\u101a\u1030\u1014\u102d\u102f\u1004\u103a\u101e\u1031\u102c\u1005\u102c\u101b\u1004\u103a\u1038\u1016\u103c\u1005\u103a\u104b \u1021\u1031\u102c\u1000\u103a\u1016\u1031\u102c\u103a\u1015\u103c\u1015\u102b\u1018\u1030\u1038\u1019\u103b\u102c\u1038\u1010\u103d\u1004\u103a\u1021\u1001\u103b\u102d\u102f\u1037\u1000\u102d\u102f\u1016\u101a\u103a\u101b\u103e\u102c\u1038\u1014\u102d\u102f\u1004\u103a\u1015\u103c\u102e\u1038\u1018\u1030\u1038\u1014\u103e\u1005\u103a\u1001\u102f\u1000\u103c\u102c\u1038\u101b\u103e\u102d\"\u1016\u101a\u103a\u101b\u103e\u102c\u1038\"\u1000\u102d\u102f\u1000\u101c\u1005\u103a\u1014\u103e\u102d\u1015\u103a\u104b", 
    "Today": "\u101a\u1014\u1031\u1037", 
    "Tomorrow": "\u1019\u1014\u1000\u103a\u1016\u103c\u1014\u103a", 
    "Type into this box to filter down the list of available %s.": "\u101a\u1001\u102f\u1018\u1030\u1038\u1011\u1032\u1010\u103d\u1004\u103a\u1005\u102c\u101e\u102c\u1038\u101b\u102d\u102f\u1000\u103a\u1011\u100a\u1037\u103a\u1015\u103c\u102e\u1038 %s \u101b\u101a\u1030\u1014\u102d\u102f\u1004\u103a\u101e\u1031\u102c\u1005\u102c\u101b\u1004\u103a\u1038\u1000\u102d\u102f\u1005\u102d\u1005\u1005\u103a\u1014\u102d\u102f\u1004\u103a\u104b", 
    "Yesterday": "\u1019\u1014\u1031\u1037", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Wybrano akcj\u0119, lecz nie dokonano \u017cadnych zmian w polach. Prawdopodobnie szukasz przycisku \u201eWykonaj\u201d, a nie \u201eZapisz\u201d.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Wybrano akcj\u0119, lecz cz\u0119\u015b\u0107 zmian w polach nie zosta\u0142a zachowana. Kliknij OK, aby zapisa\u0107. Aby wykona\u0107 akcj\u0119, nale\u017cy j\u0105 ponownie uruchomi\u0107.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Zmiany w niekt\u00f3rych polach nie zosta\u0142y zachowane. Po wykonaniu akcji, zmiany te zostan\u0105 utracone.", 
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

