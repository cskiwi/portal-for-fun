namespace app {
    'use strict';

    export class AuthenticationInterceptor {

        private static _instance: AuthenticationInterceptor;

        public static Factory($q: ng.IQService): AuthenticationInterceptor {
            AuthenticationInterceptor._instance = new AuthenticationInterceptor($q);

            return AuthenticationInterceptor._instance;
        }

        constructor(private $q: ng.IQService) {
        }

        public response(response: any): any {
            let self: AuthenticationInterceptor = app.AuthenticationInterceptor._instance;

            return response || self.$q.when(response);
        }

        public responseError(rejection: any): any {
            let self: AuthenticationInterceptor = app.AuthenticationInterceptor._instance;

            console.log(rejection);
            if (rejection.status === 401) {
                // stuff
            }

            // otherwise, default behavior
            return self.$q.reject(rejection);
        }


    }

    angular.module('app').config( function ($httpProvider: ng.IHttpProvider): void {
        $httpProvider.interceptors.push(AuthenticationInterceptor.Factory);
    });
}