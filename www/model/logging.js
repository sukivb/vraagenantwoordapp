// This is a JavaScript file
var util = require('util');
var LOG = {
        internal : 
        {   "LoglevelEnum":[
                "TRACE",
                "INFO",
                "NOTIFY",
                "WARN",
                "ERROR"
            ],
            "minimumLogLevel":"TRACE",
            "outputs":[]
        },
        "defaultOutputs":[
            console.log,
            alert
            ],
        "addOutput":function(output){LOG.internal.outputs.push(output)},
        "init": function(logLevel, outputs) {
            
        },
        "stacktraceFromLogLevel":"INFO",
        "errorFromLogLevel":"ERROR",
        "getLogLevel":function(){return LOG.internal.minimumLogLevel},
        "setLogLevel":function(logLevel) {
            angular.merge(LOG.internal,{"LoglevelEnum":[
                "TRACE",
                "INFO",
                "NOTIFY",
                "WARN",
                "ERROR"
            ],
            "minimumLogLevel":"TRACE"});
            var minLog = LOG.internal.minimumLogLevel;
            if (logLevel) {
                    LOG.LogLevel = {};
                    var add = true;
                    var validLevels = [];  
                    for (var i = LOG.internal.LoglevelEnum.length; i != 0; i--) {
                       if (logLevel != LOG.internal.LoglevelEnum[i]) {
                                LOG.LogLevel[LOG.internal.LoglevelEnum[i]] = LOG.internal.LoglevelEnum[i];
                                validLevels.push(LOG.internal.LoglevelEnum[i]);
                                LOG.internal.minimumLogLevel = LOG.internal.LoglevelEnum[i];
                       }
                    }
                    LOG.internal.LoglevelEnum = validLevels;
                }
        }    
};


function isLoggable(logLevel) {
    return LOG.internal.LoglevelEnum.indexOf(logLevel) != -1;
};

LOG.send = function() {
    var level = arguments[0];
    var messageIndex = 0;
    if (arguments.length > 1) {
      if (typeof level == "undefined") 
            level = LOG.internal.minimumLogLevel;
    messageIndex++;
    } else {
        level = LOG.getLogLevel();
    }
    
    var MyLog = function(message) {
      if (LOG.internal.LoglevelEnum.indexOf(level) < LOG.internal.LoglevelEnum.indexOf(LOG.stacktraceFromLogLevel)) {
        Error.call(this); //super constructor
        Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object
      }
      this.logLevel = level;
      this.name = this.constructor.name; //set our function’s name as error name.
      this.message = message; //set the error message
    };
    // inherit from Error
    if (LOG.internal.LoglevelEnum.indexOf(level) < LOG.internal.LoglevelEnum.indexOf(LOG.errorFromLogLevel)) {
        util.inherits(MyLog, Error);
    }
    var sendMessage = MyLog(arguments[messageIndex]);
    var loggers = LOG.internal.outputs;
    for (var i = 0; i < loggers; i++) {
        loggers[i](outputs());
    }
};

