window.DanhMucUpdateController = function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  let api = "http://localhost:3000/danhmuc";
  let id = $routeParams.id;

  $http.get(`${api}/${id}`).then(function (res) {
    $scope.valueUpdateDM = {
      id: res.data.id,
      name: res.data.name,
      create_at:res.data.create_at
    };
  });

  $scope.btnSuaDM = function () {
    let flag = false;
    let regexNotNumber = /^[a-zA-z\p{L}\s]{2}[a-zA-z0-9\p{L}\s]+$/u; //\p{L}:cho phép nhập unicode , u:hậu tố của unicode
    //mảng chứa định nghĩa giá trị cho lỗi
    $scope.err = {
      nameEmpty: false,
      notNumber: false,
      Duplication: false,
      NameLength :false
    };

    //lấy dữ liệu của danh mục
    $http.get(api).then(function (res) {
      $scope.danhmuc = res.data;

      //tạo hàm check dữ liệu có trùng nhau ko
      $scope.isDuplication = function (value) {
        return $scope.danhmuc.some((item) => item.name === value); //hàm some thực hiện kiểm tra xem phần tử trong mảng có thỏa mãn điều kiện hay ko
        //ở đây so sánh giá trị của value bằng với mảng name thì sẽ = true
      };
      //validate
      if (!$scope.valueUpdateDM || !$scope.valueUpdateDM.name) {
        $scope.err.nameEmpty = true; //nếu ko có dữ liệu thì trả về true là hiện lên thông báo lỗi
        flag = true;
      } else if (!regexNotNumber.test($scope.valueUpdateDM.name)) {
        $scope.err.notNumber = true;
        flag = true;
      } else if ($scope.isDuplication($scope.valueUpdateDM.name)) {
        $scope.err.Duplication = true;
        flag = true;
      } else if($scope.valueUpdateDM.name.length <4){
        $scope.err.NameLength = true;
        flag=true;
      }

      //Nếu như ko lỗi thực hiện tạo mới item
      if (!flag) {
        
        let date = new Date()
        let updateItem = {
          ...$scope.valueUpdateDM, //Tự động lấy trị liên quan thay vì phải id:valueDM.id , nó sẽ tự động tìm các thuộc tính của object valueDM
          create_at : $scope.valueUpdateDM.create_at,
          update_at: date.getDay() + "/" +(date.getMonth()+1) + "/" +date.getFullYear() + " " + date.getHours()+":"+date.getMinutes()
        };
        $http.put(`${api}/${id}`, updateItem).then(function (response) {
          if (response.status == 200) {
            $location.path("/danhmuc/list");
          }
        });
      }
    });
  };
};
