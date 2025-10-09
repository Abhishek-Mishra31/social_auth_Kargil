import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleLogout = () => {
    alert("You have been logged out!");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <header className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{greeting} 👋</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to Your Blog
        </h2>

        <article className="border-b border-gray-200 pb-4">
          <h3 className="text-xl font-semibold text-blue-500">
            🌟 The Joy of Learning React
          </h3>
          <p className="text-gray-600 mt-2">
            React makes building user interfaces a breeze. With components,
            hooks, and JSX, developers can create dynamic and efficient web
            applications with ease.
          </p>
        </article>

        <article className="border-b border-gray-200 pb-4">
          <h3 className="text-xl font-semibold text-blue-500">
            Getting Started with Tailwind CSS
          </h3>
          <p className="text-gray-600 mt-2">
            Tailwind CSS allows you to style your application directly in your
            markup, using utility classes. It’s fast, flexible, and easy to
            customize.
          </p>
        </article>

        <article>
          <h3 className="text-xl font-semibold text-blue-500">
            💡 Tips for Better Frontend Design
          </h3>
          <p className="text-gray-600 mt-2">
            Keep layouts clean, use consistent colors, and make sure your
            typography is readable. A good design is one that feels effortless
            to navigate.
          </p>
        </article>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} My Simple Blog Dashboard
      </footer>
    </div>
  );
};

export default Dashboard;
