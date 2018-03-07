'use strict';


app.controller('LoginController', function HomeController($scope,$rootScope,$location,AuthService) {

$scope.login = function() {
AuthService.login($scope.userid, $scope.password).then(function(authenticated) {
      $location.path('/home');
    }, function(err) {
       $location.path('/');
    });
  };
	});

app.controller('HeaderController', function HeaderController($scope,$location,AuthService, $window) {
$scope.logout = function() {
 AuthService.logout();
 $location.path('/');

  };
  });

app.controller('HomeController', function($scope,$http, $route,$rootScope,AuthService,$location,$timeout) {

//$scope.userid=AuthService.username();
$scope.role=AuthService.role();
 $http.get("http://localhost:3000/inventory")
    .then((response)=> {
      //console.log(response.data)
        $scope.data = response.data.success.data;
    }).catch((err)=>{
      console.log(err);
    });

$scope.delete = function(product) {
  //console.log('product',product)
  product.roles=$scope.role;
  //console.log('name',product)
$http({
                method: "DELETE",
                url: "http://localhost:3000/inventory",
                dataType: 'json',
                data:product ,
                headers: { "Content-Type": "application/json" }
            }).then((response)=> {
              console.log(response.data)
              $route.reload();
              
            }).catch((err)=>{

             // $location.path('/add');
            });

};
$scope.edit = function(data) {
  //console.log('name',data)
  $rootScope.editData=data;
  $location.path('/modify');

};


});
app.controller('ModifyInventoryController', function($scope,$http, $location,$rootScope,AuthService) {
  if($rootScope.editData){
      //console.log('name*',$rootScope.editData);
      $scope.productid=$rootScope.editData.productid
      $scope.productname=$rootScope.editData.productname
      $scope.quantity=$rootScope.editData.quantity
      $scope.mrp=parseInt($rootScope.editData.mrp)
      $scope.batchnum=$rootScope.editData.batchnum
      $scope.batchdate=$rootScope.editData.batchdate
      $scope.vendor=$rootScope.editData.vendor
      $rootScope.editData=null;
     }
     $scope.submit = function() {
        var obj={
        "productid" : $scope.productid,
        "productname" : $scope.productname,
        "vendor" : $scope.vendor,
        "mrp" : $scope.mrp,
        "batchnum" : $scope.batchnum,
        "batchdate" : $scope.batchdate,
        "quantity" : $scope.quantity,
        "action":'modify',
        "roles" : AuthService.role()
        }
         $http({
                method: "PUT",
                url: "http://localhost:3000/inventory",
                dataType: 'json',
                data: obj,
                headers: { "Content-Type": "application/json" }
            }).then((response)=> {
              
              if(response.data.code!=200){
                 $location.path('/home');
              }
              
            }).catch((err)=>{
             // $location.path('/add');
            });
      };
});
app.controller('AddInventoryController', function($scope,$http, $location,$rootScope) {
    
      $scope.submit = function() {
        console.log($scope.productname,$scope.vendor,$scope.mrp,$scope.mrp,$scope.batchnum,$scope.batchdate,$scope.quantity)
        var obj={
        "productid" : Math.floor(Date.now()),
        "productname" : $scope.productname,
        "vendor" : $scope.vendor,
        "mrp" : $scope.mrp,
        "batchnum" : $scope.batchnum,
        "batchdate" : $scope.batchdate,
        "quantity" : $scope.quantity,
        "status" : "Approved"
        }
         $http({
                method: "POST",
                url: "http://localhost:3000/inventory",
                dataType: 'json',
                data: obj,
                headers: { "Content-Type": "application/json" }
            }).then((response)=> {
              console.log(response.data)
              if(response.data.code!=200){
                 $location.path('/home');
              }
              
            }).catch((err)=>{
             // $location.path('/add');
            });
      };

});

app.controller('ApproveInventoryController', function($scope,$http, $route,$rootScope,AuthService,$location,$timeout) {

//$scope.userid=AuthService.username();
 $http.get("http://localhost:3000/inventorylist")
    .then((response)=> {
      
        $scope.data = response.data.success.data;
    }).catch((err)=>{
      console.log(err);
    });

$scope.approve = function(product) {

$http({
                method: "PUT",
                url: "http://localhost:3000/approve",
                dataType: 'json',
                data: product,
                headers: { "Content-Type": "application/json" }
            }).then((response)=> {
             
              $route.reload();
              
            }).catch((err)=>{

             // $location.path('/add');
            });

};
$scope.reject = function(product) {

$http({
                method: "PUT",
                url: "http://localhost:3000/reject",
                dataType: 'json',
                data: product,
                headers: { "Content-Type": "application/json" }
            }).then((response)=> {
           
              $route.reload();
              
            }).catch((err)=>{

             // $location.path('/add');
            });
};


});



app.controller('RejectInventoryController', function($scope,$http) {
 $http.get("http://localhost:3000/rejectlist")
    .then((response)=> {
      
        $scope.data = response.data;
    }).catch((err)=>{
      console.log(err);
    });
});