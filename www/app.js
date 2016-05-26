// This is a JavaScript file
var myApp = angular.module('myApp',['onsen']);

    myApp.controller('AppController', ['$scope', function($scope) {
          $scope.app = {};
          $scope.app.hasValidUser = false;
          $scope.app.myNavigator;
          $scope.modal = null;
          $scope.pageModel = {};
          $scope.pageModel["login"] = {email:{value:"",valid:false}, password:{value:"",valid:false}, valid:false};
          $scope.pageModel["register"] = {username:"", email:"", password:"", passwordrepeat:""};
          if (!$scope.hasCache) {
             if ($scope.modal != null)
                $scope.modal.show();
             $scope.image = null;
             $scope.name = "Onbekend";
             $scope.currentPage = "index.html";
          }
          
          $scope.login = function() {
             // Hier komt de cloud-user-inlog code.
             if ($scope.pageModel.login.valid) {
                 alert("Goedzo!");
                 $scope.app.myNavigator.pushPage('register.html');
             } else {
                 alert("U dient een geldig email adres en wachtwoord in te vullen.");
             }
          }
          
          $scope.checkMailValid = function(email) {
              if (typeof email.value === undefined || !email.value) {
                   $scope.pageModel.login.email.valid = false;
                    return $scope.pageModel.login.email.valid;
              }
              
               if ((email.value.indexOf("@") > 1) 
                    && (email.value.indexOf(".") > email.value.indexOf("@")+1) 
                    && (email.value.length > email.value.indexOf(".")+2))
                   $scope.pageModel.login.email.valid = true;
              return $scope.pageModel.login.email.valid;
          }
          
          $scope.checkPasswordValid = function(password) {
              if (typeof password.value === undefined || !password.value) {
                   $scope.pageModel.login.password.valid = false;
                   return $scope.pageModel.login.password.valid;
              }
              if (password.value.length > 0)
                   $scope.pageModel.login.password.valid = true;
              return $scope.pageModel.login.password.valid; 
          }
          
          $scope.validate = function() {
               if (arguments[0] == 'login') {
                   // handle login form
                    if (arguments[1] == "email") {
                        $scope.pageModel.login.email.valid = $scope.checkMailValid($scope.pageModel.login.email);
                    } else if (arguments[1] == "password") {
                        $scope.pageModel.login.password.valid = $scope.checkPasswordValid($scope.pageModel.login.password);
                    }
               $scope.pageModel.login.valid = ($scope.pageModel.login.email.valid && $scope.pageModel.login.password.valid);    
               return $scope.pageModel.login.valid;
               } else if (arguments[0] == 'register')  {
               }
          }
          
          $scope.ingelogd = function() {
              var logedIn = $scope.app.hasValidUser ||
                            monaca.cloud.User.isAuthenticated();
              return logedIn;
          }
          $scope.setImage = function(imgData) { 
                 $scope.hasCache = true;
                 $scope.image = imgData;
              };
          $scope.setName = function(name) { 
                $scope.hasCache = true;
                $scope.name = name;
              };
          $scope.setError = function(error) { 
                $scope.error = error;
                $scope.hasCache = false;
              };
          if (!$scope.hasCache) {
              $scope.StyleAPI = monaca.cloud.Collection("LogoAndStyle");
              $scope.StyleAPI.findOne('appID == "VenA"', "_createdAt DESC")
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
              }
        }
    ]);
    
     myApp.directive('onsInclude', function($compile) {
        return {
            replace : true,
            scope : false,
            restrict : 'EA',
            link : function($scope, $element, $attrs) {

                $scope.onsIncludeCurrentPage = $attrs.page;

                var DOM = angular.element(
                    "<div class='ons_include_container'> \n" +
                    "<div class='ons_include' ng-include='onsIncludeCurrentPage'> \n" +
                    "</div> \n" +
                        "</div>");
                var $e =$compile(DOM)($scope);
                $element.replaceWith($e);
            }
        };
    });
    
    
//var myApp = angular.module('myApp',['onsen']);