import React from 'react'
import { authAtom } from '../store/atoms/authAtom'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from "../api/axios"

const LogoutComponent = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authAtom);

    useEffect(() => {
        const logout = async() => {
            try {
                const response = await axios.get('/auth/logout', {
                    withCredentials: true
                });
                if(response.status === 204){
                    console.log("Logged out successfully");
                }else{
                    throw new Error("Error while logging out");
                }
            } catch (error) {
                console.error(error);
            }
            setAuth({});
            navigate("/", { replace: true });
        }
        logout();
    }, []);

  return (
    <></>
  )
}

export default LogoutComponent