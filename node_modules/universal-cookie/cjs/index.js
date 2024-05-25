'use strict';

var cookie = require('cookie');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var cookie__namespace = /*#__PURE__*/_interopNamespaceDefault(cookie);

function hasDocumentCookie() {
    const testingValue = typeof global === 'undefined'
        ? undefined
        : global.TEST_HAS_DOCUMENT_COOKIE;
    if (typeof testingValue === 'boolean') {
        return testingValue;
    }
    // Can we get/set cookies on document.cookie?
    return typeof document === 'object' && typeof document.cookie === 'string';
}
function parseCookies(cookies) {
    if (typeof cookies === 'string') {
        return cookie__namespace.parse(cookies);
    }
    else if (typeof cookies === 'object' && cookies !== null) {
        return cookies;
    }
    else {
        return {};
    }
}
function readCookie(value, options = {}) {
    const cleanValue = cleanupCookieValue(value);
    if (!options.doNotParse) {
        try {
            return JSON.parse(cleanValue);
        }
        catch (e) {
            // At least we tried
        }
    }
    // Ignore clean value if we failed the deserialization
    // It is not relevant anymore to trim those values
    return value;
}
function cleanupCookieValue(value) {
    // express prepend j: before serializing a cookie
    if (value && value[0] === 'j' && value[1] === ':') {
        return value.substr(2);
    }
    return value;
}

class Cookies {
    constructor(cookies, defaultSetOptions = {}) {
        this.changeListeners = [];
        this.HAS_DOCUMENT_COOKIE = false;
        this.update = () => {
            if (!this.HAS_DOCUMENT_COOKIE) {
                return;
            }
            const previousCookies = this.cookies;
            this.cookies = cookie__namespace.parse(document.cookie);
            this._checkChanges(previousCookies);
        };
        const domCookies = typeof document === 'undefined' ? '' : document.cookie;
        this.cookies = parseCookies(cookies || domCookies);
        this.defaultSetOptions = defaultSetOptions;
        this.HAS_DOCUMENT_COOKIE = hasDocumentCookie();
    }
    _emitChange(params) {
        for (let i = 0; i < this.changeListeners.length; ++i) {
            this.changeListeners[i](params);
        }
    }
    _checkChanges(previousCookies) {
        const names = new Set(Object.keys(previousCookies).concat(Object.keys(this.cookies)));
        names.forEach((name) => {
            if (previousCookies[name] !== this.cookies[name]) {
                this._emitChange({
                    name,
                    value: readCookie(this.cookies[name]),
                });
            }
        });
    }
    _startPolling() {
        this.pollingInterval = setInterval(this.update, 300);
    }
    _stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
    }
    get(name, options = {}) {
        if (!options.doNotUpdate) {
            this.update();
        }
        return readCookie(this.cookies[name], options);
    }
    getAll(options = {}) {
        if (!options.doNotUpdate) {
            this.update();
        }
        const result = {};
        for (let name in this.cookies) {
            result[name] = readCookie(this.cookies[name], options);
        }
        return result;
    }
    set(name, value, options) {
        if (options) {
            options = Object.assign(Object.assign({}, this.defaultSetOptions), options);
        }
        else {
            options = this.defaultSetOptions;
        }
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        this.cookies = Object.assign(Object.assign({}, this.cookies), { [name]: stringValue });
        if (this.HAS_DOCUMENT_COOKIE) {
            document.cookie = cookie__namespace.serialize(name, stringValue, options);
        }
        this._emitChange({ name, value, options });
    }
    remove(name, options) {
        const finalOptions = (options = Object.assign(Object.assign(Object.assign({}, this.defaultSetOptions), options), { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0 }));
        this.cookies = Object.assign({}, this.cookies);
        delete this.cookies[name];
        if (this.HAS_DOCUMENT_COOKIE) {
            document.cookie = cookie__namespace.serialize(name, '', finalOptions);
        }
        this._emitChange({ name, value: undefined, options });
    }
    addChangeListener(callback) {
        this.changeListeners.push(callback);
        if (this.HAS_DOCUMENT_COOKIE && this.changeListeners.length === 1) {
            if (typeof window === 'object' && 'cookieStore' in window) {
                window.cookieStore.addEventListener('change', this.update);
            }
            else {
                this._startPolling();
            }
        }
    }
    removeChangeListener(callback) {
        const idx = this.changeListeners.indexOf(callback);
        if (idx >= 0) {
            this.changeListeners.splice(idx, 1);
        }
        if (this.HAS_DOCUMENT_COOKIE && this.changeListeners.length === 0) {
            if (typeof window === 'object' && 'cookieStore' in window) {
                window.cookieStore.removeEventListener('change', this.update);
            }
            else {
                this._stopPolling();
            }
        }
    }
}

module.exports = Cookies;
