import Image from "next/image";
import Navbar from "./component/Navbar";
import Herosection from "./component/Herosection";
import DualCard1 from "./component/main/DualCard1";
import DualCard2 from "./component/main/DualCard2";
import FullCard from "./component/main/FullCard";
import Testimonials from "./component/main/Testimontials";
import Inventory from "./component/main/Inventory";
import Faq from "./component/main/FAQ";
import Footer from "./component/footer/Footer";
export default function Home() {
  return (
    <>
    <Navbar/>
    <Herosection/>
    {/* <DualCard1/> */}
    <DualCard2/>
    <FullCard/>
    <Testimonials/>
    <Inventory/>
    <Faq/>
    <Footer/>
    </>
  ); 
}

