window.DanhMucAddController = function ($scope, $http, $location) {
  let apiUrl = "http://localhost:3000/danhmuc";
  $scope.onAdd = function () {
    let flag = false;
    let regexNotNumber = /^[a-zA-z\p{L}\s]+$/u; //\p{L}:cho phép nhập unicode , u:hậu tố của unicode
    //mảng chứa định nghĩa giá trị cho lỗi
    $scope.err = {
      nameEmpty: false,
      notNumber: false,
      Duplication: false,
    };

    //lấy dữ liệu của danh mục
    $http.get(apiUrl).then(function (res) {
      $scope.danhmuc = res.data;

      //tạo hàm check dữ liệu có trùng nhau ko
      $scope.isDuplication = function (value) {
        return $scope.danhmuc.some((item) => item.name === value); //hàm some thực hiện kiểm tra xem phần tử trong mảng có thỏa mãn điều kiện hay ko
        //ở đây so sánh giá trị của value bằng với mảng name thì sẽ = true
      };
      //validate
      if (!$scope.valueDM || !$scope.valueDM.name) {
        $scope.err.nameEmpty = true; //nếu ko có dữ liệu thì trả về true là hiện lên thông báo lỗi
        flag = true;
      } else if (!regexNotNumber.test($scope.valueDM.name)) {
        $scope.err.notNumber = true;
        flag = true;
      } else if ($scope.isDuplication($scope.valueDM.name)) {
        $scope.err.Duplication = true;
        flag = true;
      }

      //Nếu như ko lỗi thực hiện tạo mới item
      if (!flag) {
        let date = new Date()
        let newItem = {
          ...$scope.valueDM, //Tự động lấy trị liên quan thay vì phải id:valueDM.id , nó sẽ tự động tìm các thuộc tính của object valueDM
          create_at : date.getDay()+"/"+(date.getMonth()+ 1)+"/"+date.getFullYear() + " " + date.getHours()+":"+date.getMinutes(),
        };
        $http.post(apiUrl, newItem).then(function (response) {
          if (response.status == 201) {
            $location.path("/danhmuc/list");
          }
        });
      }
    });
  };
};
