/**
 * @param  {boolean} create
 */
namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface IUserService
     */
    export interface IUserService {
        /**
         * 
         * 
         * @type {{}}
         */
        users: {};

        /**
         * 
         * 
         * @returns {Array<string>}
         */
        keys(): Array<string>;

        /**
         * 
         * 
         * @param {string} name
         * @param {boolean} create
         * @returns {angular.IPromise<AppUser>}
         */
        getUser(name: string, create: boolean): angular.IPromise<AppUser>;
        /**
         * 
         * 
         * @param {AppUser} user
         * @returns {angular.IPromise<AppUser>}
         */
        addUser(user: AppUser): angular.IPromise<AppUser>;
        /**
         * 
         * 
         * @param {AppUser} user
         * @returns {angular.IPromise<AppUser>}
         */
        updateUser(user: AppUser): angular.IPromise<AppUser>;
        /**
         * 
         * 
         * @param {(number | AppUser)} indexOrElement
         * @returns {angular.IPromise<void>}
         */
        removeUser(indexOrElement: number | AppUser): angular.IPromise<void>;
        /**
         * 
         * 
         * @param {Club} club
         * @param {AppUser} user
         * @returns {angular.IPromise<void>}
         */
        addClub(club: Club, user: AppUser): angular.IPromise<void>;
    }

    /**
     * 
     * 
     * @class UserService
     * @implements {IUserService}
     */
    class UserService implements IUserService {
        /**
         * 
         * 
         * @type {*}
         */
        public users: any = {};
        /**
         * 
         * 
         * @private
         * @type {*}
         */
        private firebaseRef: any;

        // @ngInject
        /**
         * Creates an instance of UserService.
         * 
         * @param {angular.IRootScopeService} $rootScope
         * @param {angular.ILogService} $log
         * @param {angular.IQService} $q
         * @param {angular.IFilterService} $filter
         * @param {IAuthService} authService
         */
        constructor(
            private $rootScope: angular.IRootScopeService,
            private $log: angular.ILogService,
            private $q: angular.IQService,
            private $filter: angular.IFilterService,
            private authService: IAuthService
        ) {
            let me: UserService = this;
            me.firebaseRef = firebase.database().ref('/users');

            me.startListeners();
        }
        /**
         * @returns Array
         */
        /**
         * 
         * 
         * @returns {Array<string>}
         */
        public keys(): Array<string> {
            let me: UserService = this;
            return Object.keys(me.users);
        }
        /**
         * @param  {string} uid
         * @param  {boolean=false} create
         * @returns angular
         */
        /**
         * 
         * 
         * @param {string} uid
         * @param {boolean} [create=false]
         * @returns {angular.IPromise<AppUser>}
         */
        public getUser(uid: string, create: boolean = false): angular.IPromise<AppUser> {
            let me: UserService = this;
            let def: angular.IDeferred<AppUser> = me.$q.defer();

            if (me.authService.isLoggedIn() !== undefined) {
                me.firebaseRef.child(uid).once('value').then(data => {
                    if (data.val()) {
                        me.$log.debug('found the user');
                        // return found user
                        def.resolve(new AppUser(data.val()));
                    } else if (create) {
                        // create new user
                        me.addUser(new AppUser(me.authService.getUser())).then(def.resolve).catch(def.reject);
                    } else {
                        // nothing found 
                        def.resolve(undefined);
                    }
                }).catch(def.reject);
            } else {
                me.$log.error('Not logged in');
                def.reject('not logged in');
            }


            return def.promise;
        }

        /**
         * 
         * 
         * @param {AppUser} user
         * @returns {angular.IPromise<AppUser>}
         */
        public addUser(user: AppUser): angular.IPromise<AppUser> {
            let me: UserService = this;
            let def: angular.IDeferred<AppUser> = me.$q.defer();

            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};
                updates['/users/' + user.uid] = user;
                firebase.database().ref().update(updates).then(r => {
                    return me.getUser(name);
                }).catch(def.reject);
            } else {
                me.$log.error('Not logged in');
                def.reject('not logged in');
            }
            return def.promise;

        }
        /**
         * 
         * 
         * @param {AppUser} user
         * @returns {angular.IPromise<AppUser>}
         */
        public updateUser(user: AppUser): angular.IPromise<AppUser> {
            let me: UserService = this;
            let def: angular.IDeferred<AppUser> = me.$q.defer();

            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};
                updates['/users/' + user.uid] = user;
                firebase.database().ref().update(updates).then(r => {
                    return me.getUser(name);
                }).catch(def.reject);
            } else {
                me.$log.error('Not logged in');
                def.reject('not logged in');
            }
            return def.promise;

        }

        /**
         * 
         * 
         * @param {Club} club
         * @param {AppUser} user
         * @returns {angular.IPromise<void>}
         */
        public addClub(club: Club, user: AppUser): angular.IPromise<void> {
            let me: UserService = this;
            let def: angular.IDeferred<any> = me.$q.defer();
            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};

                updates['/users/' + user.uid + '/clubs/' + club.slug] = true;
                updates['/clubs/' + club.slug + '/users/' + user.uid] = club.users.push({ name: user.name });
                firebase.database().ref().update(updates).then(r => {
                    return me.getUser(name);
                }).catch(def.reject);
            } else {
                me.$log.error('Not logged in');
                def.reject('not logged in');
            }
            return def.promise;
        }

        /**
         * 
         * 
         * @param {AppUser} user
         * @returns {angular.IPromise<void>}
         */
        public removeUser(user: AppUser): angular.IPromise<void> {
            let me: UserService = this;
            let def: angular.IDeferred<any> = me.$q.defer();
            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};
                updates['/users/' + user.uid] = null;
                firebase.database().ref().update(updates).then(def.resolve).catch(def.reject);
            } else {
                me.$log.error('Not logged in');
                def.reject('not logged in');
            }

            return def.promise;
        }

        /**
         * 
         * 
         * @private
         */
        private startListeners(): void {
            let me: UserService = this;
            me.firebaseRef.on(
                'child_added',
                (data: any) => {
                    let c: AppUser = new AppUser(data.val());
                    me.users[c.uid] = c;
                }
            );

            me.firebaseRef.on(
                'child_changed',
                (data: any) => {
                    let updatedUser: AppUser = new AppUser(data.val());
                    me.users[updatedUser.uid] = updatedUser;
                }
            );

            me.firebaseRef.on(
                'child_removed',
                (data: any) => {
                    let c: AppUser = new AppUser(data.val());
                    delete me.users[c.uid];
                }
            );
        }
    }

    angular.module('app').service('userService', UserService);
} 