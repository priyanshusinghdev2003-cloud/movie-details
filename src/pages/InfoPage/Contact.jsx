import React from "react";

function Contact() {
  return (
    <div className="text-white px-6 py-10 mt-20 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="text-gray-300 mb-6">
        If you have any questions, bugs to report, or suggestions,
        feel free to reach out via the form below.
      </p>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-md text-white  placeholder:text-gray-400"
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          className="w-full p-3 rounded-md text-white placeholder:text-gray-400"
        ></textarea>
        <button className="bg-red-600 px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition cursor-pointer">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
