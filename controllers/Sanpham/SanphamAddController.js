window.SanphamAddController = function($scope, $http) {
    let apiSt = "http://localhost:3000/Status";
    let apiSP ="http://localhost:3000/sanpham"
    let apiDM ="http://localhost:3000/danhmuc"

    $scope.getStatus = function() {
        $http.get(apiSt).then(function(res) {
            $scope.status = res.data;
        })
    }
    $scope.getStatus();

    $scope.getDanhMuc = function() {
        $http.get(apiDM).then(function(res) {
            $scope.danhmuc = res.data;
        })
    }
    $scope.getDanhMuc();

    $http.get(apiSP).then(function(res) {
        $scope.btn_ThemSP = function() {
            let flag = false;
    
            $scope.err = {
                NameEmpty: false,
                NameLength: false,
                NameNotNumber: false,
                NameDuplication: false,
                PriceEmpty: false,
                PriceInteger: false,
                DanhMucEmpty: false,
                StatusEmpty: false
            };
    
            if (!$scope.valueSP || !$scope.valueSP.Name) {
                $scope.err.NameEmpty = true;
                flag = true;
            }  else if(!/^[a-zA-z\p{L}\s]{2}[a-zA-z0-9\p{L}\s]+$/u.test($scope.valueSP.Name)){
                $scope.err.NameNotNumber =  true;
                flag=true;
            }
            else if ($scope.valueSP.Name.length < 3) {
                $scope.err.NameLength = true;
                flag = true;
            }
            else if(res.data.some((item)=>item.name == $scope.valueSP.Name)){
                $scope.err.NameDuplication = true;
                flag = true;
            }
            
            if (!$scope.valueSP || !$scope.valueSP.Price) {
                $scope.err.PriceEmpty = true;
                flag = true;
            }
            else if($scope.valueSP.Price < 0){
                $scope.err.PriceInteger = true;
                flag = true;
            }

            if (!$scope.valueSP || !$scope.valueSP.DanhMuc) {
                $scope.err.DanhMucEmpty = true;
                flag = true;
            }  
    
            if (!$scope.valueSP || !$scope.valueSP.Status) {
                $scope.err.StatusEmpty = true;
                flag = true;
            }  
            
        }
    })
}