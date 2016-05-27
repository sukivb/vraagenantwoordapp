var directives = {};

directives['onsInclude'], function($compile) {
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
};