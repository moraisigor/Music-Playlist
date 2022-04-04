import { timeStamp } from "console";

export default class PlanModel {
    public id: string;
    public name: string;
    public active: boolean;
    public musicLimit: number;
    public parentId: string;

    constructor(id?: string, name?: string, active?: boolean, musicLimit?: number, parentId?: string) {
        this.id = id ? id : "";
        this.name = name ? name : "";
        this.active = active ? active : false;
        this.musicLimit = musicLimit ? musicLimit : 0;
        this.parentId = parentId ? parentId : "";
    }
}