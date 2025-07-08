import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Hardcoded credentials as per requirements
  const credentials = {
    admin: { password: 'admin123', role: 'admin' },
    vendor: { password: 'vendor123', role: 'vendor' }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const user = credentials[username]
    if (user && user.password === password) {
      onLogin({ username, role: user.role })
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the recruitment platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <p>Admin: admin / admin123</p>
            <p>Vendor: vendor / vendor123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login

