window.SanphamListController = function($scope,$http,$location) {
    let api = "http://localhost:3000/sanpham";
    let apiDM = "http://localhost:3000/danhmuc";
    let apiSt = "http://localhost:3000/Status";
    
    $scope.getDaTa = function() {
        $http.get(api).then(function(res) {
            $scope.products = res.data;
            console.log($scope.pro)
        })
    }
    $scope.getDaTa()

    $scope.getDanhmuc = function() {
        $http.get(apiDM).then(function(res) {
            $scope.danhmuc = res.data;
        })
    }
    $scope.getDanhmuc();

    $scope.getStatus = function() {
        $http.get(apiSt).then(function(res) {
            $scope.status = res.data;
        })
    }
    $scope.getStatus();
}