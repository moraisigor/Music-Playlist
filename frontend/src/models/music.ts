export default class MusicModel {
    public id: string;
    public name: string;
    public plans: string[];
    public active: boolean;

    constructor(id?: string, name?: string, plans?: string[], active?: boolean) {
        this.id = id ? id : "";
        this.name = name ? name : "";
        this.plans = plans ? plans : [];
        this.active = active ? active : false;
    }
}