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
        type = type.one
        let data = { "type": type.makeUpperCase(type) }, unique = true
        this.matList.data.forEach(e => {
            if (data.type === e.type) {
                unique = false
                return alert(`Material "${e.type}" already exists!`)
            }
        })
        if (unique === true) {
            $http({
                url: '/api/mats',
                method: 'POST',
                data: data
            }).then(response => {
                this.messageResponse = response.data
                alert(response.data)
            })
        }
    }

    this.getAllMats = _ => $http.get('/api/mats').then(response => {
        this.matList = response
        return response.data.sort((a, b) => {
            let typeA = a.type.toUpperCase()
            let typeB = b.type.toUpperCase()
            if (typeA < typeB) {
              return -1;
            }
            if (typeA > typeB) {
              return 1;
            }
            return 0;
        })
    })

    this.deleteMat = (id, cb) => {
        $http({
            url: '/api/mats/' + id,
            method: 'DELETE'
        }).then(response => {
            this.messageResponse = response.data
            alert(response.data)
            cb()
        })
    }
})