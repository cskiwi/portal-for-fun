
namespace app {
    'use strict';
    /**
     * 
     * 
     * @class LoginController
     */
    class LoginController {
        // @ngInject
        /**
         * Creates an instance of LoginController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(private $log: angular.ILogService) {
            $log.debug('LoginController initialized');

        }


    }

    angular.module('app').controller('LoginController', LoginController);
}
