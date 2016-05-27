/*
Configure the Component for Model
ComponentName : model;
Dependencies : none;
Controller: function containing the model
Signature: arguments that can be passed to the controller which we define here;
moduleOptions: none
*/
var myComponentName = "model";
var myDependencies = [];
var myController = function($scope, $params){
    $scope.knownLanguages = ["nl","en"];
    $scope.language = "en";
    $scope.translations = {
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
        // Helpers
        $scope.defaultLanguageData = {
            autoUpdateTranslations:autoUpdateTranslations,
            knownLanguages:knownLanguages,
            language:language,
            translations:translations
            };

};
var mySignature = [];
var myModuleOptions = [];
// Send variables to addComponent to wrap things up
var modelComponent = addComponent(myComponentName,myDependencies, myController, mySignature, myModuleOptions);


