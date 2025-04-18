"use client";

export default function ContactForm() {
  return (
    <div className="bg-[#fffae7] flex justify-center xl:pt-6 pb-10 md:pb-16 xl:pb-40">
      <div className="xl:w-[90%] p-8 rounded-lg">
        <h2 className="xl:text-[50px] text-[40px] font-extrabold text-[#0B2F3D] text-center mb-4 leading-[90px] font-[Tropiline]">
          Get In <span className="text-[#FF3366]">Touch!</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 xl:mt-10 ">
          <div className="xl:max-w-[737px]">
            <p className="text-[#0B2F3D] text-left mb-8 font-[Montserrat] xl:text-xl text-lg xl:tracking-wide ">
              Have questions or need assistance? Don't hesitate to contact our
              team today. We are available every day of the week via phone,
              email, or SMS.
            </p>
            <h3 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-[32px] text-2xl leading-[150%] pb-6">
              Payment Details
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Phone/SMS:
                </span>
                <span className="font-semibold xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#0B2F3D]">
                  0423 383 684
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Email:
                </span>
                <ul className="font-semibold xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#0B2F3D] text-right">
                  <li>hello@ausiwipe.com.au</li>
                  <li>support@ausiwipe.com.au</li>
                  <li>joinus@ausiwipe.com.au</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Address:
                </span>{" "}
                <span className="font-semibold xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#0B2F3D]">
                  13/A Park Street, Melbourne
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Opening Hours:
                </span>
                <div className="font-semibold xl:text-2xl text-lg font-[Montserrat] leading-[150%] text-[#0B2F3D] text-right">
                  <p>Mon - Fri: 9am - 5pm</p>
                  <p>Sat - Sun: 9am - 12pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:text-black">
            <div className="space-y-4">
              <div className="relative flex">
                <img
                  src="/assets/Images/user.png"
                  alt="User"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="text"
                  placeholder="Daham"
                  className="input-style pl-16 xl:w-full xl:h-16 w-full h-10 border-2 border-[#0B2F3D] rounded-xl"
                />
              </div>

              <div className="relative">
                <img
                  src="/assets/Images/mail.png"
                  alt="email-icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  className="input-style pl-16 xl:w-full xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
                />
              </div>

              <div className="relative">
                <img
                  src="/assets/Images/phone.png"
                  alt="Phone"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="tel"
                  placeholder="0423 346 982"
                  className="input-style pl-16 xl:w-full xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
                />
              </div>

              <div className="relative">
                <img
                  src="/assets/Images/edit.png"
                  alt="Inquiry"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="text"
                  placeholder="Enquiry"
                  className="input-style pl-16 xl:w-full xl:h-[200px] h-40 w-full border-2 border-[#0B2F3D] rounded-xl flex justify-end items-start"
                />
              </div>

              <button className="bg-[#FFC914] text-[#0B2F3D] w-full py-2 px-8 xl:mt-10 xl:px-8 xl:py-3 rounded-full font-[Montserrat] text-xl font-semibold leading-[150%] border-2 border-[#0B2F3D] hover:scale-105 active:scale-95">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
