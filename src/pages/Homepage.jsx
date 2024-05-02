import { HeroSection } from '../components/HeroSection';
import Header from "../components/Header";
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { sidebarAtom } from '../store/atoms/sidebarAtom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/atoms/authAtom';

const Homepage = () => {
  const isSidebarOpen = useRecoilValue(sidebarAtom); 
  const auth = useRecoilValue(authAtom);
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      {auth?.accessToken && <Sidebar /> }
      <div className={`flex-1 flex flex-col ${!auth?.accessToken ? "ml-12" : isSidebarOpen? "ml-64" : "ml-36"}`}>
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;