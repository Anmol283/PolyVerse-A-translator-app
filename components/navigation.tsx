"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Globe, History } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
        <Link href="/public/translator.png" className="flex items-center gap-3 font-bold text-2xl text-white">
          <img 
            src="/translator.png" 
            alt="Polyverse" 
            className="w-10 h-10 object-contain" 
          />
          <span className="poly-text">Polyverse</span>
        </Link>

          {/* Desktop Navigation - Show user name and View History when logged in */}
          <div className="hidden md:flex items-center gap-6">
            {session ? (
              <>
                <div className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5 text-blue-400" />
                  <span className="text-lg font-medium">{session.user?.name}</span>
                </div>
                {/* <Link
                  href="/profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-lg font-medium"
                >
                  <History className="h-5 w-5" />
                  View History
                </Link> */}
              </>
            ) : null}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-gray-800">
                    <User className="h-5 w-5" />
                    Options
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 text-white">
                      <History className="h-4 w-4" />
                      View History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-400">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild className="text-white hover:bg-gray-800">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="poly-button text-white font-semibold px-6">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-800">
            <div className="flex flex-col gap-6">
              {session ? (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <User className="h-5 w-5 text-blue-400" />
                    <span className="text-lg font-medium">{session.user?.name}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <History className="h-5 w-5" />
                    View History
                  </Link>
                </>
              ) : null}

              <div className="pt-6 border-t border-gray-800">
                {session ? (
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="w-full justify-start border-gray-700 text-white"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button variant="outline" asChild className="w-full border-gray-700 text-white">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild className="w-full poly-button text-white font-semibold">
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
