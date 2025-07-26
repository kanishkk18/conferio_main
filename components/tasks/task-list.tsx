// "use client";

// import UserTask from "interfaces/task";
// import { Button } from "../ui/button";
// import { Plus, Scroll } from "lucide-react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { TaskForm } from "./task-form";

// interface TaskProps {
//   task: UserTask[];
//   setTask: (value: UserTask[]) => void;
// }

// export function TaskList({ task, setTask }: TaskProps) {
//   const totalBlocks = 24;
//   const emptyBlocks = totalBlocks - task.length;

//   const handleItsDone = async (selectedTask: UserTask) => {
//     try {
//       const response = await fetch(`/api/task`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ itsDone: true, id: selectedTask.id }),
//       });

//       if (!response.ok) {
//         throw new Error("Error updating task status");
//       }
      
//       const updatedTasks = task.map((t) =>
//         t.id === selectedTask.id ? { ...t, itsDone: true } : t
//       );
//       setTask(updatedTasks);
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };

//   return (
//     <div className="flex flex-1 dark:bg-black flex-col gap-4 p-4">
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//         {task.map((t, i) => (
//           <div
//             key={`task-${i}`}
//             className="relative aspect-square border rounded-xl p-6 text-white shadow-md"
//             style={{ backgroundColor: t.category?.color || "#18181b" }}
//           >
//             <div className="flex gap-2 items-center">
//               <span
//                 className="bg-transparent border p-2 h-10 w-auto rounded-lg flex items-center"
                
//               >
//                 {t.category?.icon ? (
//                   t.category?.icon
//                 ) : (
//                   <div className="p-1">
//                     <Scroll className="size-6 " />
//                   </div>
//                 )}
//               </span>
//               <h2 className="text-lg font-bold truncate">{t.title}</h2>
//             </div>

//             {t.description ? (
//               <div className="mt-2">
//                 <span className="font-semibold">Description</span>
//                 <p className="rounded-lg mt-2 text-sm text-gray-200">
//                   {t.description}
//                 </p>
//               </div>
//             ) : (
//               <div className="mt-2">
//                 <span className="font-semibold">No Description</span>
//               </div>
//             )}

//             <div className="absolute bottom-4 left-4 right-4 flex justify-between">
//               <div className="text-sm">
//                 <p>
//                   <span className="font-semibold">Due:</span>{" "}
//                   {new Date(t.dueTime).toLocaleString()}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Priority:</span> {t.priority}
//                 </p>

//                 <p className="mt-2 text-xs text-gray-300">
//                   Created: {new Date(t.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               <div className="absolute right-0 bottom-0 p-0">
//                 <Button
//                   onClick={() => !t.itsDone && handleItsDone(t)}
//                   className={
//                     t.itsDone
//                       ? "bg-ItsDone cursor-not-allowed text-black hover:bg-ItsDone"
//                       : "hover:bg-ItsDone"
//                   }
//                 >
//                   {t.itsDone ? "Done" : "Pending"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="flex flex-col justify-center aspect-square rounded-xl bg-gray-100 h-full gap-1">
//           <div className="text-sm text-muted-foreground  p-2 items-center flex justify-center">
//             <p>Do you have any ideas? Let&apos;s create them</p>
//           </div>
//           <div className="flex justify-center items-center">
//               <Dialog>
//                                <DialogTrigger> 
//                                  <Button
//                                    className="dark:text-netural-100  bg-[#161616]/90 p-3 rounded-md text-white/60 hover:text-white/80" 
//                                  >
//                                    <Plus />Add Task
//                                  </Button>
//                                </DialogTrigger>
//                                <DialogContent>
//                                  <TaskForm />
//                                </DialogContent>
//                              </Dialog>
           
//           </div>
//         </div>

//         {Array.from({ length: emptyBlocks }).map((_, i) => (
//           <div
//             key={`empty-${i}`}
//             className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800 "
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TaskForm } from "./task-form";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export type UserTask = {
  id: string;
  title: string;
  description?: string | null;
  priority: string;
  dueTime: string;
  createdAt: string;
  itsDone: boolean;
  category?: {
    color?: string;
    icon?: React.ReactNode;
  };
};

interface TaskTableProps {
  task: UserTask[];
  setTask: React.Dispatch<React.SetStateAction<UserTask[]>>;
}


export function TaskList({ task, setTask }: TaskTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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

  const columns: ColumnDef<UserTask>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm">
         {(row.getValue("description") as string)?.slice(0, 15) || "No Description"}

        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => <div>{row.getValue("priority")}</div>,
    },
    {
      accessorKey: "dueTime",
      header: "Due",
      cell: ({ row }) =>
        new Date(row.getValue("dueTime")).toLocaleString(),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        new Date(row.getValue("createdAt")).toLocaleString(),
    },
    {
      accessorKey: "itsDone",
      header: "Status",
      cell: ({ row }) => {
        const isDone = row.getValue("itsDone");
        return (
          <div
            className={`font-medium ${isDone ? "text-green-500" : "text-yellow-500"}`}
          >
            {isDone ? "Done" : "Pending"}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(task.id)}
              >
                Copy task ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => !task.itsDone && handleItsDone(task)}
                disabled={task.itsDone}
              >
                Mark as Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: task,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full px-14 p-8 space-y-6">

      <div className="flex justify-center items-center gap-4">
        <Card className="flex-grow ">
  <CardHeader>
    <CardTitle>Total Tasks</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="font-bold text-2xl"> {task.length} </p>
  </CardContent>
  
</Card>

<Card className="flex-grow">
  <CardHeader>
    <CardTitle>Completed Task</CardTitle> </CardHeader>
  <CardContent>
    <p className="font-bold text-2xl">{task.filter((t) => t.itsDone).length}</p>
  </CardContent>
  
</Card>

<Card className="flex-grow">
  <CardHeader>
    <CardTitle>Overdue Task</CardTitle>
 </CardHeader>
  <CardContent>
    <p className="font-bold text-2xl">{task.filter((t) => !t.itsDone).length}</p>
  </CardContent>
  
</Card>
      </div>

      <Separator/>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <TaskForm />
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
