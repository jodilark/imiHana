angular.module('app').service('authService', function ($http) {
//      ╔══════════════════════════════════════╗
//      ║                TESTS                 ║
//      ╚══════════════════════════════════════╝
    this.authServiceTest = 'the authService is connected'

//      ╔══════════════════════════════════════╗
//      ║              END POINTS              ║
//      ╚══════════════════════════════════════╝
    this.logout = () => $http.get('/api/auth/logout').then(response => window.location.href = '/')
})