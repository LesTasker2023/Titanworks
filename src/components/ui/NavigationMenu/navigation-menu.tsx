import { Menu, X } from 'lucide-react'
import React from 'react'
import {
    NavigationMenu as NavigationMenuBase,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from '../navigation-menu'

interface NavigationMenuProps {
  mobile?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
}

const NavigationMenu = ({ mobile, loading, children, className, ...props }: NavigationMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full" />
        <span className="ml-2 text-sm text-muted-foreground">Loading menu...</span>
      </div>
    )
  }

  if (mobile) {
    return (
      <div className="relative">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation (hidden on mobile) */}
        <div className="hidden md:block">
          <NavigationMenuBase className={className} {...props}>
            {children}
          </NavigationMenuBase>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="navigation-menu__mobile-overlay fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-lg z-50 md:hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <NavigationMenuBase className="w-full">
                  {children}
                </NavigationMenuBase>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <NavigationMenuBase className={className} {...props}>
      {children}
    </NavigationMenuBase>
  )
}

// Add compound component pattern
NavigationMenu.List = NavigationMenuList
NavigationMenu.Item = NavigationMenuItem
NavigationMenu.Trigger = NavigationMenuTrigger
NavigationMenu.Content = NavigationMenuContent
NavigationMenu.Link = NavigationMenuLink
NavigationMenu.Indicator = NavigationMenuIndicator
NavigationMenu.Viewport = NavigationMenuViewport

export default NavigationMenu
export {
    NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport
}

