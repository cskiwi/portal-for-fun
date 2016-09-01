namespace app {
    'use strict';

    // @ngInject
    function run($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService, $log: angular.ILogService): void {
        $rootScope.$on('$stateChangeError', (
            event: any,
            toState: angular.ui.IState,
            toParams: any,
            fromState: angular.ui.IState,
            fromParams: any,
            error: any
        ) => {
            if (error && error.config && error.config.url) {
                $log.error('$stateChangeError [' + toState.name + '] - status [' + error.status + '] problem url [' + error.config.url + ']', error);
            } else {
                $log.error('$stateChangeError [' + toState.name + ']', error);
            }

            
            if (error === 'AUTH_REQUIRED') {
                $state.go('app.login'); 
            }
        });
    }
    angular.module('app').run(run);
}