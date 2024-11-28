'use client';
// Imports start here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { useState } from 'react';
  
import PageHeader from "../components/PageHeader";

interface RewardData{
    reward_name : string,
    point_value: number
}

export default function RewardsPage() {
    const [rewards, setRewards] = useState<RewardData[]>([{ reward_name: '', point_value: 0}]);
    
    const addReward = () => {
        setRewards([...rewards, { reward_name: '', point_value: 0}]);
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
    
                    {/* Add reward and Remove reward Buttons */}
                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={addReward}
                            className="bg-[#202020] text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center"
                        >
                            +
                        </button>
                        <button
                            onClick={() => {
                                if (rewards.length > 0) {
                                    const newrewards = rewards.slice(0, -1); // Remove the last item
                                    setRewards(newrewards);
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