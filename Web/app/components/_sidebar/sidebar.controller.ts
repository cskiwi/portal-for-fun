namespace app {
    'use strict';

    /**
     * Controlls the sidebar
     * 
     * @class SidebarController
     */
    class SidebarController {
        // @ngInject
        /**
         * Creates an instance of SidebarController.
         * 
         * @param {angular.ILogService} $log
         */
        constructor(private $log: angular.ILogService) {
            $log.debug('SidebarController initialized');
        }


    }

    angular.module('app.controllers').controller('SidebarController', SidebarController);
} 