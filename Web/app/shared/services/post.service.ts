namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface IPostService
     */
    export interface IPostService {
      
    }

    /**
     * 
     * 
     * @class PostService
     * @implements {IPostService}
     */
    class PostService implements IPostService {

        // @ngInject
        /**
         * Creates an instance of PostService.
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
    angular.module('app').service('postService', PostService);
}