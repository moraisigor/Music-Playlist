import PlanModel from "./plan";

export default class ClientModel {
    public id: string;
    public email: string;
    public plan: string;

    constructor(id?: string, plan?: string, email?: string) {
        this.id = id ? id : "";
        this.email = email ? email : "";
        this.plan = plan ? plan : "";
    }
}