import { ORCHESTRATOR_URL } from "./constants";
import { ActionModel, RequestMethod } from "@/models/action.model";

export interface ListActionOption {
  filter_by?: FilterByAction;
  filter_value?: string | number | null | undefined;
  search?: string | undefined;
}

export type FilterByAction = "serviceId";

export const getListAction = async ({
  filter_by,
  filter_value,
  search,
}: ListActionOption): Promise<ActionModel[]> => {
  try {
    let url = `${ORCHESTRATOR_URL}/actions?search=${search || ""}&`;

    if (filter_by && filter_value) {
      url = url + `filter_by=${filter_by}&filter_value=${filter_value}&`;
    }

    const res = await fetch(url, {
      cache: "no-cache",
    });
    const data: [] = await res.json();

    return data.map((action) => new ActionModel(action));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAction = async (id: any): Promise<ActionModel | undefined> => {
  try {
    const res = await fetch(`${ORCHESTRATOR_URL}/actions/${id}`, {
      cache: "no-cache",
    });
    const data = await res.json();

    return new ActionModel(data);
  } catch (err) {
    console.log(err);
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

export const updateAction = async (
  id: any,
  data: ActionPayload
): Promise<void> => {
  try {
    await fetch(`${ORCHESTRATOR_URL}/actions/${id}`, {
      method: "PUT",
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

export const deleteAction = async (id: any): Promise<void> => {
  try {
    await fetch(`${ORCHESTRATOR_URL}/actions/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
