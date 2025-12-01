import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Container } from "../ui/container"
import { ThemeToggle } from "../ui/theme-toggle"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background">
            <Container className="flex h-20 items-center justify-between">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="h-10 w-10 bg-secondary flex items-center justify-center border-2 border-border shadow-retro">
                        <span className="font-serif font-bold text-xl text-secondary-foreground">M</span>
                    </div>
                    <span className="font-serif font-bold text-2xl tracking-tight">MatherUI</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
                    <Link to="/" className="hover:text-primary transition-colors">首页</Link>
                    <Link to="/docs" className="hover:text-primary transition-colors">文档</Link>
                    <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase hover:underline hidden sm:block">GitHub</a>
                    <Link to="/docs">
                        <Button size="default">Get Started</Button>
                    </Link>
                </div>
            </Container>
        </header>
    )
}
