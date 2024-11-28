"use client";
// Imports start here
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import PageHeader from "../components/PageHeader";

interface RewardData {
  reward_name: string;
  point_value: number;
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<RewardData[]>([]);
  const [newReward, setNewReward] = useState<RewardData>({ reward_name: "", point_value: 0 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardData | null>(null);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false); // For + button drawer

  // Add a new reward
  const addReward = () => {
    setRewards([...rewards, newReward]);
    setNewReward({ reward_name: "", point_value: 0 });
    setAddDrawerOpen(false); // Close the drawer
  };

  // Delete the last reward
  const deleteReward = () => {
    if (rewards.length > 0) {
      setRewards(rewards.slice(0, -1));
    }
  };

  // Open the drawer with selected reward
  const openDrawer = (reward: RewardData) => {
    setSelectedReward(reward);
    setDrawerOpen(true);
  };

  return (
    <div className="bg-[#202020] h-screen p-10">
      <PageHeader page_name="Rewards" />
      {/* Setup Section */}
      <div className="space-y-2 h-96 overflow-y-auto bg-black rounded-lg border-none shadow-none">
        <table className="min-w-full border-collapse border-none">
          <tbody>
            {rewards.map((reward, index) => (
              <tr
                key={index}
                className="h-24 p-2 border-b border-white cursor-pointer hover:bg-gray-800"
                onClick={() => openDrawer(reward)}
              >
                <td colSpan={2} className="p-2 py-4 px-10">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="text-white font-bold">{reward.reward_name}</div>
                    <div className="text-white text-right">{reward.point_value} Points</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Task and Delete Buttons */}
        <div className="flex justify-center mt-4 space-x-4">
          {/* Add Reward Drawer */}
          <Button
            onClick={() => setAddDrawerOpen(true)}
            className="bg-[#202020] text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center"
          >
            +
          </Button>
          <Drawer open={addDrawerOpen} onOpenChange={setAddDrawerOpen}>
            <DrawerContent className="bg-[#202020]">
              <DrawerHeader>
                <DrawerTitle className="text-white text-lg">Add New Reward</DrawerTitle>
                <DrawerDescription>
                  Enter the name and point value of the new reward.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 bg-[#202020] space-y-4">
                <input
                  type="text"
                  placeholder="Reward Name"
                  value={newReward.reward_name}
                  onChange={(e) => setNewReward({ ...newReward, reward_name: e.target.value })}
                  className="w-full p-2 bg-black text-white rounded"
                />
                <input
                  type="number"
                  placeholder="Point Value"
                  value={newReward.point_value}
                  onChange={(e) => setNewReward({ ...newReward, point_value: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 bg-black text-white rounded"
                />
              </div>
              <DrawerFooter>
                <Button onClick={addReward} className="bg-black text-white">
                  Add Reward
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

          {/* Delete Reward Button */}
          <button
            onClick={deleteReward}
            className="bg-red-500 text-white text-lg p-4 rounded-full w-14 h-2 flex items-center justify-center"
          >
            -
          </button>
        </div>
      </div>

      {/* Drawer for reward details */}
      <Drawer open={drawerOpen} onOpenChange={() => setDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedReward?.reward_name}</DrawerTitle>
            <DrawerDescription>
              This reward costs {selectedReward?.point_value} points.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <p>Redeem this reward if you have enough points. Click "Purchase" to confirm your redemption.</p>
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                alert(`Purchased ${selectedReward?.reward_name}!`);
                setDrawerOpen(false);
              }}
            >
              Purchase
            </Button>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-4">
        <button className="bg-zinc-900 text-white border-none p-3 rounded w-30">&lt;--- Back</button>
        <button
          onClick={() => setRewards([])} // Reset rewards
          className="bg-black text-white text-xl p-3 rounded-lg w-40"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
