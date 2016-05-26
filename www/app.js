// This is a JavaScript file
var myApp = angular.module('myApp',['onsen']);

    myApp.controller('AppController', ['$scope', function($scope) {
          $scope.app = {};
          $scope.app.hasValidUser = false;
          $scope.app.navi;
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
             
          }
          
          $scope.checkMailValid = function(email) {
              if (typeof email.value === undefined || !email.value)
                   email.valid = false;
                   return;
               if ((email.value.indexOf("@") > 1) 
                    && (email.value.indexOf(".") > email.value.indexOf("@")+1) 
                    && (email.value.length > email.value.indexOf(".")+2))
                   email.valid = true;
          }
          
          $scope.checkPasswordValid = function(password) {
              if (typeof password.value === undefined || !password.value)
                   password.value = false;
                   return;
              if (password.value.length > 0)
                   password.valid = true;
          }
          
          
        $scope.$watch('pageModel.login.email.valid', function() {
            if ($scope.pageModel.login.email.valid)
                $scope.pageModel.login.email.invalid ="";
            else
                $scope.pageModel.login.email.invalid =" invalid";
            
        });
          
          $scope.$watch('pageModel.login.password.valid', function() {
            if ($scope.pageModel.login.password.valid)
                $scope.pageModel.login.password.invalid ="";
            else
                $scope.pageModel.login.password.invalid =" invalid";
            
        });
          $scope.validate = function() {
               if (arguments[0] == 'login') {
                   // handle login form
                   if (arguments[1] == "email") {
                    $scope.pageModel.login.email.valid = $scope.checkMailValid($scope.pageModel.login.email);
                   } else if (arguments[1] == "password") {
                    $scope.pageModel.login.password.valid = $scope.checkPasswordValid($scope.pageModel.login.password);
                   } else {
                    $scope.pageModel.login.valid = $scope.pageModel.login.email.valid
                        && $scope.pageModel.login.password.valid;
                   }
               } else if (arguments[0] == 'register')  {
                   $scope.pageModel.valid = false;
               }
          }
          
          $scope.ingelogd = function() {
              var logedIn = $scope.app.hasValidUser ||
                            monaca.cloud.User.isAuthenticated();
              console.log("Logged in:"+logedIn);
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