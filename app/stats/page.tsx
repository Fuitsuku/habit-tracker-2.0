"use client";

//Imports start here
import PageHeader from '../components/PageHeader';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StatsPage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            
        }
    }, []);

    // Handles back button navigation
    const handleNaviBack = () => {
        router.push("/home");
    };
    
    return (
        <div className="bg-zinc-900 flex justify-center h-screen p-10">
            <div className="space-y-6 w-full max-w-md">
                <PageHeader page_name="Stats" />
                <div className="text-white text-xs font-semibold">
                    This feature is coming soon! Stay Tuned...
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                {/* Back Button */}
                <div className="text-left">
                    <button 
                        className="bg-zinc-900 text-white border-none p-3 rounded w-30"
                        onClick={handleNaviBack} // Reset rewards
                    >
                        &lt;-- Back
                    </button>
                </div>
            </div>
        </div>  
    );
}