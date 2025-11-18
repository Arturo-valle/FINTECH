'use client';

import {
  BarChart2,
  BookCopy,
  Building2,
  Calendar,
  Handshake,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  PenSquare,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images.json';

const userAvatar = placeholderImages.find(p => p.id === 'user-avatar-1');

// This is a placeholder for role-based access.
// In a real app, this would come from an auth context.
const userRole = 'association_admin';

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar
      className="border-r"
      collapsible="icon"
      side="left"
      variant="sidebar"
    >
      <SidebarHeader className="border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
           <Building2 className="h-7 w-7 text-accent" />
           <span className="font-headline text-lg font-bold">Fintech Hub CR</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard')}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Comunidad</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard/members')} tooltip="Miembros">
                <Link href="/dashboard/members">
                  <Users />
                  <span>Miembros</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard/events')} tooltip="Eventos">
                <Link href="/dashboard/events">
                  <Calendar />
                  <span>Eventos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard/matchmaking')} tooltip="Matchmaking">
                <Link href="/dashboard/matchmaking">
                  <Handshake />
                  <span>Matchmaking</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard/resources')} tooltip="Recursos">
                <Link href="/dashboard/resources">
                  <BookCopy />
                  <span>Recursos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Herramientas IA</SidebarGroupLabel>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/regulatory-assistant')} tooltip="Asistente Regulatorio">
                  <Link href="/dashboard/regulatory-assistant">
                    <ShieldCheck />
                    <span>Asistente Regulatorio</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            {userRole === 'association_admin' && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/dashboard/admin/content-assistant')} tooltip="Asistente de Contenido">
                    <Link href="/dashboard/admin/content-assistant">
                      <PenSquare />
                      <span>Asistente de Contenido</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/dashboard/admin/analytics')} tooltip="Analítica">
                    <Link href="/dashboard/admin/analytics">
                      <BarChart2 />
                      <span>Analítica del Ecosistema</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
           </SidebarMenu>
        </SidebarGroup>

        {userRole === 'association_admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/admin/members')} tooltip="Gestionar Miembros">
                    <Link href="/dashboard/admin/members">
                    <Users />
                    <span>Gestionar Miembros</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/admin/events')} tooltip="Gestionar Eventos">
                    <Link href="/dashboard/admin/events">
                    <Calendar />
                    <span>Gestionar Eventos</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ayuda">
              <Link href="#">
                <HelpCircle />
                <span>Ayuda</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ajustes">
              <Link href="#">
                <Settings />
                <span>Ajustes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <div className="group/menu-item relative flex items-center justify-between p-2 rounded-md hover:bg-sidebar-accent">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                    <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm overflow-hidden group-data-[collapsible=icon]:hidden">
                        <span className="font-medium truncate">Jane Doe</span>
                        <span className="text-sidebar-foreground/70 truncate">Admin</span>
                    </div>
                </div>
                <Link href="/login" className="group-data-[collapsible=icon]:hidden">
                    <LogOut className="h-5 w-5 text-sidebar-foreground/70 hover:text-sidebar-foreground" />
                </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
