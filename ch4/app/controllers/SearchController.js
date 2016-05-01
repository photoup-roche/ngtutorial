function SearchController($scope) {
    $scope.search = {};

    $scope.search = function() {
        $scope.$emit("onSearched", $scope.search.keyword);
        $scope.search.searched = true;
    };
}
