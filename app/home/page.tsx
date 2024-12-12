"use client";

//Imports start here
import { Button } from "@/components/ui/button"
import PageHeader from '../components/PageHeader';
import TasksApiWrapper from "@/api/tasks"; 
import { useRouter } from "next/navigation";

// API Wrapper instance
const tasksApi = new TasksApiWrapper({
    baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

export default function HomePage() {
    const router = useRouter();
    const username = JSON.parse(localStorage.getItem('stats'))['user-id'];
    
    const handleTaskNavi = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await tasksApi.getTasksCall("/task/get", { "user-id": username });
            const this_month_tasks = response.data.payload.this_month_tasks;
            const next_month_tasks = response.data.payload.next_month_tasks;
            
            parseTasks(this_month_tasks, next_month_tasks);
            // localStorage.setItem('tasks', JSON.stringify(user_stats));
            
            await sleep(1000);
            router.push("/tasks");
        } catch (err: any) {
            // Check if the error has a response from the backend
            console.error('An error has occurred. Contact the Developer.');
        }
    };

    const parseTasks = (this_month_tasks:object, next_month_tasks:object) => {
        
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
                        <Button className="bg-zinc-900 font-sans font-thin text-white text-4xl">
                            Rewards
                        </Button>
                    </li>
                    <li>
                        <Button className="bg-zinc-900 font-sans font-thin text-white text-4xl">
                            Stats
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));