import { ModeToggle } from "@/components/baseLayout/modeToggle";
import Link from "next/link";
import { DollarSign } from 'lucide-react';
import { CircleUser, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function NavBar() {
  return (
    <div className="border-b ">
      <header className="sticky top-0 flex h-16  items-center gap-4 bg-background px-4 md:px-6">
        <nav className=" hidden flex-col mr-20 gap-8 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <DollarSign className="h-6 w-6"  />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            HomePage
          </Link>
          <Link
            href="/person"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Pessoas
          </Link>
          <Link
            href="/corporation"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Empresas
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Sobre
          </Link>
          <ModeToggle />
        </nav>
        <Sheet >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden "
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <DollarSign className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/person"
                className="text-muted-foreground hover:text-foreground"
              >
                Pessoas
              </Link>
              <Link
                href="/corporation"
                className="text-muted-foreground hover:text-foreground"
              >
                Empresas
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground"
              >
                Sobre
              </Link>
              <ModeToggle />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
