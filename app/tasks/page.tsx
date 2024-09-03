// Imports start here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
                <TabsContent value="current">
                    <Card>
                        <CardContent className="space-y-2">
                            
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="setup">
                    <Card>
                        <CardContent>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}