/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import crypto from "crypto";
import mongoose from "mongoose";
import logger from "./logger";
import config from "../config/mongo";

class mongo {
    pool = new Map();

    constructor() {
        this.get_uri().connect();
        return this;
    }

    get_uri (host, port, database) {
        this.uri = "mongodb://" + (host ? host : config.host) + ":" + (port ? port : config.port) + "/" + (database ? database : config.database);
        return this;
    }

    connect (uri, options) {
        uri == undefined && (uri = this.uri);
        if (!options || options == undefined) {
            options = {
                user  : config.user,
                pass  : config.password,
                server: {poolSize: config.pool_num}
            };
        }

        let pool_unique_key = this.md5(uri);
        if (this.pool.get(pool_unique_key) == undefined) {
            this.mongoose = mongoose.createConnection(uri, options);
            this.mongoose.on("error", () => {logger.error("mongodb connecting error.");});
            this.pool.set(pool_unique_key, this.mongoose);
        } else {
            this.mongoose = this.pool.get(pool_unique_key);
        }
        return this;
    }

    model (collection, schema) {
        return this.mongoose.model(collection, schema);
    }

    handover (database, options) {
        return this.clone(this).get_uri(null, null, database).connect(null, options);
    }

    md5 (text) {
        let hash = crypto.createHash('md5');
        hash.update(text);
        return hash.digest('hex');
    }

    clone (origin) {
        return Object.assign(Object.create(Object.getPrototypeOf(origin)), origin);
    }
}

export default new mongo();