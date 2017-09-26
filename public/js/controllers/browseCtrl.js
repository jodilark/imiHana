angular.module('app').controller('browseCtrl', function ($scope, itemSrv) {
    $scope.browseTest = "browseController is hooked up"

    $scope.browse = {
        inCart: false
        , cart: []
        , methods: {
            getList: _ => itemSrv.getAllItems().then(response => {
                $scope.browse.listData = response.data
            })
            , addToCart: obj => {
                let unique = true
                let exists = $scope.browse.cart.filter(e => {
                    if (e.id === obj.id) {
                        console.log("already in cart!!!")
                        unique = false
                        e.qty = e.qty++
                    }
                })
                if (unique === true) $scope.browse.cart.push(obj)
                console.log("Cart: ", $scope.browse.cart)
            }
        }
    }
    $scope.browse.methods.getList()

})