angular.module('myRoute',['ngRoute']).config(($routeProvider)=>{
    $routeProvider.when('/danhmuc/list',{
        templateUrl:"views/danhmuc/list.html",
        controller: DanhMucListController
    })

    .when('/danhmuc/add',{
        templateUrl:"views/danhmuc/add.html",
        controller: DanhMucAddController
    })

    .when('/danhmuc/update/:id',{
        templateUrl:"views/danhmuc/update.html",
        controller: DanhMucUpdateController
    })

    .when("/sanpham/list",{
        templateUrl:"views/sanpham/list.html",
        controller: 
    })
    .otherwise({
        templateUrl : "views/main.html"
    })
})