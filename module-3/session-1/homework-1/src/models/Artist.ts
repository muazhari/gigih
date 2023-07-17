export default class Artist {
    _id: string | undefined
    name : string | undefined
    dob : Date | undefined

    constructor(name: string, dob: Date) {
        this.name = name
        this.dob = dob
    }

}
