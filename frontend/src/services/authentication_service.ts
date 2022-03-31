const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function adminSignIn(email: string, password: string): Promise<string> {
    await delay(5000);
    return "TOKEN";
}