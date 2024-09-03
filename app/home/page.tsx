//Imports start here
import { Button } from "@/components/ui/button"
import PageHeader from '../components/PageHeader';

export default function HomePage() {
    return (
        <div className="bg-zinc-900 min-h-screen p-10">
            <PageHeader page_name="Home"/>
            <ul className="space-y-3 list-outside">
                <li>
                    <Button className="bg-zinc-900 font-sans font-thin text-white text-4xl p">
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
    );
}