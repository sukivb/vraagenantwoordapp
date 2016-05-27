// This is a JavaScript file
var myApp = angular.module('myApp',['onsen','model','translator']);
    
    myApp.controller('AppController', ['$scope', function($scope) {
          $scope.app = {};
          $scope.pageModel = {};
          $scope.app.hasValidUser = false;
          $scope.app.myNavigator;
          $scope.modal = null;
         
          if (!$scope.hasCache) {
             if ($scope.modal != null)
                $scope.modal.show();
             $scope.image = null;
             $scope.name = "Onbekend";
             $scope.currentPage = "index.html";
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
              $scope.StyleAPI = monaca.cloud.Collection("AppSettings");
              $scope.StyleAPI.findOne('appID == "VenA" && type == "brand"', "_createdAt DESC")
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
// myApp.config(function($provide, $compileProvider, $filterProvider) {
//     $filterProvider.register('filterName', ...);
//   });
 
    
//var myApp = angular.module('myApp',['onsen']);