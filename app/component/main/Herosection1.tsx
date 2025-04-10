import Image from "next/image";
import Link from "next/link";
export default function Herosection1() {
  return (
    <div className="bg-black text-white w-full px-4 sm:px-6 md:px-8 lg:px-[105px] py-6 sm:py-8 md:py-[60px] lg:py-[80px]">
      {/* Heading */}
      <div className="text-center mb-[40px] sm:mb-[50px] md:mb-[60px]">
        <h2 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[45px] font-[700] leading-tight">
          Why Choose Spot Tracker?
        </h2>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-[400] mt-2 sm:mt-3 md:mt-4 tracking-tight">
          Choose Spot Tracker for streamlined inventory management, automated workflows,
          <br className="hidden lg:block" />
          and actionable insights. Boost efficiency, reduce costs, and drive business growth.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row md:flex-row justify-center gap-6 sm:gap-8 md:gap-10">
        {/* Card 1 */}
        <div className="w-full sm:w-[280px] md:w-[320px] lg:w-[360px] h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px] bg-[#055FA8] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] text-white p-6 sm:p-8 md:p-11 text-center">
          <Link href="#">
            <Image
              src="/card1.png"
              alt="Automation"
              width={50}
              height={50}
              className="mx-auto mb-3 sm:mb-4"
            />
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold mb-2">Automated Inventory Orders</h3>
            <p className="text-[12px] sm:text-[13px] md:text-[14px] tracking-tight">No need for manual order bookers.</p>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="w-full sm:w-[280px] md:w-[320px] lg:w-[360px] h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px] bg-[#055FA8] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] text-white p-6 sm:p-8 md:p-11 text-center">
          <Link href="#">
            <Image
              src="/card2.png"
              alt="Insights"
              width={50}
              height={50}
              className="mx-auto mb-3 sm:mb-4"
            />
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold mb-2">Seamless Approval & Invoicing</h3>
            <p className="text-[12px] sm:text-[13px] md:text-[14px] tracking-tight">Back office manages everything in real time.</p>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="w-full sm:w-[280px] md:w-[320px] lg:w-[360px] h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px] bg-[#055FA8] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] text-white p-6 sm:p-8 md:p-11 text-center">
          <Link href="#">
            <Image
              src="/card3.png"
              alt="Cost Efficiency"
              width={50}
              height={50}
              className="mx-auto mb-3 sm:mb-4"
            />
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold mb-2">Faster Order Processing</h3>
            <p className="text-[12px] sm:text-[13px] md:text-[14px] tracking-tight">Warehouse receives, packs, and delivers.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
