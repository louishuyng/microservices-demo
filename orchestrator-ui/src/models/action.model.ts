export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export function requestMethodColor(requestMethod: RequestMethod): string {
  switch (requestMethod) {
    case RequestMethod.GET:
      return "text-cyan-300";
    case RequestMethod.PUT:
      return "text-orange-300";
    case RequestMethod.POST:
      return "text-green-300";
    case RequestMethod.DELETE:
      return "text-red-500";
  }
}
export class ActionModel {
  id: number;
  name: string;
  apiPath: string;
  requestMethod: RequestMethod;
  serviceId: number;

  constructor(action: any) {
    this.id = action.id;
    this.name = action.name;
    this.apiPath = action.apiPath;
    this.requestMethod = action.requestMethod;
    this.serviceId = action.serviceId;
  }
}
