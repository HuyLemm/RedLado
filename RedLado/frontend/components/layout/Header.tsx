"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun, Search, Globe, User, Package, ShoppingBag, Settings, LogOut, FileText, Calendar, Users, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

/**
 * REDLADO HEADER - Sticky Navigation
 * 
 * Brand: RedLado (Red-White Light / Red-Black Dark)
 * Features:
 * - Logo left
 * - Center navigation (Home, Marketplace, Community, Deals, Sells)
 * - Right: Search, Language/Currency selector + Sign in with Steam CTA
 * - Active state: 2-3px red underline (no pill background)
 * - Compact on scroll (sticky behavior)
 * - Dark mode: bg #0B0F0F + divider 1px #111827
 * - Light mode: bg white with subtle backdrop blur
 */

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'items', label: 'Items', path: '/marketplace' },
    { id: 'community', label: 'Community', path: '/community' },
    { id: 'deals', label: 'Deals', path: '/deals' },
    { id: 'sells', label: 'Sells', path: '/sells' }
  ];

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/marketplace')) return 'items';
    if (pathname.startsWith('/community')) return 'community';
    if (pathname.startsWith('/deals')) return 'deals';
    if (pathname.startsWith('/sells')) return 'sells';
    return '';
  };

  const activeTab = getActiveTab();

  return (
    <header className="w-full border-b bg-white/80 dark:bg-[#0B0F0F]/95 backdrop-blur-lg sticky top-0 z-50 border-stroke-muted dark:border-[#111827] transition-colors duration-200">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-lg px-2 py-1 transition-all"
            >
              {/* Logo Icon/Badge */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E11D48] to-[#BE123C] dark:from-[#F43F5E] dark:to-[#E11D48] flex items-center justify-center font-bold text-white group-hover:scale-105 transition-transform">
                R
              </div>
              <span className="text-xl font-bold text-[#E11D48] dark:text-[#F43F5E] group-hover:text-[#BE123C] dark:group-hover:text-[#E11D48] transition-colors">
                RedLado
              </span>
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex flex-1 justify-center mx-12">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
                      ${
                        isActive
                          ? 'text-[#E11D48] dark:text-[#F43F5E]'
                          : 'text-text-secondary dark:text-[#A7B0BF] hover:text-text-primary dark:hover:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-white/[0.04]'
                      }`}
                  >
                    {item.label}
                    {/* Active underline indicator - 2-3px underline in red */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#E11D48] dark:bg-[#F43F5E] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Global Search - Hidden on small screens */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7] pointer-events-none" />
              <Input
                placeholder="Search items..."
                className="pl-10 pr-4 h-10 w-48 xl:w-64
                  bg-bg-elev-2 dark:bg-[#111316]
                  border-stroke-muted dark:border-[#1F2937]
                  text-text-primary dark:text-[#E5E7EB]
                  placeholder:text-text-muted dark:placeholder:text-[#8B93A7]
                  focus:border-[#E11D48] dark:focus:border-[#F43F5E]
                  focus:ring-2 focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20
                  transition-all duration-200"
              />
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10
                    text-text-secondary dark:text-[#A7B0BF]
                    hover:text-text-primary dark:hover:text-[#E5E7EB]
                    hover:bg-bg-subtle dark:hover:bg-white/[0.04]
                    focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171]
                    transition-all duration-200"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] shadow-lg">
                <DropdownMenuItem className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] focus:bg-bg-subtle">
                  <span className="mr-2">🇬🇧</span> English
                </DropdownMenuItem>
                <DropdownMenuItem className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] focus:bg-bg-subtle">
                  <span className="mr-2">🇻🇳</span> Tiếng Việt
                </DropdownMenuItem>
                <DropdownMenuItem className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] focus:bg-bg-subtle">
                  <span className="mr-2">🇨🇳</span> 中文
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10
                    text-text-secondary dark:text-[#A7B0BF]
                    hover:text-text-primary dark:hover:text-[#E5E7EB]
                    hover:bg-bg-subtle dark:hover:bg-white/[0.04]
                    focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171]
                    transition-all duration-200"
                >
                  <DollarSign className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] shadow-lg">
                <DropdownMenuItem className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] focus:bg-bg-subtle">USD $</DropdownMenuItem>
                <DropdownMenuItem className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] focus:bg-bg-subtle">EUR €</DropdownMenuItem>
                <DropdownMenuItem className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] focus:bg-bg-subtle">GBP £</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10
                text-text-secondary dark:text-[#A7B0BF]
                hover:text-text-primary dark:hover:text-[#E5E7EB]
                hover:bg-bg-subtle dark:hover:bg-white/[0.04]
                active:text-[#E2233B] dark:active:text-[#E2233B]
                focus-visible:ring-[#E2233B] dark:focus-visible:ring-[#E2233B]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
                transition-all duration-200 rounded-xl"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            {/* Conditional: Avatar Dropdown (logged in) OR Sign in Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-[#E2233B]">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.username || "User"} />
                      <AvatarFallback className="bg-[#E2233B] text-white font-bold">
                        {user?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-[#111318] border border-stroke-muted dark:border-[#2A3038] rounded-xl p-2 shadow-lg">
                  <DropdownMenuItem 
                    onClick={() => router.push("/profile")}
                    className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-bg-subtle rounded-lg cursor-pointer py-2"
                  >
                    <User className="h-4 w-4 mr-2 text-text-secondary dark:text-[#A7B0BF]" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => router.push("/profile?tab=inventory")}
                    className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-bg-subtle rounded-lg cursor-pointer py-2"
                  >
                    <Package className="h-4 w-4 mr-2 text-text-secondary dark:text-[#A7B0BF]" />
                    Inventory
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => router.push("/profile?tab=listings")}
                    className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-bg-subtle rounded-lg cursor-pointer py-2"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2 text-text-secondary dark:text-[#A7B0BF]" />
                    Listings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-stroke-muted dark:bg-[#2A3038]" />
                  <DropdownMenuItem 
                    onClick={() => router.push("/find-trader")}
                    className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-bg-subtle rounded-lg cursor-pointer py-2"
                  >
                    <Users className="h-4 w-4 mr-2 text-text-secondary dark:text-[#A7B0BF]" />
                    Find Traders
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => router.push("/trade-events")}
                    className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-bg-subtle rounded-lg cursor-pointer py-2"
                  >
                    <Calendar className="h-4 w-4 mr-2 text-text-secondary dark:text-[#A7B0BF]" />
                    Trade Events
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => router.push("/create-post")}
                    className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-bg-subtle rounded-lg cursor-pointer py-2"
                  >
                    <FileText className="h-4 w-4 mr-2 text-text-secondary dark:text-[#A7B0BF]" />
                    Create Post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-stroke-muted dark:bg-[#2A3038]" />
                  <DropdownMenuItem 
                    onClick={() => router.push("/profile/edit")}
                    className="text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-bg-subtle rounded-lg cursor-pointer py-2"
                  >
                    <Settings className="h-4 w-4 mr-2 text-text-secondary dark:text-[#A7B0BF]" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-stroke-muted dark:bg-[#2A3038]" />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-[#EF4444] dark:text-[#EF4444] hover:bg-[#FFF1F2] dark:hover:bg-[#151821] dark:focus:bg-[#151821] focus:bg-[#FFF1F2] rounded-lg cursor-pointer py-2"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="h-10 px-4 font-medium rounded-xl
                  bg-[#E2233B] dark:bg-[#E2233B]
                  text-white
                  hover:bg-[#BE1E31] dark:hover:bg-[#BE1E31]
                  active:bg-[#9F1A29] dark:active:bg-[#9F1A29]
                  disabled:bg-[#E2233B]/50 dark:disabled:bg-[#E2233B]/50
                  disabled:text-white/60
                  focus-visible:ring-[#E2233B] dark:focus-visible:ring-[#E2233B]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
                  shadow-sm hover:shadow-md
                  transition-all duration-200"
                onClick={() => router.push("/login")}
              >
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sign in with Steam</span>
                <span className="sm:hidden">Sign in</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Bottom drawer style */}
      <div className="md:hidden border-t border-stroke-muted dark:border-[#1F2937] px-6 py-3 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all
                  ${
                    isActive
                      ? 'text-[#E11D48] dark:text-[#F43F5E]'
                      : 'text-text-secondary dark:text-[#A7B0BF]'
                  }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#E11D48] dark:bg-[#F43F5E] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
