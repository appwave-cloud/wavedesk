"use client";

import {
    Bell,
    Home,
    Settings,
    Ticket,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { UserFooter } from "./user-footer";

const navMain = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Tickets",
        url: "/dashboard/tickets",
        icon: Ticket,
    },
    {
        title: "Customers",
        url: "/dashboard/customers",
        icon: Users,
    },
    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: TrendingUp,
    },
    {
        title: "Notifications",
        url: "#",
        icon: Bell,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>

                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Command Search */}
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <Link href={item.url}>
                                        <SidebarMenuButton
                                            className="relative cursor-pointer"
                                            isActive={pathname === item.url}
                                            tooltip={item.title}
                                        >
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                            {item.title === "Tickets" && (
                                                <div className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary font-medium text-sidebar-primary-foreground text-xs group-data-[collapsible=icon]:hidden">
                                                    {1}
                                                </div>
                                            )}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link href="/dashboard/tickets/create">
                                    <SidebarMenuButton
                                        className="cursor-pointer text-sidebar-foreground/70 hover:text-sidebar-foreground"
                                        tooltip="New Ticket"
                                    >
                                        <Zap className="size-4" />
                                        <span>New Ticket</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <UserFooter />

            <SidebarRail />
        </Sidebar>
    );
}
