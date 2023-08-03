export default class User {
    userId: string | undefined
    userName: string | undefined
    imageUrl: string | undefined

    constructor(
        userId: string | undefined,
        userName: string | undefined,
        imageUrl: string | undefined
    ) {
        this.userId = userId
        this.userName = userName
        this.imageUrl = imageUrl
    }

    static constructFromApi(user: any): User {
        return new User(
            user.id,
            user.display_name,
            user.images[0].url
        )
    }
}
