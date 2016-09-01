namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface IRightsService
     */
    export interface IRightsService {
        /**
         * 
         * 
         * @param {Club} club
         * @param {AppUser} user
         * @returns {angular.IPromise<void>}
         */
        giveRights(club: Club, user: AppUser): angular.IPromise<void>;
    }

    /**
     * 
     * 
     * @class RightsService
     * @implements {IRightsService}
     */
    class RightsService implements IRightsService {
        /**
         * 
         * 
         * @private
         * @type {*}
         */
        private firebaseRolesRef: any;
        /**
         * 
         * 
         * @private
         * @type {*}
         */
        private firebaseUserRolesRef: any;

        // @ngInject
        /**
         * Creates an instance of RightsService.
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
            let me: RightsService = this;
            me.firebaseRolesRef = firebase.database().ref('/roles');
            me.firebaseUserRolesRef = firebase.database().ref('/userroles');

        }


        /**
         * 
         * 
         * @param {Club} club
         * @param {AppUser} user
         * @returns {angular.IPromise<void>}
         */
        public giveRights(club: Club, user: AppUser): angular.IPromise<void> {
            let me: RightsService = this;
            let def: angular.IDeferred<any> = me.$q.defer();

            return def.promise;
        }

        /**
         * 
         * 
         * @param {AppUser} user
         * @param {(Club | Event | Post)} item
         * @returns {angular.IPromise<boolean>}
         */
        public hasRights(user: AppUser, item: Club | Event | Post): angular.IPromise<boolean> {
            let me: RightsService = this;
            let def: angular.IDeferred<boolean> = me.$q.defer();



            return def.promise;
        }

    }
    angular.module('app').service('rightsService', RightsService);
}