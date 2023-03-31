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
        {
            customers.map((customer) => {
                return <div>Name: {customer?.user?.name}</div>
            })
        }
    </>
}