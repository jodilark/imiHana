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
    $scope.materialInfo = {
        sectionTitle: 'Materials'
        , createTitle: 'Create New Material'
        , formID: 'create-materials-form'
        , inputField: {
            id: "mat-type"
            , placeholder: "Canvas, Parchment, Poster Paper..."
        }
        , methods: {
            create: (type, cb) => {
                materialSrv.createNewMat(type), cb(type)
            }
            , clearForm: type => {
                document.getElementById($scope.materialInfo.formID).reset()
                document.getElementById($scope.materialInfo.inputField.id).focus()
                $interval(_ => {
                    $scope.materialInfo.methods.getList()
                }, 500, 1)
            }
            , getList: _ => materialSrv.getAllMats().then(response => $scope.materialInfo.listData = response)
            , delete: id => materialSrv.deleteMat(id, $scope.materialInfo.methods.getList)
        }
        , existingTitle: "Existing Materials"
        , optionPlaceholder: 'choose material'
    }
    $scope.materialInfo.methods.getList()
})