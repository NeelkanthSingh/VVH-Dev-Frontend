import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import Router from "./routing/Router.jsx";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
<RecoilRoot>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </GoogleOAuthProvider>
</RecoilRoot>
);
