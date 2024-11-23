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

interface RowData{
    reward_name : string,
    point_value: number
}

export default function TasksPage() {
    const [rows, setRows] = useState<RowData[]>([{ reward_name: '', point_value: 0}]);
    
    const addRow = () => {
        setRows([...rows, { reward_name: '', point_value: 0}]);
    };

    return (
        <div className="bg-[#202020] h-screen p-10">
            <PageHeader page_name="Rewards" />
            {/* Setup Section */}
            <div className="space-y-2 h-96 overflow-y-auto bg-black rounded-lg border-none shadow-none">
                {/* Rows and Button Container */}
                <div className="flex flex-col ">
                    {/* Rows Table */}
                    <table className="min-w-full border-collapse border-none">
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index} className="h-24 border-b border-white">
                                    <td colSpan={2} className="p-2 py-4">
                                        <div className="grid grid-cols-2 gap-4 h-full">
                                            {/* Field 1: Name */}
                                            <div className="relative col-span-1 h-full">
                                                <label className="absolute -top-4 left-2 text-xs text-white px-1 z-10">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={row.reward_name}
                                                    onChange={(e) => {
                                                        const newRows = [...rows];
                                                        newRows[index].reward_name = e.target.value;
                                                        setRows(newRows);
                                                    }}
                                                    className="w-full h-full bg-[#202020] text-white text-sm p-4 rounded-md"
                                                    placeholder="Enter name"
                                                />
                                            </div>
    
                                            {/* Field 2: Point Value */}
                                            <div className="relative col-span-1 h-full">
                                                <label className="absolute -top-4 left-2 text-xs text-white px-1 z-10">
                                                    Point Value
                                                </label>
                                                <input
                                                    type="number"
                                                    value={row.point_value}
                                                    onChange={(e) => {
                                                        const newRows = [...rows];
                                                        newRows[index].point_value = parseInt(e.target.value) || 0;
                                                        setRows(newRows);
                                                    }}
                                                    className="w-full h-full bg-[#202020] text-white text-sm p-4 rounded-md"
                                                    placeholder="Enter point value"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    {/* Add Row and Remove Row Buttons */}
                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={addRow}
                            className="bg-[#202020] text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center"
                        >
                            +
                        </button>
                        <button
                            onClick={() => {
                                if (rows.length > 0) {
                                    const newRows = rows.slice(0, -1); // Remove the last item
                                    setRows(newRows);
                                }
                            }}
                            className="bg-red-500 text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
    
            {/* Footer Section */}
            <div className="flex justify-between items-center mt-4">
                {/* Back Button */}
                <button className="bg-zinc-900 text-white border-none p-3 rounded w-30">
                    &lt;--- Back
                </button>
    
                {/* Reset Button */}
                <button
                    onClick={() => {
                        setRows([]); // Reset rows or implement the reset functionality
                    }}
                    className="bg-black text-white text-xl p-3 rounded-lg w-40"
                >
                    Reset
                </button>
            </div>
        </div>
    );    
}    