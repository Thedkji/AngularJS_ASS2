window.DanhMucListController = function ($scope,$http,$location){
    let apiUrl = "http://localhost:3000/danhmuc";
    $scope.getData = function (){
        $http.get(apiUrl).then(function(respone){
            if(respone.status == 200){
                $scope.danhmuc = respone.data
            }
        })
    }
    $scope.getData()
}