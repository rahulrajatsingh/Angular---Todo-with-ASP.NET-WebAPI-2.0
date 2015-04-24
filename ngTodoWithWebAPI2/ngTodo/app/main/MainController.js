"use strict";

(function () {

    var MainController = function ($scope, ItemService, AccountService, $location) {

        $scope.onKeyUpOnAdd = function (event) {
            var keyCode = event.keyCode;

            if (keyCode == 27) {
                $scope.newTask = "";
            }
            else if (keyCode == 13) {
                $scope.addTask($scope.newTask);
                $scope.newTask = "";
            }
        };

        $scope.onKeyUpOnEdit = function (event) {
            var keyCode = event.keyCode;

            if (keyCode == 27) {
                $scope.itemBeingEdited = {};
                UpdateTaskList();
            }
            else if (keyCode == 13) {
                $scope.updateTask($scope.itemBeingEdited);
                $scope.itemBeingEdited = null;
            }            
        };

        $scope.editItem = function (item) {

            if (item.Completed == false) {

                $scope.itemBeingEdited = item;
                UpdateTaskList();
            }
        };

        var UpdateTaskList = function () {
            ItemService.GetTodoItems()
            .success(function (data, status, headers, config) {
                $scope.todoList = data;
            })
            .error(function (data, status, headers, config) {
                $scope.todoList = [];
                $scope.error = "Failed to retrieved items from server";
            });
        };

        $scope.getClass = function (isDone) {
            if (isDone == true) {
                return "striked";
            }

            return "notstriked";
        }

        $scope.addTask = function () {

            var newTaskModel = { Item: $scope.newTask, Completed: false, Id: 0 };

            $scope.newTask = "";
            ItemService.addTask(newTaskModel)
            .success(function (data, status, headers, config) {
                UpdateTaskList();
            })
            .error(function (data, status, headers, config) {
                $scope.error = "Failed to add one or more items to server, please refresh";
            });
        }

        $scope.updateTask = function (task) {

            ItemService.updateTask(task)
            .success(function (data, status, headers, config) {
                UpdateTaskList();
            })
            .error(function (data, status, headers, config) {
                $scope.error = "Failed to update one or more items to server, please refresh";
            });
        }

        $scope.deleteTask = function (task) {

            ItemService.deleteTask(task.Id)
            .success(function (data, status, headers, config) {
                UpdateTaskList();
            })
            .error(function (data, status, headers, config) {
                $scope.error = "Failed to update one or more items to server, please refresh";
            });
        }

        $scope.logout = function () {
            AccountService.logout();
            $location.path("/login");
        }

        UpdateTaskList();
        $scope.IsAuthenticated = AccountService.IsAuthenticated;
        
    }

    todoApp.controller('MainController', ["$scope", "ItemService", "AccountService", "$location",  MainController]);
}());