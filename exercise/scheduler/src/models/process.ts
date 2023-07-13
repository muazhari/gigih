export default class Process {
    method: string | undefined
    url: string | undefined
    query: string | undefined
    body: string | undefined
    executeAt: Date | undefined
    isRepeated: Boolean | undefined
    repeatDelay: number | undefined // in milliseconds
    repeatCount: number | undefined

    constructor(
        method: string | undefined,
        url: string | undefined,
        query: string | undefined,
        body: string | undefined,
        executeAt: Date | undefined,
        isRepeated: Boolean | undefined,
        repeatDelay: number | undefined,
        repeatCount: number | undefined,
    ) {
        this.method = method;
        this.url = url;
        this.query = query;
        this.body = body;
        this.executeAt = executeAt;
        this.isRepeated = isRepeated;
        this.repeatDelay = repeatDelay;
        this.repeatCount = repeatCount;
    }

}