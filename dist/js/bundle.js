'use strict';

angular.module('noServer', []);
'use strict';

angular.module('noServer').controller('changeMeController', function ($scope, changeMeService) {
    $scope.controllerTest = "changeMe controller is working";
    $scope.serviceTest = changeMeService.serviceTest;
});
'use strict';

angular.module('noServer').service('changeMeService', function ($http) {
    this.serviceTest = "changeMe service is working";
});
//# sourceMappingURL=bundle.js.map
