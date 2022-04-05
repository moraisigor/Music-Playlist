import axios from "axios";
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

export async function listPlans(page: number) {
    return await axios.get<PlansResponse>(`${Environment.httpURL}/plans`, {
        params: {
            'page': page 
        }
    })
        .then((resp) => resp.data)
        .catch((error) => new PlansResponse());
}

export async function listPlansByMusic(musicId: string) {
    return await axios.get<PlanModel[]>(`${Environment.httpURL}/plans`, {
        params: {
            'music': musicId
        }
    })
        .then((resp) => resp.data)
        .catch((error) => []);
}

export async function listAllPlans() {
    return await axios.get<PlanModel[]>(`${Environment.httpURL}/plans`)
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
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}

export async function inactivatePlan(planId: string) {
    await axios.delete(`${Environment.httpURL}/plans/${planId}`);
}

export async function updatePlan(id: string, plan: Object, parentId: string) {
    return await axios.put<PlanModel>(`${Environment.httpURL}/plans/${id}`, {
        "plan": plan,
        "parent": parentId
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}

export async function updateActivePlan(id: string, parentId: string) {
    return await axios.put<PlanModel>(`${Environment.httpURL}/plans/${id}`, {
        "plan": {active: true},
        "parent": parentId
    })
        .then((resp) => resp.data)
        .catch((error) => null);
}

