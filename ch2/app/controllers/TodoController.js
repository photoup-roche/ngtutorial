function TodoController($scope) {
    $scope.todos = ["cook breakfast", "wash dishes", "clean the room"];

    $scope.add = function(todo) {
        $scope.todos.push(todo);
    };
}
