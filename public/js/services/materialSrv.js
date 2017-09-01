angular.module('app').service('materialSrv', function ($http) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
        this.materialSrvTest = 'the materialSrv is connected'

    //      ╔══════════════════════════════════════╗
    //      ║              Variables               ║
    //      ╚══════════════════════════════════════╝
        this.messageResponse = null
    //      ╔══════════════════════════════════════╗
    //      ║              END POINTS              ║
    //      ╚══════════════════════════════════════╝
        this.createNewMat = (type) => {
            // this.isTrueLuck = 'not any luck at all'
            let data = {"type": type.makeUpperCase(type)}
            $http({
                url: '/api/mats',
                method: 'POST',
                data: data
            }).then(response => {
                this.messageResponse = response.data
                alert(response.data)
            })
        }
    })