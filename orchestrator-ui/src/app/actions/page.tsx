"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TargetIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";
import { ServiceSelector } from "@/components/service-selector";
import { ServiceModel } from "@/models/service.model";
import { ActionCard } from "./components/action-card";
import { ActionModel } from "@/models/action.model";
import { ActionNewCard } from "./components/action-new-card";
import { getListAction, ListActionOption } from "@/services/action.api";
import { getListService } from "@/services/service.api";

export default function ActionPage() {
  const [open, setOpen] = useState(false);
  const [actions, setActions] = useState<ActionModel[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [filterOption, setFilterOption] = useState<ListActionOption>({});
  const [search, setSearch] = useState<string>();

  async function fetchActions(options?: ListActionOption, search?: string) {
    "use_server";
    const actions = await getListAction({
      ...options,
      search,
    });
    setActions(actions);
  }

  async function fetchServices() {
    "use_server";
    const services = await getListService();
    setServices(services);
  }

  useEffect(() => {
    fetchServices();
    fetchActions();
  }, []);

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
            <DialogContent>
              <ActionNewCard
                setOpenDialog={setOpen}
                services={services}
                fetchActions={fetchActions}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Search
          onChange={(search) => {
            setSearch(search);
            fetchActions(filterOption, search);
          }}
        />
        <ServiceSelector
          services={services}
          callbackOnSelect={(serviceId) => {
            const options: ListActionOption = {
              filter_by: "serviceId",
              filter_value: serviceId,
            };

            setFilterOption(options);
            fetchActions(options, search);
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((action, key) => (
          <ActionCard
            key={key}
            actionId={action.id}
            apiPath={action.apiPath}
            name={action.name}
            requestMethod={action.requestMethod}
          />
        ))}
      </div>
    </div>
  );
}
