function clients($http, $q, apiUrl) {
    var clients = {};

    clients.list = [];

    clients.getClients = function() {
        var deferred = $q.defer();

        if(clients.list.length) {
            deferred.resolve(clients.list);
        } else {
            $http.get(apiUrl + "/clients").then(function(response) {
                clients.list = response.data;

                deferred.resolve(clients.list);
            }, function(error) {
                deferred.reject(error);
            });
        }

        return deferred.promise;
    };

    clients.update = function(client, data) {
        var deferred = $q.defer();

        $http.put(apiUrl + "/clients/" + client.id, data).then(function(response) {
            angular.extend(client, data);

            deferred.resolve(clients.list);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    clients.getClient = function(client_id) {
        var deferred = $q.defer();
        var client;

        if(isNaN(client_id*1)) {
            deferred.reject("Invalid id format");
            console.log(client_id, "in first if");
        } else {
            if(clients.list.length > 0) {
                console.log(client_id, "in if");
                console.log(clients.list);

                for(var key in clients.list) {
                    console.log(key)
                    if(clients.list[key].id == client_id) {
                        client = clients.list[key];
                        //deferred.resolve(clients.list[key]);

                        break;
                    }
                }

                if(client) {
                    deferred.resolve(client);
                } else {
                    deferred.reject("Client not found");
                }
            } else {
                console.log(client_id);
                $http.get(apiUrl + "/clients/" + client_id).then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject(error);
                });
            }
        }

        return deferred.promise;
    }

    return clients;
}
