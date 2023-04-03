import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllSymptoms, getCustomerDetails } from "../APIManager"

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [symptoms, setSymptoms] = useState([])
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            getCustomerDetails(customerId)
                .then((exactCustomer) => {
                    setCustomers(exactCustomer)
                })
        }
    )

    useEffect(
        () => {
            getAllSymptoms()
            .then((symptomArray) => {
                setSymptoms(symptomArray)
            })
        },[]
    )

    return <>
    <article className="customerDetails">
        {
            customers.map((customer) => {
                return <section className="customersDetail">
                    <header value={customer.id}></header>
                    <div>Name: {customer?.user?.name}</div>
                    <div>Email: {customer?.user?.email}</div>
                    <div>Symptom(s): {
                        symptoms.map(
                            (symptom) => {
                                if (symptom.id === customer.symptoms){
                                    return <span>{symptom.type}</span>
                                }
                            }
                        )
                        }</div>
                    <div>Preference: {customer.preference}</div>
                    </section>
            })
        }
        </article>
                </>
            }