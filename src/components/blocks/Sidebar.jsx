"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
  IconTrophy,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Icon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const BalanceCard = ({ open, balance }) => {
  return (
    <motion.div 
      layout
      className={cn(
        "mb-4 relative overflow-hidden mx-2 rounded-2xl border backdrop-blur-xl transition-colors duration-500",
        open ? "bg-white/5 border-white/10" : "mx-0 bg-transparent border-transparent"
      )}
      animate={{
        padding: open ? "16px" : "16px 0px",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {open ? (
        <motion.div 
          key="open"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#39FF14]/60 whitespace-nowrap">Wallet Balance</span>
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[#39FF14] text-xs font-black italic tracking-tighter opacity-80">$</span>
            <span className="text-2xl font-black italic tracking-tighter text-white">
              {balance?.toLocaleString()}
            </span>
          </div>
          <div className="text-[10px] font-bold text-white/40 tracking-tight">MemeBucks (MB)</div>
        </motion.div>
      ) : (
        <motion.div 
          key="collapsed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export function SidebarDemo({ children, activePage, setActivePage }) {
  const { user } = useAuth();
  const links = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      id: "profile",
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      href: "#",
      icon: (
        <IconTrophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      id: "logout",
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",

        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  onClick={() => setActivePage(link.id)}
                  className={activePage === link.id ? "bg-neutral-200 dark:bg-neutral-700 rounded-lg px-1" : "px-2"}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <BalanceCard open={open} balance={user?.balance} />
            <SidebarLink
              link={{
                label: user?.username || "Guest",
                href: "#",
                icon: (
                  <img
                    src={user?.avatar || "https://assets.aceternity.com/manu.png"}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 overflow-y-auto bg-white dark:bg-neutral-900 rounded-tl-2xl border-l border-neutral-200 dark:border-neutral-700">
        {children}
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white">
        BetnYahoo
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};