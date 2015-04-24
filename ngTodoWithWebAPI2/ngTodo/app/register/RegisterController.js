"use strict";

(function () {

    var RegisterController = function ($scope, $location, AccountService) {


        $scope.submitForm = function () {
            if ($scope.registerModel.email == "" || $scope.registerModel.password == "" || $scope.registerModel.confirmPassword == "") {
                $scope.error = "All fields are mandatory";
                return false;
            }

            if ($scope.registerModel.password != $scope.registerModel.confirmPassword) {
                $scope.error = "passwords dont match";
                return false;
            }

            // all through
            $scope.error = "";

            AccountService.register($scope.registerModel)
            .success(function (data, status, headers, config) {
                $scope.registerModel = {
                    email: "",
                    password: "",
                    confirmPassword: ""
                };

                $location.path("\login");
            })
            .error(function (data, status, headers, config) {               
                $scope.error = "Failed to register the user";
            });
        }

        $scope.message = "Register";
        $scope.registerModel = {
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    todoApp.controller('RegisterController', ["$scope", "$location", "AccountService", RegisterController]);
}());