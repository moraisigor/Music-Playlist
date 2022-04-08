import axios, { AxiosError } from "axios";
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

function getAuth() {
    const token: string = sessionStorage.getItem('token') || ""
    return { authorization: `Bearer ${token}` }
}

export async function listAllClients() {
    return await axios.get<ClientModel[]>(`${Environment.httpURL}/clients`, {headers: getAuth()})
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }
    
            return [];
        });
}


export async function listClients(page: number) {
    return await axios.get<ClientsResponse>(`${Environment.httpURL}/clients`, {
        headers: getAuth(),
        params: {
            'page': page 
        }
    })
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem('token');
        }

        return new ClientsResponse();
    });
}

export async function createClient(email: string, password: string, planId: string) {
    return await axios.post<ClientModel>(`${Environment.httpURL}/clients`, {
            "client": {
                "email": email,
                "password": password,
                "plan_id": planId
            }
        },
        {headers: getAuth()}
    )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return null;
        });
}

export async function updateClient(id: string, music: Object, plan: string) {
    return await axios.put<ClientModel>(`${Environment.httpURL}/clients/${id}`, {
            "music": music,
            "plan": plan
        },
        {headers: getAuth()}
    )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return null;
        });
}

export async function inactivateClient(planId: string) {
    await axios.delete(`${Environment.httpURL}/clients/${planId}`, {headers: getAuth()})
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return null;
        });
}