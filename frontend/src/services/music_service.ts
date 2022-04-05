import axios from "axios";
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

export async function listAllMusics() {
    return await axios.get<MusicModel[]>(`${Environment.httpURL}/musics`)
        .then((resp) => resp.data)
        .catch((error) => []);
}


export async function listMusics(page: number) {
    return await axios.get<MusicsResponse>(`${Environment.httpURL}/musics`, {
        params: {
            'page': page 
        }
    })
    .then((resp) => resp.data)
    .catch((error) => new MusicsResponse());
}

export async function createMusic(name: string, planId: string) {
    return await axios.post<MusicModel>(`${Environment.httpURL}/musics`, {
        "music": {
            "name": name,
            "plan": planId
        }
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}

export async function updateMusic(id: string, music: Object, plan: string) {
    return await axios.put<MusicModel>(`${Environment.httpURL}/musics/${id}`, {
        "music": music,
        "plan": plan
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}

export async function inactivateMusic(planId: string) {
    await axios.delete(`${Environment.httpURL}/musics/${planId}`);
}