angular.module('app').directive('adminCrudDir', function () {
    return {
        scope: {
            dirData: '='
        }
        , templateUrl: '../../views/adminCrud.html'
    }
})