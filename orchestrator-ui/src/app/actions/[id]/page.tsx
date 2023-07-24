"use client";

import { ServiceSelector } from "@/components/service-selector";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestMethod, requestMethodColor } from "@/models/action.model";
import { ServiceModel } from "@/models/service.model";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeftIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ActionRemove } from "../components/action-remove";
import { useEffect, useState } from "react";
import { ActionModel } from "@/models/action.model";
import { getAction, updateAction } from "@/services/action.api";
import { getListService } from "@/services/service.api";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2),
  apiPath: z.string(),
  requestMethod: z.string(),
  serviceId: z.number(),
});

export default function ActionDetail() {
  const params = useParams();
  const router = useRouter();
  const [action, setAction] = useState<ActionModel>();
  const [services, setServices] = useState<ServiceModel[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function fetchServices() {
    "use_server";
    const services = await getListService();
    setServices(services);
  }

  async function fetchAction() {
    "use_server";
    const action = await getAction(params.id);

    if (!action) {
      return;
    }

    setAction(action);

    form.setValue("name", action.name);
    form.setValue("apiPath", action.apiPath);
    form.setValue("requestMethod", action.requestMethod);
    form.setValue("serviceId", action.serviceId);
  }

  useEffect(() => {
    fetchServices();
    fetchAction();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    "use_server";
    await updateAction(params.id, {
      ...values,
      requestMethod: values.requestMethod as RequestMethod,
    });
    toast({
      description: "Successfully updated action",
    });
  }

  function goBackToList() {
    router.replace("/actions");
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
              <ActionRemove id={action?.id} />
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
                  <Input placeholder="Sample Action" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Path</FormLabel>
                <FormControl>
                  <Input placeholder="/api/health" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requestMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Method</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="security-level"
                      className="line-clamp-1 w-[160px] truncate"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(RequestMethod).map((value) => (
                        <SelectItem
                          value={value}
                          className={requestMethodColor(value)}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <div>
                    <ServiceSelector
                      services={services}
                      showAllSection={false}
                      field={field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
