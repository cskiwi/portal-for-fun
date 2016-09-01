
namespace app {
    'use strict';

    function boot(): void {
        deferredBootstrapper.bootstrap({
            element: document,
            module: 'app',
            resolve: {
                // use appConfig like a dependency to access the values
                appConfig: function ($q: angular.IQService, $http: angular.IHttpService): angular.IPromise<XmlConfig> {
                    let x2js: IX2JS = new X2JS();
                    let def: angular.IDeferred < XmlConfig> = $q.defer();
                    // load in config
                    $http.get('config/config.xml').then(
                        (result: any) => {
                            let config: XmlConfig = x2js.xml_str2json(result.data) as XmlConfig;
                            def.resolve(config.app);
                        },
                        def.reject); 
                    return def.promise;
                }
            }
        });
    }

    angular.element(document).ready(() => {
        if (window.cordova) {
            console.log('Running in Cordova, will bootstrap AngularJS once \'deviceready\' event fires.');
            document.addEventListener(
                'deviceready',
                () => {
                    console.log('Deviceready event has fired, bootstrapping AngularJS.');
                    boot();
                },
                false);
        } else {
            console.log('Running in browser, bootstrapping AngularJS now.');
            boot();
        }
    });


}