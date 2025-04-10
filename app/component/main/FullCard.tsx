// MY CODE

import Image from "next/image";

export default function FullCard() {
    return (
        <div className="mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-8 lg:px-[105px]">
            {/* Header Section */}
            <div className="text-center">
                <h2 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[64px] font-[700]">
                    Who Can Benefit?
                </h2>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] mt-2">
                    Built for Large-Scale Industries
                </p>
            </div>

            {/* Card Section */}
            <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-8 mt-8">
                {/* Card 1 */}
                <div className="bg-white w-full md:w-[30%] shadow-md rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] p-6 sm:p-8">
                    <Image
                        src="/benefitlogo1.png"
                        alt="Manufacturers & Distributors"
                        width={120}
                        height={120}
                        className="mx-auto mb-6"
                    />
                    <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-[600] text-center mb-4">
                        Manufacturers & Distributors
                    </h3>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] text-center leading-snug mb-6">
                        Simplify production planning and scheduling with our intuitive platform.
                    </p>
                    <div className="flex justify-around items-center">
                        <Image src="/logo1.1.png" alt="Philips" width={50} height={50} />
                        <Image src="/logo1.2.png" alt="Samsung" width={50} height={50} />
                        <Image src="/logo1.3.png" alt="Sony" width={50} height={50} />
                        <Image src="/logo1.4.png" alt="Dell" width={50} height={50} />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white w-full md:w-[30%] shadow-md rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] p-6 sm:p-8">
                    <Image
                        src="/benefitlogo2.png"
                        alt="FMCG Brands"
                        width={120}
                        height={120}
                        className="mx-auto mb-6"
                    />
                    <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-[600] text-center mb-4">
                        FMCG Brands
                    </h3>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] text-center leading-snug mb-6">
                        Maximize shelf life and minimize waste with our inventory management solutions.
                    </p>
                    <div className="flex justify-around items-center">
                        <Image src="/logo2.1.png" alt="Unilever" width={50} height={50} />
                        <Image src="/logo2.2.png" alt="Nestlé" width={50} height={50} />
                        <Image src="/logo2.3.png" alt="Coca-Cola" width={50} height={50} />
                        <Image src="/logo2.4.png" alt="Pepsi" width={50} height={50} />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white w-full md:w-[30%] shadow-md rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] p-6 sm:p-8">
                    <Image
                        src="/benefitlogo3.png"
                        alt="Retail Chains & Stores"
                        width={120}
                        height={120}
                        className="mx-auto mb-6"
                    />
                    <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-[600] text-center mb-4">
                        Retail Chains & Stores
                    </h3>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] text-center leading-snug mb-6">
                        Optimize store operations and reduce labor costs with our automated inventory management.
                    </p>
                    <div className="flex justify-around items-center">
                        <Image src="/logo3.1.png" alt="Walmart" width={50} height={50} />
                        <Image src="/logo3.2.png" alt="Costco" width={50} height={50} />
                        <Image src="/logo3.3.png" alt="IKEA" width={50} height={50} />
                        <Image src="/logo3.4.png" alt="Target" width={50} height={50} />
                    </div>
                </div>
            </div>

            {/* Mobile Screens Section */}
            <div className="flex justify-center gap-8 mt-10">
                <Image
                    src="/mob1.png"
                    alt="Mobile Screen 1"
                    width={261}
                    height={550}
                    className="w-[180px] sm:w-[200px] md:w-[240px] object-cover"
                />
                <Image
                    src="/mob2.png"
                    alt="Mobile Screen 2"
                    width={261}
                    height={550}
                    className="w-[180px] sm:w-[200px] md:w-[240px] object-cover"
                />
            </div>
        </div>
    );
}