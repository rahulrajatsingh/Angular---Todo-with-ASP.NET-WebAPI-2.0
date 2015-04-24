"use strict";

(function () {

    var LoginController = function ($scope, $location, AccountService) {

        $scope.registerRedirect = function () {
            $location.path("/register");
        }

        $scope.submitForm = function () {
            if ($scope.loginModel.username == "" || $scope.loginModel.password == "") {
                $scope.error = "All fields are mandatory";
                return false;
            }

            // all through
            $scope.error = "";

            AccountService.login($scope.loginModel)
            .success(function (data, status, headers, config) {

                $location.path("\main");
            })
            .error(function (data, status, headers, config) {
                $scope.error = "Failed to login";
            });
        }

        $scope.message = "Login";
        $scope.loginModel = {
            username: "",
            password: "",
            grant_type: "password"
        }
    }

    todoApp.controller('LoginController', ["$scope", "$location", "AccountService", LoginController]);
}());