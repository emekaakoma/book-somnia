import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { BookForm } from "../books/BookForm"
import { BookList } from "../books/BookList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { SessionList } from "../sessions/SessionList"
import bookster from "../../images/bookster.svg"
import "./Views.css"

export const EmployeeViews = () => {
	const navigate = useNavigate()
	return <>
		<Routes>

			<Route path="/" element={
				<>
					<h1 className="bookHeader"><img className="booksomniaView" src={bookster} height="100" width={"100"} onClick={() => {Navigate('/')}} /></h1>

					<Outlet />
				</>
			}>

			<Route path="books" element={<BookList />} />
			<Route path="sessions" element={<SessionList />} />
			<Route path="employees" element={<EmployeeList />} />
			<Route path="customers" element={<CustomerList />} />
			<Route path="employees/:employeeId" element={<EmployeeDetails />} />
			<Route path="customers/:customerId" element={<CustomerDetails />} />
			<Route path="bookForm" element={<BookForm />} />

			</Route>
		</Routes>
	</>
}