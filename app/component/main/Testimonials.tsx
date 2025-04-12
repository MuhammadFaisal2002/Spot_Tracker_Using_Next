import Image from "next/image";

export default function Testimonials() {
  return (
    <section id="testi" className="px-6 md:px-[105px] py-20 bg-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-[40px] md:text-[64px] font-bold">Testimonials</h2>
        <p className="text-lg text-gray-600">What Our Clients Say</p>
      </div>

      {/* Cards Row */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Card 1 */}
        <div className="w-full lg:w-[32%] p-8 shadow-lg rounded-lg bg-white">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/user1.png"
              alt="Jane Smith"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Jane Smith</h3>
              <p className="text-sm text-gray-500">
                Organization: Transportation Manager, PepsiCo
              </p>
            </div>
          </div>
          <p className="text-[18px] text-gray-700 leading-relaxed">
            We’ve seen a significant reduction in transportation cost and improved
            delivery times since implementing Spot Tracker. Their route optimization
            algorithms have been a game changer for our business.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-full lg:w-[32%] p-8 shadow-lg rounded-lg bg-white">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/user2.png"
              alt="Sarah John"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Sarah John</h3>
              <p className="text-sm text-gray-500">
                Organization: Logistics Manager, Nestle
              </p>
            </div>
          </div>
          <p className="text-[18px] text-gray-700 leading-relaxed">
            Spot Tracker has revolutionized our inventory management process. We’ve
            reduced stock outs by 30% and improved delivery times by 25%.
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-full lg:w-[32%] p-8 shadow-lg rounded-lg bg-white">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/user3.png"
              alt="Rashid Khan"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Rashid Khan</h3>
              <p className="text-sm text-gray-500">
                Organization: Marketing Manager, Shan Foods
              </p>
            </div>
          </div>
          <p className="text-[18px] text-gray-700 leading-relaxed">
            We were struggling to keep track of our inventory across multiple
            warehouses. Spot Tracker’s real-time tracking and alerts have saved our
            time and reduced errors.
          </p>
        </div>
      </div>
    </section>
  );
}
