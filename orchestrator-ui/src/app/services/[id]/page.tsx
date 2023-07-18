"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeftIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ServiceRemove } from "../components/service-remove";
import { getService, updateService } from "@/services/service.api";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ServiceModel } from "@/models/service.model";

const formSchema = z.object({
  name: z.string().min(2),
  host: z.string(),
  port: z.string().optional(),
});
export default function ServiceDetail() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [service, setService] = useState<ServiceModel>();

  async function fetchService() {
    "use_server";
    const service = await getService(params.id);

    if (!service) {
      return;
    }

    setService(service);

    form.setValue("name", service.name);
    form.setValue("host", service.host);
    form.setValue("port", service.port && service.port.toString());
  }

  useEffect(() => {
    fetchService();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    "use_server";

    await updateService(params.id, {
      ...values,
      port: values.port ? parseInt(values.port) : undefined,
    });
    toast({
      description: "Successfully updated service",
    });
  }

  function goBackToList() {
    router.replace("/services");
  }

  return (
    <div className="flex-1 space-y-10 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Button onClick={() => goBackToList()} variant="ghost" className="p-0">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span className="font-bold">List Services</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-500 text-white">
                <Cross2Icon className="mr-2 h-4 w-4" /> Remove
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ServiceRemove id={service?.id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Auth" {...field} />
                </FormControl>
                <FormDescription>
                  This is your microservice name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="localhost" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="8080" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-5">
            <Button type="submit" size="sm">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
