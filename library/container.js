/**
 * Created by shuc on 16/5/27.
 *
 * 设计思路
 * step1. 将所有服务注册进provider
 *
 * step2. 将所有需要的class装载入container
 */
"use strict";

import auto_loader from "auto-loader";

export default class {

    provider = {};

    container = {};

    // 自动载入(为了降低复杂度只载入default)
    autoload = (dirnames, app_root) => {
        (typeof dirnames == "string") && (dirnames = [dirnames]);

        for (let dir_name of dirnames.values()) {
            let abstracts = auto_loader.load(app_root + "/" + dir_name);
            for (let [name, abstract] of Object.entries(abstracts)) {
                (name && abstract) && (this.register((dir_name.replace(app_root + "/", "") + "/" + name), abstract.default));
            }
        }
    };

    // 注册
    register = (name, abstract) => {
        (name && (this.is_object(abstract) || this.is_function(abstract))) && (this.provider[name] = abstract);
    };

    // 解析
    resolve = (name) => {
        return this.build(name);
    };

    // 给class绑定名字(全为单例)
    singleton = (name, object) => {
        if (this.is_object(object)) {
            return this.container[name] = object;
        } else if (this.is_function(object)) {
            this.provider[name] = object;
            return this.container[name] = this.build(name);
        }
        return false;
    };

    // 实例化所有
    make = () => {
        for (let name of Object.keys(this.provider)) {
            this.build(name);
        }
    };

    // 构建实例
    build = (name) => {
        if (this.is_object(this.container[name]) && this.is_object(this.container[name])) {
            // 如果对象已实例，则直接返回
            return this.container[name];
        } else {
            if (this.provider[name]) {
                let dependencies = this.provider[name].dependencies, map = this.object_to_map(new (this.provider[name])());
                if (dependencies) {
                    for (let [key, value] of Object.entries(dependencies)) {
                        (key && value) && (map[key] = this.build(value));
                    }
                }
                return this.container[name] = map;
            }
        }
    };

    // 将对象转化为可通过键值对访问的MAP
    object_to_map = (object) => {
        let map = new Map();
        for (let [key, value] of Object.entries(object)) {
            (key && value) && (map[key] = value);
        }
        return map;
    };

    // 判断是否是对象
    is_object = (object) => {return typeof object == "object";};

    // 判断是否是函数
    is_function = (func) => {return typeof func == "function";};
}