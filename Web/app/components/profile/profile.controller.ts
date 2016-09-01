
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class ProfileController
     */
    class ProfileController {
        // @ngInject
        /**
         * Creates an instance of ProfileController.
         * 
         * @param {angular.ILogService} $log
         * @param {IUserService} userService
         */
        constructor(private $log: angular.ILogService, userService: IUserService) {
            $log.debug('ProfileController initialized');

            userService.getUser('sqdsqdsd', false).then(r => {
                $log.debug('this guy = ', r.name);

                r.slug = 'test ';
                userService.updateUser(r).then(u => {
                    $log.debug('test', u);
                });
            });
        }


    }

    angular.module('app').controller('ProfileController', ProfileController);
}
