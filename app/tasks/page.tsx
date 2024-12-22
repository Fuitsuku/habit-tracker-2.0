"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import TasksApiWrapper from "@/api/tasks"; 
import ActionApiWrapper from "@/api/actions";
import PageHeader from "../components/PageHeader";
import { useRouter } from "next/navigation";

// API Wrapper instance
const tasksApi = new TasksApiWrapper({
  baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

// API Wrapper instance
const actionApi = new ActionApiWrapper({
  baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

interface TMTaskData {
  "task-name" : string;
  "point-value": number;
  "growth-factor": number;
  "completed": boolean;
  "task-id": string;
  "day-streak": number;
};

interface NMTaskData {
  "task-name" : string;
  "point-value": number;
  "growth-factor": number;
  "task-id": string;
};

interface NMTaskDataLocal {
  "task-name": string;
  "point-value": number;
  "growth-factor": number;
};

export default function TasksPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [thisMonthTasks, setThisMonthTasks] = useState<TMTaskData[]>([]);
  const [nextMonthTasks, setNextMonthTasks] = useState<NMTaskData[]>([]);
  const [newNextMonthTask, setNewNextMonthTask] = useState<NMTaskDataLocal>({"task-name" : "","point-value": 0, "growth-factor": 0 });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false); // For the + button drawer
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
        // Access localStorage safely
        const stats = localStorage.getItem("stats");
        if (stats) {
          const parsedStats = JSON.parse(stats);
          setUsername(parsedStats["user-id"]);
        }

        const storedTMT = localStorage.getItem("this-month-tasks");
        if (storedTMT) {
          const parsedTMT = JSON.parse(storedTMT);
          setThisMonthTasks(parsedTMT);
        }

        const storedNMT = localStorage.getItem("next-month-tasks");
        if (storedNMT) {
          const parsedNMT = JSON.parse(storedNMT);
          setNextMonthTasks(parsedNMT);
        }
    }
  }, []);

  // Handles back button navigation
  const handleNaviBack = () => {
    router.push("/home");
  };

  // Add a new task
  const addTask = async () => {
    const payload = {
      "user-id" : username,
      "task-data" : JSON.stringify(newNextMonthTask)
    };

    // Update Backend and Pull latest
    const response = await tasksApi.createTaskCall("/task/create", payload);
    const update_tasks_response = await tasksApi.getTasksCall("/task/get", {"user-id" : username})

    // Parse Latest data
    const updated_next_month_tasks_raw = update_tasks_response.data.payload.next_month_tasks;
    const updated_next_month_tasks = tasksApi.parseNMT(updated_next_month_tasks_raw);

    // Update local copies & close drawer
    setNextMonthTasks(updated_next_month_tasks);
    localStorage.setItem('next-month-tasks', JSON.stringify(updated_next_month_tasks));
    setNewNextMonthTask({ "task-name": "", "point-value": 0, "growth-factor": 0 });
    setAddDrawerOpen(false); // Close the drawer
  };

  // Delete the last task
  const deleteTask = async () => {
    if (nextMonthTasks.length > 0) {
      const task_to_be_deleted = nextMonthTasks[nextMonthTasks.length - 1];
      const payload = {
        "user-id" : username,
        "task-id" : task_to_be_deleted["task-id"]
      };
      const response = await tasksApi.deleteTaskCall("/task/delete", payload);

      setNextMonthTasks(nextMonthTasks.slice(0, -1));
    }
  };

  const handleCheckboxChange = async (index: number, task_id:string) => {
    const payload ={
      "user-id" : username,
      "task-id" : task_id
    };
    const response = await tasksApi.completeTaskCall("/task/complete", payload);
    
    setThisMonthTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, "completed": !task["completed"] } : task
      )
    );
  };

  const setUpEnvironment = async () => {
    const payload = {
      "user-id" : username
    };
    const response = await actionApi.setUpEnvironmentCall("/action/setup", payload);
    console.log(response);
    try {
      const response = await tasksApi.getTasksCall("/task/get", { "user-id": username });
      const this_month_tasks_raw = response.data.payload.this_month_tasks;
      const next_month_tasks_raw = response.data.payload.next_month_tasks;
      
      const this_month_tasks = tasksApi.parseTMT(this_month_tasks_raw);
      localStorage.setItem('this-month-tasks', JSON.stringify(this_month_tasks));

      const next_month_tasks = tasksApi.parseNMT(next_month_tasks_raw);
      localStorage.setItem('next-month-tasks', JSON.stringify(next_month_tasks));

      setThisMonthTasks(JSON.parse(localStorage.getItem("this-month-tasks") || "[]"));
      setNextMonthTasks(JSON.parse(localStorage.getItem("next-month-tasks") || "[]"));
    } catch (err: any) {
        // Check if the error has a response from the backend
        console.error('An error has occurred. Contact the Developer.');
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
                  {thisMonthTasks.map((task, index) => (
                    <TableRow key={index + 1} className="h-12 border-b border-white">
                      <TableCell className="text-center text-white">
                        <input
                          type="checkbox"
                          checked={task["completed"]}
                          onChange={() => handleCheckboxChange(index, task["task-id"])}
                        />
                      </TableCell>
                      <TableCell className="text-white">{task["task-name"]}</TableCell>
                      <TableCell className="text-center text-white">{task["point-value"]}</TableCell>
                      <TableCell className="text-center text-white">{task["day-streak"]}</TableCell>
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
                    {nextMonthTasks.map((task, index) => (
                      <tr key={index} className="h-24 border-b border-white">
                        <td colSpan={3} className="p-2 py-4">
                          <div className="grid grid-cols-3 grid-rows-[1fr,1fr] gap-4 h-full">
                            <div className="text-white font-bold">{task["task-name"]}</div>
                            <div className="text-white text-right">{task["point-value"]} Points</div>
                            <div className="text-white text-right">.{task["growth-factor"]}X</div>
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
                          value={newNextMonthTask["task-name"]}
                          onChange={(e) => setNewNextMonthTask({ ...newNextMonthTask, "task-name": e.target.value })}
                          className="w-full p-2 bg-black text-white rounded"
                        />
                        <input
                          type="number"
                          placeholder="Point Value"
                          value={newNextMonthTask["point-value"]}
                          onChange={(e) => setNewNextMonthTask({ ...newNextMonthTask, "point-value": parseInt(e.target.value) || 0 })}
                          className="w-full p-2 bg-black text-white rounded"
                        />
                        <input
                          type="number"
                          placeholder="Growth Factor"
                          value={newNextMonthTask["growth-factor"]}
                          onChange={(e) =>
                            setNewNextMonthTask({ ...newNextMonthTask, "growth-factor": parseInt(e.target.value) || 0 })
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
                    <button 
                      className="bg-zinc-900 text-white border-none p-3 rounded w-30"
                      onClick={() => handleNaviBack()} // Reset rewards
                    >
                        &lt;-- Back
                    </button>
                </div>

                {/* Conditional Footer Content */}
                <div className="text-white text-right flex items-center">
                    <TabsContent value="current">
                        <div>
                            <div>Projected Gain:</div>
                            Feature Coming Soon.
                            {/* <div>10 &#9650;</div> */}
                        </div>
                    </TabsContent>
                    <TabsContent value="setup">
                        <button
                            onClick={() => setUpEnvironment()}
                            className="bg-black text-white text-xl p-3 rounded-lg w-40"
                        >
                            Setup
                        </button>
                    </TabsContent>
                </div>
            </div>
      </Tabs>
      
    </div>
  );
}
