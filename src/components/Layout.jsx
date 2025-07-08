import { Button } from '@/components/ui/button.jsx'
import { LogOut } from 'lucide-react'

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">
            Recruitment Platform
          </h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.username} ({user.role})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}

export default Layout

