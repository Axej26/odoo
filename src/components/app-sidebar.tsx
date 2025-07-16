"use client"

import * as React from "react"
import Link from "next/link"
import {
  ShoppingCart,
  ContactRound,
  UserPlus,
  BanknoteArrowUp,
  Settings,
  Info,
  SearchSlash,
  Building2,
  ChartBar,
  type LucideIcon,
} from "lucide-react"

import { NavSecondary, NavItem } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"

interface NavMainProps {
  items: NavItem[]
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: ChartBar },
    { title: "Productos", url: "/dashboard/product", icon: ShoppingCart },
    { title: "Clientes", url: "/dashboard/customers", icon: ContactRound },
    { title: "Usuarios", url: "/dashboard/user", icon: UserPlus },
    { title: "Ventas", url: "/dashboard/sale", icon: BanknoteArrowUp },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: Info },
    { title: "Search", url: "#", icon: SearchSlash },
  ],
}

function NavMain({ items }: NavMainProps) {
  return (
    <nav className="space-y-1">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.url}
            className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-muted transition"
          >
            <Icon className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <span className="flex items-center gap-2">
                  <Building2 className="!size-5" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
