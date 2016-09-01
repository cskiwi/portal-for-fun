namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface IEventService
     */
    export interface IEventService {
      
    }

    /**
     * 
     * 
     * @class EventService
     * @implements {IEventService}
     */
    class EventService implements IEventService {

        // @ngInject
        /**
         * Creates an instance of EventService.
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
    angular.module('app').service('eventService', EventService); 
}