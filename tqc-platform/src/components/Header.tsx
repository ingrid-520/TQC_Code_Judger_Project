"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 bg-transparent">
              <Image src={logo} alt="TQC Logo" width={32} height={32} unoptimized className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform" />
            </div>
            <span className="font-semibold text-foreground text-sm tracking-tight">
              TQC Python 練習系統
            </span>
          </Link>

          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="hidden sm:inline px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium text-xs">
              Beta
            </span>
            <span className="hidden md:inline ml-2">90 題全覆蓋</span>
          </nav>
        </div>
      </div>
    </header>
  );
}
