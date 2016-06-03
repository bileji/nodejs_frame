/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import service from "./service";
import TestModel from "../../models/test_model";

export default class extends service {

    static dependencies = {
        $dep: 'http/services/deps_service'
    };

    save = () => {
        let data = new TestModel({nickname: "f", user_id: "1"});

        let save_result = data.save();

        save_result.then(doc => {
            console.log(doc);
        });

        return "success save test data to mongodb!";
    };
}