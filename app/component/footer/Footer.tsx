export default function Footer() {
    return (
      <footer className="bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-[105px] border-t border-gray-200 my-12 sm:my-16 lg:my-[100px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          {/* Left side: Logo and description */}
          <div className="max-w-md">
            <img
              src="/logo.png"
              alt="Spot Tracker Logo"
              className="mb-4 h-[56px] w-[324px] mx-auto md:mx-0"
            />
            <p className="text-sm sm:text-[14px] font-normal text-[#8D8D8D]">
              The ultimate solution for large-scale industries to automate inventory orders,
              eliminate order bookers, and streamline operations effortlessly.
            </p>
          </div>
  
          {/* Right side: Navigation */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm sm:text-base md:text-lg font-medium text-black border-b-4 border-[#055FA8] pb-2 rounded-md">
            <a href="#" className="hover:text-blue-700 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-700 transition-colors">Services</a>
            <a href="#" className="hover:text-blue-700 transition-colors">Features</a>
            <a href="#" className="hover:text-blue-700 transition-colors border-blue-700">Testimonials</a>
          </div>
        </div>
      </footer>
    );
  }
  