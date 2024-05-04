import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import TaskCollection from "./TaskCollection";
import { IoCreateOutline } from "react-icons/io5";
import { CreateTaskForm } from "./CreateTaskForm";

export default function CreateTaskDrawer({ userId }: { userId: string }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex gap-1 w-full mx-auto border-2 text-neutral-100 items-center font-medium p-2 px-3 rounded-md text-sm">
          <IoCreateOutline size={"1.5em"} />
          Add new task
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-900 max-w-2xl mx-auto">
        <DrawerHeader>
          <CreateTaskForm
            type="create"
            userId={userId}
          />
          <DrawerClose className="pt-2 pb-10">
            <Button className="w-full bg-neutral-800">Cancel</Button>
          </DrawerClose>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
