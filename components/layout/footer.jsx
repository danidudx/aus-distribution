import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative">
      <div>
        <img
          src="/assets/Images/Vector.png"
          alt="Vector"
          className="w-full h-full mt-[-5%]"
        />
      </div>
      <footer className="bg-[#0B2F3D] xl:pt-16 md:pt-10 pt-6 text-white xl:pb-8 pb-10">
        <div className="xl:grid xl:grid-cols-3 xl:w-[90%] 2xl:w-[80%] w-[90%] mx-auto xl:gap-26 2xl:gap-32">
          {/* Left Section */}
          <div className="xl:w-[515px]">
            <h2 className="xl:text-[40px] text-4xl font-bold xl:leading-[50px] xl:text-left text-center xl:font-extrabold font-[Tropiline]">
              We Send Non-Annoying <br /> Emails About Secret <br /> Things!
            </h2>
            <p className="xl:mt-2 font-[Montserrat] mt-4 text-lg xl:font-medium xl:text-xl text-center xl:text-left">
              Pop your details here and we'll prove it.
            </p>
            <div className="mt-4 mb-8 flex items-center justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="xl:w-[390px] md:w-[40%] w-[70%] h-10 xl:h-16 bg-gray-800 text-white focus:outline-none xl:border-2 border-[#8F9FA6] rounded-full pl-5"
              />
              <button className="bg-[#FFC914] xl:w-[110px] md:w-[10%] w-[20%] h-10 xl:h-16 text-black xl:ml-8 ml-4 rounded-full hover:scale-105 active:scale-95">
                Sign Up
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-10 xl:flex-row xl:gap-[12%] 2xl:gap-[15%] xl:pl-40 xl:w-[800px] xl:text-left text-center justify-center">
            {/* Services and Contact Section */}
            <div className="flex flex-col gap-6 xl:flex-col font-[Montserrat]">
              <h3 className="font-bold xl:text-xl text-2xl leading-[150%]">
                Services
              </h3>
              <div className="flex flex-col xl:gap-4 gap-2 xl:font-medium text-base md:text-lg">
                <p>Once-off Cleaning</p>
                <p>Recurring Cleaning</p>
                <p>Standard Cleaning</p>
                <p>Deep Cleaning</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex-col font-[Montserrat]">
              <h3 className="font-bold xl:text-xl text-2xl leading-[150%]">
                Contact
              </h3>
              <div className="flex flex-col xl:gap-4 gap-2 xl:font-medium text-base md:text-lg">
                <p>FAQ</p>
                <p>Contact Us</p>
                <p>Reviews</p>
              </div>
            </div>

            {/* Social and Payment Section */}
            <div className="flex flex-col xl:gap-6 font-[Montserrat]">
              <h3 className="font-bold xl:text-xl text-2xl leading-[150%]">
                Social
              </h3>
              <div className="flex gap-4 text-base items-center justify-center xl:justify-start my-6 xl:my-0">
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaFacebookF />
                </div>
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaInstagram />
                </div>
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaTiktok />
                </div>
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaYoutube />
                </div>
              </div>
              <div className="flex 2xl:gap-4 2xl:mt-4 xl:gap-2 justify-center">
                <img
                  src="/assets/Images/PaymentM.png"
                  alt="Visa"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 xl:mx-40" />

        <div className="xl:mt-8 flex flex-col xl:flex-row justify-center text-center text-sm text-gray-400">
          <div className="flex items-center justify-center gap-10">
            <p>©Ausiwipe 2025</p>
            <img
              src="assets\Images\footerlogo.png"
              alt="footerlogo"
              className="xl:ml-12"
            />
          </div>
          <p className="xl:ml-12 mx-6 mt-6">
            AusiWipe acknowledges the Gubbi Gubbi people and the Jinibara people
            who are the Traditional Custodians of this <br /> land on which we
            work. We acknowledge the Traditional Custodians of Country
            throughout Australia. We recognise <br /> their continuous
            relationship to the land and pay our respects to Elders past,
            present and emerging.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
