
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class ClubCreateController
     */
    class ClubCreateController {
        // @ngInject
        /**
         * Creates an instance of ClubCreateController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(private $log: angular.ILogService) {
            $log.debug('ClubCreateController initialized');

        }


    }

    angular.module('app').controller('ClubCreateController', ClubCreateController);
}
