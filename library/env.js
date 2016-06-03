/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import node_env from "node-env-file";

export class env {

    constructor() {
        try {
            this.env = node_env('.env');
        } catch (e) {
            this.env = {};
        }
    }

    get = (name, value) => {
        return this.env.hasOwnProperty(name) ? this.env[name] : value;
    };
}

export default (new env().get);