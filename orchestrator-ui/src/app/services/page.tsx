"use client";

import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./components/service-card";
import { ServiceNewCard } from "./components/service-new-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getListService } from "@/services/service.api";
import { HealthState, ServiceModel } from "@/models/service.model";
import { useEffect, useState } from "react";

export default function ServicePage() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<ServiceModel[]>([]);

  async function fetchServices() {
    "use_server";
    const services = await getListService();
    setServices(services);
  }

  useEffect(() => {
    fetchServices();

    const interval = setInterval(() => {
      fetchServices();
    }, 5000);

    () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex-1 space-y-10 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Service</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <LightningBoltIcon className="mr-2 h-4 w-4" /> New Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ServiceNewCard
                setOpenDialog={setOpen}
                fetchServices={fetchServices}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-5  gap-4">
        {services.map((service) => (
          <ServiceCard
            serviceName={service.name}
            serviceId={service.id}
            serviceUrl={service.url}
            isHeathy={
              service ? service.healthState === HealthState.HEALTHY : true
            }
          />
        ))}
      </div>
    </div>
  );
}
