/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import service from "./service";

export default class extends service {

    static dependencies = {
        $other: "http/services/other_service"
    };

    dep = (deps, func) => {

    };
}