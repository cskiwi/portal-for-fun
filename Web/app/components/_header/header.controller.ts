
namespace app {
    'use strict';

    /**
     * @class HeaderController
     */
    class HeaderController {
        // @ngInject
        /**
         * Creates an instance of HeaderController.
         * 
         * @param {angular.IScope} $scope
         * @param {angular.ILogService} $log
         * @param {angular.material.ISidenavService} $mdSidenav
         * @param {IAuthService} authService
         */
        constructor(
            private $scope: angular.IScope,
            private $log: angular.ILogService,
            private $mdSidenav: angular.material.ISidenavService,
            private authService: IAuthService
        ) {
            $log.debug('headerController initialized');
        }


        /**
         * 
         */
        toggleNavBar(): void {
            this.$mdSidenav('left').toggle();
        };


        /**
         * 
         */
        login(): void {
            this.authService.login();
        }

        /**
         * 
         */
        logout(): void {
            let me: HeaderController = this;
            this.authService.logout().then(r => {
                me.$log.debug('loggedout');
            });
        }


    }

    angular.module('app').controller('HeaderController', HeaderController);
} 
