import { redirect } from "next/navigation";
import { Cookies } from "react-cookie";

const ProtectedRoute = (props : {children: React.ReactNode}) => {
        const cookies = new Cookies();

        const cookieValue = cookies.get('myCookie');

        if (!cookieValue) {
          redirect("/login")
        }
        
        return props.children
}

export default ProtectedRoute