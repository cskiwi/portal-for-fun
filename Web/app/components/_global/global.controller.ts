
namespace app {
    'use strict';

    class GlobalController {
        public user: IUser;

        /* @ngInject */
        /**
         * Creates an instance of GlobalController.
         * 
         * @param {angular.ILogService} $log
         * @param {IAuthService} authService
         * @param {IUserService} userService
         * @param {angular.material.IDialogService} $mdDialog
         */
        constructor(
            private $log: angular.ILogService,
            private authService: IAuthService,
            private userService: IUserService,
            $mdDialog: angular.material.IDialogService
        ) {
            $log.debug('GlobalController initialized');
            let me: GlobalController = this;

            authService.onAuthChanged(au => {
                // set the global user (this will be null when logout)
                me.user = au;
                if (au) {
                    userService.getUser(au.uid, true).then(u => {
                        me.user.AppUser = u;
                    });
                }
            });
        }
    }

    angular.module('app').controller('GlobalController', GlobalController);
}
