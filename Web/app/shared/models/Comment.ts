namespace app {
    'use strict';

    export class Comment extends DbModelBase {
        name: string;
        slug: string;

        parent: Comment | Post | Event;

        constructor(data: any) {
            super();
            this.name = data.name;
            this.slug = data.slug || this.replaceAll(this.name, ' ', '_').toLowerCase();
        }
    }
}