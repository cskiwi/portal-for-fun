namespace app {
    'use strict';

    export class Event extends DbModelBase {
        name: string;
        slug: string;

        club: Club | string; // can be a club or public event (in case of tournament, ...)
        organizers: AppUser;
        
        constructor(data: any) {
            super();
            this.name = data.name;
            this.slug = data.slug || this.replaceAll(this.name, ' ', '_').toLowerCase();
        }
    }
}