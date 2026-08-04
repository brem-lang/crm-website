import { Head, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dashboard } from '@/routes/admin';
import demoRequests, { index } from '@/routes/admin/demo-requests';

type DemoRequest = {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    business_type: string;
    message: string | null;
    status: string;
    created_at: string;
};

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'closed'];

export default function DemoRequestShow({ demoRequest }: { demoRequest: DemoRequest }) {
    function updateStatus(status: string) {
        router.patch(
            demoRequests.update(demoRequest).url,
            { status },
            { preserveScroll: true },
        );
    }

    return (
        <>
            <Head title={demoRequest.name} />

            <div className="max-w-2xl space-y-6 p-4">
                <Heading
                    title={demoRequest.name}
                    description={`Submitted ${new Date(demoRequest.created_at).toLocaleString()}`}
                />

                <Card>
                    <CardContent className="space-y-4">
                        <div className="grid gap-1.5">
                            <Label>Status</Label>
                            <Select value={demoRequest.status} onValueChange={updateStatus}>
                                <SelectTrigger className="w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <dl className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <dt className="text-muted-foreground">Company</dt>
                                <dd>{demoRequest.company}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>{demoRequest.email}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Phone</dt>
                                <dd>{demoRequest.phone}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Country</dt>
                                <dd>{demoRequest.country}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Business Type</dt>
                                <dd>{demoRequest.business_type}</dd>
                            </div>
                        </dl>

                        {demoRequest.message && (
                            <div>
                                <dt className="text-sm text-muted-foreground">Message</dt>
                                <dd className="mt-1 whitespace-pre-wrap text-sm">{demoRequest.message}</dd>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

DemoRequestShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Demo Requests', href: index() },
    ],
};
