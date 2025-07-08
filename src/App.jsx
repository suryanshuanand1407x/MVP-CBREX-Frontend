import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Layout from './components/Layout.jsx'
import Login from './components/Login.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import VendorDashboard from './components/VendorDashboard.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <AppProvider>
      <Router>
        <div className="App">
          {!user ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Layout user={user} onLogout={handleLogout}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    user.role === 'admin' ? (
                      <Navigate to="/admin" replace />
                    ) : (
                      <Navigate to="/vendor" replace />
                    )
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    user.role === 'admin' ? (
                      <AdminDashboard user={user} />
                    ) : (
                      <Navigate to="/vendor" replace />
                    )
                  } 
                />
                <Route 
                  path="/vendor" 
                  element={
                    user.role === 'vendor' ? (
                      <VendorDashboard user={user} />
                    ) : (
                      <Navigate to="/admin" replace />
                    )
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          )}
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
