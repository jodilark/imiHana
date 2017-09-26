angular.module('app').service('itemSrv', function ($http, Upload, $window) {
    this.serviceTest = 'service is connected'

    var vm = this

    vm.upload = file => {
        return Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(resp => { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                // $window.alert(`Success! ${resp.config.data.file.name} was uploaded successfully and can be accessed here: ${resp.data.url}`);
                return { originalName: resp.config.data.file.name, url: resp.data.url }
            } else {
                $window.alert('an error occurred');
            }
        }, resp => { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        });
    };
    vm.item = obj => {
        console.log(obj)
        return $http({
            url: '/api/items'
            , method: 'POST'
            , data: obj
        }).then(response => {
            console.log("success from server: ", response)
            return response
        })
    }

    vm.getAllItems = _ => {
        return $http({
            url: '/api/items'
            , method: 'GET'
        }).then(response => {
            return response
        })
    }

    vm.getProdDetails = id => {
        return $http.get('/api/items/' + id)
    }

    vm.deleteItem = (id, cb) => {
        return $http({
            url: '/api/items/' + id
            , method: 'DELETE'
        }).then(response => {
            alert(response.data)
            cb()
        })
    }
})