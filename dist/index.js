"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var PangeaJSONSchemas;
(function (PangeaJSONSchemas) {
    PangeaJSONSchemas.GetSchema = function (path) {
        return fs.readFileSync(__dirname + "/" + path);
    };
})(PangeaJSONSchemas = exports.PangeaJSONSchemas || (exports.PangeaJSONSchemas = {}));
