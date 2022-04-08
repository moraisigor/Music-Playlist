import axios, { AxiosError } from "axios";
import Environment from "../app/environment";
import PlanModel from "../models/plan";

class PlansResponse {
    maxPages: number;
    data: PlanModel[];

    constructor(maxPages?: number, data?: PlanModel[]) {
        this.data = data ? data : [];
        this.maxPages = maxPages ? maxPages : 1;
    }
}

function getAuth() {
    const token: string = sessionStorage.getItem('token') || ""
    return { authorization: `Bearer ${token}` }
}

export async function listPlans(page: number) {
    return await axios.get<PlansResponse>(`${Environment.httpURL}/plans`, {
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

            return new PlansResponse();
        });
}

export async function listPlansByMusic(musicId: string) {
    return await axios.get<PlanModel[]>(`${Environment.httpURL}/plans`, {
        headers: getAuth(),
        params: {
            'music': musicId
        }
    })
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return [];
        });
}

export async function listAllPlans() {
    return await axios.get<PlanModel[]>(`${Environment.httpURL}/plans`, {headers: getAuth()})
        .then((resp) => resp.data)
        .catch((error) => []);
}

export async function createPlan(name: string, musicLimit: number, parent: string) {
    return await axios.post<PlanModel>(`${Environment.httpURL}/plans`, {
            "plan": {
                "name": name,
                "music_limit": musicLimit,
                "parent_id": parent
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

export async function inactivatePlan(planId: string) {
    await axios.delete(`${Environment.httpURL}/plans/${planId}`, {headers: getAuth()})
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
            }

            return null;
        });
}

export async function updatePlan(id: string, plan: Object, parentId: string) {
    return await axios.put<PlanModel>(`${Environment.httpURL}/plans/${id}`, {
            "plan": plan,
            "parent": parentId
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

export async function updateActivePlan(id: string, parentId: string) {
    return await axios.put<PlanModel>(`${Environment.httpURL}/plans/${id}`, {
            "plan": {active: true},
            "parent": parentId
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

