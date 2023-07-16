"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function ServiceRemove() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you wanna delete?</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <div className="flex space-x-3 mt-3">
          <Button className="bg-red-500 text-white">Yes delete it</Button>
        </div>
      </DialogFooter>
    </>
  );
}
