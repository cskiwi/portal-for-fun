
namespace app {
    'use strict';


    interface IClubDetailUsersStateParams extends IClubStateParams {

    }
    /**
     * 
     * 
     * @class ClubDetailUsersController
     */
    class ClubDetailUsersController {
        public club: Club;

        public loading: Boolean;

        // @ngInject
        /**
         * Creates an instance of ClubDetailUsersController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(
            private $log: angular.ILogService,
            private $stateParams: IClubDetailUsersStateParams,
            private $state: angular.ui.IStateService,
            private clubService: IClubService
        ) {
            let me: ClubDetailUsersController = this;
            $log.debug('ClubDetailUsersController initialized');
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

    angular.module('app').controller('ClubDetailUsersController', ClubDetailUsersController);
}
