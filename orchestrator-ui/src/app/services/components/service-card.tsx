"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleIcon, VercelLogoIcon } from "@radix-ui/react-icons";

interface ServiceCardProps {
  serviceName: string;
  serviceUrl: string;
  serviceId: number;
}

export function ServiceCard({
  serviceName,
  serviceUrl,
  serviceId,
}: ServiceCardProps) {
  const router = useRouter();

  function goToDetail() {
    router.push(`/services/${serviceId}`);
  }

  return (
    <Card style={{ cursor: "pointer" }} onClick={goToDetail}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-row items-center space-x-2">
          <VercelLogoIcon />
          <CardTitle className="text-xl font-medium">{serviceName}</CardTitle>
        </div>
        <div style={{ color: "green" }}>
          <CircleIcon />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-gray text-slate-400">{serviceUrl}</div>
      </CardContent>
    </Card>
  );
}
