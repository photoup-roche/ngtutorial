var app = angular.module("MyApp", ['ngRoute']);

app.constant('apiUrl', 'http://localhost:3000');

app.constant('appUrl', 'http://localhost/ngtutorial/ch7');

app.config(['$routeProvider', 'appUrl', routeInit])

app.factory('clients', ['$http', '$q', 'apiUrl', clients]);

app.controller('MainController', ['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event) {

        $location.url('/404');
        $location.replace();
    })
}]);

app.controller('ClientController', ['clients', ClientController]);

app.controller('ClientDetailController', ['client', ClientController]);

function routeInit($routeProvider, appUrl) {
    $routeProvider
        .when('/', {
            templateUrl: appUrl + '/app/views/client-list.html',
            controller: ['clients', 'clientList', ClientController],
            controllerAs: 'clientCtrl',
            resolve: {
                clientList: ['clients', function(clients) {
                    return clients.getClients();
                }]
            }
        })
        .when('/404', {
            template: '<h2>Sorry, Page Not Found!</h2>'
        })
        .when('/client/:clientId', {
            templateUrl: appUrl + '/app/views/client-detail.html',
            controller: ['clientDetail', ClientDetailController],
            controllerAs: 'detailCtrl',
            resolve: {
                clientDetail: ['$route', 'clients', function($route, clients) {
                    console.log($route);
                    return clients.getClient($route.current.params.clientId);
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}
