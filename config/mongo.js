/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import env from "../library/env";

class mongo {
    constructor() {
        return {
            "host"    : env("MONGO_HOST", "127.0.0.1"),
            "port"    : env("MONGO_PORT", 27017),
            "user"    : env("MONGO_USER", ""),
            "password": env("MONGO_PASSWORD", ""),
            "database": env("MONGO_DATABASE", "admin"),
            "pool_num": env("MONGO_POOL_NUM", 5)
        };
    }
}

export default new mongo();