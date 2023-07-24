"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteAction } from "@/services/action.api";
import { useRouter } from "next/navigation";

export function ActionRemove({ id }: { id: any }) {
  const router = useRouter();

  async function handleDelete() {
    "use_server";

    await deleteAction(id);
    router.replace("/actions");
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
