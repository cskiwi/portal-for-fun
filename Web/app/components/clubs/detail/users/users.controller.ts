
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class ClubDetailUsersController
     */
    class ClubDetailUsersController {
        // @ngInject
        /**
         * Creates an instance of ClubDetailUsersController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(private $log: angular.ILogService) {
            $log.debug('ClubDetailUsersController initialized');

        }


    }

    angular.module('app').controller('ClubDetailUsersController', ClubDetailUsersController);
}
