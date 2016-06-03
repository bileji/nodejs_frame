/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import env from "../library/env";

class logger {
    constructor() {
        return {
            "type"  : env("LOGGER_TYPE", "file"),
            "path"  : env("LOGGER_PATH", "./storage/logs"),
            "status": env("LOGGER_STATUS", true)
        };
    }
}

export default new logger();