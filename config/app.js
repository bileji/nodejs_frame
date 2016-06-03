/**
 * Created by shuc on 16/5/30.
 */
"use strict";

import env from "../library/env";

class app {
    constructor() {
        return {
            "autoload": ["http/services", "http/middleware", "models"]
        };
    }
}

export default new app();