"use client";
// Imports start here
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import PageHeader from "@/app/components/PageHeader";
import RewardApiWrapper from "@/api/rewards";
import { useRouter } from "next/navigation";
import ActionApiWrapper from "@/api/actions";

interface RewardData {
  "reward-id" : string;
  "reward-name": string;
  "point-value": number;
}

interface RewardDataLocal {
  "reward-name": string;
  "point-value": number;
}

// API Wrapper instance
const rewardApi = new RewardApiWrapper({
  baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

// API Wrapper instance
const actionApi = new ActionApiWrapper({
  baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

export default function RewardsPage() {
  const [rewards, setRewards] = useState<RewardData[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(0);
  const [newReward, setNewReward] = useState<RewardDataLocal>({ "reward-name": "", "point-value": 0 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardData | null>(null);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false); // For + button drawer
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
        // Access localStorage safely
        const stats = localStorage.getItem("stats");
        if (stats) {
            const parsedStats = JSON.parse(stats);
            setPoints(parsedStats["points"]);
            setUsername(parsedStats["user-id"]);
        } else {
          router.push("/");
        }

        const storedRewards = localStorage.getItem("rewards");
        if (storedRewards) {
          const parsedRewards = JSON.parse(storedRewards);
          setRewards(parsedRewards);
        } else {
          router.push("/");
        }
    }
  }, []);

  // Handles back button navigation
  const handleNaviBack = () => {
    router.push("/home");
  };

  const addReward = async () => {
    const payload = {
      "user-id" : username,
      "reward-data" : JSON.stringify(newReward)
    };

    // Update Backend and Pull latest
    const response = await rewardApi.createRewardCall("/reward/create", payload);
    const update_rewards_response = await rewardApi.getRewardsCall("/reward/get", {"user-id" : username})

    // Parse Latest data
    const reward_list_raw = update_rewards_response.data.payload.rewards;
    const parsed_reward_list = rewardApi.parseRewards(reward_list_raw);

    // Update local copies & close drawer
    setRewards(parsed_reward_list);
    localStorage.setItem('rewards', JSON.stringify(parsed_reward_list));
    setNewReward({ "reward-name": "", "point-value": 0 });
    setAddDrawerOpen(false); // Close the drawer
  };

  // Delete the last reward
  const deleteReward = async () => {
    if (rewards.length > 0 && selectedReward) {
      const payload = {
        "user-id" : username,
        "reward-id" : selectedReward["reward-id"]
      };
      const response = await rewardApi.deleteRewardCall("/reward/delete", payload);

      // Pull latest
      const update_rewards_response = await rewardApi.getRewardsCall("/reward/get", {"user-id" : username})

      // Parse Latest data
      const reward_list_raw = update_rewards_response.data.payload.rewards;
      const parsed_reward_list = rewardApi.parseRewards(reward_list_raw);

      // Update local copies & close drawer
      setRewards(parsed_reward_list);
      localStorage.setItem('rewards', JSON.stringify(parsed_reward_list));
      setDrawerOpen(false);
    }
  };

  // TODO: Redeems the selected reward
  const redeemReward = async () => {
    // Check if you have enough points
    if (selectedReward && points) {
      if (selectedReward["point-value"] <= points) {
        const response = await rewardApi.redeemRewardCall("/reward/redeem", {"user-id" : username, "reward-id" : selectedReward["reward-id"]})
        console.log(response);

        // Pull latest
        const update_rewards_response = await rewardApi.getRewardsCall("/reward/get", {"user-id" : username})

        // Parse Latest data
        const reward_list_raw = update_rewards_response.data.payload.rewards;
        const parsed_reward_list = rewardApi.parseRewards(reward_list_raw);

        // Update local copies & close drawer
        setRewards(parsed_reward_list);
        localStorage.setItem('rewards', JSON.stringify(parsed_reward_list));

        // Update point value
        const update_response = await actionApi.loginCall("/action/login", { "user-id": username });
        const user_stats = update_response.data.payload;
        localStorage.setItem('stats', JSON.stringify(user_stats));
        setPoints(user_stats["points"]);
        setDrawerOpen(false);
      } else {
        console.log("You do not have enough points");
        setDrawerOpen(false);
      };
    };
  };

  const monthlyReset = async () => {
    const response = await actionApi.monthlyResetCall("/action/reset", {"user-id" : username})
    const statUpdate = await actionApi.loginCall("/action/login", { "user-id": username });
            const user_stats = statUpdate.data.payload;
            localStorage.setItem('stats', JSON.stringify(user_stats));
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
      <div className="space-y-2 min-h-[300px] h-[300px] overflow-y-auto bg-black border-none rounded-lg shadow-none">
        <Table className="min-w-full border-collapse border-none">
          <thead>
            <TableRow className="h-6 border-b border-white">
              <TableCell className="text-white text-sm font-semibold">Reward Name</TableCell>
              <TableCell className="text-center text-sm text-white font-semibold">Point Value</TableCell>
            </TableRow>
          </thead>
            <TableBody>
              {rewards.map((reward, index) => (
                <TableRow key={index + 1} className="h-4 border-b border-white">
                  <TableCell 
                  className="text-white text-xs"
                  onClick={() => openDrawer(reward)}>
                    {reward["reward-name"]}
                  </TableCell>
                  <TableCell 
                  className="text-center text-xs text-white"
                  onClick={() => openDrawer(reward)}>
                    {reward["point-value"]}
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
              </DrawerHeader>
              <div className="p-4 space-y-4">
                {/* Reward Name Field */}
                <div className="space-y-1">
                  <label className="block text-sm text-gray-400">Reward Name</label>
                  <input
                    type="text"
                    placeholder="Enter a descriptive name."
                    value={newReward["reward-name"]}
                    onChange={(e) => setNewReward({ ...newReward, "reward-name": e.target.value })}
                    className="w-full p-2 bg-black text-white rounded focus:ring focus:ring-blue-500"
                  />
                </div>

                {/* Price Field */}
                <div className="space-y-1">
                  <label className="block text-sm text-gray-400">Price</label>
                  <input
                    type="number"
                    placeholder="Point Value"
                    value={newReward["point-value"]}
                    onChange={(e) => setNewReward({ ...newReward, "point-value": parseInt(e.target.value) || 0 })}
                    className="w-full p-2 bg-black text-white rounded focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
              <DrawerFooter className="flex justify-end space-x-2">
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

        </div>
      </div>

      {/* Drawer for reward details */}
      <Drawer open={drawerOpen} onOpenChange={() => setDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {selectedReward ? selectedReward["reward-name"] : "No Reward Selected"}
            </DrawerTitle>
            <DrawerDescription>
              {selectedReward
                ? `This reward costs ${selectedReward["point-value"]} ▲. You currently have ${points} ▲.`
                : "Select a reward to view details."}
              
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {selectedReward ? (
              <p>
                Click &quot;Purchase&quot; to
                confirm your redemption.
              </p>
            ) : (
              <p>No reward selected.</p>
            )}
          </div>
          <DrawerFooter>
            {selectedReward && (
              <Button
                onClick={redeemReward}
              >
                Purchase
              </Button>
            )}
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(deleteReward)}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-4">
        <button 
          className="bg-zinc-900 text-white border-none p-3 rounded w-30"
          onClick={handleNaviBack}
        >
          &lt;-- Back
        </button>
        <button
          onClick={monthlyReset} // Reset rewards
          className="bg-black text-white text-xl p-3 rounded-lg w-40"
        >
          Cash Out
        </button>
      </div>
    </div>
  );
}
