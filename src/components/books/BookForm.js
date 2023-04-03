import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addBooks, getAllBooks } from "../APIManager"
import "./BookList.css"

export const BookForm = () => {
    const [books, setBooks] = useState({
        name: "",
        description: "",
        image: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            getAllBooks()
            .then((bookArray) => {
                setBooks(bookArray)
            })
        },
        []
    )

    const handleSubmit = (event) => {
        event.preventDefault()

        const booksToSendToAPI = {
            name: books.name,
            description: books.description,
            image: books.image
        }

        addBooks(booksToSendToAPI)
        .then (() => {
            navigate("/books")
        })
    }

    return (
        <form className="bookForm">
            <h2 className="hiringForm__title">Add New Book</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Book Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the name of the book?"
                        value={books.name}
                        onChange={
                            (evt) => {
                                const copy = { ...books }
                                copy.name = evt.target.value
                                setBooks(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Describe the book"
                        value={books.description}
                        onChange={
                            (evt) => {
                                const copy = { ...books }
                                copy.description = evt.target.value
                                setBooks(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bookImage">Image:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter URL Here"
                        value={books.image}
                        onChange={
                            (evt) => {
                                const copy = { ...books }
                                copy.image = evt.target.value
                                setBooks(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSubmit(clickEvent)}
                className="btn btn-primary">
                Add Book
            </button>
        </form>
    )
}