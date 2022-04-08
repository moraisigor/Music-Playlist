import axios from "axios";
import Environment from "../app/environment";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class AuthenticationClaim {
    public aud: string;
    public exp: number;
    public iat: number;
    public iss: string;
    public jti: string;
    public nbf: number;
    public sub: string;
    public typ: string;
    
    constructor(aud?: string, exp?: number, iat?: number, iss?: string, jti?: string, nbf?: number, sub?: string, typ?: string) {
        this.aud = aud || "";
        this.exp = exp || 0;
        this.iat = iat || 0;
        this.iss = iss || "";
        this.jti = jti || "";
        this.nbf = nbf || 0;
        this.sub = sub || "";
        this.typ = typ || "";
    }
}
class AuthenticationResponse {
    public token: string;
    public claims: AuthenticationClaim;

    constructor(token?: string, claims?: AuthenticationClaim) {
        this.token = token || "";
        this.claims = claims || new AuthenticationClaim();
    }
}

export async function adminSignIn(email: string, password: string) {
    return await axios.post<AuthenticationResponse>(`${Environment.authURL}/admin`, {
        "email": email,
        "password": password
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}


export async function clientSignIn(email: string, password: string) {
    return await axios.post<AuthenticationResponse>(`${Environment.authURL}/client`, {
        "email": email,
        "password": password
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}