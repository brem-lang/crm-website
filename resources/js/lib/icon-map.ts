import {
    BarChart3,
    GitBranch,
    Handshake,
    Inbox,
    LineChart,
    ListChecks,
    Megaphone,
    PenLine,
    Phone,
    Radar,
    RefreshCw,
    Shuffle,
    ShieldCheck,
    Sparkles,
    Table2,
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
    handshake: Handshake,
    megaphone: Megaphone,
    inbox: Inbox,
    radar: Radar,
    'git-branch': GitBranch,
    'list-checks': ListChecks,
    'table-2': Table2,
};

export function getIcon(name?: string | null): LucideIcon | null {
    if (!name) {
        return null;
    }

    return ICONS[name] ?? null;
}
