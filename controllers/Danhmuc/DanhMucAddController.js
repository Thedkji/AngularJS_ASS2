window.DanhMucAddController=function($scope,$http,$location){
    let apiUrl = "http://localhost:3000/danhmuc";
    $scope.onAdd = function (){
        let flag = false;
        if(!$scope.valueDM || !$scope.valueDM.name){
            $scope.checkInputNameKoRong = true;
            flag = true;

            // let regexText = "/^[^\d]{20}||$/";
            // if(!regexText.test($scope.valueDM.name)){
            //     $scope.checkInputNameKoPhaiChu = true;
            // }
        }
    }
}