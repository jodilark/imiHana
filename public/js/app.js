angular.module('app', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/', "")
        $stateProvider.state('home', {
            templateUrl: '../views/landing.html'
            , url: '/'
        })
        $stateProvider.state('browse', {
            templateUrl: '../views/browse.html'
            , url: '/browse'
        })
        $stateProvider.state('orders', {
            templateUrl: '../views/orderHistory.html'
            , url: '/orders'
        })
        $stateProvider.state('cart', {
            templateUrl: '../views/cart.html'
            , url: '/cart'
        })
        $stateProvider.state('checkout', {
            templateUrl: '../views/checkout.html'
            , url: '/checkout'
        })
        $stateProvider.state('confirmation', {
            templateUrl: '../views/confirmation.html'
            , url: '/confirmation'
        })
    })