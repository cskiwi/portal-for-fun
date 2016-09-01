namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface IGroupService
     */
    export interface IGroupService {
      
    }

    /**
     * 
     * 
     * @class GroupService
     * @implements {IGroupService}
     */
    class GroupService implements IGroupService {

        // @ngInject
        /**
         * Creates an instance of GroupService.
         * 
         * @param {angular.IRootScopeService} $rootScope
         * @param {angular.IQService} $q
         * @param {angular.ILogService} $log
         */
        constructor(
            private $rootScope: angular.IRootScopeService,
            private $q: angular.IQService,
            private $log: angular.ILogService
        ) {
        }
    }
    angular.module('app').service('groupService', GroupService);
}