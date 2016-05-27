// This is a JavaScript file
myApp.controller('LoginCtrl', ['$scope', function($scope) {
          $scope.loginData = {};
          $scope.form = null;
          $scope.login = function(loginData) {
             // Hier komt de cloud-user-inlog code.
             monaca.cloud.User.login(loginData.email, loginData.password).done(function()
            {
              console.log('Login is success!');
              ons.navigator.pushPage("register.html", {});
            })
            .fail(function(err)
            {
              console.log(err.message);
              alert('Login failed!');
            });
          }
          
          $scope.ingelogd = function() {
              var logedIn = $scope.app.hasValidUser ||
                            monaca.cloud.User.isAuthenticated();
              return logedIn;
          }
       }
    ]); 
