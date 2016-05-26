// This is a JavaScript file
myApp.controller('LoginCtrl', ['$scope', function($scope) {
          $scope.loginData = {};
          $scope.form = null;
          $scope.login = function(loginData) {
             // Hier komt de cloud-user-inlog code.
                alert(JSON.stringify(loginData));
          }
          
          $scope.ingelogd = function() {
              var logedIn = $scope.app.hasValidUser ||
                            monaca.cloud.User.isAuthenticated();
              return logedIn;
          }
       }
    ]); 
