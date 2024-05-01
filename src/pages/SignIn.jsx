import OverflowWrapperCard from "../components/Wrappers/OverflowWrapperCard";
import { authAtom } from "../store/atoms/authAtom";
import { useRecoilValue } from "recoil";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SignIn = () => {
  const refresh = useRefreshToken();
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    };

    if (!auth?.accessToken) {
      try {
        verifyRefreshToken();
      } catch (error) {
        console.error(error);
      }
    } else{
      navigate(from);
    }

  }, [auth, refresh]);

  const login = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {isLoading ? (
        <div>Loading...</div> 
      ) : (
        <OverflowWrapperCard>
          <div className="text-center px-10 pb-5 pt-10">
            <div className="text-3xl mb-7 text-gray-900">Sign In</div>
            <div className="text-xl mb-9">
              Welcome to <span className="text-green-800">VersionVaultHub</span>
            </div>
            <br />
            <div className="flex justify-center mb-9">
              <a className="cursor-pointer" onClick={login}>
                <img
                  src="google_signin.svg"
                  alt="Sign up with Google"
                  style={{ width: "220px", height: "60px" }}
                />
              </a>
            </div>
            <br />
            <div className="text-xs mb-1">
              <p>
                Click 'Sign In' to agree to VersionVaultHub's{" "}
                <span className="underline">
                  <a href="/">Terms of Service</a>
                </span>
              </p>
              <p>
                and acknowledge that VersionVaultHub's{" "}
                <span className="underline">
                  <a href="/">Privacy Policy</a>
                </span>{" "}
                applies to you.
              </p>
            </div>
          </div>
        </OverflowWrapperCard>
      )}
    </div>
  );
};

export default SignIn;