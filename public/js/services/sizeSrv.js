angular.module('app').service('sizeSrv', function ($http) {
    //      ╔══════════════════════════════════════╗
    //      ║                TESTS                 ║
    //      ╚══════════════════════════════════════╝
    this.sizeSrvTest = 'the sizeSrv is connected'

    //      ╔══════════════════════════════════════╗
    //      ║              Variables               ║
    //      ╚══════════════════════════════════════╝
    this.messageResponse = null
    //      ╔══════════════════════════════════════╗
    //      ║              END POINTS              ║
    //      ╚══════════════════════════════════════╝
    this.createNewSize = (obj) => {
        let newSize = {}, unique = true
        if (obj.two > obj.one) {
            newSize.width = obj.two
            newSize.height = obj.one
            newSize.type = "Landscape"
        }
        else if (obj.two < obj.one) {
            newSize.width = obj.two
            newSize.height = obj.one
            newSize.type = "Portrait"
        }
        else {
            newSize.width = obj.two
            newSize.height = obj.one
            newSize.type = "Square"
        }
        console.log("type for backend ", newSize)
        this.sizeList.data.forEach(e => {
            // console.log('this is e: ', e)
            // console.log('this is newSize: ', newSize)
            if (newSize.type === e.orientation && newSize.width === e.width && newSize.height === e.height) {
                unique = false
                return alert(`Size with demensions: ${e.width}in. x ${e.height}in. (${e.orientation}) already exists!`)
            }
        })
        if (unique === true) {
            console.log('it is unique!')
            $http({
                url: '/api/sizes',
                method: 'POST',
                data: newSize
            }).then(response => {
                this.messageResponse = response.data
                alert(response.data)
            })
        }
    }

    this.getAllSizes = _ => $http.get('/api/sizes').then(response => {
        this.sizeList = response
        let concatData = response.data.map(e => {
            e.width = e.width / 1
            e.height = e.height / 1
            e.width > e.height ? e.orientation = "Landscape" : e.orientation = "Portrait"
            e.width === e.height ? e.orientation = "Square" : null
            return e
        })
        return concatData.sort((a, b) => {
            let typeA = a.width
            let typeB = b.width
            if (typeA < typeB) {
                return -1;
            }
            if (typeA > typeB) {
                return 1;
            }
            return 0;
        })
    })

    this.deleteSize = (id, cb) => {
        $http({
            url: '/api/sizes/' + id,
            method: 'DELETE'
        }).then(response => {
            this.messageResponse = response.data
            alert(response.data)
            cb()
        })
    }
})