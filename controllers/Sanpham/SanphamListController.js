window.SanphamListController = function ($scope, $http, $location) {
  let api = "http://localhost:3000/sanpham";
  let apiDM = "http://localhost:3000/danhmuc";
  let apiSt = "http://localhost:3000/Status";

  $scope.getDaTa = function () {
    $http.get(api).then(function (res) {
      $scope.products = res.data;
      console.log($scope.pro);
    });
  };
  $scope.getDaTa();
  

  $scope.getDanhmuc = function () {
    $http.get(apiDM).then(function (res) {
      $scope.danhmuc = res.data;
    });
  };
  $scope.getDanhmuc();

  $scope.getStatus = function () {
    $http.get(apiSt).then(function (res) {
      if (res.status == 200) {
        $scope.status = res.data;
      }
    });
  };
  $scope.getStatus();

  $scope.onDelete = function (id) {
    if(confirm("Bạn có chắc chắn muốn xóa ko?")){
        $http.delete(`${api}/${id}`).then(function (res) {
          alert("Xóa thành công");
          $scope.getDaTa();
        });
    }
  };

  $scope.onUpdate = function(id) {
    $location.path(`/sanpham/update/${id}`)
  }
};
