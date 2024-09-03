// Imports start here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHeader from "../components/PageHeader";

export default function TasksPage() {
    return (
        <div className="bg-zinc-900 min-h-screen p-10">
            <PageHeader page_name="Tasks"/>
            <Tabs defaultValue="current" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="current"> Current</TabsTrigger>
                    <TabsTrigger value="setup">Set Up</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}