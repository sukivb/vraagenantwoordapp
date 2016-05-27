// This is a JavaScript file
var linkMyApp = function(linker,forAppScope) {  
    alert("hier");
    var myApp = angular.module('myApp',['linker']);
        
    myApp.controller('AppController', ['$scope', function($scope, $params) {
          angular.merge($scope, $params["linkModel"]);
        }
    ]);

    return myApp;
}
