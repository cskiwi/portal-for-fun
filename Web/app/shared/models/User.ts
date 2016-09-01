namespace app {
    'use strict';

    export class AppUser extends DbModelBase {
        name: string;
        slug: string;
        uid: string;
        constructor(data: any) {
            super();
            this.uid = data.uid;
            this.name = data.name || data.displayName;
            this.slug = data.slug || this.replaceAll(this.name, ' ', '_').toLowerCase();
        }
    }

    export interface IUser extends firebase.User {
        AppUser: AppUser;
    }
}