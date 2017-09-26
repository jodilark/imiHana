angular.module('app').controller('browseCtrl', function ($scope, itemSrv, cartSrv) {
    $scope.browseTest = "browseController is hooked up"

    $scope.browse = {
        methods: {
            getList: _ => itemSrv.getAllItems().then(response => {
                $scope.browse.listData = response.data
            })
            , addToCart: obj => {
                cartSrv.addToCart(obj)
            }
        }
    }
    $scope.browse.methods.getList()

})