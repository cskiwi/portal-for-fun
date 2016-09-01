namespace app {
    'use strict';

    export class Post extends DbModelBase {
        name: string;
        slug: string;

        club: Club;

        constructor(data: any) {
            super();
            this.name = data.name;
            this.slug = data.slug || this.replaceAll(this.name, ' ', '_').toLowerCase();
        }
    }
}