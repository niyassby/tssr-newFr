
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link, NavLink, useLocation } from "react-router-dom";

export function NavMain({ items }) {
  const location = useLocation();
  return (
    (<SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem className={'NavLinkAdmin'}>
              <SidebarMenuButton className={'rounded-lg px-3'} asChild tooltip={item.title}>
                <NavLink end={item.url === ''} to={item.url}>
                  <item.icon  />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger className='hover:bg-transparent cursor-pointer  right-3' asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight className="" />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const activeLink = subItem.url === location.pathname
                        return <SidebarMenuSubItem  key={subItem.title}>
                          <SidebarMenuSubButton isActive={activeLink} asChild>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
