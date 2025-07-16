"use client";

import { ChevronDown, Keyboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function UserFooter() {
    const { data: session } = authClient.useSession();

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                size="lg"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        alt={session?.user?.name || ""}
                                        src={session?.user?.image || "/placeholder.svg"}
                                    />
                                    <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        {session?.user?.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {session?.user?.name}
                                    </span>
                                    <span className="truncate text-sidebar-foreground/70 text-xs">
                                        {session?.user?.email}
                                    </span>
                                </div>
                                <ChevronDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side="bottom"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            alt={session?.user?.name || ""}
                                            src={session?.user?.image || "/placeholder.svg"}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {session?.user?.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {session?.user?.name}
                                        </span>
                                        <span className="truncate text-muted-foreground text-xs">
                                            {session?.user?.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/dashboard/profile">
                                    <div className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile Settings
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/dashboard/preferences">
                                    <div className="flex items-center">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Preferences
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/dashboard/keyboard-shortcuts">
                                    <div className="flex items-center">
                                        <Keyboard className="mr-2 h-4 w-4" />
                                        Keyboard Shortcuts
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => authClient.signOut()}>
                                <div className="flex items-center">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}
