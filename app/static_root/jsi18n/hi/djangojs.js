

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
    "6 a.m.": "\u0938\u0941\u092c\u0939 6 \u092c\u091c\u0947", 
    "6 p.m.": "6 po po\u0142udniu", 
    "April": "Kwiecie\u0144", 
    "August": "Sierpie\u0144", 
    "Available %s": "\u0909\u092a\u0932\u092c\u094d\u0927 %s", 
    "Cancel": "\u0930\u0926\u094d\u0926 \u0915\u0930\u0947\u0902", 
    "Choose": "\u091a\u0941\u0928\u0947\u0902", 
    "Choose a Date": "Wybierz Dat\u0119", 
    "Choose a Time": "Wybierz Czas", 
    "Choose a time": "\u090f\u0915 \u0938\u092e\u092f \u091a\u0941\u0928\u0947\u0902", 
    "Choose all": "\u0938\u092d\u0940 \u091a\u0941\u0928\u0947\u0902", 
    "Chosen %s": "\u091a\u0941\u0928\u0947\u0902 %s", 
    "Click to choose all %s at once.": "\u090f\u0915 \u0939\u0940 \u092c\u093e\u0930 \u092e\u0947\u0902 \u0938\u092d\u0940 %s \u0915\u094b \u091a\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0947\u0902.", 
    "Click to remove all chosen %s at once.": "\u090f\u0915 \u0939\u0940 \u092c\u093e\u0930 \u092e\u0947\u0902 \u0938\u092d\u0940 %s \u0915\u094b \u0939\u091f\u093e\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0947\u0902.", 
    "December": "Grudzie\u0144", 
    "February": "Luty", 
    "Filter": "\u091b\u093e\u0928\u0928\u093e", 
    "Hide": "  \u091b\u093f\u092a\u093e\u0913", 
    "January": "Stycze\u0144", 
    "July": "Lipiec", 
    "June": "Czerwiec", 
    "March": "Marzec", 
    "May": "Maj", 
    "Midnight": "\u092e\u0927\u094d\u092f\u0930\u093e\u0924\u094d\u0930\u0940", 
    "Noon": "\u0926\u094b\u092a\u0939\u0930", 
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
    "Now": "\u0905\u092c", 
    "October": "Pa\u017adziernik", 
    "Remove": "\u0939\u091f\u093e\u0928\u093e", 
    "Remove all": "\u0938\u092d\u0940 \u0915\u094b \u0939\u091f\u093e\u090f\u0901", 
    "September": "Wrzesie\u0144", 
    "Show": "\u0926\u093f\u0916\u093e\u0913", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "\u092f\u0939 \u0909\u092a\u0932\u092c\u094d\u0927 %s \u0915\u0940 \u0938\u0942\u091a\u0940 \u0939\u0948. \u0906\u092a \u0909\u0928\u094d\u0939\u0947\u0902 \u0928\u0940\u091a\u0947 \u0926\u093f\u090f \u0917\u090f \u092c\u0949\u0915\u094d\u0938 \u092e\u0947\u0902 \u0938\u0947 \u091a\u092f\u0928 \u0915\u0930\u0915\u0947 \u0915\u0941\u091b \u0915\u094b \u091a\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0909\u0938\u0915\u0947 \u092c\u093e\u0926 \u0926\u094b \u092c\u0949\u0915\u094d\u0938 \u0915\u0947 \u092c\u0940\u091a \"\u091a\u0941\u0928\u0947\u0902\" \u0924\u0940\u0930 \u092a\u0930 \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0947\u0902.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "\u092f\u0939 \u0909\u092a\u0932\u092c\u094d\u0927 %s \u0915\u0940 \u0938\u0942\u091a\u0940 \u0939\u0948. \u0906\u092a \u0909\u0928\u094d\u0939\u0947\u0902 \u0928\u0940\u091a\u0947 \u0926\u093f\u090f \u0917\u090f \u092c\u0949\u0915\u094d\u0938 \u092e\u0947\u0902 \u0938\u0947 \u091a\u092f\u0928 \u0915\u0930\u0915\u0947 \u0915\u0941\u091b \u0915\u094b \u0939\u091f\u093e \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0909\u0938\u0915\u0947 \u092c\u093e\u0926 \u0926\u094b \u092c\u0949\u0915\u094d\u0938 \u0915\u0947 \u092c\u0940\u091a \"\u0939\u091f\u093e\u092f\u0947\u0902\" \u0924\u0940\u0930 \u092a\u0930 \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0947\u0902.", 
    "Today": "\u0906\u091c", 
    "Tomorrow": "\u0915\u0932", 
    "Type into this box to filter down the list of available %s.": "\u0907\u0938 \u092c\u0949\u0915\u094d\u0938 \u092e\u0947\u0902 \u091f\u093e\u0907\u092a \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0928\u0940\u091a\u0947 \u0909\u092a\u0932\u092c\u094d\u0927 %s \u0915\u0940 \u0938\u0942\u091a\u0940 \u0915\u094b \u092b\u093c\u093f\u0932\u094d\u091f\u0930 \u0915\u0930\u0947\u0902.", 
    "Yesterday": "\u0915\u0932 (\u092c\u0940\u0924\u093e)", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "\u0906\u092a \u0928\u0947 \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 \u091a\u0941\u0928\u0940 \u0939\u0948\u0902, \u0914\u0930 \u0906\u092a \u0928\u0947 \u0938\u094d\u0935\u0924\u0902\u0924\u094d\u0930 \u0938\u092e\u094d\u092a\u093e\u0926\u0928\u0915\u094d\u0937\u092e \u0915\u094d\u0937\u0947\u0924\u094d\u0930/\u0938\u094d\u0924\u092e\u094d\u092d \u092e\u0947\u0902 \u092c\u0926\u0932 \u0928\u0939\u0940\u0902 \u0915\u093f\u092f\u0947 \u0939\u0948\u0902|  \u0938\u0902\u092d\u0935\u0924\u0903 '\u0938\u0947\u0935' \u092c\u091f\u0928 \u0915\u0947 \u092c\u091c\u093e\u092f \u0906\u092a '\u0917\u094b' \u092c\u091f\u0928 \u0922\u0942\u0928\u094d\u0922 \u0930\u0939\u0947 \u0939\u094b |", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "\u0906\u092a \u0928\u0947 \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 \u0924\u094b \u091a\u0941\u0928\u0940 \u0939\u0948\u0902, \u092a\u0930 \u0938\u094d\u0935\u0924\u0902\u0924\u094d\u0930 \u0938\u092e\u094d\u092a\u093e\u0926\u0928\u0915\u094d\u0937\u092e \u0915\u094d\u0937\u0947\u0924\u094d\u0930/\u0938\u094d\u0924\u092e\u094d\u092d \u092e\u0947\u0902 \u0915\u093f\u092f\u0947 \u0939\u0941\u090f \u092c\u0926\u0932 \u0905\u092d\u0940 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0928\u0939\u0940\u0902 \u0915\u093f\u092f\u0947 \u0939\u0948\u0902| \u0909\u0928\u094d\u0939\u0947\u0902 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u0943\u092a\u092f\u093e '\u0913\u0915\u0947' \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0947 | \u0906\u092a \u0915\u094b \u091a\u0941\u0928\u0940 \u0939\u0941\u0908 \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 \u0926\u094b\u092c\u093e\u0930\u093e \u091a\u0932\u093e\u0928\u0940 \u0939\u094b\u0917\u0940 |", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "\u0938\u094d\u0935\u0924\u0902\u0924\u094d\u0930 \u0938\u092e\u094d\u092a\u093e\u0926\u0928\u0915\u094d\u0937\u092e \u0915\u094d\u0937\u0947\u0924\u094d\u0930/\u0938\u094d\u0924\u092e\u094d\u092d \u092e\u0947\u0902 \u0915\u093f\u092f\u0947 \u0939\u0941\u090f \u092c\u0926\u0932 \u0905\u092d\u0940 \u0930\u0915\u094d\u0937\u093f\u0924 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902 | \u0905\u0917\u0930 \u0906\u092a \u0915\u0941\u091b \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 \u0915\u0930\u0924\u0947 \u0939\u094b \u0924\u094b \u0935\u0947  \u0916\u094b \u091c\u093e\u092f\u0947\u0902\u0917\u0947 |", 
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

