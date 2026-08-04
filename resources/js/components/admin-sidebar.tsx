import { Link } from '@inertiajs/react';
import { Globe, LayoutGrid, MessageSquareText, Rows3, Settings } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as demoRequestsIndex } from '@/routes/admin/demo-requests';
import { index as sectionsIndex } from '@/routes/admin/sections';
import { edit as siteSettingsEdit } from '@/routes/admin/site-settings';
import { index as visitorsIndex } from '@/routes/admin/visitors';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Sections',
        href: sectionsIndex(),
        icon: Rows3,
    },
    {
        title: 'Demo Requests',
        href: demoRequestsIndex(),
        icon: MessageSquareText,
    },
    {
        title: 'Visitors',
        href: visitorsIndex(),
        icon: Globe,
    },
    {
        title: 'Site Settings',
        href: siteSettingsEdit(),
        icon: Settings,
    },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={adminDashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
