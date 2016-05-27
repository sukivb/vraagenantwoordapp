// This is a JavaScript file
var CTRL_POSTFIX = "Ctrl";
var components = {};
var availableDependencies = [];
var addComponent = function() {
    if (arguments.length < 4) {
        alert("Not enough parameters, expected at least module and dependencies and a controller and his signature");
        throw "Not enough parameters, expected at least module and dependencies and a controller and his signature";
    }
    var componentName = arguments[0];
    var controllerName = componentName+CTRL_POSTFIX;
    var dependencies = arguments[1];
    var controller = arguments[2];
    var signature = arguments[3];
    if (arguments.length > 4)
        var moduleOptions = arguments[4];
    if (typeof components[arguments[0]] != "undefined") {
        alert("Already added component: "+componentName);
        throw "Already added component: "+componentName;
    }
    
    
    var ctrlWrapper = function(componentName, signature)
    {
        return function() {
            $scope = arguments[0];
            $arguments = {};
            if (arguments.length !== signature.length+1) {
                alert(controller+"s signature: $scope => "+JSON.stringify(signature)+" does not match: "+arguments);
                throw controller+"s signature: $scope => "+JSON.stringify(signature)+" does not match: "+arguments;
            }
            for (var i = 0; i < signature.length; i++)
                $arguments[signature[i]] = arguments[i+1];
            var result = controller($scope,$arguments);
            components[componentName]["controllerLinkCount"]++;
        }
    };
    var runnableCtrl = ctrlWrapper(componentName,signature);
    
    var moduleWrapper = function()
    {
        return function() {
            $componentName = componentName;
            $dependencies = dependencies;
            $moduleOptions = [];
            if (typeof moduleOptions != "undefined")
                $moduleOptions = moduleOptions;
            return angular.module(componentName, dependencies, moduleOptions);
        }
    };
    var runnableModule = moduleWrapper(componentName,dependencies,moduleOptions);
    var dependencies = {};
      dependencies["availableDependencies"]=availableDependencies;
      dependencies["requiredDependencies"]=moduleDependencies;
      dependencies["matchingDependencies"]=$.map(dependencies.availableDependencies,function(a){return $.inArray(a, dependencies.requiredDependencies) < 0 ? null : a;});
      dependencies["obsoleteDependencies"]=$.map(dependencies.availableDependencies,function(a){return $.inArray(a, dependencies.requiredDependencies) < 0 ?
       a : null;});
      dependencies["missingDependencies"]=$.map(dependencies.requiredDependencies,function(a){return $.inArray(a, dependencies.matchingDependencies) != -1 ? null : a;});
    
    components[componentName] = {
        "componentName":componentName,
        "moduleName":moduleName,
        "module":runnableModule,
        "moduleOptions":moduleOptions,
        "moduleDependencies":dependencies,
        "controllerName":controllerName,
        "controller":runnableCtrl,
        "controllerSignature":signature,
        "controllerLinkCount":0,
        "about": function() {console}
    };
    runnableModule().controller(controllerName, constructor);
    availableDependencies.push([componentName]);
    return components[componentName];
};

