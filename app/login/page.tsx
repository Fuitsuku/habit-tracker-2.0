"use client";

//Imports start here
import { Button } from "@/components/ui/button";
import PageHeader from "@/app/components/PageHeader";
import { useState } from "react"; // For state management
import ActionsApiWrapper from "@/api/actions"; 
import { useRouter } from "next/navigation";

// API Wrapper instance
const actionApi = new ActionsApiWrapper({
    baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

export default function LoginPage() {
    const [username, setUsername] = useState(""); // State to store username
    const [error, setError] = useState(""); // State to store error messages
    const [success, setSuccess] = useState(false); // State for success message
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        setError(""); // Reset error message
        setSuccess(false); // Reset success message

        try {
            const response = await actionApi.loginCall("/action/login", { "user-id": username });
            console.log("Successfully Logged In.")
            setSuccess(true); // Show success message
            await sleep(1000);

            // Update cache with user stats

            router.push("/home");
        } catch (err: any) {
            // Check if the error has a response from the backend
            setError(err.message || "An error occurred while logging in."); // Fallback message
        }
    };

    const handleRegister = () => {
        router.push("/register");
    };

    return (
        <div className="bg-zinc-900 flex justify-center items-center h-screen p-10">
            <div className="bg-[#202020] w-full max-w-md p-6 rounded-lg shadow-md text-white">
                <PageHeader page_name="Login" />
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update state on change
                            className="mt-1 block w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <Button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Login
                        </Button>
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="text-sm text-gray-400 hover:underline focus:outline-none focus:underline"
                        >
                            Register
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">Successfully Logged In!</p>}
                </form>
            </div>
        </div>
    );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));