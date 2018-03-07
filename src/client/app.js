'use strict';

var app=angular.module('myapp', [
    'ngRoute',
    'ngCookies'
]);




app.run(function($rootScope, $location, $timeout,AuthService, $http) {
    $rootScope.$on('$routeChangeSuccess', function(event,next,current,previous ){
        
        if(($location.path()=='/'||$location.path()=='/login')){
          
          if(AuthService.isAuthenticated()){
            $location.path('/home');
          }else{
          $rootScope.showInclude = false;
          $rootScope.userid='';
          $http.defaults.headers.common['X-Auth-Token'] = undefined;
         
          }
          
        } else{
            if(AuthService.isAuthenticated()){
             
                $rootScope.showInclude = true;
                $rootScope.userid=AuthService.username();
                $http.defaults.headers.common['X-Auth-Token'] = AuthService.authToken();
            }else{
               $location.path('/login');
            }

        }
    });
});