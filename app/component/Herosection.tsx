import Image from "next/image";
import Herosection1 from "./main/Herosection1";
export default function Herosection() {
  return (
    <>
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 lg:px-[105px] pt-4 sm:pt-6 md:pt-8 lg:pt-[100px]">
        {/* Left Section */}
        <div className="lg:col-span-2 text-[28px] sm:text-[32px] md:text-[36px] lg:text-[48px] font-[800]">
          <h1>
            <span className="text-[#055FA8]">Revolutionize </span>
            Your Inventory <br />
            Management with <span className="text-[#055FA8]">Spot Tracker</span>
          </h1>

          <p className="text-[#787878] text-[14px] sm:text-[16px] md:text-[18px] font-[400] mt-[10px] sm:mt-[15px] lg:mt-[20px]">
            The ultimate solution for large-scale industries to automate inventory
            orders, eliminate order bookers, <br className="hidden lg:block" />
            and streamline operations effortlessly.
          </p>

          <button className="bg-[#CF2121] text-[14px] sm:text-[16px] font-[700] tracking-tight text-white h-[40px] sm:h-[45px] md:h-[49px] w-[160px] sm:w-[190px] md:w-[220px] rounded-full mt-[20px] sm:mt-[25px] md:mt-[30px] lg:mt-[40px]">
            Request a Free Trial
          </button>

          <div className="mt-[20px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <Image
              src="/rating.png"
              alt="Customer Rating"
              width={400}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1 relative flex justify-center items-center">
          {/* Main Hero Image */}
          <Image
            src="/hero1.png"
            alt="Dashboard Preview"
            width={1018}
            height={518}
            className="object-contain rounded-[20px] z-10 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%]"
          />

          {/* Floating Hero Cards */}
          <Image
            src="/hero2.png"
            alt="Top Products Sold"
            width={320}
            height={193}
            className="absolute top-[8%] right-[5%] sm:top-[6%] sm:right-[6%] md:top-[8%] md:right-[10%] lg:top-[10%] lg:right-[15%] w-[110px] sm:w-[130px] md:w-[180px] lg:w-[220px] z-20"
          />

          <Image
            src="/hero3.png"
            alt="Order Overview"
            width={320}
            height={193}
            className="absolute bottom-[10%] right-[8%] sm:bottom-[8%] sm:right-[8%] md:bottom-[10%] md:right-[12%] lg:bottom-[12%] lg:right-[20%] w-[110px] sm:w-[140px] md:w-[200px] lg:w-[250px] z-20"
          />
        </div>
      </div>
      <Herosection1 />
    </>
  );
}
