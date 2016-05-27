// This is a JavaScript file
var model = angular.module('model',["onsen"]);
var autoUpdateTranslations = true;
var knownLanguages = ["nl","en"];
var language = "en";
var translations = {
        "nl": {
            // Login-screen Dutch
            "Inloggen":"Inloggen bij",
            "bij":"bij",
            "Verbinden":"Verbinden",
            "Email":"Email",
            "Wachtwoord":"Wachtwoord",
            "Wachtwoord vergeten?":"Forgot password?"
        },
        "en": {
            // Login-screen English
            "Inloggen":"Login",
            "bij":"at",
            "Verbinden":"Connecting",
            "Email":"Email",
            "Wachtwoord":"Password",
            "Wachtwoord vergeten?":"Forgot password?"
        }
    };
    monaca.cloud.Collection("AppSettings").findOne('appID == "VenA" && type == "translations"', "_createdAt DESC")
                .done(function(result)
                {
                $scope.$apply(function() {
                    $scope.setImage(result.logo);
                    $scope.setName(result.brand);
                });
                })
                .fail(function(err)
                {
                   alert("Kon niet met back-end verbinden, een internet verbinding is vereist.");
                   $scope.setImage(null);
                   $scope.setName("Onbekend");
                   $scope.setError(err);
                });
