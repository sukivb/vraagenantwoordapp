
var linkTranslator = function(languageData) {
    var translator = angular.module('translator', []); 
    var filter = translator.filter("localText", function() {
       
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
      var unknownStrings = new Set([]);
      if (typeof $rootScope.knownLanguages == "undefined")
           knownLanguages = ["en"];
      if (Array(knownLanguages).lastIndexOf(language) == -1)
         language = knownLanguages[0];
      else
         language = language;
    }]);
    
 return this;   
};

    
   