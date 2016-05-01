function MainController($scope) {
    $scope.data = {};

    $scope.$on("onSearched", function(event, keyword) {
        $scope.data.keyword = keyword;
    });
}
