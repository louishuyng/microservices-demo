"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TargetIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";
import { ServiceSelector } from "@/components/service-selector";
import { HealthState, ServiceModel } from "@/models/service.model";
import { ActionCard } from "./components/action-card";
import { RequestMethod } from "@/models/action.model";

export default function ActionPage() {
  const [open, setOpen] = useState(false);

  const services: ServiceModel[] = [
    {
      id: 1,
      name: "Auth",
      host: "localhost",
      port: "3000",
      healthState: HealthState.HEALTHY,
      url: "",
    },
    {
      id: 1,
      name: "Payment",
      host: "localhost",
      port: "3000",
      healthState: HealthState.HEALTHY,
      url: "",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Actions</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <TargetIcon className="mr-2 h-4 w-4" /> New Action
              </Button>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <ServiceSelector services={services} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ActionCard
          apiPath="/api/jwt"
          name="Generate Token"
          requestMethod={RequestMethod.POST}
        />
        <ActionCard
          apiPath="/api/jwt/inspect"
          name="Check Active Token"
          requestMethod={RequestMethod.PUT}
        />
        <ActionCard
          apiPath="/api/jwt/inspect"
          name="Delete Active Token"
          requestMethod={RequestMethod.DELETE}
        />
        <ActionCard
          apiPath="/api/jwt/1"
          name="Detail Token"
          requestMethod={RequestMethod.GET}
        />
      </div>
    </div>
  );
}
