namespace app {
    'use strict';

    export class Club extends DbModelBase {
        name: string;
        slug: string;
        description: string;
        country: string;
        users: Array<{}>;
        

        constructor(data: any) {
            super();

            if (data) {
                this.name = data.name;
                this.description = data.description;
                this.users = new Array<string>();
                this.slug = data.slug || (data.name && this.replaceAll(this.name, ' ', '_').toLowerCase());

                angular.forEach(data.users, (v: boolean, k: string) => {
                    this.users.push(k);
                });
            }
        }
    }
}