import axios from "axios";
import Environment from "../app/environment";
import MusicModel from "../models/music";

export async function loadPlaylist() {
    const clientId = sessionStorage.getItem('userId')

    return await axios.get<MusicModel[]>(`${Environment.httpURL}/playlist`, {
        params: {
            "id": clientId
        }
    })
        .then((resp) => resp.data)
        .catch((error) => []);
}