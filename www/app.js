// This is a JavaScript file
var myApp = angular.module('myApp',['onsen']);

    myApp.controller('AppController', ['$scope', function($scope) {
          $scope.app = {};
          $scope.app.hasValidUser = false;
          $scope.app.navi;
          $scope.modal = null;
          $scope.pageModel = {};
          $scope.pageModel["login"] = {email:"", password:""};
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
              if (typeof email === undefined || !email)
                   return false;
               var valid = false;
               if ((email.indexOf("@") > 1) && (email.indexOf(".") > email.indexOf("@")+1) && (email.length > email.indexOf(".")+2))
                   valid = true;
               return valid;
          }
          
          $scope.validate = function() {
              var valid = true;
               if (arguments[0] == 'login') {
                   // handle login form
                   if (arguments[1] == "email") {
                    valid = $scope.checkMailValid($scope.pageModel.login.email);
                   } 
               } else if (arguments[0] == 'register')  {
                   valid = false;
               }
               return valid;
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