'use strict';

angular.module('app', ['ui.router', 'ngFileUpload']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/', "");
    $stateProvider.state('home', {
        templateUrl: '../views/landing.html',
        url: '/'
    }).state('browse', {
        templateUrl: '../views/browse.html',
        url: '/browse',
        controller: 'browseCtrl'
    }).state('orders', {
        templateUrl: '../views/orderHistory.html',
        url: '/orders'
    }).state('cart', {
        templateUrl: '../views/cart.html',
        url: '/cart'
    }).state('checkout', {
        templateUrl: '../views/checkout.html',
        url: '/checkout'
    }).state('confirmation', {
        templateUrl: '../views/confirmation.html',
        url: '/confirmation'
    }).state('admin', {
        templateUrl: '../views/admin.html',
        url: '/admin',
        controller: 'adminCtrl as up'
    }).state('details', {
        templateUrl: '../views/itemDetails.html',
        url: '/details/:id',
        controller: 'itemDetailsCtrl'
    });
});
'use strict';

angular.module('app').controller('adminCtrl', function ($scope, materialSrv, sizeSrv, itemSrv, $interval, Upload, $window) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    $scope.adminCtrlTest = 'adminCtrl controller is connected and operational';
    $scope.materialSrvTest = materialSrv.materialSrvTest;
    $scope.sizeSrvTest = sizeSrv.sizeSrvTest;

    //      ╔══════════════════════════════════════╗
    //      ║              VARIABLES               ║
    //      ╚══════════════════════════════════════╝
    var vm = this;

    //      ╔══════════════════════════════════════╗
    //      ║                Magic                 ║
    //      ╚══════════════════════════════════════╝
    // .....║ Material logic
    $scope.materialInfo = {
        sectionTitle: 'Materials',
        createTitle: 'Create New Material',
        formID: 'create-materials-form',
        inputField: {
            id: "mat-type",
            placeholder: "Canvas, Parchment, Poster Paper...",
            type: "input"
        },
        methods: {
            create: function create(type, cb) {
                materialSrv.createNewMat(type), cb(type);
            },
            clearForm: function clearForm(type) {
                document.getElementById($scope.materialInfo.formID).reset();
                document.getElementById($scope.materialInfo.inputField.id).focus();
                $interval(function (_) {
                    $scope.materialInfo.methods.getList();
                }, 500, 1);
            },
            getList: function getList(_) {
                return materialSrv.getAllMats().then(function (response) {
                    return $scope.materialInfo.listData = response;
                });
            },
            delete: function _delete(id) {
                return materialSrv.deleteMat(id, $scope.materialInfo.methods.getList);
            }
        },
        existingTitle: "Existing Materials",
        optionPlaceholder: 'choose material'
    };
    $scope.materialInfo.methods.getList();

    // .....║ Sizes logic
    $scope.sizesInfo = {
        sectionTitle: 'Sizes',
        createTitle: 'Create New Size',
        formID: 'create-size-form',
        inputField: {
            id: "size-height",
            placeholder: "height in inches",
            type: "number"
        },
        showSizeControls: true,
        widthInput: {
            id: "size-width",
            placeholder: "width in inches",
            type: "number"
        },
        methods: {
            create: function create(type, cb) {
                sizeSrv.createNewSize(type), cb(type);
            },
            clearForm: function clearForm(type) {
                document.getElementById($scope.sizesInfo.formID).reset();
                document.getElementById($scope.sizesInfo.widthInput.id).focus();
                $interval(function (_) {
                    $scope.sizesInfo.methods.getList();
                }, 500, 1);
            },
            getList: function getList(_) {
                return sizeSrv.getAllSizes().then(function (response) {
                    $scope.sizesInfo.listData = response.map(function (e) {
                        e.type = e.width + 'in. x ' + e.height + 'in. (' + e.orientation + ')';
                        return e;
                    });
                });
            },
            delete: function _delete(id) {
                return sizeSrv.deleteSize(id, $scope.sizesInfo.methods.getList);
            }
        },
        existingTitle: "Existing Sizes",
        optionPlaceholder: 'choose size'
    };
    $scope.sizesInfo.methods.getList();

    // .....║ Item logic
    $scope.itemInfo = {
        sectionTitle: 'Items',
        createTitle: 'Create New Item',
        existingTitle: 'Existing Items',
        optionPlaceholder: 'choose an item',
        formID: 'create-item-form',
        inputFields: [{
            id: "item-form-name",
            placeholder: "name",
            type: "text"
        }, {
            id: "item-form-description",
            placeholder: "description",
            type: "text"
        }, {
            id: "item-form-price",
            placeholder: "price",
            type: "number"
        }, {
            id: "item-form-forSale",
            placeholder: "For Sale",
            type: "checkbox"
        }, {
            id: "item-form-url",
            placeholder: "image url",
            type: "text"
        }, {
            id: "item-form-localFile",
            placeholder: "description",
            type: "file"
        }],
        methods: {
            clearForm: function clearForm(type) {
                console.log('clear item form was fired');
                // console.log('type was: ', type)
                document.getElementById($scope.itemInfo.formID).reset();
                document.getElementById("item-form-name").focus();
                vm.name = null, vm.description = null, vm.price = null, vm.forSale = null, vm.file = null;
                $interval(function (_) {
                    $scope.itemInfo.methods.getList();
                }, 500, 1);
            },
            getList: function getList(_) {
                return itemSrv.getAllItems().then(function (response) {
                    $scope.itemInfo.listData = response.data.map(function (e) {
                        return e;
                    });
                });
            },
            delete: function _delete(id) {
                return itemSrv.deleteItem(id, $scope.itemInfo.methods.getList);
            }
        }
    };
    $scope.itemInfo.methods.getList();

    vm.submit = function () {
        //function to call on form submit
        console.log(vm.file);
        if (vm.upload_form.file.$valid && vm.file) {
            //check if from is valid
            itemSrv.upload(vm.file).then(function (response) {
                //now send the other form data including the returned url
                itemSrv.item({ "name": vm.name, "description": vm.description, "price": vm.price, "forSale": vm.forSale, "imageUrl": response.url }).then(function (newResponse) {
                    $scope.newImg = newResponse.data.url;
                    $scope.itemInfo.methods.clearForm();
                    alert(response.originalName + ' was successfully uploaded!');
                });
            }); //call upload function
        }
    };
});
'use strict';

