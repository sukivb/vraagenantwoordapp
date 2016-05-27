// This is a JavaScript file
    
    var linker = angular.module('linker', ["login","translator","model","onsen"]); 
    
    var forAppScope = {};
    
    var SettingsAPI = monaca.cloud.Collection("AppSettings");

    var languageAPICall = function (callback){
        SettingsAPI.findOne('appID == "VenA" && type == "translations"', "_createdAt DESC")
        .done(function(result)
        { 
            languageData = result;
            styleAPICall(languageData,callback);
        })
        .fail(function(err)
        {
            console.log("Could not connect to languages API");
            languageData = defaultLanguageData;
            callback(languageData);
        });
    };
    
    var styleAPICall = function (languageData,callback) {
                if (typeof forAppScope.hasCache == "undefined") {
                        
                  SettingsAPI.findOne('appID == "VenA" && type == "brand"', "_createdAt DESC")
                    .done(function(result)
                    {
                        forAppScope.image = result.logo;
                        forAppScope.name = result.brand;
                        callback(languageData);
                    })
                    .fail(function(err)
                    {
                       alert("Kon niet met back-end verbinden, een internet verbinding is vereist.");
                       callback(languageData);
                    });
                  } else  {
                        callback(languageData);
                  }
            };
    
    var link = function(config, callback){
        alert("test");
        var root = config;
        var myApp = null;
        var translator = null;
        var link = null;
        languageAPICall(function(data){
            alert(1);
            translator = linkTranslator(data);
            alert(2);
            myApp = linkMyApp(linker,forAppScope);
            alert(3);
            link = linkLoginCtrl(myApp);
            alert(4);
            callback(myApp);
      });
    }  ; 
    
