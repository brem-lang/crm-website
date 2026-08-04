import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function PanelCard({
    icon: Icon,
    title,
    description,
    action,
    className,
    children,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <Card className={cn('break-inside-avoid', className)}>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-4.5" />
                        </div>
                        <div>
                            <CardTitle>{title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {action}
                </div>
            </CardHeader>
            <CardContent className="space-y-4 border-t pt-6">
                {children}
            </CardContent>
        </Card>
    );
}
