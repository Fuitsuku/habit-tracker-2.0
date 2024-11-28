'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import PageHeader from "../components/PageHeader";

export default function TasksPage() {
    const test_task_data = [
        {
            task_id: 1,
            completion: false,
            task_name: "Task 1",
            points: 5,
            day_streak: 1
        },
        {
            task_id: 2,
            completion: false,
            task_name: "Task 2",
            points: 8,
            day_streak: 1
        }
    ];

    interface TaskData {
        task_name: string;
        point_value: number;
        growth_factor: number;
    }

    const [tasks, setTasks] = useState<TaskData[]>([{ task_name: '', point_value: 0, growth_factor: 0 }]);
    const [newTask, setNewTask] = useState<TaskData>({ task_name: '', point_value: 0, growth_factor: 0 });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addTask = () => {
        setTasks([...tasks, newTask]);
        setNewTask({ task_name: '', point_value: 0, growth_factor: 0 });
        setIsDialogOpen(false); // Close the dialog
    };

    const deleteTask = () => {
        if (tasks.length > 0) {
            const newTasks = tasks.slice(0, -1);
            setTasks(newTasks);
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
                                                        <div className="relative col-span-2 row-span-2 h-full">
                                                            <label className="absolute -top-4 left-0 text-xs text-white px-1 z-10">
                                                                Description
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={task.task_name}
                                                                onChange={(e) => {
                                                                    const newTasks = [...tasks];
                                                                    newTasks[index].task_name = e.target.value;
                                                                    setTasks(newTasks);
                                                                }}
                                                                className="w-full h-full bg-[#202020] text-white text-sm p-4 rounded-md"
                                                                placeholder="Field 1"
                                                            />
                                                        </div>
                                                        <div className="relative col-span-1 row-span-1">
                                                            <label className="absolute -top-4 left-0 text-xs text-white px-1 z-10">
                                                                Point Value
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={task.point_value}
                                                                onChange={(e) => {
                                                                    const newTasks = [...tasks];
                                                                    newTasks[index].point_value = parseInt(e.target.value);
                                                                    setTasks(newTasks);
                                                                }}
                                                                className="w-full bg-[#202020] text-white text-sm p-2 rounded-md"
                                                                placeholder="Field 2"
                                                            />
                                                        </div>
                                                        <div className="relative col-span-1 row-span-1">
                                                            <label className="absolute -top-4 left-0 text-xs text-white px-1 z-10">
                                                                Growth Factor
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={task.growth_factor}
                                                                onChange={(e) => {
                                                                    const newTasks = [...tasks];
                                                                    newTasks[index].growth_factor = parseInt(e.target.value);
                                                                    setTasks(newTasks);
                                                                }}
                                                                className="w-full bg-[#202020] text-white text-sm p-2 rounded-md"
                                                                placeholder="Field 3"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Add Task and Delete Buttons */}
                                <div className="flex justify-center mt-4 space-x-4">
                                    <Dialog
                                       open={isDialogOpen}
                                       onOpenChange={setIsDialogOpen}
                                   >
                                        <DialogTrigger asChild>
                                            <Button className="bg-[#202020] text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center">
                                                +
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-[#202020]">
                                            <DialogHeader>
                                                <DialogTitle className="text-white">New Task</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    placeholder="Description"
                                                    value={newTask.task_name}
                                                    onChange={(e) =>
                                                        setNewTask({ ...newTask, task_name: e.target.value })
                                                    }
                                                    className="w-full p-2 bg-black rounded"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Point Value"
                                                    value={newTask.point_value}
                                                    onChange={(e) =>
                                                        setNewTask({ ...newTask, point_value: parseInt(e.target.value) })
                                                    }
                                                    className="w-full p-2 bg-black text-white rounded"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Growth Factor"
                                                    value={newTask.growth_factor}
                                                    onChange={(e) =>
                                                        setNewTask({ ...newTask, growth_factor: parseInt(e.target.value) })
                                                    }
                                                    className="w-full p-2 bg-black text-white rounded"
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={addTask} className="bg-green-400 text-white">
                                                    Confirm
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
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
            </Tabs>
        </div>
    );
}
