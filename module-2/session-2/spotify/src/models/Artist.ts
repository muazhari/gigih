import BaseModel from "./BaseModel";

export default class Artist extends BaseModel {
    id: string | undefined;
    name: string | undefined;

    constructor(
        id: string | undefined,
        name: string | undefined
    ) {
        super();
        this.id = id;
        this.name = name;
    }

}