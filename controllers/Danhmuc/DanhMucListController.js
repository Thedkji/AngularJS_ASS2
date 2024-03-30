window.DanhMucListController = ($scope,$http,$location)=>{
    var Url = "http://localhost:3000/danhmuc";
    $scope.getData=()=>{
        $http.get(Url).then((reponse)=>{
            if(reponse.status == 200){
                $scope.danhmuc = reponse.data;
            }
        })
    }
    $scope.getData();
}