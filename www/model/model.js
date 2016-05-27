// This is a JavaScript file
var model = angular.module('model',["onsen"]);
var autoUpdateTranslations = false;
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
