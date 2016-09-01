
namespace app {
    'use strict';

    /**
     * Initialize the router's default behaviors
     */
    // @ngInject
    function initRouter(
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: angular.ILocationProvider,
        $stateProvider: angular.ui.IStateProvider): void {

        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'app/components/_header/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'vm'
                    },
                    'sidebar': {
                        templateUrl: 'app/components/_sidebar/sidebar.html',
                        controller: 'SidebarController',
                        controllerAs: 'vm'
                    },
                    'main': {
                        resolve: {
                            authUser: function (authService: IAuthService, $q: angular.IQService): angular.IPromise<IUser> {
                                let def: angular.IDeferred<IUser> = $q.defer();
                                authService.onAuthChanged(au => {
                                    def.resolve(au);
                                });
                                return def.promise;
                            }
                        }
                    }
                }

            })

            .state('app.home', {
                url: '/',
                views: {
                    'main@': {
                        templateUrl: 'app/components/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'main@': {
                        templateUrl: 'app/components/login/login.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('app.club', {
                url: '/clubs',
                views: {
                    'main@': {
                        templateUrl: 'app/components/clubs/list/list.html',
                        controller: 'ClubListController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.club.create', {
                url: '/create',
                views: {
                    'main@': {
                        templateUrl: 'app/components/clubs/create/create.html',
                        controller: 'ClubCreateController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.club.detail', {
                url: '/detail/:id',
                views: {
                    'main@': {
                        templateUrl: 'app/components/clubs/detail/overview/overview.html',
                        controller: 'ClubDetailOverviewController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.club.detail.events', {
                url: '/events',
                views: {
                    'main@': {
                        templateUrl: 'app/components/clubs/detail/events/events.html',
                        controller: 'ClubDetailEventController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.club.detail.users', {
                url: '/users',
                views: {
                    'main@': {
                        templateUrl: 'app/components/clubs/detail/users/users.html',
                        controller: 'ClubDetailUserController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.club.detail.posts', {
                url: '/posts',
                views: {
                    'main@': {
                        templateUrl: 'app/components/clubs/detail/posts/posts.html',
                        controller: 'ClubsDetailPostController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.club.edit', {
                url: '/edit/:id',
                views: {
                    'main@': {
                        templateUrl: 'app/components/clubs/edit/edit.html',
                        controller: 'ClubEditController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('app.profile', {
                url: '/profile',
                views: {
                    'main@': {
                        templateUrl: 'app/components/profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

    angular.module('app').config(initRouter);
}  