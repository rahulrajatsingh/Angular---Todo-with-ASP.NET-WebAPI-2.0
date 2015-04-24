'use strict';

var todoApp;

(function () {
    // Declare app level module which depends on views, and components
    todoApp = angular.module('todoApp', [
      'ngRoute',
    ]).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when("/main", {
                    templateUrl: "app/main/main.html",
                    controller: "MainController"
                })
                .when("/login", {
                    templateUrl: "app/login/login.html",
                    controller: "LoginController"
                })
                .when("/done", {
                    templateUrl: "app/done/done.html",
                    controller: "DoneController"
                })
                .when("/active", {
                    templateUrl: "app/active/active.html",
                    controller: "ActiveController"
                })
                .when("/register", {
                    templateUrl: "app/register/register.html",
                    controller: "RegisterController"
                })
            .otherwise({ redirectTo: "/main" });
        }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('AuthenticationInterceptorService');
    }]);
}());