angular.module('app').controller('browseCtrl', function ($scope, itemSrv, cartSrv) {
    $scope.browseTest = "browseController is hooked up";

    $scope.browse = {
        methods: {
            getList: function getList(_) {
                return itemSrv.getAllItems().then(function (response) {
                    $scope.browse.listData = response.data;
                });
            },
            addToCart: function addToCart(obj) {
                cartSrv.addToCart(obj);
            }
        }
    };
    $scope.browse.methods.getList();
});
"use strict";

angular.module("app").controller("itemDetailsCtrl", function ($scope, itemSrv, $stateParams) {
    $scope.itemDetail = function (myID) {
        itemSrv.getProdDetails(myID).then(function (response) {
            $scope.myItem = response.data[0];
        });
    };
    $scope.itemDetail($stateParams.id);
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, authService) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    $scope.mainCtrlTest = 'mainCtrl controller is connected and operational';
    $scope.authServiceTest = authService.authServiceTest;

    //      ╔══════════════════════════════════════╗
    //      ║              VARIABLES               ║
    //      ╚══════════════════════════════════════╝

    //      ╔══════════════════════════════════════╗
    //      ║            HELPER METHODS            ║
    //      ╚══════════════════════════════════════╝
    String.prototype.makeUpperCase = function (str) {
        var uc = str.toLowerCase().split(' ').map(function (e) {
            var wordSplit = e.split(''),
                tuc = wordSplit.splice(0, 1, e.charAt(0).toUpperCase());
            return wordSplit.join('');
        });
        return uc.join(' ');
    };

    //      ╔══════════════════════════════════════╗
    //      ║                Magic                 ║
    //      ╚══════════════════════════════════════╝
    $scope.logout = function (_) {
        console.log('clicked');
        authService.logout();
    };
});
'use strict';

angular.module('app').directive('adminCrudDir', function () {
    return {
        scope: {
            dirData: '='
        },
        templateUrl: '../../views/adminCrud.html'
    };
});
'use strict';

angular.module('app').service('authService', function ($http) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    this.authServiceTest = 'the authService is connected';

    //      ╔══════════════════════════════════════╗
    //      ║              END POINTS              ║
    //      ╚══════════════════════════════════════╝
    this.logout = function () {
        return $http.get('/api/auth/logout').then(function (response) {
            return window.location.href = '/';
        });
    };
});
'use strict';

angular.module('app').service('cartSrv', function ($http) {
    var vm = this;
    vm.cart = [];

    vm.addToCart = function (obj) {
        var unique = true;
        var exists = vm.cart.filter(function (e) {
            if (e.id === obj.id) {
                console.log("already in cart!!!");
                unique = false;
                e.qty = e.qty + 1;
            }
        });
        if (unique === true) {
            obj.qty = 1;
            vm.cart.push(obj);
        }
        console.log("Cart: ", vm.cart);
    };
});
'use strict';

