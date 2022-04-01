export default class PlanModel {
    private name: string;
    private status: boolean;

    constructor(name?: string, status?: boolean) {
        this.name = name == null ? "" : name;
        this.status = status == null ? false : status;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public setStatus(status: boolean) {
        this.status = status;
    }
}