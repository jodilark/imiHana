angular.module('app').controller('browseCtrl', function($scope, itemSrv){
    $scope.browseTest = "browseController is hooked up"

    $scope.browse = {
        methods: {
            getList: _ => itemSrv.getAllItems().then(response => {
                // console.log(response)
                $scope.browse.listData = response.data
            }) 
        }
    }
    $scope.browse.methods.getList()

})