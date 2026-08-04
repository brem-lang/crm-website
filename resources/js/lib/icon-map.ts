import {
    BarChart3,
    LineChart,
    PenLine,
    Phone,
    RefreshCw,
    Shuffle,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
    Workflow,
    Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
    users: Users,
    phone: Phone,
    'trending-up': TrendingUp,
    'bar-chart-3': BarChart3,
    'shield-check': ShieldCheck,
    zap: Zap,
    sparkles: Sparkles,
    'pen-line': PenLine,
    shuffle: Shuffle,
    'refresh-cw': RefreshCw,
    workflow: Workflow,
    'line-chart': LineChart,
};

export function getIcon(name?: string | null): LucideIcon | null {
    if (!name) {
        return null;
    }

    return ICONS[name] ?? null;
}
