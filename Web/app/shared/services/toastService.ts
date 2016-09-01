
namespace app {
    'use strict';

    /**
     * 
     * 
     * @export
     * @interface ICustomToastService
     */
    export interface ICustomToastService {
        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        show(content: string, opt?: IMyToastOptions): angular.IPromise<any>;
        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        showOk(content: string, opt?: IMyToastOptions): angular.IPromise<any>;
        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        error(content: string, opt?: IMyToastOptions): angular.IPromise<any>;
        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        warn(content: string, opt?: IMyToastOptions): angular.IPromise<any>;
        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        success(content: string, opt?: IMyToastOptions): angular.IPromise<any>;
    }

    /**
     * 
     * 
     * @export
     * @interface IMyToastOptions
     * @extends {angular.material.IToastOptions}
     */
    export interface IMyToastOptions extends angular.material.IToastOptions {
        /**
         * 
         * 
         * @type {string}
         */
        type?: string;
        /**
         * 
         * 
         * @type {string}
         */
        action?: string;
    }

    /**
     * 
     * 
     * @class ToastService
     * @implements {ICustomToastService}
     */
    class ToastService implements ICustomToastService {
        /**
         * 
         * 
         * @private
         * @type {IMyToastOptions}
         */
        private defaultoptions: IMyToastOptions;

        // @ngInject
        /**
         * Creates an instance of ToastService.
         * 
         * @param {angular.material.IToastService} $mdToast
         */
        constructor(private $mdToast: angular.material.IToastService) {
            this.defaultoptions = {
                hideDelay: 6000,
                position: 'bottom left'
            };
        }

        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} opt
         * @returns {angular.IPromise<any>}
         */
        show(content: string, opt: IMyToastOptions): angular.IPromise<any> {
            let options: IMyToastOptions = angular.extend(this.defaultoptions, opt);
            let toast: angular.material.ISimpleToastPreset = this.$mdToast.simple();

            if (content) {
                toast.textContent(content);
            }
            if (options.position) {
                toast.position(options.position);
            }
            if (options.action) {
                toast.action(options.action);
            }
            if (options.hideDelay) {
                toast.hideDelay(options.hideDelay);
            }
            if (options.type) {
                toast.theme(options.type);
            }
            return this.$mdToast.show(toast);
        }

        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        error(content: string, opt?: IMyToastOptions): angular.IPromise<any> {
            opt = opt || {};
            opt.type = 'error-toast';
            let options: IMyToastOptions = angular.extend(this.defaultoptions, opt);
            return this.show(content, options);
        }

        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        success(content: string, opt?: IMyToastOptions): angular.IPromise<any> {
            opt = opt || {};
            opt.type = 'success-toast';
            let options: IMyToastOptions = angular.extend(this.defaultoptions, opt);
            return this.show(content, options);
        }

        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        warn(content: string, opt?: IMyToastOptions): angular.IPromise<any> {
            opt = opt || {};
            opt.type = 'warn-toast';
            let options: IMyToastOptions = angular.extend(this.defaultoptions, opt);
            return this.show(content, options);
        }

        /**
         * 
         * 
         * @param {string} content
         * @param {IMyToastOptions} [opt]
         * @returns {angular.IPromise<any>}
         */
        showOk(content: string, opt?: IMyToastOptions): angular.IPromise<any> {
            opt = opt || {};
            opt.action = 'OK';
            let options: IMyToastOptions = angular.extend(this.defaultoptions, opt);
            return this.show(content, options);
        }
    }

    angular.module('app.services')
        .service('toastService', ToastService);

}