export default class Environment {
    private static host: string = "localhost";
    private static port: number = 4000;

    public static httpURL = `http://${this.host}:${this.port}/api`;
}