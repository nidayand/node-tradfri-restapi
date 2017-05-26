'use strict';

require("process").title = 'node-tradfri-restapi';

var config = require("config");

var express = require("express"),
    app = express(),
    port = process.env.PORT || config.port || 3000;

var routes = require("./api/routes.js");
routes(app);

app.listen(port);

console.log("tradfri restful API listens on port: "+port);
