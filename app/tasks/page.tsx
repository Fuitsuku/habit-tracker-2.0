'use client';

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
        <div className="bg-zinc-900 min-h-screen p-10">
            <PageHeader page_name="Tasks"/>
            <Tabs defaultValue="current" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="current"> Current</TabsTrigger>
                    <TabsTrigger value="setup">Set Up</TabsTrigger>
                </TabsList>
                <TabsContent value="current">
                    <Card>
                        <CardContent className="space-y-2 h-96 overflow-y-auto">
                            <Table className="min-w-full">
                                <TableHeader className="">
                                    <TableRow>
                                        <TableHead className=" sticky top-0 z-10 text-center">Status</TableHead>
                                        <TableHead className=" sticky top-0 z-10">Task</TableHead>
                                        <TableHead className=" sticky top-0 z-10text-center">Points</TableHead>
                                        <TableHead className=" sticky top-0 z-10text-center">Day Streak</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="">
                                    {
                                        test_task_data.map(
                                            (task) => (
                                                <TableRow key={task.task_id} className="h-12">
                                                    <TableCell className="text-center">
                                                        <Checkbox checked={task.completion}></Checkbox>
                                                    </TableCell>
                                                    <TableCell>{task.task_name}</TableCell>
                                                    <TableCell className="text-center">{task.points}</TableCell>
                                                    <TableCell className="text-center">{task.day_streak}</TableCell>
                                                </TableRow>
                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="setup">
                    <Card>
                        <CardContent className="h-80 overflow-y-auto">
                            <div>
                                {/* Page 2 Table with Add Row Button */}
                                <button onClick={addRow} className="mb-4 bg-blue-500 text-white p-2 rounded">Add Row</button>
                                <table className="min-w-full">
                                    <tbody>
                                    {/* Dynamically added rows */}
                                    {rows.map((row, index) => (
                                        <tr key={index} className="h-12">
                                        {/* First field takes up the left half of the row */}
                                        <td className="w-1/2">
                                            <input
                                            type="text"
                                            value={row.field1}
                                            onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].field1 = e.target.value;
                                                setRows(newRows);
                                            }}
                                            className="w-full p-2 border"
                                            placeholder="Field 1"
                                            />
                                        </td>

                                        {/* Second and third fields stacked vertically, taking up the right half */}
                                        <td className="w-1/2">
                                            <div className="flex flex-col">
                                            <input
                                                type="text"
                                                value={row.field2}
                                                onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].field2 = parseInt(e.target.value);
                                                setRows(newRows);
                                                }}
                                                className="w-full p-2 border mb-2"
                                                placeholder="Point Value"

                                            />
                                            <input
                                                type="text"
                                                value={row.field3}
                                                onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].field3 = parseInt(e.target.value);
                                                setRows(newRows);
                                                }}
                                                className="w-full p-2 border"
                                                placeholder="Growth Factor"
                                            />
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

            <div className="flex justify-between">
                <div className="text-left">
                    <Button className="bg-zinc-900">
                        &lt;--- Back
                    </Button>
                </div>
                <div className="text-white text-right flex flex-col">
                    <div>
                        Projected Gain:
                    </div> 
                    <div>
                        {potential_gain} &#9650;
                    </div>
                </div>
            </div>
        </div>
    );
}