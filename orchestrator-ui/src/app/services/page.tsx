import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./components/service-card";
import { ServiceNewCard } from "./components/service-new-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ServicePage() {
  return (
    <div className="flex-1 space-y-10 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Service</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <LightningBoltIcon className="mr-2 h-4 w-4" /> New Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ServiceNewCard />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ServiceCard
          serviceName="Auth"
          serviceId={1}
          serviceUrl="http://localhost:3000"
        />
        <ServiceCard
          serviceName="Payment"
          serviceId={2}
          serviceUrl="http://localhost:3001"
        />
      </div>
    </div>
  );
}
