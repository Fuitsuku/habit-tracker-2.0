"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function TasksPage() {
  const test_task_data = [
    {
      task_id: 1,
      completion: false,
      task_name: "Task 1",
      points: 5,
      day_streak: 1,
    },
    {
      task_id: 2,
      completion: false,
      task_name: "Task 2",
      points: 8,
      day_streak: 1,
    },
  ];

  interface TaskData {
    task_name: string;
    point_value: number;
    growth_factor: number;
  }

  const [tasks, setTasks] = useState<TaskData[]>([{ task_name: "", point_value: 0, growth_factor: 0 }]);
  const [newTask, setNewTask] = useState<TaskData>({ task_name: "", point_value: 0, growth_factor: 0 });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false); // For the + button drawer

  // Add a new task
  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({ task_name: "", point_value: 0, growth_factor: 0 });
    setAddDrawerOpen(false); // Close the drawer
  };

  // Delete the last task
  const deleteTask = () => {
    if (tasks.length > 0) {
      setTasks(tasks.slice(0, -1));
    }
  };

  return (
    <div className="bg-[#202020] h-screen p-10">
      <PageHeader page_name="Tasks" />
      <Tabs defaultValue="current" className="">
        {/* Top Header */}
        <TabsList className="grid w-full grid-cols-2 bg-[#27272A] border-none">
          <TabsTrigger
            value="current"
            className="text-[#C0C0C0] data-[state=active]:bg-black data-[state=active]:text-white border-none"
          >
            Current
          </TabsTrigger>
          <TabsTrigger
            value="setup"
            className="text-[#C0C0C0] data-[state=active]:bg-black data-[state=active]:text-white border-none"
          >
            Set Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <Card className="border-none shadow-none">
            <CardContent className="space-y-2 h-96 overflow-y-auto bg-black border-none rounded-lg shadow-none">
              <Table className="min-w-full border-collapse border-none">
                <TableBody>
                  {test_task_data.map((task) => (
                    <TableRow key={task.task_id} className="h-12 border-b border-white">
                      <TableCell className="text-center text-white">
                        <Checkbox checked={task.completion}></Checkbox>
                      </TableCell>
                      <TableCell className="text-white">{task.task_name}</TableCell>
                      <TableCell className="text-center text-white">{task.points}</TableCell>
                      <TableCell className="text-center text-white">{task.day_streak}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="setup">
          <Card className="border-none shadow-none">
            <CardContent className="space-y-2 h-96 overflow-y-auto bg-black rounded-lg border-none shadow-none">
              <div className="flex flex-col">
                {/* Tasks Table */}
                <table className="min-w-full border-collapse border-none">
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={index} className="h-24 border-b border-white">
                        <td colSpan={3} className="p-2 py-4">
                          <div className="grid grid-cols-3 grid-rows-[1fr,1fr] gap-4 h-full">
                            <div className="text-white font-bold">{task.task_name}</div>
                            <div className="text-white text-right">{task.point_value} Points</div>
                            <div className="text-white text-right">.{task.growth_factor}X</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add Task and Delete Buttons */}
                <div className="flex justify-center mt-4 space-x-4">
                  {/* Add Task Drawer */}
                  <Button
                    onClick={() => setAddDrawerOpen(true)}
                    className="bg-[#202020] text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center"
                  >
                    +
                  </Button>
                  <Drawer open={addDrawerOpen} onOpenChange={setAddDrawerOpen}>
                    <DrawerContent className="bg-[#202020]">
                      <DrawerHeader>
                        <DrawerTitle className="text-white text-lg">Add New Task</DrawerTitle>
                      </DrawerHeader>
                      <div className="p-4 space-y-4">
                        <input
                          type="text"
                          placeholder="Task Name"
                          value={newTask.task_name}
                          onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
                          className="w-full p-2 bg-black text-white rounded"
                        />
                        <input
                          type="number"
                          placeholder="Point Value"
                          value={newTask.point_value}
                          onChange={(e) => setNewTask({ ...newTask, point_value: parseInt(e.target.value) || 0 })}
                          className="w-full p-2 bg-black text-white rounded"
                        />
                        <input
                          type="number"
                          placeholder="Growth Factor"
                          value={newTask.growth_factor}
                          onChange={(e) =>
                            setNewTask({ ...newTask, growth_factor: parseInt(e.target.value) || 0 })
                          }
                          className="w-full p-2 bg-black text-white rounded"
                        />
                      </div>
                      <DrawerFooter>
                        <Button onClick={addTask} className="bg-black text-white">
                          Add Task
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setAddDrawerOpen(false)}
                          className="text-white bg-gray-400"
                        >
                          Cancel
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>

                  {/* Delete Task Button */}
                  <button
                    onClick={deleteTask}
                    className="bg-red-500 text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center"
                  >
                    -
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <div className="flex justify-between items-center mt-4">
                {/* Back Button */}
                <div className="text-left">
                    <button className="bg-zinc-900 text-white border-none p-3 rounded w-30">
                        &lt;--- Back
                    </button>
                </div>

                {/* Conditional Footer Content */}
                <div className="text-white text-right flex items-center">
                    <TabsContent value="current">
                        <div>
                            <div>Projected Gain:</div>
                            <div>10 &#9650;</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="setup">
                        <button
                            onClick={() => {
                                console.log("Setup");
                            }}
                            className="bg-black text-white text-xl p-3 rounded-lg w-40"
                        >
                            Refresh
                        </button>
                    </TabsContent>
                </div>
            </div>
      </Tabs>
      
    </div>
  );
}
