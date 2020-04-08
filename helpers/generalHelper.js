const { v4: uuidv4 } = require('uuid');
let generalHelper = module.exports;

/**
 * generates a new uuid
 * @returns {*}
 */
generalHelper.generateId = function () {
    return uuidv4();
}

/**
 * check variable for empty value
 * @param value
 * @returns {boolean}
 */
generalHelper.isEmpty = function (value) {
    // test results
    //---------------
    // []        true, empty array
    // {}        true, empty object
    // null      true
    // undefined true
    // ""        true, empty string
    // ''        true, empty string
    // 0         false, number
    // true      false, boolean
    // false     false, boolean
    // Date      false
    // function  false

    if (value === undefined)
        return true;

    if (typeof (value) === 'function' ||
        typeof (value) === 'number' ||
        typeof (value) === 'boolean' ||
        Object.prototype.toString.call(value) === '[object Date]')
        return false;

    if (value === null || value.length === 0) // null or 0 length array
        return true;

    if (typeof (value) === "object") {
        // empty object
        var r = true;
        if (Object.keys(value).length > 0) {
            r = false;
        }
        return r;
    }

    if (typeof (value) === "string" && value.trim() === "") {
        return true;
    }

    return false;
}

/**
 * compare two strings and returns true if match else false
 * @param str1
 * @param str2
 * @returns {boolean}
 */
generalHelper.cmpStr = function (str1, str2) {
    if (typeof str1 !== typeof undefined && typeof str2 !== typeof undefined) {
        if (String(str1).toLowerCase() === String(str2).toLowerCase()) {
            return true;
        }
    }
    return false;
}

/**
 * compare two booleans and returns true if match else false
 * @param value1
 * @param value2
 * @returns {boolean}
 */
generalHelper.cmpBool = function (value1, value2) {
    if (typeof value1 !== typeof undefined && typeof value1 !== typeof undefined) {
        if (Boolean(value1) === Boolean(value2)) {
            return true;
        }
    }
    return false;
}

/**
 * compare two integer and returns true if match else false
 * @param value1
 * @param value2
 * @returns {boolean}
 */
generalHelper.cmpInt = function (value1, value2) {
    if (typeof value1 !== typeof undefined && typeof value1 !== typeof undefined) {
        if (parseInt(value1, 10) === parseInt(value2, 10)) {
            return true;
        }
    }
    return false;
}