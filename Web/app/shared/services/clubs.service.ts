namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface IClubService
     */
    export interface IClubService {

        /**
         * 
         * 
         * @returns {Array<string>}
         */
        keys(): Array<string>;

        /**
         * 
         * 
         * @returns {angular.IPromise<Map<Club>>}
         */
        getClubs(): angular.IPromise<Map<Club>>;

        /**
         * 
         * 
         * @param {string} name
         * @returns {angular.IPromise<Club>}
         */
        getClub(name: string): angular.IPromise<Club>;
        /**
         * 
         * 
         * @param {Club} club
         * @returns {angular.IPromise<Club>}
         */
        addClub(club: Club): angular.IPromise<Club>;
        /**
         * 
         * 
         * @param {(number | Club)} indexOrElement
         * @returns {angular.IPromise<void>}
         */
        removeClub(indexOrElement: number | Club): angular.IPromise<void>;

        /**
         * 
         * 
         * @param {(Club)} Element
         * @returns {angular.IPromise<void>}
         */
        updateClub(Element: Club): angular.IPromise<void>;

        /**
         * 
         * 
         * @param {Club} club
         * @param {AppUser} user
         * @returns {angular.IPromise<void>}
         */
        addUser(club: Club, user: AppUser): angular.IPromise<void>;
        /**
         * 
         * 
         * @param {Club} club
         * @param {AppUser} user
         * @returns {angular.IPromise<void>}
         */
        removeUser(club: Club, user: AppUser): angular.IPromise<void>;
    }

    /**
     * 
     * 
     * @class ClubService
     * @implements {IClubService}
     */
    class ClubService implements IClubService {
        /**
         * 
         * 
         * @type {boolean}
         */
        public loaded: boolean;

        /**
         * 
         * 
         * @private
         * @type {*}
         */
        private clubs: Map<Club> = {};
        /**
         * 
         * 
         * @private
         * @type {*}
         */
        private firebaseRef: any;

        // @ngInject
        /**
         * Creates an instance of ClubService.
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
            let me: ClubService = this;
            me.firebaseRef = firebase.database().ref('/clubs');
            me.startListeners();
            me.loaded = false;
        }

        /**
         * 
         * 
         * @returns {Array<string>}
         */
        public keys(): Array<string> {
            let me: ClubService = this;
            return Object.keys(me.clubs);
        }

        /**
         * 
         * 
         * @returns {angular.IPromise<Map<Club>>}
         */
        public getClubs(): angular.IPromise<Map<Club>> {
            let me: ClubService = this;
            let def: angular.IDeferred<Map<Club>> = me.$q.defer();

            me.firebaseRef.once('value', snap => {
                angular.forEach(snap.val(), data => {
                    // if the club contains a slug you can add it :)
                    if (data.slug) {
                        let c: Club = new Club(data);
                        me.clubs[data.slug] = c;
                    }
                });
                def.resolve(me.clubs);
            });

            return def.promise;
        }
        /**
         * 
         * 
         * @param {string} name
         * @returns {angular.IPromise<Club>}
         */
        public getClub(name: string): angular.IPromise<Club> {
            let me: ClubService = this;
            let def: angular.IDeferred<Club> = me.$q.defer();
            let slug: string = name.replace(' ', '_').toLowerCase();
            me.firebaseRef.child(slug).once('value').then(data => {
                def.resolve(new Club(data.val()));
            }).catch(def.reject);

            return def.promise;
        }

        /**
         * 
         * 
         * @param {Club} club
         * @returns {angular.IPromise<Club>}
         */
        public addClub(club: Club): angular.IPromise<Club> {
            let me: ClubService = this;
            let def: angular.IDeferred<Club> = me.$q.defer();

            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};
                if (me.clubs[club.slug] == null) {
                    updates['/clubs/' + club.slug] = club;
                    firebase.database().ref().update(updates).then(r => {
                        return me.getClub(name);
                    }).catch(def.reject);
                } else {
                    me.$log.warn('existing club');
                }
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
         * @returns {angular.IPromise<Club>}
         */
        public updateClub(club: Club): angular.IPromise<Club> {
            let me: ClubService = this;
            let def: angular.IDeferred<Club> = me.$q.defer();

            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};
                if (me.clubs[club.slug] !== null) {
                    updates['/clubs/' + club.slug] = club;
                    firebase.database().ref().update(updates).then(r => {
                        return me.getClub(name);
                    }).catch(def.reject);
                } else {
                    me.$log.warn('Club not found!');
                }
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
        public addUser(club: Club, user: AppUser): angular.IPromise<void> {
            let me: ClubService = this;
            let def: angular.IDeferred<any> = me.$q.defer();
            if (me.authService.isLoggedIn() !== undefined) {
                me.$log.debug('current users', angular.toJson(me.clubs[club.slug].users), me.clubs[club.slug].users.indexOf(user.uid));
                if (me.clubs[club.slug].users.indexOf(user.uid) < 0) {
                    let updates: any = {};
                    updates['/users/' + user.uid + '/clubs/' + club.slug] = true;
                    updates['/clubs/' + club.slug + '/users/' + user.uid] = true;
                    firebase.database().ref().update(updates).then(r => {
                        return me.getClub(name);
                    }).catch(def.reject);
                } else {
                    me.$log.warn('users already in club');
                }

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
        public removeUser(club: Club, user: AppUser): angular.IPromise<void> {
            let me: ClubService = this;
            let def: angular.IDeferred<any> = me.$q.defer();
            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};
                updates['/clubs/' + club.slug + '/users/' + user.uid] = null;
                updates['/users/' + user.uid + '/clubs/' + club.slug] = null;
                firebase.database().ref().update(updates).then(r => {
                    return me.getClub(name);
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
         * @returns {angular.IPromise<void>}
         */
        public removeClub(club: Club): angular.IPromise<void> {
            let me: ClubService = this;
            let def: angular.IDeferred<any> = me.$q.defer();
            if (me.authService.isLoggedIn() !== undefined) {
                let updates: any = {};
                updates['/clubs/' + club.slug] = null;

                club.users.forEach(user => {
                    updates['/users/' + user + '/clubs/' + club.slug] = null;
                });
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
            let me: ClubService = this;
            me.firebaseRef.on(
                'child_added',
                (data: any) => {
                    if (!me.loaded) {
                        return;
                    }
                    let c: Club = new Club(data.val());
                    me.clubs[c.slug] = c;
                    if (!me.$rootScope.$$phase) {
                        me.$rootScope.$apply();
                    }
                }
            );

            me.firebaseRef.on(
                'child_changed',
                (data: any) => {
                    if (!me.loaded) {
                        return;
                    }
                    let updatedClub: Club = new Club(data.val());
                    me.clubs[updatedClub.slug] = updatedClub;
                    if (!me.$rootScope.$$phase) {
                        me.$rootScope.$apply();
                    }
                }
            );

            me.firebaseRef.on(
                'child_removed',
                (data: any) => {
                    if (!me.loaded) {
                        return;
                    }
                    let c: Club = new Club(data.val());
                    delete me.clubs[c.slug];
                    if (!me.$rootScope.$$phase) {
                        me.$rootScope.$apply();
                    }
                }
            );
        }


    }

    angular.module('app').service('clubService', ClubService);
} 