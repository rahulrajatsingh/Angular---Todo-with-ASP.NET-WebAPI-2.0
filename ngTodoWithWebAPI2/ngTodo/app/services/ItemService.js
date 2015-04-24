"use strict";

(function () {

    var ItemService = function ($http) {

        var getTodoItems = function () {
            return $http.get('http://localhost:60765/api/ToDos');
        };

        var addTask = function (task) {
            return $http.post('http://localhost:60765/api/ToDos', task);
        }

        var updateTask = function (task) {
            return $http.put('http://localhost:60765/api/ToDos', task);
        }

        var deleteTask = function (id) {
            return $http.delete('http://localhost:60765/api/ToDos?id='+ id);
        }        

        return {
            GetTodoItems: getTodoItems,
            addTask: addTask,
            updateTask: updateTask,
            deleteTask: deleteTask
        };
    }

    todoApp.factory('ItemService', ["$http", ItemService]);

}());