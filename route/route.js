angular.module('myRoute',['ngRoute']).config(($routeProvider)=>{
    $routeProvider.when('/danhmuc/list',{
        templateUrl:"views/danhmuc/list.html",
        controller: DanhMucListController
    })

    .when('/danhmuc/add',{
        templateUrl:"views/danhmuc/add.html",
        controller: DanhMucAddController
    })
})