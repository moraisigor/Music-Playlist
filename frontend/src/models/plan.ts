export default class PlanModel {
    private name: string;
    private status: boolean;
    private musicLimit: number;

    constructor(name?: string, status?: boolean, musicLimit?: number) {
        this.name = name == null ? "" : name;
        this.status = status == null ? false : status;
        this.musicLimit = musicLimit == null ? 0 : musicLimit;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public setStatus(status: boolean): void {
        this.status = status;
    }
    
    public getMusicLimit(): number {
        return this.musicLimit;
    }

    public setMusicLimit(musicLimit: number): void {
        this.musicLimit = musicLimit;
    }

    public nameIncludes(name: string): boolean {
        return this.name.toLowerCase().includes(name.toLowerCase());
    }
    
    public musicLimitIncludes(limit: string): boolean {
        return this.musicLimit.toString().toLowerCase().includes(limit.toLowerCase());
    }
}