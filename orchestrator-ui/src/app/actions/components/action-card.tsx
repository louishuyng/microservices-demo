"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { RequestMethod } from "@/models/action.model";
import { Button } from "@/components/ui/button";

interface ActionCardProps {
  name: string;
  apiPath: string;
  requestMethod: RequestMethod;
  serviceId?: number;
}

export function ActionCard({
  name,
  apiPath,
  requestMethod,
  serviceId,
}: ActionCardProps) {
  const router = useRouter();

  function goToDetail() {
    router.push(`/services/${serviceId}`);
  }

  function requestMethodColor(): string {
    switch (requestMethod) {
      case RequestMethod.GET:
        return "cyan";
      case RequestMethod.PUT:
        return "orange";
      case RequestMethod.POST:
        return "green";
      case RequestMethod.DELETE:
        return "red";
    }
  }

  return (
    <Card style={{ cursor: "pointer" }} onClick={goToDetail}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-row items-center space-x-2">
          <DiscIcon />
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 items-center">
          <div className={`text-${requestMethodColor()}-300 font-bold`}>
            {requestMethod}
          </div>
          <div className="text-sm font-gray text-slate-200">{apiPath}</div>
        </div>
      </CardContent>

      <Button variant="ghost">
        <LightningBoltIcon className="mr-2 h-4 w-4" />
        Trigger Action
      </Button>
    </Card>
  );
}