import axios, { AxiosError } from "axios";
import Environment from "../app/environment";
import MusicModel from "../models/music";

class InsertResponse {
    public inserted: boolean;

    constructor(inserted?: boolean) {
        this.inserted = inserted || false;
    }
}

function getAuth() {
    const token: string = sessionStorage.getItem('token') || ""
    return { authorization: `Bearer ${token}` }
}

export async function loadPlaylist() {
    return await axios.get<MusicModel[]>(`${Environment.httpURL}/playlist`, { headers: getAuth() })
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return [];
        });
}

export async function loadPlaylistOf(clientId: string) {
    return await axios.get<MusicModel[]>(`${Environment.httpURL}/playlist`, {
            headers: getAuth(),
            params: {
                "client_id": clientId
            }
        }
    )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return [];
        });
}

export async function insertMusic(musicId: string) {
    return await axios.post<InsertResponse>(`${Environment.httpURL}/playlist`, {
            "music_id": musicId
        },
        {headers: getAuth()}
    )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return new InsertResponse();
        });
}

export async function removeMusic(musicId: string) {
    return await axios.delete<InsertResponse>(`${Environment.httpURL}/playlist`, {
            headers: getAuth(),
            params: {
                "music_id": musicId
            }
        }
    )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return new InsertResponse();
        });
}