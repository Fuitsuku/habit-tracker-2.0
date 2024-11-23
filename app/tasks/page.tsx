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

    interface RowData {
        field1: string;
        field2: number;
        field3: number;
    }

    const [rows, setRows] = useState<RowData[]>([{ field1: '', field2: 0, field3: 0 }]);
    const [newRow, setNewRow] = useState<RowData>({ field1: '', field2: 0, field3: 0 });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addRow = () => {
        setRows([...rows, newRow]);
        setNewRow({ field1: '', field2: 0, field3: 0 });
        setIsDialogOpen(false); // Close the dialog
    };

    const deleteRow = () => {
        if (rows.length > 0) {
            const newRows = rows.slice(0, -1);
            setRows(newRows);
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
                                {/* Rows Table */}
                                <table className="min-w-full border-collapse border-none">
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index} className="h-24 border-b border-white">
                                                <td colSpan={3} className="p-2 py-4">
                                                    <div className="grid grid-cols-3 grid-rows-[1fr,1fr] gap-4 h-full">
                                                        <div className="relative col-span-2 row-span-2 h-full">
                                                            <label className="absolute -top-4 left-0 text-xs text-white px-1 z-10">
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
                                                                value={row.field2}
                                                                onChange={(e) => {
                                                                    const newRows = [...rows];
                                                                    newRows[index].field2 = parseInt(e.target.value);
                                                                    setRows(newRows);
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
                                                                value={row.field3}
                                                                onChange={(e) => {
                                                                    const newRows = [...rows];
                                                                    newRows[index].field3 = parseInt(e.target.value);
                                                                    setRows(newRows);
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

                                {/* Add Row and Delete Buttons */}
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
                                                    value={newRow.field1}
                                                    onChange={(e) =>
                                                        setNewRow({ ...newRow, field1: e.target.value })
                                                    }
                                                    className="w-full p-2 bg-black rounded"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Point Value"
                                                    value={newRow.field2}
                                                    onChange={(e) =>
                                                        setNewRow({ ...newRow, field2: parseInt(e.target.value) })
                                                    }
                                                    className="w-full p-2 bg-black text-white rounded"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Growth Factor"
                                                    value={newRow.field3}
                                                    onChange={(e) =>
                                                        setNewRow({ ...newRow, field3: parseInt(e.target.value) })
                                                    }
                                                    className="w-full p-2 bg-black text-white rounded"
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={addRow} className="bg-green-400 text-white">
                                                    Confirm
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <button
                                        onClick={deleteRow}
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
