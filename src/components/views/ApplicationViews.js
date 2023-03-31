import { CustomerViews } from "./CustomerView"
import { EmployeeViews } from "./EmployeeView"

export const ApplicationViews = () => {

    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)

    if (bookUserObject.staff) {
        return <EmployeeViews />
    } else{
        return <CustomerViews />

    }
}

