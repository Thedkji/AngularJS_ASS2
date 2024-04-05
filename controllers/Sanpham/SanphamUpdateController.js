window.SanphamUpdateController = function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  let apiSt = "http://localhost:3000/Status";
  let apiSP = "http://localhost:3000/sanpham";
  let apiDM = "http://localhost:3000/danhmuc";
  let id = $routeParams.id;

  $scope.getSP = function () {
    //dùng để kiểm tra trùng lặp trong mảng
    $http.get(apiSP).then(function (res) {
      $scope.sp = res.data;
    });
  };
  $scope.getSP(); 

  $scope.getStatus = function () {
    $http.get(apiSt).then(function (res) {
      $scope.status = res.data;
    });
  };
  $scope.getStatus();

  $scope.getDanhMuc = function () {
    $http.get(apiDM).then(function (res) {
      $scope.danhmuc = res.data;
    });
  };
  $scope.getDanhMuc();

  $http.get(`${apiSP}/${id}`).then(function (res) {
    $scope.valueSP = {
      name: res.data.name,
      price: res.data.price,
      img: res.data.img,
      create_at: res.data.create_at,
      id_danhmuc: res.data.id_danhmuc,
      id_status: res.data.id_status,
    };

    $scope.btn_updateSP = function () {
      let flag = false;

      $scope.err = {
        NameEmpty: false,
        NameLength: false,
        NameNotNumber: false,
        NameDuplication: false,
        PriceEmpty: false,
        PriceInteger: false,
        DanhMucEmpty: false,
        StatusEmpty: false,
      };

      if (!$scope.valueSP || !$scope.valueSP.name) {
        $scope.err.NameEmpty = true;
        flag = true;
      } else if (
        !/^[a-zA-z\p{L}\s]{2}[a-zA-z0-9\p{L}\s]+$/u.test($scope.valueSP.name)
      ) {
        $scope.err.NameNotNumber = true;
        flag = true;
      } else if ($scope.valueSP.name.length < 4) {
        $scope.err.NameLength = true;
        flag = true;
      }

     //check trùng lặp tên
      if ($scope.sp.some((item) => item.name == $scope.valueSP.name) && $scope.valueSP.name!=res.data.name) {
        $scope.err.NameDuplication = true;
        flag = true;
      }

      if (!$scope.valueSP || !$scope.valueSP.price) {
        $scope.err.PriceEmpty = true;
        flag = true;
      } else if ($scope.valueSP.price < 0) {
        $scope.err.PriceInteger = true;
        flag = true;
      }

      if (!$scope.valueSP || !$scope.valueSP.id_danhmuc) {
        $scope.err.DanhMucEmpty = true;
        flag = true;
      }

      if (!$scope.valueSP || !$scope.valueSP.id_status) {
        $scope.err.StatusEmpty = true;
        flag = true;
      }

      if (!flag) {
        let date = new Date();
        let update_Item = {
          ...$scope.valueSP,
          create_at: $scope.valueSP.create_at,
          update_at:
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes(),
        };

        $http.put(`${apiSP}/${id}`, update_Item).then(function (res) {
          if (res.status == 200) {
            alert("Sửa thành công");
            $location.path("sanpham/list");
          }
        });
      }
    };
  });
};
