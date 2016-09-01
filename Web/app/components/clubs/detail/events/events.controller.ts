
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class ClubDetailEventsController
     */
    class ClubDetailEventsController {
        // @ngInject
        /**
         * Creates an instance of ClubDetailEventsController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(private $log: angular.ILogService) {
            $log.debug('ClubDetailEventsController initialized');

        }


    }

    angular.module('app').controller('ClubDetailEventsController', ClubDetailEventsController);
}
