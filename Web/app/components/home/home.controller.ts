
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class HomeController
     */
    class HomeController {
        /**
         * 
         * 
         * @private
         * @type {{}}
         */
        private clubs: {};
        /**
         * 
         * 
         * @private
         * @type {{}}
         */
        private users: {};
        /**
         * 
         * 
         * @private
         * @type {string}
         */
        private id: string;

        // @ngInject
        /**
         * Creates an instance of HomeController.
         * 
         * @param {angular.IScope} $scope
         * @param {angular.ILogService} $log
         * @param {IClubService} clubService
         * @param {IUserService} userService
         */
        constructor(
            private $scope: angular.IScope,
            private $log: angular.ILogService,
            private clubService: IClubService,
            private userService: IUserService
        ) {
            let me: HomeController = this;
            me.users = userService.users;
            $log.debug('HomeController initialized', me.clubs, me.id);
        }

        // addClub(): void {
        //     let me: HomeController = this;
        //     me.clubService.addClub(new Club({ name: 'Smash For Fun', description: 'The best club ever!' }));
        // }

        // addUser(): void {
        //     let me: HomeController = this;
        //     me.clubService.addUser(me.clubs['smash_for_fun'], me.users[me.userService.keys()[0]]);
        // }

        // deleteClub(): void {
        //     let me: HomeController = this;
        //     if (me.clubs) {
        //         me.clubService.removeClub(me.clubs['smash_for_fun']);
        //     }
        // }
        // removeUser(): void {
        //     let me: HomeController = this;
        //     if (me.clubs) {
        //         me.clubService.removeUser(me.clubs['smash_for_fun'], me.users[me.userService.keys()[0]]);
        //     }
        // }
    }

    angular.module('app').controller('HomeController', HomeController);
}
