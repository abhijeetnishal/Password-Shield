import { Navigate } from 'react-router-dom';
import { Cookies } from "react-cookie";

const ProtectedRoute = ({children}) => {
        const cookies = new Cookies();

        const cookieValue = cookies.get('myCookie');

        return cookieValue ? children : <Navigate to = '/login' />
}

export default ProtectedRoute