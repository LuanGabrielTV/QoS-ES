export class Publication {
    postId: number | undefined;
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    body: string | undefined

    constructor(postId?: number | undefined, id?: number | undefined, name?: string | undefined, email?: string | undefined, body?: string | undefined) {
        postId = this.postId;
        id = this.id;
        name = this.name;
        email = this.email;
        body = this.body;
    }
}