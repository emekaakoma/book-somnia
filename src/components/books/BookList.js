import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteBook, getAllBooks } from "../APIManager"
import "./BookList.css"

export const BookList = () => {
    const [books, setBooks] = useState([])

    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllBooks()
                .then((data) => {
                    setBooks(data)
                })
        },
        []
    )

    const deleteButton = (bookId) => {
        if (bookUserObject.staff) {
            return <button onClick={() => {
            deleteBook(bookId)
            .then(() => {
                navigate("/sessions")
            })
            }} className="book__delete">Delete Book</button>
        } else {
            return ""
        }
    }

    return <>
    <h2 className="book-header">List of Books</h2>
        
        {
            bookUserObject.staff
                ? <button onClick={() => navigate("/bookForm")} className="addBooks">Add Books</button>
                : ""
        }
        <article className="book">
        
            {
                books.map(
                    (book) => {
                        return <section className="books">
                            <header value={book.id}><img src={book.image} alt={book.name} width={"200"} height={"200"} /></header>
                            <div className="book__name">{book.name}</div>
                            <div className="describing"><span className="book__description">Description: </span>{book.description}</div>
                            <footer>
                                {deleteButton(book.id)}
                            </footer>
                        </section>
                    }
                )
            }
        </article>
    </>

}


