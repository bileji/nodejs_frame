/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import Express from "express";
import config from "../config/app";
import container from "./container";

export default class app extends container {

    app_path = "./";

    constructor(app_path) {
        super();

        this.app_path = app_path;

        this.express = new Express();

        typeof config.autoload == "object" && this.autoload(config.autoload, this.app_path);
    }

    resolve = (prefix, service, method, request, response, next) => {
        let object = this.build(prefix + service.match(/[\w_-]+/));

        return object != undefined && Reflect.has(object, method) ? object[method](request, response, next) : {code: 404, message: 'not found', data: {}};
    };

    use = (service, callback, middleware) => {

        this.express.use(service, (request, response, next) => {
            if (typeof callback == "function") {
                return response.json(callback(this));
            }

            switch (typeof middleware) {
                case "function":
                    request = middleware(request, response, next);
                    break;
                case "string":
                    request = this.build('http/middleware/' + middleware, request, response, next);
                    break;
            }

            return response.json(this.resolve('http/services/', service, request.path.match(/[\w_-]+/) + "", request, response, next));
        });
    };

    get = (service, callback, middleware) => {

        this.express.get(service, (request, response, next) => {
            if (typeof callback == "function") {
                return response.json(callback(this));
            }

            switch (typeof middleware) {
                case "function":
                    request = middleware(request, response, next);
                    break;
                case "string":
                    request = this.build('http/middleware/' + middleware, request, response, next);
                    break;
            }

            if (service.match(/[\w_-]+/g).length < 2) {
                return response.json({code: 404, message: 'not found: ' + service, data: {}});
            }

            return response.json(this.resolve('http/services/', service.match(/[\w_-]+/g)[0], service.match(/[\w_-]+/g)[1], request, response, next));
        });
    };

    post = (service, callback, middleware) => {

        this.express.get(service, (request, response, next) => {
            if (typeof callback == "function") {
                return response.json(callback(this));
            }

            switch (typeof middleware) {
                case "function":
                    request = middleware(request, response, next);
                    break;
                case "string":
                    request = this.build('http/middleware/' + middleware, request, response, next);
                    break;
            }

            if (service.match(/[\w_-]+/g).length < 2) {
                return response.json({code: 404, message: 'not found: ' + service, data: {}});
            }

            return response.json(this.resolve('http/services/', service.match(/[\w_-]+/g)[0], service.match(/[\w_-]+/g)[1], request, response, next));
        });
    };

    start = () => {
        this.express.use('*', (request, response) => {
            response.json({code: 404, message: 'not found', data: {}});
        });
        this.express.listen(3000);
    }
}