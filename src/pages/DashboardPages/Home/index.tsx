import DialogWrapper from '@/components/DialogContents';
import Headers from '@/components/Headers';
import SearchInput from '@/components/SearchInput';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import DashboardOverviewCard from './DashboardOverviewCard';
import { SalesRevenue } from './SalesRevenue';
import { SalesPerformance } from './SalesPerformance';
import AddIssue from '@/components/DialogContents/AddIssue';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <>
            <Headers title="Dashboard">
                <div className="flex items-center gap-2">
                    <SearchInput value={searchTerm} onChange={value => setSearchTerm(value)} />
                    <DialogWrapper
                        trigger={
                            <Button>
                                <Plus /> Project
                            </Button>
                        }
                        content={<AddIssue />}
                    />
                </div>
            </Headers>

            <main className="py-5">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {Array(4)
                        .fill(null)
                        .map((_, index) => (
                            <DashboardOverviewCard title={`Project ${index + 1}`} key={index} />
                        ))}
                </div>

                <div className="flex gap-4 justify-center">
                    <SalesRevenue />
                    <SalesPerformance />
                </div>
            </main>
        </>
    );
}
