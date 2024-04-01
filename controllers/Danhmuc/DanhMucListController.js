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

    $scope.onDelete = function (id) {
        let confirm =  window.confirm('Bạn có chắc chắn muốn xóa ko ?');
        if(confirm){
            $http.delete(`${apiUrl}/${id}`).then(function(reponse){
                if(reponse.status == 200){
                    $scope.getData();
                }
            })
        }
    }
}