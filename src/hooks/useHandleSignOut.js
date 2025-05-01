import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';

const useHandleSignOut = ()=>{
    const navigate = useNavigate();

    const handleSignOut = ()=>{
        signOut(auth).then(()=>{
            navigate("/");
        }).catch((error)=>{
            navigate("/error");
        });
    };
    return handleSignOut;
}

export default useHandleSignOut;