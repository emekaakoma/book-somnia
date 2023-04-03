import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerDetails } from "../APIManager"

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            getCustomerDetails(customerId)
                .then((exactCustomer) => {
                    setCustomers(exactCustomer)
                })
        }
    )

    return <>
    <article className="customerDetails">
        {
            customers.map((customer) => {
                return <section className="customersDetail">
                    <header value={customer.id}></header>
                    <div>Name: {customer?.user?.name}</div>
                    <div>Email: {customer?.user?.email}</div>
                    <div>symptoms: {customer.symptoms}</div>
                    <div>preference: {customer.preference}</div>
                    </section>
            })
        }
        </article>
                </>
            }