import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function TeamDetailsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Team Header Skeleton */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                <Skeleton className="h-32 w-32 rounded-full" />
                {/* <div className="space-y-3 text-center md:text-left">
                    <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-32" />
                </div> */}
            </div>

            {/* Team Lead Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team Members Skeleton */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-16" />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="flex items-center gap-4 p-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-40" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
