
var application = angular.module('application', ["onsen"]);

var SettingsAPI = (typeof monaca != 'undefined') ?  monaca.cloud.Collection("AppSettings") : null;

var languageAPICall = function ($q,scope){
    var deferred = $q.defer();
    deferred.notify(scope.defaultLanguageData);
    if (SettingsAPI) {
        SettingsAPI.findOne('appID == "VenA" && type == "translations"', "_createdAt DESC")
            .done(function (result) {
                var languageData = result;
                deferred.resolve(languageData);
            })
            .fail(function (err) {
                console.log("Could not connect to languages API: " + err);
                deferred.reject(err);
            });
    } else {
        // Cannot connect to cloud in debug mode return default
        console.log("Cannot connect to cloud in debug mode return default");
        deferred.resolve(scope.defaultLanguageData);
    }

    return deferred.promise;
};

var styleAPICall = function ($q,scope) {

    var deferred = $q.defer();
    if (typeof scope.hasCache == "undefined") {
        if (SettingsAPI) {
            SettingsAPI.findOne('appID == "VenA" && type == "brand"', "_createdAt DESC")
                .done(function (result) {
                    scope.hasCache = true;
                    deferred.resolve(result);
                })
                .fail(function (err) {
                    alert("Kon niet met back-end verbinden, een internet verbinding is vereist.");
                    deferred.reject(err);
                });
        } else {
            // Cannot connect to cloud in debug mode return default
            console.log("Cannot connect to cloud in debug mode return default");
            deferred.resolve({"logo":scope.logo, "brand":scope.brand});
        }
    } else  {
        deferred.resolve({"logo":scope.logo, "brand":scope.brand});
    }

    return deferred.promise;
};


application.controller('LoginCtrl', ['$scope', function($scope) {
    $scope.loginData = {};
    $scope.form = null;
    $scope.image = $scope.myNavigator.topPage.data.logo;
    $scope.name = $scope.myNavigator.topPage.data.brand;

    $scope.login = function(loginData) {
        // Hier komt de cloud-user-inlog code.
        monaca.cloud.User.login(loginData.email, loginData.password).done(function()
        {
            console.log('Login is success!');
            $scope.myNavigator.pushPage("register.html", $scope.navOptions);
        })
            .fail(function(err)
            {
                console.log(err.message);
                alert('Login failed!');
            });
    }

    
}
]);


application.controller('ApplicationCtrl', ['$q','$scope', function($q,$scope) {
    $scope.ingelogd = function() {
        return (typeof monaca != 'undefined') ? monaca.cloud.User.isAuthenticated() : false;
    }



    var promiseStyle = styleAPICall($q,$scope);

    var promiseLanguage= languageAPICall($q,$scope);

    promiseStyle.then(function(result) {
        console.log('Success: ' + result);

        $scope.$applyAsync(function(){
            $scope.image = result.logo;
            $scope.name = result.brand;
        });
        promiseLanguage.then(function(result) {
            console.log('Success: ' + result);


                languageData = result;
                $scope.navOptions = {
                    animation: 'slide', // What animation to use
                };
                if ($scope.ingelogd())
                    $scope.myNavigator.pushPage('navigator.html',$scope.navOptions);
                else
                    $scope.myNavigator.pushPage('login.html',$scope.navOptions);
            });
        }, function(reason) {
            console.log('Failed: ' + reason);
        }, function(update) {
            console.log('Got notification: ' + update);
            languageData = result;
    }, function(reason) {
        console.log('Failed: ' + reason);
    });




}]);