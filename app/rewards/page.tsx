'use client';
// Imports start here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { useState } from 'react';
  
import PageHeader from "../components/PageHeader";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface RewardData{
    reward_name : string,
    point_value: number
}

export default function RewardsPage() {
    const [rewards, setRewards] = useState<RewardData[]>([{ reward_name: '', point_value: 0 }]);
    const [newReward, setNewReward] = useState<RewardData>({ reward_name: '', point_value: 0});
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addReward = () => {
        setRewards([...rewards, newReward]);
        setNewReward({ reward_name: '', point_value: 0});
        setIsDialogOpen(false); // Close the dialog
    };

    const deleteReward = () => {
        if (rewards.length > 0) {
            const newRewards = rewards.slice(0, -1);
            setRewards(newRewards);
        }
    };

    return (
        <div className="bg-[#202020] h-screen p-10">
            <PageHeader page_name="Rewards" />
            {/* Setup Section */}
            <div className="space-y-2 h-96 overflow-y-auto bg-black rounded-lg border-none shadow-none">
                {/* rewards and Button Container */}
                <div className="flex flex-col ">
                    {/* rewards Table */}
                    <table className="min-w-full border-collapse border-none">
                        <tbody>
                            {rewards.map((reward, index) => (
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
                                                    value={reward.reward_name}
                                                    onChange={(e) => {
                                                        const newRewards = [...rewards];
                                                        newRewards[index].reward_name = e.target.value;
                                                        setRewards(newRewards);
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
                                                    value={reward.point_value}
                                                    onChange={(e) => {
                                                        const newRewards = [...rewards];
                                                        newRewards[index].point_value = parseInt(e.target.value) || 0;
                                                        setRewards(newRewards);
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
                                    <DialogTitle className="text-white">New Reward</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={newReward.reward_name}
                                        onChange={(e) =>
                                            setNewReward({ ...newReward, reward_name: e.target.value })
                                        }
                                        className="w-full p-2 bg-black rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Point Value"
                                        value={newReward.point_value}
                                        onChange={(e) =>
                                            setNewReward({ ...newReward, point_value: parseInt(e.target.value) })
                                        }
                                        className="w-full p-2 bg-black text-white rounded"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button onClick={addReward} className="bg-green-400 text-white">
                                        Confirm
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <button
                            onClick={deleteReward}
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
                        setRewards([]); // Reset rewards or implement the reset functionality
                    }}
                    className="bg-black text-white text-xl p-3 rounded-lg w-40"
                >
                    Reset
                </button>
            </div>
        </div>
    );    
}    