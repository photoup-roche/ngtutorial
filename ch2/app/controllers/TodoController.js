function TodoController($scope) {
    $scope.todos = ["eat breakfast", "wash dishes", "clean the room"];

    $scope.add = function(todo) {
        $scope.todos.push(todo);
    };
}
