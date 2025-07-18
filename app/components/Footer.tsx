import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="text-center">
        <p>
          © {new Date().getFullYear()} Shopping Landing Task. All rights
          reserved.
        </p>
        <p>
          <a href="https://yourcompany.com/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
