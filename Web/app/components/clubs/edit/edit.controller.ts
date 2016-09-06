
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
        }


    }

    angular.module('app').controller('ClubEditController', ClubEditController);
}
