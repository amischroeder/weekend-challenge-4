console.log('client.js has been loaded');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function ($http) {
    console.log('Employee Controller has been loaded');
    var self = this;
    self.employees = [];

    self.getEmployees = function () {
        $http({
            method: 'GET',
            url: '/employee',
        }).then(function (response) {
            console.log(response);
            console.log(response.data);
            self.employees = response.data;
        }); //end of $http
    }; //end of getEmployees

    self.addEmployee = function() {
        $http({
            method: 'POST',
            url: '/employee',
            data: self.newEmployee
        }).then(function(response){
            console.log(response);
            self.getEmployees();
        }) //end of http
    }; 

    self.getEmployees();
}]);