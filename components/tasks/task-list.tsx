"use client";

import UserTask from "interfaces/task";
import { Button } from "../ui/button";
import { Plus, Scroll } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TaskForm } from "./task-form";

interface TaskProps {
  task: UserTask[];
  setTask: (value: UserTask[]) => void;
}

export function TaskList({ task, setTask }: TaskProps) {
  const totalBlocks = 24;
  const emptyBlocks = totalBlocks - task.length;

  const handleItsDone = async (selectedTask: UserTask) => {
    try {
      const response = await fetch(`/api/task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itsDone: true, id: selectedTask.id }),
      });

      if (!response.ok) {
        throw new Error("Error updating task status");
      }
      
      const updatedTasks = task.map((t) =>
        t.id === selectedTask.id ? { ...t, itsDone: true } : t
      );
      setTask(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="flex flex-1 dark:bg-black flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {task.map((t, i) => (
          <div
            key={`task-${i}`}
            className="relative aspect-square border rounded-xl p-6 text-white shadow-md"
            style={{ backgroundColor: t.category?.color || "#18181b" }}
          >
            <div className="flex gap-2 items-center">
              <span
                className="bg-transparent border p-2 h-10 w-auto rounded-lg flex items-center"
                
              >
                {t.category?.icon ? (
                  t.category?.icon
                ) : (
                  <div className="p-1">
                    <Scroll className="size-6 " />
                  </div>
                )}
              </span>
              <h2 className="text-lg font-bold truncate">{t.title}</h2>
            </div>

            {t.description ? (
              <div className="mt-2">
                <span className="font-semibold">Description</span>
                <p className="rounded-lg mt-2 text-sm text-gray-200">
                  {t.description}
                </p>
              </div>
            ) : (
              <div className="mt-2">
                <span className="font-semibold">No Description</span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Due:</span>{" "}
                  {new Date(t.dueTime).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Priority:</span> {t.priority}
                </p>

                <p className="mt-2 text-xs text-gray-300">
                  Created: {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="absolute right-0 bottom-0 p-0">
                <Button
                  onClick={() => !t.itsDone && handleItsDone(t)}
                  className={
                    t.itsDone
                      ? "bg-ItsDone cursor-not-allowed text-black hover:bg-ItsDone"
                      : "hover:bg-ItsDone"
                  }
                >
                  {t.itsDone ? "Done" : "Pending"}
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-center aspect-square rounded-xl bg-gray-100 h-full gap-1">
          <div className="text-sm text-muted-foreground  p-2 items-center flex justify-center">
            <p>Do you have any ideas? Let&apos;s create them</p>
          </div>
          <div className="flex justify-center items-center">
              <Dialog>
                               <DialogTrigger> 
                                 <Button
                                   className="dark:text-netural-100  bg-[#161616]/90 p-3 rounded-md text-white/60 hover:text-white/80" 
                                 >
                                   <Plus />Add Task
                                 </Button>
                               </DialogTrigger>
                               <DialogContent>
                                 <TaskForm />
                               </DialogContent>
                             </Dialog>
           
          </div>
        </div>

        {Array.from({ length: emptyBlocks }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800 "
          />
        ))}
      </div>
    </div>
  );
}
