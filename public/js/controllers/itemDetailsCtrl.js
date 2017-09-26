angular.module("app").controller("itemDetailsCtrl", function ($scope, itemSrv, $stateParams) {
    $scope.itemDetail = myID => {
        itemSrv.getProdDetails(myID).then(response => {
            $scope.myItem = response.data[0]
        })
    }
    $scope.itemDetail($stateParams.id)
});