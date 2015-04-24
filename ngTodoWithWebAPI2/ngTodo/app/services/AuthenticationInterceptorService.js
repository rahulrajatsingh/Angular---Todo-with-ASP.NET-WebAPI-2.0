"use strict";

(function () {

    var AuthenticationInterceptorService = function ($location, $window) {

        var request = function (config) {
            config.headers = config.headers || {};

            var tokenValue = $window.sessionStorage.getItem("userToken");

            if (tokenValue) {
                config.headers.Authorization = 'Bearer ' + tokenValue;
            }

            return config;

        }

        var responseError = function (response) {
            if (response.status == 401) {
                $location.path("/login");
            }

            return response;
        }

        return {
            request: request,
            responseError: responseError,
        };
    }

    todoApp.factory('AuthenticationInterceptorService', ["$location", "$window",  AuthenticationInterceptorService]);

}());