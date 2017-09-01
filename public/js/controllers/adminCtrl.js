angular.module('app').controller('adminCtrl', function ($scope, materialSrv, $interval) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    $scope.adminCtrlTest = 'adminCtrl controller is connected and operational'
    $scope.materialSrvTest = materialSrv.materialSrvTest

    //      ╔══════════════════════════════════════╗
    //      ║              VARIABLES               ║
    //      ╚══════════════════════════════════════╝

    //      ╔══════════════════════════════════════╗
    //      ║                Magic                 ║
    //      ╚══════════════════════════════════════╝
    // .....║ Material logic
    $scope.createMat = (type, cb) => { materialSrv.createNewMat(type), cb(type) }

    $scope.clearMatForm = type => {
        document.getElementById("create-materials-form").reset()
        $scope.matType = ""
        document.getElementById("mat-type").focus()
        $interval(_ => {
            console.log(materialSrv.messageResponse)
        }, 800, 10)
    }
})