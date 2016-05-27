/*
Configure a Component
ComponentName : e.g. "echo" Your components module name as a <String>;
Dependencies : e.g. ["fancy_echo"];
Controller: function($scope, $params) {} Your actions with your own $scope, or from other $scopes via $params
Signature: e.g. ["message", "sender", "displayMethod"]; arguments that can be passed to the controller which we define here basicaly the key values in $params
moduleOptions: []; Extra settings for this module
*/
var myComponentName = "myComponent";
var myDependencies = []; // e.g. [fancy_echo]
// The controller name will always be {{myComponentName}} + 'Ctrl'
var myComponentCtrl = function($scope, $params){
    // Other otherComponentCtrl calls the ng-controller="myComponentCtrl("Hello", user, fancy_echo.displayMethodTypes.3DBounce)" directive.
    // eg. $scope.echo = fancy_echo($params.message, $params.message, $params.displayMethod);
};
/**  The sigature of this function from the caller-end (otherComponentCtrl) will be like specified: myComponentCtrl(message, sender, displayMethod).
     But at the receiving end this will be transformed to:
     funtion( $scope  => {object}, 
                         $params => {
                                     "message":value,
                                     "sender":value, 
                                     "displayMethod":value
                                     }
                       );
**/
var mySignature = [];
// See the angular manual for more info about module options.
var myModuleOptions = [];
// Send variables to addComponent to wrap things up
var myComponent = addComponent(myComponentName,myDependencies, myController, mySignature, myModuleOptions);
// For more information about the component injection into the system execute "{myComponentName}Component.about()";
console.log(JSON.stringify(myComponent));