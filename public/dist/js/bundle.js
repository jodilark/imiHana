'use strict';

angular.module('app', []);
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, authService) {
    // // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.mainCtrlTest = 'mainCtrl controller is connected and operational';
    $scope.authServiceTest = authService.authServiceTest;

    // »»»»»»»»»»»»»»»»»»»║  VARIABLES
});
'use strict';

angular.module('app').service('authService', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.authServiceTest = 'the authService is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.logMeIn = function () {
        return $http.get('/auth', 'Access-Control-Allow-Origin').then(function (response) {
            return res.send('ok');
        });
    };
    this.logout = function () {
        return $http.get('/auth/logout').then(function (response) {
            return window.location = response.data;
        });
    };
});
//# sourceMappingURL=bundle.js.map
