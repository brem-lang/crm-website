import { Head, Link } from '@inertiajs/react';
import { MessageSquareText, Rows3, Settings } from 'lucide-react';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes/admin';
import { index as demoRequestsIndex } from '@/routes/admin/demo-requests';
import { index as sectionsIndex } from '@/routes/admin/sections';
import { edit as siteSettingsEdit } from '@/routes/admin/site-settings';

type Stats = {
    totalDemoRequests: number;
    newThisWeek: number;
    sectionsEnabled: number;
    sectionsTotal: number;
};

export default function AdminDashboard({ stats }: { stats: Stats }) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Dashboard"
                    description="An overview of your site's content and demo requests."
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Demo Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">{stats.totalDemoRequests}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                New This Week
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">{stats.newThisWeek}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Sections Enabled
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.sectionsEnabled} / {stats.sectionsTotal}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <Link
                        href={sectionsIndex()}
                        className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
                    >
                        <Rows3 className="size-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Manage Sections</p>
                            <p className="text-sm text-muted-foreground">Edit content and order</p>
                        </div>
                    </Link>

                    <Link
                        href={demoRequestsIndex()}
                        className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
                    >
                        <MessageSquareText className="size-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Demo Requests</p>
                            <p className="text-sm text-muted-foreground">Review and follow up</p>
                        </div>
                    </Link>

                    <Link
                        href={siteSettingsEdit()}
                        className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
                    >
                        <Settings className="size-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Site Settings</p>
                            <p className="text-sm text-muted-foreground">SEO, contact & branding</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
