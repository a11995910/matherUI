import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import { DashboardExample } from './pages/DashboardExample'
import { FormExample } from './pages/FormExample'
import DocsPage from './pages/DocsPage'
import { Button } from './components/ui/button'
import { Home, LayoutDashboard, FileText, Book } from 'lucide-react'
import { ThemeProvider } from './contexts/ThemeContext'

function Navigation() {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex gap-4 bg-background border-2 border-border shadow-retro p-2">
                <Link to="/">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Home className="h-4 w-4" />
                        首页
                    </Button>
                </Link>
                <Link to="/docs">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Book className="h-4 w-4" />
                        文档
                    </Button>
                </Link>
                <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Button>
                </Link>
                <Link to="/form">
                    <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        表单
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export function Router() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/docs" element={<DocsPage />} />
                    <Route path="/dashboard" element={<DashboardExample />} />
                    <Route path="/form" element={<FormExample />} />
                </Routes>
                <Navigation />
            </BrowserRouter>
        </ThemeProvider>
    )
}
