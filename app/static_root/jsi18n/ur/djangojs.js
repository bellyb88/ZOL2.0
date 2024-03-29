

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
    "6 a.m.": "6 \u0635", 
    "6 p.m.": "6 po po\u0142udniu", 
    "April": "Kwiecie\u0144", 
    "August": "Sierpie\u0144", 
    "Available %s": "\u062f\u0633\u062a\u06cc\u0627\u0628 %s", 
    "Cancel": "\u0645\u0646\u0633\u0648\u062e \u06a9\u0631\u06cc\u06ba", 
    "Choose": "Wybierz", 
    "Choose a Date": "Wybierz Dat\u0119", 
    "Choose a Time": "Wybierz Czas", 
    "Choose a time": "\u0648\u0642\u062a \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba", 
    "Choose all": "\u0633\u0628 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba", 
    "Chosen %s": "\u0645\u0646\u062a\u062e\u0628 \u0634\u062f\u06c1 %s", 
    "Click to choose all %s at once.": "Kliknij, aby wybra\u0107 jednocze\u015bnie wszystkie %s.", 
    "Click to remove all chosen %s at once.": "Kliknij, aby usun\u0105\u0107 jednocze\u015bnie wszystkie wybrane %s.", 
    "December": "Grudzie\u0144", 
    "February": "Luty", 
    "Filter": "\u0686\u06be\u0627\u0646\u0679\u06cc\u06ba", 
    "Hide": "\u0686\u06be\u067e\u0627\u0626\u06cc\u06ba", 
    "January": "Stycze\u0144", 
    "July": "Lipiec", 
    "June": "Czerwiec", 
    "March": "Marzec", 
    "May": "Maj", 
    "Midnight": "\u0646\u0635\u0641 \u0631\u0627\u062a", 
    "Noon": "\u062f\u0648\u067e\u06be\u0631", 
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
    "Now": "\u0627\u0628", 
    "October": "Pa\u017adziernik", 
    "Remove": "\u062e\u0627\u0631\u062c \u06a9\u0631\u06cc\u06ba", 
    "Remove all": "Usu\u0144 wszystkie", 
    "September": "Wrzesie\u0144", 
    "Show": "\u062f\u06a9\u06be\u0627\u0626\u06cc\u06ba", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "To lista dost\u0119pnych %s. Aby wybra\u0107 pozycje, zaznacz je i kliknij strza\u0142k\u0119 \u201eWybierz\u201d pomi\u0119dzy listami.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "To lista wybranych %s. Aby usun\u0105\u0107, zaznacz pozycje wybrane do usuni\u0119cia i kliknij strza\u0142k\u0119 \u201eUsu\u0144\u201d pomi\u0119dzy listami.", 
    "Today": "\u0627\u0653\u062c", 
    "Tomorrow": "\u0627\u0653\u0626\u0646\u062f\u06c1 \u06a9\u0644", 
    "Type into this box to filter down the list of available %s.": "Wpisz co\u015b tutaj, aby wyfiltrowa\u0107 list\u0119 dost\u0119pnych %s.", 
    "Yesterday": "\u06af\u0632\u0634\u062a\u06c1 \u06a9\u0644", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "\u0627\u0653\u067e \u0646\u06d2 \u0627\u06cc\u06a9 \u06a9\u0627\u0631\u0648\u0627\u0626\u06cc \u0645\u0646\u062a\u062e\u0628 \u06a9\u06cc \u06be\u06d2\u060c \u0627\u0648\u0631 \u0627\u0653\u067e \u0646\u06d2 \u0630\u0627\u062a\u06cc \u062e\u0627\u0646\u0648\u06ba \u0645\u06cc\u06ba \u06a9\u0648\u0626\u06cc \u062a\u0628\u062f\u06cc\u0644\u06cc \u0646\u06c1\u06cc\u06ba \u06a9\u06cc \u063a\u0627\u0644\u0628\u0627\u064b \u0627\u0653\u067e '\u062c\u0627\u0648\u0654' \u0628\u0679\u0646 \u062a\u0644\u0627\u0634 \u06a9\u0631 \u0631\u06be\u06d2 \u06be\u06cc\u06ba \u0628\u062c\u0627\u0626\u06d2 '\u0645\u062e\u0641\u0648\u0638 \u06a9\u0631\u06cc\u06ba' \u0628\u0679\u0646 \u06a9\u06d2\u06d4", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "\u0627\u0653\u067e \u0646\u06d2 \u0627\u06cc\u06a9 \u06a9\u0627\u0631\u0648\u0627\u0626\u06cc \u0645\u0646\u062a\u062e\u0628 \u06a9\u06cc \u06be\u06d2 \u0644\u06cc\u06a9\u0646 \u0627\u0628\u06be\u06cc \u062a\u06a9 \u0627\u0653\u067e \u0646\u06d2 \u0630\u0627\u062a\u06cc \u062e\u0627\u0646\u0648\u06ba \u0645\u06cc\u06ba \u0627\u067e\u0646\u06cc \u062a\u0628\u062f\u06cc\u0644\u06cc\u0627\u06ba \u0645\u062d\u0641\u0648\u0638 \u0646\u06c1\u06cc\u06ba \u06a9\u06cc \u06c1\u06cc\u06ba \u0628\u0631\u0627\u06c1 \u0645\u06be\u0631\u0628\u0627\u0646\u06cc \u0645\u062d\u0641\u0648\u0637 \u06a9\u0631\u0646\u06d2 \u06a9\u06d2 \u0644\u0626\u06d2 OK \u067e\u0631 \u06a9\u0644\u06a9 \u06a9\u0631\u06cc\u06ba\u06d4 \u0627\u0653\u067e \u06a9\u0627\u0648\u0627\u0626\u06cc \u062f\u0648\u0628\u0627\u0631\u06c1 \u0686\u0644\u0627\u0646\u06d2 \u06a9\u06cc \u0636\u0631\u0648\u0631\u062a \u06be\u0648\u06af\u06cc\u06d4", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "\u0627\u0653\u067e \u06a9\u06d2 \u067e\u0627\u0633 \u0630\u0627\u062a\u06cc \u0642\u0627\u0628\u0644 \u062a\u062f\u0648\u06cc\u0646 \u062e\u0627\u0646\u0648\u06ba \u0645\u06cc\u06ba \u063a\u06cc\u0631 \u0645\u062d\u0641\u0648\u0638 \u062a\u0628\u062f\u06cc\u0644\u06cc\u0627\u06ba \u0645\u0648\u062c\u0648\u062f \u06be\u06cc\u06ba\u06d4 \u0627\u06af\u0631 \u0627\u0653\u067e \u06a9\u0648\u0626\u06cc \u06a9\u0627\u0631\u0648\u0627\u0626\u06cc \u06a9\u0631\u06cc\u06ba \u06af\u06d2 \u062a\u0648 \u0627\u0653\u067e \u06a9\u06cc \u063a\u06cc\u0631 \u0645\u062d\u0641\u0648\u0638 \u062a\u0628\u062f\u06cc\u0644\u06cc\u0627\u06ba \u0636\u0627\u0626\u0639 \u06be\u0648 \u062c\u0627\u0626\u06cc\u06ba \u06af\u06cc\u06d4", 
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

