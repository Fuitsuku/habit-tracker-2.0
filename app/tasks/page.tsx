'use client';
const test_task_data = [
        {
            task_id : 1,
            completion : false,
            task_name : "Task 1",
            points : 5,
            day_streak : 1
        },
        {
            task_id : 2,
            completion : false,
            task_name : "Task 2",
            points : 8,
            day_streak : 1
        },
        {
            task_id : 3,
            completion : true,
            task_name : "Task 3",
            points : 15,
            day_streak : 3
        },
        {
            task_id : 4,
            completion : false,
            task_name : "Task 4",
            points : 5,
            day_streak : 1
        },
        {
            task_id : 5,
            completion : false,
            task_name : "Task 5",
            points : 8,
            day_streak : 1
        },
        {
            task_id : 6,
            completion : true,
            task_name : "Task 6",
            points : 15,
            day_streak : 3
        }
    ]

// Imports start here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { useState } from 'react';
  
import PageHeader from "../components/PageHeader";

export default function TasksPage() {
    const test_task_data = [
        {
            task_id : 1,
            completion : false,
            task_name : "Task 1",
            points : 5,
            day_streak : 1
        },
        {
            task_id : 2,
            completion : false,
            task_name : "Task 2",
            points : 8,
            day_streak : 1
        },
        {
            task_id : 3,
            completion : true,
            task_name : "Task 3",
            points : 15,
            day_streak : 3
        },
        {
            task_id : 4,
            completion : false,
            task_name : "Task 4",
            points : 5,
            day_streak : 1
        },
        {
            task_id : 5,
            completion : false,
            task_name : "Task 5",
            points : 8,
            day_streak : 1
        },
        {
            task_id : 6,
            completion : true,
            task_name : "Task 6",
            points : 15,
            day_streak : 3
        }
    ]
    
    const potential_gain = 10;
    interface RowData {
        field1: string;
        field2: number;
        field3: number;
      }
    
    const [rows, setRows] = useState<RowData[]>([{ field1: '', field2: 0, field3: 0 }]);
    
    const addRow = () => {
        setRows([...rows, { field1: '', field2: 0, field3: 0 }]);
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
                        <CardContent className="space-y-2 h-96 overflow-y-auto bg-black border-none shadow-none">
                            <Table className="min-w-full border-collapse border-none">
                                <TableBody>
                                    {/* Dynamically populate rows */}
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
                        <CardContent className="space-y-2 h-96 overflow-y-auto bg-black border-none shadow-none">
                            <div>
                                {/* Add Row Button */}
                                <button
                                    onClick={addRow}
                                    className="mb-4 bg-blue-500 text-white p-2 rounded border-none"
                                >
                                    Add Row
                                </button>
                                {/* Table for rows */}
                                <table className="min-w-full border-collapse border-none">
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={index} className="h-32 border-b border-white">
                                            <td colSpan={3} className="p-2">
                                                <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full">
                                                    {/* Field 1 (spanning cells 1, 2, 4, 5) */}
                                                    <div className="relative col-span-2 row-span-2">
                                                        <label className="absolute top-1 left-2 text-xs text-white bg-[#202020] px-1 z-10">
                                                            Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={row.field1}
                                                            onChange={(e) => {
                                                                const newRows = [...rows];
                                                                newRows[index].field1 = e.target.value;
                                                                setRows(newRows);
                                                            }}
                                                            className="w-full h-auto bg-[#202020] text-white p-2 border border-white rounded-md mt-1"
                                                            placeholder="Field 1"
                                                        />
                                                    </div>

                                                    {/* Field 2 (cell 3) */}
                                                    <div className="relative col-span-1 row-span-1">
                                                        <label className="absolute top-1 left-2 text-xs text-white bg-[#202020] px-1 z-10">
                                                            Point
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={row.field2}
                                                            onChange={(e) => {
                                                                const newRows = [...rows];
                                                                newRows[index].field2 = parseInt(e.target.value);
                                                                setRows(newRows);
                                                            }}
                                                            className="w-full bg-[#202020] text-white p-2 border border-white rounded-md mt-4"
                                                            placeholder="Field 2"
                                                        />
                                                    </div>

                                                    {/* Field 3 (cell 6) */}
                                                    <div className="relative col-span-1 row-span-1">
                                                        <label className="absolute top-1 left-2 text-xs text-white bg-[#202020] px-1 z-10">
                                                            Growth
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={row.field3}
                                                            onChange={(e) => {
                                                                const newRows = [...rows];
                                                                newRows[index].field3 = parseInt(e.target.value);
                                                                setRows(newRows);
                                                            }}
                                                            className="w-full bg-[#202020] text-white p-2 border border-white rounded-md mt-4"
                                                            placeholder="Field 3"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <div className="flex justify-between mt-4">
                <div className="text-left">
                    <Button className="bg-zinc-900 text-white border-none">&lt;--- Back</Button>
                </div>
                <div className="text-white text-right flex flex-col">
                    <div>Projected Gain:</div>
                    <div>{potential_gain} &#9650;</div>
                </div>
            </div>
        </div>
    );    
}    