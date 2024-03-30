angular.module('myRoute',['ngRoute']).config(($routeProvider)=>{
    $routeProvider.when('/danhmuc/list',{
        templateUrl:"views/danhmuc/list.html",
        controller: DanhMucListController
    })
})