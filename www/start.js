// This is a JavaScript file
var config = angular.module("config", ["linker"]);
var runtime = "not running yet";
link(config, function(app){runtime=app});