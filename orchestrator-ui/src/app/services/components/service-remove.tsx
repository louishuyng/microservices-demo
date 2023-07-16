"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteService } from "@/services/service.api";
import { useRouter } from "next/navigation";

export function ServiceRemove({ id }: { id: any }) {
  const router = useRouter();

  async function handleDelete() {
    "use_server";

    await deleteService(id);
    router.replace("/services");
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you wanna delete?</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <div className="flex space-x-3 mt-3">
          <Button className="bg-red-500 text-white" onClick={handleDelete}>
            Yes delete it
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
