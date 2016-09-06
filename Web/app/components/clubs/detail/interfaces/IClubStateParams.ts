namespace app {
    'use strict';
    /**
     * Stateparams
     * 
     * @interface IClubDetailOverviewStateParams
     * @extends {angular.ui.IStateParamsService}
     */
     export interface IClubStateParams extends angular.ui.IStateParamsService {
        /**
         * 
         * 
         * @type {string}
         */
        id: string;
    }
}