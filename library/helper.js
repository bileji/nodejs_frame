/**
 * Created by shuc on 16/5/27.
 */
"use strict";

export default class {
    
    static snake_name(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "");
    }
}