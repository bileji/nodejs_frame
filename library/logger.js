/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import log4js from "log4js";
import config from "../config/logger";

class logger {
    
    constructor() {
        log4js.configure({
            appenders: [
                {
                    type: config.type, filename: config.path + "/" + this.log_time() + ".log", category: "log"
                }
            ]
        });
        return config.status ? log4js.getLogger("log") : log4js.getLogger();
    }

    log_time = () => {
        let time = new Date();
        return time.getFullYear() + "-" + ("0" + (time.getMonth() + 1)).substr(-2) + "-" + ("0" + time.getDate()).substr(-2);
    }
}

export default new logger();