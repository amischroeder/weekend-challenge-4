console.log('client.js has been loaded');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function ($http) {
    console.log('Employee Controller has been loaded');
    var self = this;
    self.employees = [];
    self.newEmployee = {};

    self.getMonthlyExpenditure = function () {
        var total = 0
        for(var i=0; i<self.employees.length; i++){
            var product = self.employees[i];
            total+= (product.annual_salary)/12;
        }
        return total;
    }

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

    self.addEmployee = function () {
        $http({
            method: 'POST',
            url: '/employee',
            data: self.newEmployee
        }).then(function (response) {
            console.log(response);
            self.getEmployees();
            self.newEmployee = {};
        }) //end of http
    };
    self.updateEmployees = function (id) {
        console.log(id);
        $http({
            method: 'PUT',
            url: '/employee/' + id,
            data: self.newEmployee
        }).then(function (response){
            self.getEmployees();
            self.newEmployee = {};
        })
    }

    self.getEmployees();
}]);
