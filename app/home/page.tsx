"use client";

//Imports start here
import { Button } from "@/components/ui/button"
import PageHeader from '../components/PageHeader';
import TasksApiWrapper from "@/api/tasks"; 
import ActionApiWrapper from "@/api/actions";
import RewardApiWrapper from "@/api/rewards";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// API Wrapper instance
const tasksApi = new TasksApiWrapper({
    baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

// API Wrapper instance
const actionApi = new ActionApiWrapper({
    baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
  });

// API Wrapper instance
const rewardApi = new RewardApiWrapper({
    baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

export default function HomePage() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [error, setError] = useState(""); // State to store error messages
    const [success, setSuccess] = useState(false); // State for success message

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Access localStorage safely
            const stats = localStorage.getItem("stats");
            if (stats) {
                const parsedStats = JSON.parse(stats);
                setUsername(parsedStats["user-id"]);
            } else {
                router.push("/");
            }
        }
    }, []);
    
    const handleTaskNavi = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await tasksApi.getTasksCall("/task/get", { "user-id": username });
            const this_month_tasks_raw = response.data.payload.this_month_tasks;
            const next_month_tasks_raw = response.data.payload.next_month_tasks;
            
            const this_month_tasks = tasksApi.parseTMT(this_month_tasks_raw);
            localStorage.setItem('this-month-tasks', JSON.stringify(this_month_tasks));

            const next_month_tasks = tasksApi.parseNMT(next_month_tasks_raw);
            localStorage.setItem('next-month-tasks', JSON.stringify(next_month_tasks));
            
            router.push("/tasks");
        } catch (err: any) {
            // Check if the error has a response from the backend
            console.error('An error has occurred. Contact the Developer.');
        }
    };

    const handleRewardNavi = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await rewardApi.getRewardsCall("/reward/get", { "user-id": username });
            console.log(response);
            // Extract reward list from response
            const reward_list_raw = response.data.payload.rewards;
            console.log(reward_list_raw);
            // parse and store reward information from retrieved data
            const rewards = rewardApi.parseRewards(reward_list_raw);
            localStorage.setItem("rewards", JSON.stringify(rewards));
            
            router.push("/rewards");
        } catch (err: any) {
            // Check if the error has a response from the backend
            console.error('An error has occurred. Contact the Developer.');
        }
    };

    const handleStatsNavi = async (e: React.FormEvent) => {
        router.push("/stats");
    };

    const trackDay = async () => {
        setError(""); // Reset error message
        setSuccess(false); // Reset success message
        
        try {
            const payload = {
                "user-id" : username
            };
    
            const response = await actionApi.trackDayCall('/action/track', payload);    
            console.log("Successfully Tracked Day.")

            const response_update = await actionApi.loginCall("/action/login", { "user-id": username });
            const user_stats = response_update.data.payload;
            localStorage.setItem('stats', JSON.stringify(user_stats));
            setSuccess(true); // Show success message
            await sleep(2000);
            setSuccess(false);
        } catch (err: any) {
            // Check if the error has a response from the backend
            setError(err.message || "An error occurred while logging in."); // Fallback message
        }
    };
    
    return (
        <div className="bg-zinc-900 flex justify-center h-screen p-10">
            <div className="space-y-6 w-full max-w-md">
                <PageHeader page_name="Home" />
                <ul className="space-y-3 list-none">
                    <li>
                        <Button 
                            className="bg-zinc-900 font-sans font-thin text-white text-4xl"
                            onClick={handleTaskNavi}
                        >
                            Tasks
                        </Button>
                    </li>
                    <li>
                        <Button 
                            className="bg-zinc-900 font-sans font-thin text-white text-4xl"
                            onClick={handleRewardNavi}>
                            Rewards
                        </Button>
                    </li>
                    <li>
                        <Button 
                            className="bg-zinc-900 font-sans font-thin text-white text-4xl"
                            onClick={handleStatsNavi}>
                            Stats
                        </Button>
                    </li>
                </ul>
            </div>
            {/* Footer Section */}
            <div className="flex justify-between items-center mt-4">
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">Successfully Tracked Day!</p>}
                <button
                    onClick={() => trackDay()} // Reset rewards
                    className="bg-black text-white text-xl p-3 rounded-lg w-40"
                >
                Track Day
                </button>
            </div>
        </div>
    );
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));