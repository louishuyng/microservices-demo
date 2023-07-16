export enum HealthState {
  NO_DATA = "no_data",
  HEALTHY = "healthy",
  UNHEALTHY = "unhealthy",
}

export class ServiceModel {
  id: number;
  name: string;
  host: string;
  port?: string;
  healthyState: HealthState;

  constructor(service: any) {
    this.id = service.id;
    this.name = service.name;
    this.host = service.host;
    this.port = service.port;
    this.healthyState = service.healthyState;
  }

  get url(): string {
    return `http://${this.host}${this.port ? ":" + this.port : ""}`;
  }
}
