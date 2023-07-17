"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServiceModel } from "@/models/service.model";

interface ServiceSelectorProps extends PopoverProps {
  services: ServiceModel[];
}

export function ServiceSelector({ services, ...props }: ServiceSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<ServiceModel>();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedService ? selectedService.name : "Filter by Service"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search Services..." />
          <CommandEmpty>No Services found.</CommandEmpty>
          <CommandGroup className="pt-0">
            <CommandItem>All Services</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Current Services">
            {services.map((service) => (
              <CommandItem
                key={service.id}
                onSelect={() => {
                  setSelectedService(service);
                  setOpen(false);
                }}
              >
                {service.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedService?.id === service.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}