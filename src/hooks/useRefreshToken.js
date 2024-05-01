import { useSetRecoilState } from 'recoil';
import { authAtom } from '../store/atoms/authAtom';
import axios from '../api/axios';

const useRefreshToken = () => {
    const setAuth = useSetRecoilState(authAtom);

    const refresh = async () => {
        try{
            const response = await axios.get('auth/refresh/', {
                withCredentials: true
            });
            setAuth({ accessToken: response.data.accessToken });
            return response.data.accessToken;
        }catch(error){
            console.error("Please login again, your session has expired.");
            throw new Error("Please login again, your session has expired.");
        }   
    }

    return refresh;
};

export default useRefreshToken;