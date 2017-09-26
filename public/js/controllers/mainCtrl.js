angular.module('app').controller('mainCtrl', function ($scope, authService) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    $scope.mainCtrlTest = 'mainCtrl controller is connected and operational'
    $scope.authServiceTest = authService.authServiceTest

    //      ╔══════════════════════════════════════╗
    //      ║              VARIABLES               ║
    //      ╚══════════════════════════════════════╝

    //      ╔══════════════════════════════════════╗
    //      ║            HELPER METHODS            ║
    //      ╚══════════════════════════════════════╝
    String.prototype.makeUpperCase = str => {
        let uc = str.toLowerCase().split(' ').map(e => {
            let wordSplit = e.split(''), tuc = wordSplit.splice(0, 1, e.charAt(0).toUpperCase())
            return wordSplit.join('')
        })
        return uc.join(' ')
    }

    //      ╔══════════════════════════════════════╗
    //      ║                Magic                 ║
    //      ╚══════════════════════════════════════╝
    $scope.getUser = _ => authService.user().then(response => {
        console.log(response)
        $scope.isAdmin = response.admin
    })

    $scope.logout = _ => {
        console.log(`clicked`)
        authService.logout()
    }

})