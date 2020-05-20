(function () {
    var Exorun, encode, handleResponse, request, defaultHeaders;
    request = require('request');
    querystring = require('querystring');
    encode = encodeURIComponent;
    defaultHeaders = {};
    Exorun = (function () {
        function Exorun() {
            this.basehost = 'https://api.exorun.io/';
        }
        Exorun.prototype.request = function (method, path, body, cb) {
            var req;
            defaultHeaders['Content-Type'] = "application/x-www-form-urlencoded";
            req = {
                uri: this.basehost + encodeURI(path),
                method: method,
                body: querystring.stringify(body),
                headers: defaultHeaders
            };
            return request(req, handleResponse(cb));
        }
        Exorun.prototype.get = function (path, cb) {
            return this.request("GET", path, null, cb);
        };
        Exorun.prototype.post = function (path, body, cb) {
            return this.request("POST", path, body, cb);
        };
        Exorun.prototype.del = function (path, body, cb) {
            return this.request("DELETE", path, body, cb);
        };
        Exorun.prototype.register = function (username, password, email, cb) {
            var postdata;
            postdata = {
                username,
                password,
                email
            }
            return this.post("user/register", postdata, cb);
        }
        Exorun.prototype.getToken = function (username, password, cb) {
            var postdata;
            postdata = {
                username,
                password
            }
            return this.post("user/gettoken", postdata, cb);
        }
        Exorun.prototype.get_regions = function (cb) {
            return this.get("regions", cb);
        };
        Exorun.prototype.getRsa = function (cb) {
            return this.get("user/keys", cb);
        };
        Exorun.prototype.addRsa = function (key, cb) {
            var postdata;
            postdata = {
                sshkey: key

            }
            return this.post("user/addkey", postdata, cb);
        }
        Exorun.prototype.deleteRsa = function (token, cb) {
            return this.del("user/key", {
                token
            });
        };
        Exorun.prototype.getInstance = function (instance, cb) {
            return this.get("instances/" + instance, cb);
        }
        Exorun.prototype.getInstances = function (cb) {
            return this.get("instances/", cb);
        }
        Exorun.prototype.CreateInstance = function (appname, region = '', cb) {
            var postdata;
            postdata = {
                appname,
                region
            };
            return this.post("instances", postdata, cb);
        }
        Exorun.prototype.DeleteInstance = function (appname, cb) {
            return this.del("instances/" + appname, null, cb);
        }
        Exorun.prototype.setToken = function (token) {
            defaultHeaders['authorization'] = "Bearer " + token;
        }

        return Exorun;
    })();

    handleResponse = function (cb) {
        var _this = this;
        return function (err, res, body) {
            var errCause, errCode, error, success;
            success = JSON.parse(body);
            cb(success);
        };
    };
    module.exports.Exorun = Exorun;

}).call(this);