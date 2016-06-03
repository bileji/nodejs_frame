/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import env from "../library/env";

class redis {
    constructor() {
        return {
            "host": env("REDIS_HOST", "192.168.99.100"),
            "port": env("REDIS_PORT", 6379),
            max_attempts: 4
        };
    }
}

export default new redis();