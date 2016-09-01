
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class ClubListController
     */
    class ClubListController {
        /**
         * Is an array of clubs, but we store it as object so we can 
         * 
         * @type {*}
         */
        public clubs: Map<Club> = {};
        // @ngInject
        /**
         * Creates an instance of ClubListController.
         * 
         * @param {angular.ILogService} $log
         * @param {IClubService} clubService
         */
        constructor(
            private $log: angular.ILogService,
            private clubService: IClubService
        ) {
            let me: ClubListController = this;
            $log.debug('ClubListController initialized');
            clubService.getClubs().then(clubs => {
                me.clubs = clubs;
            });

        }


    }

    angular.module('app').controller('ClubListController', ClubListController);
}
