
namespace app {
    'use strict';

    interface IClubEditControllerStateParams extends IClubStateParams {

    }
    /**
     * 
     * 
     * @class ClubEditController
     */
    class ClubEditController {
        /**
         * Our local instance of the club
         * 
         * @type {Club}
         */
        public club: Club;
        public loading: Boolean;


        // @ngInject
        /**
         * Creates an instance of ClubEditController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(
            private $log: angular.ILogService,
            private $stateParams: IClubEditControllerStateParams,
            private $state: angular.ui.IStateService,
            private clubService: IClubService
        ) {
            let me: ClubEditController = this;
            $log.debug('ClubEditController initialized');

            if (!$stateParams.id) {
                me.$state.go('app.club');
            }

            me.loading = true;
            clubService.getClub($stateParams.id).then(c => {
                me.loading = false;
                me.club = c;
            });
        }


        public save() {
            let me: ClubEditController = this;
            me.clubService.updateClub(me.club).then(c => {
                me.club = c;
            });
        }

    }

    angular.module('app').controller('ClubEditController', ClubEditController);
}
