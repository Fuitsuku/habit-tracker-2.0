"use client";
// Imports
import { Button } from "@/components/ui/button";
import PageHeader from "@/app/components/PageHeader";
import { useState } from "react"; // For state management
import AccountApiWrapper from "@/api/account"; 
import { useRouter } from "next/navigation";

// API Wrapper instance
const accountApi = new AccountApiWrapper({
    baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
});

export default function RegisterPage() {
    const [username, setUsername] = useState(""); // State to store username
    const [error, setError] = useState(""); // State to store error messages
    const [success, setSuccess] = useState(false); // State for success message
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        setError(""); // Reset error message
        setSuccess(false); // Reset success message

        try {
            const response = await accountApi.createAccountCall("/account/create", { "user-id": username });
            console.log("Account created")
            setSuccess(true); // Show success message
            await sleep(1000);
            router.push("/login");
        } catch (err: any) {
            // Check if the error has a response from the backend
            setError(err.message || "An error occurred while creating the account."); // Fallback message
        }
    };

    return (
        <div className="bg-zinc-900 flex justify-center items-center h-screen p-10">
            <div className="bg-[#202020] w-full max-w-md p-6 rounded-lg shadow-md text-white">
                <PageHeader page_name="Register" />
                <form className="space-y-6" onSubmit={handleRegister}>
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
                            Register
                        </Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">Account successfully created!</p>}
                </form>
            </div>
        </div>
    );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));