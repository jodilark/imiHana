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
    $scope.createMat = function (type, cb) {
        materialSrv.createNewMat(type), cb(type);
    };

    $scope.clearMatForm = function (type) {
        document.getElementById("create-materials-form").reset();
        $scope.matType = "";
        document.getElementById("mat-type").focus();
        $interval(function (_) {
            getMats();
        }, 500, 1);
    };

    var getMats = function getMats(_) {
        return materialSrv.getAllMats().then(function (response) {
            return $scope.materials = response;
        });
    };
    getMats();

    $scope.deleteMat = function (id) {
        return materialSrv.deleteMat(id, getMats);
    };
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
//# sourceMappingURL=bundle.js.map
