import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { BookSomnia } from "./components/BookSomnia"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <BookSomnia />
    </BrowserRouter>
)

