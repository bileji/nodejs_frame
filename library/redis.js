/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import redis from "redis";
import config from "../config/redis";

class Redis {

    constructor() {
        let options = {
            host        : config.host,
            port        : config.port,
            max_attempts: config.max_attempts
        };
        return redis.createClient(options);
    }
}

export default new Redis();