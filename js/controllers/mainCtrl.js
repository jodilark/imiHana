angular.module('noServer').controller('changeMeController', function($scope, changeMeService){
    $scope.controllerTest = "changeMe controller is working"
    $scope.serviceTest = changeMeService.serviceTest
})