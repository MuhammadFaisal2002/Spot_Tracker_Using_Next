import Navbar from "./component/Navbar";
import Herosection from "./component/Herosection";
import DualCard2 from "./component/main/DualCard2";
import FullCard from "./component/main/FullCard";
import Testimonials from "./component/main/Testimonials";
import Inventory from "./component/main/Inventory";
import Faq from "./component/main/FAQ";
import Footer from "./component/footer/Footer";
import ChatBot from "./component/ChatBot/ChatBot";
export default function Home() {
  return (
    <>
    <Navbar/>
    <ChatBot/>
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

