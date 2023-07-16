import { ServiceModel } from "@/models/service.model";
import { ORCHESTRATOR_URL } from "./constants";

export const getListService = async (): Promise<ServiceModel[]> => {
  try {
    const res = await fetch(`${ORCHESTRATOR_URL}/services`, {
      cache: "no-cache",
    });
    const data: [] = await res.json();

    return data.map((service) => new ServiceModel(service));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getService = async (
  id: any
): Promise<ServiceModel | undefined> => {
  try {
    const res = await fetch(`${ORCHESTRATOR_URL}/services/${id}`, {
      cache: "no-cache",
    });
    const data = await res.json();

    return new ServiceModel(data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteService = async (id: any): Promise<void> => {
  try {
    await fetch(`${ORCHESTRATOR_URL}/services/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export type ServicePayload = {
  name: string;
  host: string;
  port?: number;
};

export const createService = async (data: ServicePayload): Promise<void> => {
  try {
    await fetch(`${ORCHESTRATOR_URL}/services`, {
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
