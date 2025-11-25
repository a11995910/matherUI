import { Container } from "../ui/container"

export function Footer() {
    return (
        <footer className="border-t-2 border-border py-12 bg-muted">
            <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-secondary border-2 border-border flex items-center justify-center">
                        <span className="font-serif font-bold text-lg">M</span>
                    </div>
                    <span className="font-bold">© 2024 MatherUI</span>
                </div>
                <div className="flex gap-6 text-sm font-bold underline">
                    <a href="#">Docs</a>
                    <a href="#">GitHub</a>
                    <a href="#">Twitter</a>
                    <a href="#">License</a>
                </div>
            </Container>
        </footer>
    )
}
