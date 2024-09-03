//Imports start here
import { Button } from "@/components/ui/button"

export default function HomePage() {
    return (
        <div className="bg-zinc-900 min-h-screen p-10">
            <h1 className="scroll-m-20  font-sans font-thin tracking-wide text-7xl text-white  tracking-tight lg:text-3xl">
                Home
            </h1>
            <div className="text-white text-4xl">
                ---
            </div>
            <ul className="py-10 space-y-3 list-outside">
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