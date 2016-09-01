namespace app {
    'use strict';

    export interface IAuthService {
        login(): any;
        logout(): firebase.Promise<void>;
        onAuthChanged(changed: Function): void;
        isLoggedIn(): boolean;
        getUser(): IUser;
    }

    class AuthService implements IAuthService {
        private currentAuth: firebase.auth.Auth;
        private currentUser: IUser;

        // @ngInject
        constructor(
            private $rootScope: angular.IRootScopeService,
            private $q: angular.IQService,
            private $log: angular.ILogService
        ) {
            this.currentAuth = firebase.auth();
        }

        onAuthChanged(changed: Function): void {
            let me: AuthService = this;

            this.currentAuth.onAuthStateChanged(r => {
                if (r) {
                    me.currentUser = r as IUser;
                } else {
                    me.currentUser = undefined;
                }
                changed(me.currentUser);
            });
        }

        getUser(): IUser {
            return this.currentUser;
        }

        isLoggedIn(): boolean {
            return this.currentUser !== undefined;
        }

        login(): any {
            let provider: firebase.auth.AuthProvider = new firebase.auth.GoogleAuthProvider();
            return this.currentAuth.signInWithPopup(provider);
        }

        logout(): firebase.Promise<void> {
            return this.currentAuth.signOut();
        }
    }
    angular.module('app').service('authService', AuthService);
}