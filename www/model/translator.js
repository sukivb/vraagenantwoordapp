
    application.filter("localText", function() {
       var localTextFilter = function(input) {
          if (typeof languageData.translations[languageData.language] == "undefined")
            return input;
          if (typeof languageData.translations[languageData.language][input] == "undefined") {
            for (var index = 0; index < languageData.knownLanguages.length; index++) {
                if (typeof languageData.translations[languageData.knownLanguages[index]][input] == "undefined")
                    languageData.translations[languageData.knownLanguages[index]][input] = input;
            }
            return input;
          }
        return languageData.translations[languageData.language][input];
      }
      return localTextFilter;
    }).controller('LanguageController', ['$scope', function($scope) {
      if (typeof languageData.knownLanguages == "undefined")
          languageData.knownLanguages = ["en"];
      if (Array(languageData.knownLanguages).lastIndexOf(languageData.language) == -1)
          languageData.language = languageData.knownLanguages[0];
        
    }]);

