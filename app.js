/**
 * Created by shuc on 16/5/30.
 */
"use strict";

import app from "./library/application";

let route = new app(__dirname);

route.use('/test_service');

route.start();