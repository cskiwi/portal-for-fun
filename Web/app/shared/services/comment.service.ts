namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface ICommentService
     */
    export interface ICommentService {
      
    }

    /**
     * 
     * 
     * @class CommentService
     * @implements {ICommentService}
     */
    class CommentService implements ICommentService {

        // @ngInject
        /**
         * Creates an instance of CommentService.
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
    angular.module('app').service('commentService', CommentService);
}