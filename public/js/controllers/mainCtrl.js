angular.module('app').controller('mainCtrl', function ($scope, authService) {
//      ╔══════════════════════════════════════╗
//      ║                TESTS                 ║
//      ╚══════════════════════════════════════╝
    $scope.mainCtrlTest = 'mainCtrl controller is connected and operational'
    $scope.authServiceTest = authService.authServiceTest

//      ╔══════════════════════════════════════╗
//      ║              VARIABLES               ║
//      ╚══════════════════════════════════════╝

})