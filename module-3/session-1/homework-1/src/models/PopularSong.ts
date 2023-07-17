
export default class PopularSong {
    _id: string | undefined
    songId : string | undefined
    playCount : number | undefined
    periodOfTime : number | undefined

    constructor(songId: string, playCount: number, periodOfTime: number) {
        this.songId = songId
        this.playCount = playCount
        this.periodOfTime = periodOfTime
    }
}
