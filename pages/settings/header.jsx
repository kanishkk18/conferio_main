import React, { useEffect, useState, useContext } from "react";
import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Input } from "@/components/ui/input";
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Settingheader = () => {
 
  return (
    <div>    
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b dark:bg-[#141414] px-4 md:px-6">
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/" 
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">conferio</span>
      </Link>

      <Link
        href="/maindashboard"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>

      <Link
        href="/Meetings/page"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
       Meetings
      </Link>

      <Link
        href="/bookings/page"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Bookings
      </Link>

      <Link
        href="/board/index"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Scrumboard
      </Link>

      <Link
        href="/settings/page"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Settings
      </Link>
    </nav>
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
        href="/" 
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">conferio</span>
      </Link>

      <Link
        href="/maindashboard"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>

      <Link
        href="/Meetings/page"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
       Meetings
      </Link>

      <Link
        href="/bookings/page"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Bookings
      </Link>

      <Link
        href="/board/index"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Scrumboard
      </Link>

      <Link
        href="/settings/page"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Settings
      </Link>
      </nav>
      </SheetContent>
    </Sheet>
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <img src="" alt="" className="h-8 w-8 rounded-full" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
   <Link href='/setting' ><DropdownMenuItem>Setting</DropdownMenuItem></Link>
   <Link href='/support' ><DropdownMenuItem>Support</DropdownMenuItem></Link> 
    <DropdownMenuItem className='text-red-600'>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header></div>
  )
}

export default Settingheader;