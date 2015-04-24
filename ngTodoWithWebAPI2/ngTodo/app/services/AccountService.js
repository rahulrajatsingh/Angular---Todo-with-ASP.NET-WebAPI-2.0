"use strict";

(function () {

    var AccountService = function ($http, $window) {

        var register = function (registerModel) {
            return $http.post('http://localhost:60765/api/Account/Register', registerModel).success(function (response) {
                return response;
            });
        }

        var login = function (loginModel) {
            var data = "username=" + loginModel.username + "&password="+ loginModel.password + "&grant_type=" + loginModel.grant_type;
            
            return $http.post('http://localhost:60765/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                var token = response.access_token;

                pushTokenToSession(token);
                _isAuthenticated = true;
                return response;
            });
        }

        var logout = function () {
            removeTokenFromSession();            
        }

        var pushTokenToSession = function (value) {

            $window.sessionStorage.setItem("userToken", value);
            };

        var removeTokenFromSession = function () {
            $window.sessionStorage.removeItem("userToken");
        };

       var  _isAuthenticated = true;

        return {
            register: register,
            login: login,
            logout: logout,
            IsAuthenticated: _isAuthenticated
        };
    }

    todoApp.factory('AccountService', ["$http", "$window", AccountService]);

}());