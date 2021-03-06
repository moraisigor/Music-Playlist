export default class Environment {
    private static host: string = "manutencaowebgestio.ddns.net";
    private static port: number = 4000;

    public static httpURL = `http://${this.host}:${this.port}/api`;
    public static authURL = `http://${this.host}:${this.port}/auth`;
}