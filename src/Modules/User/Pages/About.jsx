import React from "react";

const About = () => {
  return (
    <div className="w-full text-gray-800">
      {/* Top Section - Images + Intro Content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 gap-12">
        {/* Images */}
        <div className="flex flex-col gap-6 md:w-1/2">
          <div className="flex gap-4">
            <img
              src="https://i.pinimg.com/564x/f2/41/aa/f241aadf6decb377e97346d843154520.jpg"
              className="w-[150px] h-[150px] rounded-lg shadow-lg"
              alt="Trek 1"
            />
            <img
              src="https://i.pinimg.com/564x/1e/71/4c/1e714c3509aa640843e77e1a27304117.jpg"
              className="w-[150px] h-[150px] rounded-lg shadow-lg"
              alt="Trek 2"
            />
          </div>
          <img
            src="https://i.pinimg.com/564x/55/ce/9c/55ce9c1f929cbe72ac0b3e68f1f36270.jpg"
            className="w-[320px] h-[180px] rounded-lg shadow-xl ml-12"
            alt="Trek 3"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-primary">
            About <span className="text-secondary">Trekkora</span>
          </h2>
          <p className="text-lg leading-relaxed">
            Welcome to Trekkora – your adventure starts here! 🌄
            We're passionate about connecting travelers with breathtaking destinations and expert guides. Our platform helps you discover trails, plan trips, and explore with confidence.
          </p>
          <p className="text-md text-gray-700">
            Whether you're a first-time explorer or a seasoned trekker, Trekkora ensures every journey is safe, exciting, and memorable.
          </p>
        </div>
      </div>

      {/* Stats + Extra Content */}
      <div className="w-full bg-gray-50 py-20 px-8 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-5">
          <h3 className="text-3xl font-semibold text-primary">Why Choose Trekkora?</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Verified guides from local regions</li>
            <li>Curated list of 1000+ travel destinations</li>
            <li>Community support & real-time updates</li>
            <li>Flexible bookings and trek customization</li>
            <li>Trusted by thousands of travelers worldwide</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="md:w-1/2 grid grid-cols-2 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-2xl font-bold text-secondary">1000+</h4>
            <p className="text-sm text-gray-600">Places</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-2xl font-bold text-secondary">500+</h4>
            <p className="text-sm text-gray-600">Guides</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-2xl font-bold text-secondary">12+</h4>
            <p className="text-sm text-gray-600">Years of Experience</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-2xl font-bold text-secondary">3</h4>
            <p className="text-sm text-gray-600">Branches</p>
          </div>
        </div>
      </div>

      {/* Full Width Image */}
      <div className="w-full">
        <img
          src="https://i.pinimg.com/736x/9b/96/33/9b9633efa1681da26a5f429c429acd04.jpg"
          alt="Scenic Journey"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* CTA Section */}
      <div className="w-full bg-primary text-white text-center py-16 px-4 space-y-6">
        <h3 className="text-4xl font-bold">Let's Explore Together 🌍</h3>
        <p className="text-lg">Find your next adventure with Trekkora</p>
        <button className="bg-white text-primary font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition">
          🚶‍♀️ Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default About;
