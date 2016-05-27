(function() {
    var translator = angular.module('translator', ["model"]); 

    this.initTranslator = function() {
        var localTextFilter = translator.filter('localText', ['language', 'translations', 'knownLanguages', function(language,translations,knownLanguages) {
          function localTextFilter(input) {
              if (typeof translations[language] == "undefined")
                return input;
              if (typeof translations[language][input] == "undefined") {
                for (var aLanguage in knownLanguages) {
                    if (typeof translations[aLanguage][input] == "undefined")
                        translations[aLanguage][input] = input;
                }
                return input;
              }
            return translations[language][input];
          }
          localTextFilter.$stateful = true;
        
          return localTextFilter;
        }])
        .controller('LanguageController', ['$scope', 'language', 'translations', 'knownLanguages', function($scope, language, translations, knownLanguages) {
          $scope.unknownStrings = new Set([]);
          if (typeof knownLanguages == "undefined")
                var knownLanguages = ["en"];
           if (Array(knownLanguages).lastIndexOf(language) == -1)
             $scope.language = knownLanguages[0];
          else
             $scope.language = language;
          $scope.translations = translations;
        }]);
    }
    
    if (autoUpdateTranslations) {
    monaca.cloud.Collection("AppSettings").findOne('appID == "VenA" && type == "translations"', "_createdAt DESC")
    .done(function(result)
    {
            // FIXME: For some strange reason the data here in result = null;
            translator.value('knownLanguages',result.knownLanguages);
            translator.value('language',result.language);
            translator.value("translations",result.translations);
            initTranslator();
    })
    .fail(function(err)
    {
        // Use local data
        translator.value('knownLanguages',knownLanguages);
        translator.value('language',language);
        translator.value("translations",translations);
        initTranslator();
    });
} else {
    // Use local data
    translator.value('knownLanguages',knownLanguages);
    translator.value('language',language);
    translator.value("translations",translations);
    initTranslator();
}
    
}());


    
   