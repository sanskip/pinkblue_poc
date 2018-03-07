'use strict';


app.service('AuthService', function($q, $http) {
  var LOCAL_TOKEN_KEY = 'apiTokenKey';
  var username = 'username';
  var isAuthenticated = false;
  var role = 'role';
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    var name = window.localStorage.getItem(username);
    var roleval = window.localStorage.getItem(role);
    if (token) {
      useCredentials(name,token,roleval);
    }
  }
 
  function storeUserCredentials(name,token,roles) {
     let roleVal=roles[0];
    if(roles.length>1){
      roleVal=2;
    }
    
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(username, name);
    window.localStorage.setItem(role, roleVal);
    useCredentials(name,token,roleVal);
  }
 
  function useCredentials(name,token,roleval) {
    username =name;
    isAuthenticated = true;
    authToken = token;
    role=roleval;
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  function destroyUserCredentials() {
    
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(username);
    window.localStorage.removeItem(role);
  }
 
  var login = function(name, pwd) {
    
    return $q(function(resolve, reject) {
   
      $http({
                method: "POST",
                url: "http://localhost:3000/login",
                dataType: 'json',
                data: {
                      "username": name,
                      "password": pwd
                     },
                headers: { "Content-Type": "application/json" }
            }).then((response)=> {
              console.log('response.data',response.data)
              response=response.data.success;
              if(response.code!=200){
                reject('Login Failed.');
              }else{
              storeUserCredentials(name ,response.token,response.data);
              resolve('Login success.');
              }

            }).catch((err)=>{
              reject('Login Failed.');
            });
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
     isAuthenticated: function() {return isAuthenticated;},
      username: function() {return username;},
      authToken: function() {return authToken;},
      role: function() {return role;}
  };
})