angular.module('app').service('itemSrv', function ($http, Upload, $window) {
    this.serviceTest = 'service is connected';

    var vm = this;

    vm.upload = function (file) {
        return Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data: { file: file //pass file as data, should be user ng-model
            } }).then(function (resp) {
            //upload function returns a promise
            if (resp.data.error_code === 0) {
                //validate success
                // $window.alert(`Success! ${resp.config.data.file.name} was uploaded successfully and can be accessed here: ${resp.data.url}`);
                return { originalName: resp.config.data.file.name, url: resp.data.url };
            } else {
                $window.alert('an error occurred');
            }
        }, function (resp) {
            //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        });
    };
    vm.item = function (obj) {
        console.log(obj);
        return $http({
            url: '/api/items',
            method: 'POST',
            data: obj
        }).then(function (response) {
            console.log("success from server: ", response);
            return response;
        });
    };

    vm.getAllItems = function (_) {
        return $http({
            url: '/api/items',
            method: 'GET'
        }).then(function (response) {
            return response;
        });
    };

    vm.getProdDetails = function (id) {
        return $http.get('/api/items/' + id);
    };

    vm.deleteItem = function (id, cb) {
        return $http({
            url: '/api/items/' + id,
            method: 'DELETE'
        }).then(function (response) {
            alert(response.data);
            cb();
        });
    };
});
'use strict';

angular.module('app').service('materialSrv', function ($http) {
    var _this = this;

    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    this.materialSrvTest = 'the materialSrv is connected';

    //      ╔══════════════════════════════════════╗
    //      ║              Variables               ║
    //      ╚══════════════════════════════════════╝
    this.messageResponse = null;
    //      ╔══════════════════════════════════════╗
    //      ║              END POINTS              ║
    //      ╚══════════════════════════════════════╝
    this.createNewMat = function (type) {
        type = type.one;
        var data = { "type": type.makeUpperCase(type) },
            unique = true;
        _this.matList.data.forEach(function (e) {
            if (data.type === e.type) {
                unique = false;
                return alert('Material "' + e.type + '" already exists!');
            }
        });
        if (unique === true) {
            $http({
                url: '/api/mats',
                method: 'POST',
                data: data
            }).then(function (response) {
                _this.messageResponse = response.data;
                alert(response.data);
            });
        }
    };

    this.getAllMats = function (_) {
        return $http.get('/api/mats').then(function (response) {
            _this.matList = response;
            return response.data.sort(function (a, b) {
                var typeA = a.type.toUpperCase();
                var typeB = b.type.toUpperCase();
                if (typeA < typeB) {
                    return -1;
                }
                if (typeA > typeB) {
                    return 1;
                }
                return 0;
            });
        });
    };

    this.deleteMat = function (id, cb) {
        $http({
            url: '/api/mats/' + id,
            method: 'DELETE'
        }).then(function (response) {
            _this.messageResponse = response.data;
            alert(response.data);
            cb();
        });
    };
});
'use strict';

angular.module('app').service('sizeSrv', function ($http) {
    var _this = this;

    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    this.sizeSrvTest = 'the sizeSrv is connected';

    //      ╔══════════════════════════════════════╗
    //      ║              Variables               ║
    //      ╚══════════════════════════════════════╝
    this.messageResponse = null;
    //      ╔══════════════════════════════════════╗
    //      ║              END POINTS              ║
    //      ╚══════════════════════════════════════╝
    this.createNewSize = function (obj) {
        var newSize = {},
            unique = true;
        if (obj.two > obj.one) {
            newSize.width = obj.two;
            newSize.height = obj.one;
            newSize.type = "Landscape";
        } else if (obj.two < obj.one) {
            newSize.width = obj.two;
            newSize.height = obj.one;
            newSize.type = "Portrait";
        } else {
            newSize.width = obj.two;
            newSize.height = obj.one;
            newSize.type = "Square";
        }
        console.log("type for backend ", newSize);
        _this.sizeList.data.forEach(function (e) {
            // console.log('this is e: ', e)
            // console.log('this is newSize: ', newSize)
            if (newSize.type === e.orientation && newSize.width === e.width && newSize.height === e.height) {
                unique = false;
                return alert('Size with demensions: ' + e.width + 'in. x ' + e.height + 'in. (' + e.orientation + ') already exists!');
            }
        });
        if (unique === true) {
            console.log('it is unique!');
            $http({
                url: '/api/sizes',
                method: 'POST',
                data: newSize
            }).then(function (response) {
                _this.messageResponse = response.data;
                alert(response.data);
            });
        }
    };

    this.getAllSizes = function (_) {
        return $http.get('/api/sizes').then(function (response) {
            _this.sizeList = response;
            var concatData = response.data.map(function (e) {
                e.width = e.width / 1;
                e.height = e.height / 1;
                e.width > e.height ? e.orientation = "Landscape" : e.orientation = "Portrait";
                e.width === e.height ? e.orientation = "Square" : null;
                return e;
            });
            return concatData.sort(function (a, b) {
                var typeA = a.width;
                var typeB = b.width;
                if (typeA < typeB) {
                    return -1;
                }
                if (typeA > typeB) {
                    return 1;
                }
                return 0;
            });
        });
    };

    this.deleteSize = function (id, cb) {
        $http({
            url: '/api/sizes/' + id,
            method: 'DELETE'
        }).then(function (response) {
            _this.messageResponse = response.data;
            alert(response.data);
            cb();
        });
    };
});
//# sourceMappingURL=bundle.js.map
