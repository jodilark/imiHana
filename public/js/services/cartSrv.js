angular.module('app').service('cartSrv', function ($http) {
    var vm = this
    vm.cart = []

    vm.addToCart = obj => {
        let unique = true
        let exists = vm.cart.filter(e => {
            if (e.id === obj.id) {
                console.log("already in cart!!!")
                unique = false
                e.qty = e.qty + 1
            }
        })
        if (unique === true) {
            obj.qty = 1
            vm.cart.push(obj)
        }
        console.log("Cart: ", vm.cart)
    }
})