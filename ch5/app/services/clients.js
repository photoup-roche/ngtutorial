function clients($http, $q, apiUrl) {
    var clients = {};

    clients.list = [];

    clients.getClients = function() {
        var deferred = $q.defer();

        $http.get(apiUrl + "/clients").then(function(response) {
            clients.list = response.data;

            deferred.resolve(clients.list);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    return clients;
}
