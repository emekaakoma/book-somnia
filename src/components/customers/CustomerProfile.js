import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllSymptoms, getCurrentCustomer, updateCustomerProfile } from "../APIManager"

export const CreateProfile = () => {
    const [customers, setCustomers] = useState({
        symptoms: 0,
        preference: ""
    })
    const [symptoms, setSymptoms] = useState([])


    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            getCurrentCustomer(bookUserObject)
                .then((data) => {
                    const currentCustomer = data[0]
                    setCustomers(currentCustomer)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllSymptoms()
                .then((symptomsArray) => {
                    setSymptoms(symptomsArray)
                })
        },
        []
    )
    // console.log(customers)

    const handleSubmit = (event) => {
        event.preventDefault()

        const customerToSendToAPI = {
            userId: bookUserObject.id,
            symptoms: parseInt(customers.symptoms), 
            preference: customers.preference
        }

        updateCustomerProfile(customerToSendToAPI)
        .then(() => {
            navigate("/")
        })

    }  

    return (
        <form className="hiringForm">
            <h2 className="profileTitle">BookSomnia Customer Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Customer Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={customers.name}
                        value={customers.name}
                    />
                    {customers.name}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Customer Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Email address"
                        value={customers.email}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Symptoms:</label>
                    <select
                        value={customers.symptoms}
                        onChange={
                            (evt) => {
                                const copy = { ...customers }
                                copy.symptoms = evt.target.value
                                setCustomers(copy)
                            }
                        }
                    > <option value="">Select A Symptom</option>
                        {
                            symptoms.map((symptom) => (
                                <option key={symptom.id} value={symptom.id}>
                                    {symptom.type}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Would you want a male or female voice?:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter Preference"
                        value={customers.preference}
                        onChange={
                            (evt) => {
                                const copy = { ...customers }
                                copy.preference = evt.target.value
                                setCustomers(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSubmit(clickEvent)}
                className="btn btn-primary">
                Submit Form
            </button>
        </form>
    )
}