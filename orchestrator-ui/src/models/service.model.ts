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
  healthState: HealthState;

  constructor(service: any) {
    this.id = service.id;
    this.name = service.name;
    this.host = service.host;
    this.port = service.port;
    this.healthState = service.healthState;
  }

  get url(): string {
    return `http://${this.host}${this.port ? ":" + this.port : ""}`;
  }
}
