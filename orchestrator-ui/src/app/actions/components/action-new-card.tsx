"use client";

import { ServiceSelector } from "@/components/service-selector";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { RequestMethod, requestMethodColor } from "@/models/action.model";
import { ServiceModel } from "@/models/service.model";
import { createAction } from "@/services/action.api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  apiPath: z.string(),
  requestMethod: z.string(),
  serviceId: z.number(),
});

export function ActionNewCard({
  setOpenDialog,
  services,
  fetchActions,
}: {
  setOpenDialog: any;
  services: Array<ServiceModel>;
  fetchActions: any;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    "use_server";

    await createAction({
      ...values,
      requestMethod: values.requestMethod as RequestMethod,
    });
    toast({
      description: "Successfully created action",
    });
    setOpenDialog(false);
    fetchActions();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>New Action</DialogTitle>
        <DialogDescription>Create new Action</DialogDescription>
      </DialogHeader>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
