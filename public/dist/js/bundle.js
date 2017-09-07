'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/', "");
    $stateProvider.state('home', {
        templateUrl: '../views/landing.html',
        url: '/'
    }).state('browse', {
        templateUrl: '../views/browse.html',
        url: '/browse'
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
        controller: 'adminCtrl'
    });
});
'use strict';

angular.module('app').controller('adminCtrl', function ($scope, materialSrv, $interval) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    $scope.adminCtrlTest = 'adminCtrl controller is connected and operational';
    $scope.materialSrvTest = materialSrv.materialSrvTest;

    //      ╔══════════════════════════════════════╗
    //      ║              VARIABLES               ║
    //      ╚══════════════════════════════════════╝

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
            placeholder: "Canvas, Parchment, Poster Paper..."
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

angular.module('app').directive('adminCrudDir', function () {
    return {
        scope: {
            dirData: '='
        },
        templateUrl: '../../views/adminCrud.html'
    };
});
//# sourceMappingURL=bundle.js.map
