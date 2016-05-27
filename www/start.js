/*
Configure a Component
ComponentName : e.g. "echo" Your components module name as a <String>;
Dependencies : e.g. ["fancy_echo"];
Controller: function($scope, $params) {} Your actions with your own $scope, or from other $scopes via $params
Signature: e.g. ["message", "sender", "displayMethod"]; arguments that can be passed to the controller which we define here basicaly the key values in $params
moduleOptions: []; Extra settings for this module
*/
var myComponentName = "config";
var myDependencies = ["linker"]; // e.g. [fancy_echo]
var configCtrl = function($scope, $params){
    link(config, function(app){$scope.runtime =app});
};
var mySignature = [];
// See the angular manual for more info about module options.
var myModuleOptions = [];
// Send variables to addComponent to wrap things up
var myComponent = addComponent(myComponentName,myDependencies, myController, mySignature, myModuleOptions);
// For more information about the component injection into the system execute "{myComponentName}Component.about()";
console.log(JSON.stringify(myComponent));