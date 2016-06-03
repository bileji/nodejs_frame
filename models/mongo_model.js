/**
 * Created by shuc on 16/5/27.
 */
"use strict";

import mongoose from "mongoose";
import mongo from "../library/mongo";
import helper from "../library/helper";

export default class {

    constructor() {
        this.Schema = mongoose.Schema;
        this.connect = (typeof this.database() == "string") ? mongo.handover(this.database()) : mongo;
        return this.connect.model(this.collection(), this.schema());
    }

    database() {
        return null;
    }

    collection() {
        return this.collection_name = this.collection_name ? this.collection_name : helper.snake_name(this.constructor.name.replace(/Model$/, ""));
    }

    schema() {
        return new this.Schema({});
    }
}