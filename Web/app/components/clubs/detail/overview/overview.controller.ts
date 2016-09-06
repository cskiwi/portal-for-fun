namespace app {
    'use strict';

    interface IClubDetailOverviewStateParams extends IClubStateParams {

    }

    /**
     * 
     * 
     * @class ClubDetailOverviewController
     */
    class ClubDetailOverviewController {
        /**
         * Our instance of the user
         * 
         * @type {Club}
         */
        public club: Club;

        public loading: Boolean;

        /**
         * Creates an instance of ClubDetailOverviewController.
         * 
         * @param {angular.ILogService} $log
         * @param {IClubDetailOverviewStateParams} $stateParams
         * @param {angular.ui.IStateService} $state
         * @param {IClubService} clubService
         *
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
            me.loading = true;
            clubService.getClub($stateParams.id).then(c => {
                me.loading = false;
                me.club = c;
                me.$log.debug('users', me.club.users)
            });
        }


    }

    angular.module('app').controller('ClubDetailOverviewController', ClubDetailOverviewController);
}
