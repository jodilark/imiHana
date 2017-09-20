angular.module('app', ['ui.router', 'ngFileUpload'])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/', "")
        $stateProvider
        .state('home', {
            templateUrl: '../views/landing.html'
            , url: '/'
        })
        .state('browse', {
            templateUrl: '../views/browse.html'
            , url: '/browse'
        })
        .state('orders', {
            templateUrl: '../views/orderHistory.html'
            , url: '/orders'
        })
        .state('cart', {
            templateUrl: '../views/cart.html'
            , url: '/cart'
        })
        .state('checkout', {
            templateUrl: '../views/checkout.html'
            , url: '/checkout'
        })
        .state('confirmation', {
            templateUrl: '../views/confirmation.html'
            , url: '/confirmation'
        })
        .state('admin', {
            templateUrl: '../views/admin.html'
            , url: '/admin'
            , controller: 'adminCtrl as up'
        })
    })