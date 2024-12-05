//Imports start here
import { Button } from "@/components/ui/button";
import PageHeader from "../components/PageHeader";

export default function LoginPage() {
    return (
        <div className="bg-zinc-900 flex justify-center items-center h-screen p-10">
            <div className="bg-[#202020] w-full max-w-md p-6 rounded-lg shadow-md text-white">
                <PageHeader page_name="Login" />
                <form className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <Button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Login
                        </Button>
                        <button
                            type="button"
                            className="text-sm text-gray-400 hover:underline focus:outline-none focus:underline"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
