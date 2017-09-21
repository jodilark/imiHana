angular.module('app').controller('adminCtrl', function ($scope, materialSrv, sizeSrv, itemSrv, $interval, Upload, $window) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    $scope.adminCtrlTest = 'adminCtrl controller is connected and operational'
    $scope.materialSrvTest = materialSrv.materialSrvTest
    $scope.sizeSrvTest = sizeSrv.sizeSrvTest

    //      ╔══════════════════════════════════════╗
    //      ║              VARIABLES               ║
    //      ╚══════════════════════════════════════╝
    var vm = this;

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
            , type: "input"
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
            id: "size-height"
            , placeholder: "height in inches"
            , type: "number"
        }
        , showSizeControls: true
        , widthInput: {
            id: "size-width"
            , placeholder: "width in inches"
            , type: "number"
        }
        , methods: {
            create: (type, cb) => {
                sizeSrv.createNewSize(type), cb(type)
            }
            , clearForm: type => {
                document.getElementById($scope.sizesInfo.formID).reset()
                document.getElementById($scope.sizesInfo.widthInput.id).focus()
                $interval(_ => {
                    $scope.sizesInfo.methods.getList()
                }, 500, 1)
            }
            , getList: _ => sizeSrv.getAllSizes().then(response => {
                $scope.sizesInfo.listData = response.map(e => {
                    e.type = `${e.width}in. x ${e.height}in. (${e.orientation})`
                    return e
                })
            })
            , delete: id => sizeSrv.deleteSize(id, $scope.sizesInfo.methods.getList)
        }
        , existingTitle: "Existing Sizes"
        , optionPlaceholder: 'choose size'
    }
    $scope.sizesInfo.methods.getList()

    // .....║ Item logic
    $scope.itemInfo = {
        sectionTitle: 'Items'
        , createTitle: 'Create New Item'
        , existingTitle: 'Existing Items'
        , optionPlaceholder: 'choose an item'
        , formID: 'create-item-form'
        , inputFields: [
            {
                id: "item-form-name"
                , placeholder: "name"
                , type: "text"
            },
            {
                id: "item-form-description"
                , placeholder: "description"
                , type: "text"
            },
            {
                id: "item-form-price"
                , placeholder: "price"
                , type: "number"
            },
            {
                id: "item-form-forSale"
                , placeholder: "For Sale"
                , type: "checkbox"
            },
            {
                id: "item-form-url"
                , placeholder: "image url"
                , type: "text"
            },
            {
                id: "item-form-localFile"
                , placeholder: "description"
                , type: "file"
            }
        ]
        , methods: {
            clearForm: type => {
                console.log('clear item form was fired')
                // console.log('type was: ', type)
                document.getElementById($scope.itemInfo.formID).reset()
                document.getElementById("item-form-name").focus()
                vm.name = null, vm.description = null, vm.price = null, vm.forSale = null, vm.file = null
                $interval(_ => {
                    $scope.itemInfo.methods.getList()
                }, 500, 1)
            }
            , getList: _ => itemSrv.getAllItems().then(response => {
                $scope.itemInfo.listData = response.data.map(e => {
                    return e
                })
            })
            , delete: id => itemSrv.deleteItem(id, $scope.itemInfo.methods.getList)
        }
    }
    $scope.itemInfo.methods.getList()

    vm.submit = function(){ //function to call on form submit
        console.log(vm.file)
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            itemSrv.upload(vm.file).then(response => {
                //now send the other form data including the returned url
                itemSrv.item({"name": vm.name, "description": vm.description, "price": vm.price, "forSale": vm.forSale, "imageUrl": response.url}).then(newResponse => {
                    $scope.newImg = newResponse.data.url
                    $scope.itemInfo.methods.clearForm()
                    alert(`${response.originalName} was successfully uploaded!`)
                })
            }); //call upload function
        }        
    }
})