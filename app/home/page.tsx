//Imports start here
import { Button } from "@/components/ui/button"
import PageHeader from '../components/PageHeader';

export default function HomePage() {
    return (
        <div className="bg-zinc-900 flex justify-center h-screen p-10">
            <div className="space-y-6 w-full max-w-md">
                <PageHeader page_name="Home" />
                <ul className="space-y-3 list-none">
                    <li>
                        <Button className="bg-zinc-900 font-sans font-thin text-white text-4xl">
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