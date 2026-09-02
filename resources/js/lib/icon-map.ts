import {
    Activity,
    BadgeCheck,
    BarChart3,
    Database,
    DollarSign,
    GitBranch,
    Handshake,
    Inbox,
    KeyRound,
    LineChart,
    ListChecks,
    Lock,
    Megaphone,
    PenLine,
    Phone,
    Radar,
    RefreshCw,
    Server,
    Shuffle,
    ShieldCheck,
    Sparkles,
    Table2,
    Target,
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
    lock: Lock,
    'badge-check': BadgeCheck,
    server: Server,
    target: Target,
    activity: Activity,
    'key-round': KeyRound,
    database: Database,
    'dollar-sign': DollarSign,
};

export function getIcon(name?: string | null): LucideIcon | null {
    if (!name) {
        return null;
    }

    return ICONS[name] ?? null;
}
