var app = angular.module("MyApp", ['ngRoute']);

app.constant('apiUrl', 'http://localhost:3000');

app.constant('appUrl', 'http://localhost/ngtutorial_git2/ch7/');

app.config(['$routeProvider', 'appUrl', routeInit])

app.factory('clients', ['$http', '$q', 'apiUrl', clients]);

app.controller('MainController', ['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event) {

        $location.url('/404');
        $location.replace();
    })
}]);

function routeInit($routeProvider, appUrl) {
    $routeProvider
        .when('/', {
            resolve: {
                clientList: ['clients', function(clients) {
                    return clients.getClients();
                }]
            },
            templateUrl: appUrl + '/app/views/client-list.html',
            controller: ['clientList', 'clients', ClientController],
            controllerAs: 'clientCtrl'
        })
        .when('/404', {
            //template: '<h2>Sorry, Page Not Found!</h2>'
            templateUrl: appUrl + '/app/views/404.html'
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
