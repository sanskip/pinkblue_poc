'use strict';
 
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'client/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'LoginController',
            templateUrl: 'client/views/login.html'
        })
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'client/views/home.html'
        })
        .when('/add', {
            controller: 'AddInventoryController',
            templateUrl: 'client/views/addinventory.html'
        })
        .when('/modify', {
            controller: 'ModifyInventoryController',
            templateUrl: 'client/views/edit.html'
        })
        .when('/pendinglist', {
            controller: 'ApproveInventoryController',
            templateUrl: 'client/views/approve.html'
        })
        .when('/rejectlist', {
            controller: 'RejectInventoryController',
            templateUrl: 'client/views/reject.html'
        })
        .otherwise({ redirectTo: '/' });
}]);
