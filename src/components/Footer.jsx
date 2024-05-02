import { useRecoilValue } from "recoil";
import { authAtom } from "../store/atoms/authAtom";
import { sidebarAtom } from "../store/atoms/sidebarAtom";

export default function Footer() {
  const auth = useRecoilValue(authAtom);
  const isSidebarOpen = useRecoilValue(sidebarAtom);

  const footerClasses = `border-2 border-gray-200 rounded-base text-sm md:text-base font-medium ${
    auth?.accessToken ? (isSidebarOpen ? "ml-56 mr-4" : "ml-28 mr-4") : "mx-4"
  }`;

  return (
    <footer className={footerClasses}>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <img src="logo.png" width="40" height="40" alt="" />
          <p>Copyright © 2024<br />All right reserved by VersionVaultHub</p>
        </aside>
        <nav>
          <h6 className="footer-title">Company</h6> 
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Legal</h6> 
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </nav>
      </footer>
    </footer>
  );
}
