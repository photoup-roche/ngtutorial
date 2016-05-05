function ClientController(clientList, clients) {
    var vm = this;
    console.log("in client controller")
    console.log(clientList)
    vm.selectEdit = function(client) {
        vm.editClient = angular.copy(client);
    };

    vm.saveEdit = function(client, form) {
        if(form.$invalid) {
            return false;
        }

        if(!form.$dirty) {
            vm.cancelEdit();
        } else {
            clients.update(client, {
                "fname": vm.editClient.fname,
                "lname": vm.editClient.lname,
                "email": vm.editClient.email
            }).then(function() {
                vm.cancelEdit();
            });
        }
    };

    vm.cancelEdit = function() {
        vm.editClient = false;
    };

    var init = function() {
        vm.clients = clientList;
    };

    init();
}
