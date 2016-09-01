
namespace app {
    'use strict';
    /**
     * 
     * 
     * @interface IClubDetailOverviewStateParams
     * @extends {angular.ui.IStateParamsService}
     */
    interface IClubDetailOverviewStateParams extends angular.ui.IStateParamsService {
        /**
         * 
         * 
         * @type {string}
         */
        id: string;
    }

    /**
     * 
     * 
     * @class ClubDetailOverviewController
     */
    class ClubDetailOverviewController {
        /**
         * 
         * 
         * @type {Club}
         */
        public club: Club;

        // @ngInject
        /**
         * Creates an instance of ClubDetailOverviewController.
         * 
         * @param {angular.ILogService} $log
         * @param {IClubDetailOverviewStateParams} $stateParams
         * @param {angular.ui.IStateService} $state
         * @param {IClubService} clubService
         */
        constructor(
            private $log: angular.ILogService,
            private $stateParams: IClubDetailOverviewStateParams,
            private $state: angular.ui.IStateService,
            private clubService: IClubService
        ) {
            let me: ClubDetailOverviewController = this;
            $log.debug('ClubDetailOverviewController initialized');

            if (!$stateParams.id) {
                me.$state.go('app.club');
            }

            clubService.getClub($stateParams.id).then(c => {
                me.club = c;
            });
        }


    }

    angular.module('app').controller('ClubDetailOverviewController', ClubDetailOverviewController);
}
