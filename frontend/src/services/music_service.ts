import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Environment from "../app/environment";
import MusicModel from "../models/music";
import PlanModel from "../models/plan";

class MusicsResponse {
    maxPages: number;
    data: MusicModel[];

    constructor(maxPages?: number, data?: MusicModel[]) {
        this.data = data ? data : [];
        this.maxPages = maxPages ? maxPages : 1;
    }
}

function getAuth() {
    const token: string = sessionStorage.getItem('token') || ""
    return { authorization: `Bearer ${token}` }
}

export async function listAllMusics() {
    return await axios.get<MusicModel[]>(`${Environment.httpURL}/musics`, { headers: getAuth() })
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return [];
        });
}


export async function listMusics(page: number) {
    return await axios.get<MusicsResponse>(`${Environment.httpURL}/musics`, {
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

        return new MusicsResponse();
    });
}

export async function createMusic(name: string, planId: string) {
    return await axios.post<MusicModel>(`${Environment.httpURL}/musics`, {
            "music": {
                "name": name,
                "plan": planId
            }
        },
        { headers: getAuth() }
    )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return null;
        });
}

export async function updateMusic(id: string, music: Object, plan: string) {
    return await axios.put<MusicModel>(`${Environment.httpURL}/musics/${id}`, {
            "music": music,
            "plan": plan
        },
        { headers: getAuth() }
    )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return null;
        });
}

export async function inactivateMusic(planId: string) {
    await axios.delete(`${Environment.httpURL}/musics/${planId}`, {headers: getAuth()})
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return null;
        });
}