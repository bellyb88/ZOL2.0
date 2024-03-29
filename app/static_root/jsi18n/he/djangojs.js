

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
    "6 a.m.": "6 \u05d1\u05d1\u05d5\u05e7\u05e8", 
    "6 p.m.": "6 \u05d0\u05d7\u05e8 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd", 
    "April": "\u05d0\u05e4\u05e8\u05d9\u05dc", 
    "August": "\u05d0\u05d5\u05d2\u05d5\u05e1\u05d8", 
    "Available %s": "\u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea %s \u05d6\u05de\u05d9\u05e0\u05d5\u05ea", 
    "Cancel": "\u05d1\u05d9\u05d8\u05d5\u05dc", 
    "Choose": "\u05d1\u05d7\u05e8", 
    "Choose a Date": "\u05d1\u05d7\u05d9\u05e8\u05ea \u05ea\u05d0\u05e8\u05d9\u05da", 
    "Choose a Time": "\u05d1\u05d7\u05d9\u05e8\u05ea \u05e9\u05e2\u05d4", 
    "Choose a time": "\u05d1\u05d7\u05d9\u05e8\u05ea \u05e9\u05e2\u05d4", 
    "Choose all": "\u05d1\u05d7\u05d9\u05e8\u05ea \u05d4\u05db\u05dc", 
    "Chosen %s": "%s \u05d0\u05e9\u05e8 \u05e0\u05d1\u05d7\u05e8\u05d5", 
    "Click to choose all %s at once.": "\u05d1\u05d7\u05d9\u05e8\u05ea \u05db\u05dc \u05d4%s \u05d1\u05d1\u05ea \u05d0\u05d7\u05ea.", 
    "Click to remove all chosen %s at once.": "\u05d4\u05e1\u05e8\u05ea \u05db\u05dc %s \u05d0\u05e9\u05e8 \u05e0\u05d1\u05d7\u05e8\u05d5 \u05d1\u05d1\u05ea \u05d0\u05d7\u05ea.", 
    "December": "\u05d3\u05e6\u05de\u05d1\u05e8", 
    "February": "\u05e4\u05d1\u05e8\u05d5\u05d0\u05e8", 
    "Filter": "\u05e1\u05d9\u05e0\u05d5\u05df", 
    "Hide": "\u05d4\u05e1\u05ea\u05e8", 
    "January": "\u05d9\u05e0\u05d5\u05d0\u05e8", 
    "July": "\u05d9\u05d5\u05dc\u05d9", 
    "June": "\u05d9\u05d5\u05e0\u05d9", 
    "March": "\u05de\u05e8\u05e5", 
    "May": "\u05de\u05d0\u05d9", 
    "Midnight": "\u05d7\u05e6\u05d5\u05ea", 
    "Noon": "12 \u05d1\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd", 
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
    "November": "\u05e0\u05d5\u05d1\u05de\u05d1\u05e8", 
    "Now": "\u05db\u05e2\u05ea", 
    "October": "\u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8", 
    "Remove": "\u05d4\u05e1\u05e8\u05d4", 
    "Remove all": "\u05d4\u05e1\u05e8\u05ea \u05d4\u05db\u05dc", 
    "September": "\u05e1\u05e4\u05d8\u05de\u05d1\u05e8", 
    "Show": "\u05d4\u05e6\u05d2", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "\u05d6\u05d5 \u05e8\u05e9\u05d9\u05de\u05ea %s \u05d4\u05d6\u05de\u05d9\u05e0\u05d9\u05dd \u05dc\u05d1\u05d7\u05d9\u05e8\u05d4. \u05e0\u05d9\u05ea\u05df \u05dc\u05d1\u05d7\u05d5\u05e8 \u05d7\u05dc\u05e7 \u05e2\"\u05d9 \u05e1\u05d9\u05de\u05d5\u05df \u05d1\u05ea\u05d9\u05d1\u05d4 \u05de\u05ea\u05d7\u05ea \u05d5\u05dc\u05d7\u05d9\u05e6\u05d4 \u05e2\u05dc \u05d7\u05e5  \"\u05d1\u05d7\u05e8\" \u05d1\u05d9\u05df \u05e9\u05ea\u05d9 \u05d4\u05ea\u05d9\u05d1\u05d5\u05ea.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "\u05d6\u05d5 \u05e8\u05e9\u05d9\u05de\u05ea %s \u05d0\u05e9\u05e8 \u05e0\u05d1\u05d7\u05e8\u05d5. \u05e0\u05d9\u05ea\u05df \u05dc\u05d4\u05e1\u05d9\u05e8 \u05d7\u05dc\u05e7 \u05e2\"\u05d9 \u05d1\u05d7\u05d9\u05e8\u05d4 \u05d1\u05ea\u05d9\u05d1\u05d4 \u05de\u05ea\u05d7\u05ea \u05d5\u05dc\u05d7\u05d9\u05e6\u05d4 \u05e2\u05dc \u05d7\u05e5 \"\u05d4\u05e1\u05e8\u05d4\" \u05d1\u05d9\u05df \u05e9\u05ea\u05d9 \u05d4\u05ea\u05d9\u05d1\u05d5\u05ea.", 
    "Today": "\u05d4\u05d9\u05d5\u05dd", 
    "Tomorrow": "\u05de\u05d7\u05e8", 
    "Type into this box to filter down the list of available %s.": "\u05e0\u05d9\u05ea\u05df \u05dc\u05d4\u05e7\u05dc\u05d9\u05d3 \u05d1\u05ea\u05d9\u05d1\u05d4 \u05d6\u05d5 \u05db\u05d3\u05d9 \u05dc\u05e1\u05e0\u05df %s.", 
    "Yesterday": "\u05d0\u05ea\u05de\u05d5\u05dc", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "\u05d1\u05d7\u05e8\u05ea \u05e4\u05e2\u05d5\u05dc\u05d4, \u05d5\u05dc\u05d0 \u05e2\u05e9\u05d9\u05ea\u05d4 \u05e9\u05d9\u05e0\u05d5\u05d9\u05d9\u05de \u05e2\u05dc \u05e9\u05d3\u05d5\u05ea. \u05d0\u05ea\u05d4 \u05db\u05e0\u05e8\u05d0\u05d4 \u05de\u05d7\u05e4\u05e9 \u05d0\u05ea \u05d4\u05db\u05e4\u05ea\u05d5\u05e8 \u05dc\u05dc\u05db\u05ea \u05d1\u05de\u05e7\u05d5\u05dd \u05d4\u05db\u05e4\u05ea\u05d5\u05e8 \u05dc\u05e9\u05de\u05d5\u05e8.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "\u05d1\u05d7\u05e8\u05ea \u05e4\u05e2\u05d5\u05dc\u05d4, \u05d0\u05d1\u05dc \u05e2\u05d5\u05d3 \u05dc\u05d0 \u05e9\u05de\u05e8\u05ea \u05d0\u05ea \u05d4\u05e9\u05d9\u05e0\u05d5\u05d9\u05d9\u05dd \u05dc\u05e9\u05d3\u05d5\u05ea \u05d1\u05d5\u05d3\u05d3\u05d9\u05dd. \u05d0\u05e0\u05d0 \u05dc\u05d7\u05e5 \u05e2\u05dc \u05d0\u05d9\u05e9\u05d5\u05e8 \u05db\u05d3\u05d9 \u05dc\u05e9\u05de\u05d5\u05e8. \u05d9\u05d4\u05d9\u05d4 \u05e2\u05dc\u05d9\u05da \u05dc\u05d4\u05e4\u05e2\u05d9\u05dc \u05d0\u05ea \u05d4\u05e4\u05e2\u05d5\u05dc\u05d4 \u05e2\u05d5\u05d3 \u05e4\u05e2\u05dd.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "\u05d9\u05e9 \u05dc\u05da \u05e9\u05d9\u05e0\u05d5\u05d9\u05d9\u05dd \u05e9\u05dc\u05d0 \u05e0\u05e9\u05de\u05e8\u05d5 \u05e2\u05dc \u05e9\u05d3\u05d5\u05ea \u05d9\u05d7\u05d9\u05d3\u05d5\u05ea.  \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e4\u05e2\u05d9\u05dc \u05e4\u05e2\u05d5\u05dc\u05d4, \u05e9\u05d9\u05e0\u05d5\u05d9\u05d9\u05dd \u05e9\u05dc\u05d0 \u05e0\u05e9\u05de\u05e8\u05d5 \u05d9\u05d0\u05d1\u05d3\u05d5.", 
    "one letter Friday\u0004F": "\u05e9", 
    "one letter Monday\u0004M": "\u05e9", 
    "one letter Saturday\u0004S": "\u05e9", 
    "one letter Sunday\u0004S": "\u05e8", 
    "one letter Thursday\u0004T": "\u05d7", 
    "one letter Tuesday\u0004T": "\u05e9", 
    "one letter Wednesday\u0004W": "\u05e8"
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

