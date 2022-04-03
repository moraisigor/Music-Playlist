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

export async function inactivatePlan(planId: string) {
    await axios.delete(`${Environment.httpURL}/plans/${planId}`);
}