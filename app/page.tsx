import Navbar from "./component/Navbar";
import Herosection from "./component/Herosection";
import DualCard2 from "./component/main/DualCard2";
import FullCard from "./component/main/FullCard";
import Testimonials from "./component/main/Testimonials";
import Inventory from "./component/main/Inventory";
import Faq from "./component/main/FAQ";
import Footer from "./component/footer/Footer";
import Contactwp from "./component/main/Contactwp";
export default function Home() {
  return (
    <>
    <Contactwp/>
    <Navbar/>
    <Herosection/>
  
    <DualCard2/>
    <FullCard/>
    <Testimonials/>
    <Inventory/>
    <Faq/>
    <Footer/>
    </>
  ); 
}

