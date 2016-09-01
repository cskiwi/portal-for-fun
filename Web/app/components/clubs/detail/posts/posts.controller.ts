
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class ClubDetailPostsController
     */
    class ClubDetailPostsController {
        // @ngInject
        /**
         * Creates an instance of ClubDetailPostsController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(private $log: angular.ILogService) {
            $log.debug('ClubDetailPostsController initialized');

        }


    }

    angular.module('app').controller('ClubDetailPostsController', ClubDetailPostsController);
}
