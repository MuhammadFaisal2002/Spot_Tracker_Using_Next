import Image from "next/image";

export default function DualCard1() {
    return (
        <div id="services" className="mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-8 lg:px-[105px]">
            {/* Header Section */}
            <div className="text-center">
                <h2 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[64px] font-[700] mb-4 sm:mb-6">
                    How it Works?
                </h2>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
                    Seamless Order Management in 4 Simple Steps
                </p>
            </div>

            {/* Steps Section */}
            <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 mt-8">
                {/* Step 1 */}
                <div className="w-full md:w-[48%] bg-white shadow-sm rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden">
                    <div className="pb-4 sm:pb-6 md:pb-8">
                        <div className="text-[#B0D7F633] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-right pr-4 sm:pr-6 md:pr-8 lg:pr-[12px]">
                            01
                        </div>
                        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                            <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                                Step 1
                            </h3>
                            <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                                Store Orders Inventory
                            </p>
                            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                                With Spot Tracker, effortlessly manage your store’s inventory and streamline your ordering process.
                            </p>
                        </div>
                    </div>
                    <Image
                        src="/step1.png"
                        alt="Step 1"
                        width={600}
                        height={450}
                        className="w-full object-cover rounded-b-[20px] sm:rounded-b-[25px] lg:rounded-b-[30px]"
                    />
                </div>

                {/* Step 2 */}
                <div className="w-full md:w-[48%] bg-white shadow-lg shadow-b-only rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden">
                    <Image
                        src="/step2.png"
                        alt="Step 2"
                        width={600}
                        height={450}
                        className="w-full object-cover rounded-t-[20px] sm:rounded-t-[25px] lg:rounded-t-[30px]"
                    />
                    <div className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
                        <div className="text-[#B0D7F633] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-left pl-4 sm:pl-6 md:pl-8 lg:pl-[12px]">
                            02
                        </div>
                        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                            <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                                Step 2
                            </h3>
                            <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                                Back Office Approves & <br /> Generate Invoices
                            </p>
                            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                                Our platform enables you to approve orders, generate invoices, and manage payments — all in a seamless workflow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Steps 3 and 4 */}
            <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 mt-8">
                {/* Step 3 */}
                <div className="w-full md:w-[48%] bg-white shadow-sm rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden">
                    <div className="pb-4 sm:pb-6 md:pb-8">
                        <div className="text-[#B0D7F633] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-right pr-4 sm:pr-6 md:pr-8 lg:pr-[12px]">
                            03
                        </div>
                        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                            <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                                Step 3
                            </h3>
                            <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                                Warehouse Packs & Delivers
                            </p>
                            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                                Efficiently manage warehouse operations, optimize picking and packing, automate shipping labels, and track deliveries in real-time.
                            </p>
                        </div>
                    </div>
                    <Image
                        src="/step3.png"
                        alt="Step 3"
                        width={600}
                        height={450}
                        className="w-full object-cover rounded-b-[20px] sm:rounded-b-[25px] lg:rounded-b-[30px]"
                    />
                </div>

                {/* Step 4 */}
                <div className="w-full md:w-[48%] bg-white shadow-lg shadow-b-only rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden">
                    <Image
                        src="/step4.png"
                        alt="Step 4"
                        width={600}
                        height={450}
                        className="w-full object-cover rounded-t-[20px] sm:rounded-t-[25px] lg:rounded-t-[30px]"
                    />
                    <div className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
                        <div className="text-[#B0D7F633] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-left pl-4 sm:pl-6 md:pl-8 lg:pl-[12px]">
                            04
                        </div>
                        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                            <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                                Step 4
                            </h3>
                            <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                                Store Receives & Confirms
                            </p>
                            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                                Ensure accurate inventory updates upon delivery so customers can access products quickly and reliably.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
