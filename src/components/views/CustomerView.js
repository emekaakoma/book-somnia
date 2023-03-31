import { Outlet, Route, Routes } from "react-router-dom"
import { BookList } from "../books/BookList"
import { CreateProfile } from "../customers/CustomerProfile"
import { EditSession } from "../customers/EditSession"
import { BookSession } from "../sessions/BookSession"
import { SessionList } from "../sessions/SessionList"
import { MyProfile, myProfile } from "../customers/Profile"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import bookster from "../../images/bookster.svg"
import "./Views.css"

export const CustomerViews = () => {
	return <>
		<Routes>

			<Route path="/" element={
				<>
					<h1 className="bookHeader"><img className="booksomniaView" src={bookster} height="100" width={"100"} /></h1>
					<div className="subtitle">Your solution to sleepless nights</div>

					<Outlet />
				</>
			}>

			<Route path="books" element={<BookList />} />
			<Route path="profile" element={<CreateProfile />} />
			<Route path="employees/:employeeId" element={<EmployeeDetails />} />
			<Route path="myProfile" element={<MyProfile />} />
			<Route path="sessions" element={<SessionList />} />
			<Route path="booking" element={<BookSession />} />
			<Route path="employees" element={<EmployeeList />} />
			<Route path="sessions/:sessionId/edit" element={<EditSession />} />


			</Route>
		</Routes>
	</>
}