
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class ClubEditController
     */
    class ClubEditController {
        // @ngInject
        /**
         * Creates an instance of ClubEditController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(private $log: angular.ILogService) {
            $log.debug('ClubEditController initialized');

        }


    }

    angular.module('app').controller('ClubEditController', ClubEditController);
}
