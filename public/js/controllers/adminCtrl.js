angular.module('app').controller('adminCtrl', function ($scope, materialSrv, sizeSrv, $interval) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    $scope.adminCtrlTest = 'adminCtrl controller is connected and operational'
    $scope.materialSrvTest = materialSrv.materialSrvTest
    // $scope.sizeSrvTest = "hello you bastard"
    $scope.sizeSrvTest = sizeSrv.sizeSrvTest

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

    // .....║ Sizes logic
    $scope.sizesInfo = {
        sectionTitle: 'Sizes'
        , createTitle: 'Create New Size'
        , formID: 'create-size-form'
        , inputField: {
            id: "size-type"
            , placeholder: "12 x 17, 21 x 36"
        }
        // , methods: {
        //     create: (type, cb) => {
        //         materialSrv.createNewMat(type), cb(type)
        //     }
        //     , clearForm: type => {
        //         document.getElementById($scope.materialInfo.formID).reset()
        //         document.getElementById($scope.materialInfo.inputField.id).focus()
        //         $interval(_ => {
        //             $scope.materialInfo.methods.getList()
        //         }, 500, 1)
        //     }
        //     , getList: _ => materialSrv.getAllMats().then(response => $scope.materialInfo.listData = response)
        //     , delete: id => materialSrv.deleteMat(id, $scope.materialInfo.methods.getList)
        // }
        , existingTitle: "Existing Sizes"
        , optionPlaceholder: 'choose size'
    }
    // $scope.materialInfo.methods.getList()
})