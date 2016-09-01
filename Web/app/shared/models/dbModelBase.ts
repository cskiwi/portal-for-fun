namespace app {
    'use strict';

    export class DbModelBase {
        replaceAll(input: string, search: string, replacement: string): string {
            return input.replace(new RegExp(search, 'g'), replacement);
        };
    }


}