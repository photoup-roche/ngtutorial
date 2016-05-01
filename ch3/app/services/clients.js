function clients() {
    var clients = {};

    clients.list = [
        {
            id: 1,
            fname: "John",
            lname: "Doe",
            age: 45
        },
        {
            id: 2,
            fname: "Thomas",
            lname: "Adams",
            age: 49
        },
        {
            id: 3,
            fname: "Samantha",
            lname: "Brown",
            age: 29
        }
    ];

    clients.add = function(client) {
        clients.list.push(client);
    };

    return clients;
}
