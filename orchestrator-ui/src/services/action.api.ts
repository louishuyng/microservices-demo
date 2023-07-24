import { ORCHESTRATOR_URL } from "./constants";
import { ActionModel, RequestMethod } from "@/models/action.model";

export const getListAction = async (): Promise<ActionModel[]> => {
  try {
    const res = await fetch(`${ORCHESTRATOR_URL}/actions`, {
      cache: "no-cache",
    });
    const data: [] = await res.json();

    return data.map((action) => new ActionModel(action));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export type ActionPayload = {
  name: string;
  apiPath: string;
  requestMethod: RequestMethod;
  serviceId: number;
};

export const createAction = async (data: ActionPayload): Promise<void> => {
  try {
    await fetch(`${ORCHESTRATOR_URL}/actions`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
