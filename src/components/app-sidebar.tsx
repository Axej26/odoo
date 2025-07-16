"use client"

import * as React from "react"
import {
  ShoppingCart,
  ContactRound,
  UserPlus,
  BanknoteArrowUp,
  Settings,
  Info,
  SearchSlash,
  Building2, // <-- este lo usaremos como reemplazo
  ChartBar
} from "lucide-react"


import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [

    {
  title: "Dashboard",
    url:"#",
    icon: ChartBar,
    },
  
    {
      title: "Productos",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Clientes",
      url: "#",
      icon: ContactRound,
    },
    {
      title: "Usuarios",
      url: "#",
      icon: UserPlus,
    },
    {
      title: "Ventas",
      url: "#",
      icon: BanknoteArrowUp,
    },
   
  ],
 
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: Info,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchSlash,
    },
  ],
 
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
              <a href="#">
                <Building2 className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
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
