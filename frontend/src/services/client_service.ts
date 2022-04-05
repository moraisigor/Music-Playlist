import axios from "axios";
import Environment from "../app/environment";
import ClientModel from "../models/client";

class ClientsResponse {
    maxPages: number;
    data: ClientModel[];

    constructor(maxPages?: number, data?: ClientModel[]) {
        this.data = data ? data : [];
        this.maxPages = maxPages ? maxPages : 1;
    }
}

export async function listAllClients() {
    return await axios.get<ClientModel[]>(`${Environment.httpURL}/clients`)
        .then((resp) => resp.data)
        .catch((error) => []);
}


export async function listClients(page: number) {
    return await axios.get<ClientsResponse>(`${Environment.httpURL}/clients`, {
        params: {
            'page': page 
        }
    })
    .then((resp) => resp.data)
    .catch((error) => new ClientsResponse());
}

export async function createClient(name: string, planId: string) {
    return await axios.post<ClientModel>(`${Environment.httpURL}/clients`, {
        "music": {
            "name": name,
            "plan": planId
        }
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}

export async function updateClient(id: string, music: Object, plan: string) {
    return await axios.put<ClientModel>(`${Environment.httpURL}/clients/${id}`, {
        "music": music,
        "plan": plan
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}

export async function inactivateClient(planId: string) {
    await axios.delete(`${Environment.httpURL}/clients/${planId}`);
}