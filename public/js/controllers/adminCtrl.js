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
            getMats()
        }, 500, 1)
    }

    const getMats = _ => materialSrv.getAllMats().then(response => $scope.materials = response)
    getMats()

    $scope.deleteMat = id => materialSrv.deleteMat(id, getMats)

})