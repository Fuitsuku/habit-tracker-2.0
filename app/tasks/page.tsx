// Imports start here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
  
import PageHeader from "../components/PageHeader";

const test_task_data = [
    {
        task_id : 1,
        completion : false,
        task_name : "Task 1",
        points : 5,
        day_streak : 1
    },
    {
        task_id : 2,
        completion : false,
        task_name : "Task 2",
        points : 8,
        day_streak : 1
    },
    {
        task_id : 3,
        completion : true,
        task_name : "Task 3",
        points : 15,
        day_streak : 3
    },
    {
        task_id : 4,
        completion : false,
        task_name : "Task 4",
        points : 5,
        day_streak : 1
    },
    {
        task_id : 5,
        completion : false,
        task_name : "Task 5",
        points : 8,
        day_streak : 1
    },
    {
        task_id : 6,
        completion : true,
        task_name : "Task 6",
        points : 15,
        day_streak : 3
    }
]

const potential_gain = 10;

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
                        <CardContent className="space-y-2 h-96 overflow-y-auto">
                            <Table className="min-w-full">
                                <TableHeader className="">
                                    <TableRow>
                                        <TableHead className=" sticky top-0 z-10 text-center">Status</TableHead>
                                        <TableHead className=" sticky top-0 z-10">Task</TableHead>
                                        <TableHead className=" sticky top-0 z-10text-center">Points</TableHead>
                                        <TableHead className=" sticky top-0 z-10text-center">Day Streak</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="">
                                    {
                                        test_task_data.map(
                                            (task) => (
                                                <TableRow key={task.task_id} className="h-12">
                                                    <TableCell className="text-center">
                                                        <Checkbox checked={task.completion}></Checkbox>
                                                    </TableCell>
                                                    <TableCell>{task.task_name}</TableCell>
                                                    <TableCell className="text-center">{task.points}</TableCell>
                                                    <TableCell className="text-center">{task.day_streak}</TableCell>
                                                </TableRow>
                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
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

            <div className="flex justify-between">
                <div className="text-left">
                    <Button className="bg-zinc-900">
                        &lt;--- Back
                    </Button>
                </div>
                <div className="text-white text-right flex flex-col">
                    <div>
                        Projected Gain:
                    </div> 
                    <div>
                        {potential_gain} &#9650;
                    </div>
                </div>
            </div>
        </div>
    );
}