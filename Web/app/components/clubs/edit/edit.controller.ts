
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

            clubService.getClub($stateParams.id).then(c => {
                me.club = c;
            });
        }


        public save() {
            let me: ClubEditController = this;
            // me.clubService.updateClub(me.club);
        }

    }

    angular.module('app').controller('ClubEditController', ClubEditController);
}
