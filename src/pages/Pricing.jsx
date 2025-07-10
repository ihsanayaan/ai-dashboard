import { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

const plans = [
  { title: "Free", price: "$0", features: ["1 Project", "Community Support"], highlight: false },
  { title: "Pro", price: "$19/mo", features: ["10 Projects", "Email Support", "Analytics"], highlight: true },
  { title: "Enterprise", price: "$99/mo", features: ["Unlimited Projects", "Priority Support", "AI Tools"], highlight: false },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const handleChoose = (plan) => {
    if (!userInfo.name || !userInfo.email) {
      alert("⚠️ Please enter your name and email before choosing a plan.");
      return;
    }
    setSelectedPlan(plan);
  };

  const handleDownloadInvoice = () => {
    const invoiceNumber = Math.floor(100000 + Math.random() * 900000);
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Invoice #: ${invoiceNumber}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 38);
    doc.text(`Customer: ${userInfo.name}`, 20, 50);
    doc.text(`Email: ${userInfo.email}`, 20, 58);

    doc.text(`\nPlan: ${selectedPlan.title}`, 20, 80);
    doc.text(`Price: ${selectedPlan.price}`, 20, 88);
    doc.text("Features:", 20, 98);
    selectedPlan.features.forEach((f, i) => {
      doc.text(`• ${f}`, 30, 108 + i * 10);
    });

    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 105, 270, null, null, "center");

    doc.save(`invoice-${selectedPlan.title}-${invoiceNumber}.pdf`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-white">Pricing Plans</h1>

      <div className="mb-8 grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          className="px-4 py-2 border rounded-md w-full dark:bg-zinc-900 dark:text-white"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          className="px-4 py-2 border rounded-md w-full dark:bg-zinc-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className={`rounded-xl shadow-lg p-6 border-2 hover:scale-[1.03] transition-all duration-300 ${
              plan.highlight
                ? "border-green-500 dark:border-green-400"
                : "border-gray-200 dark:border-zinc-700"
            } bg-white dark:bg-zinc-800`}
          >
            <h2 className="text-xl font-bold mb-2 text-zinc-800 dark:text-white">{plan.title}</h2>
            <p className="text-3xl font-semibold mb-4 text-zinc-900 dark:text-white">{plan.price}</p>
            <ul className="space-y-2 mb-6 text-sm text-zinc-600 dark:text-zinc-300">
              {plan.features.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>
            <button
              onClick={() => handleChoose(plan)}
              className="w-full py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200"
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            🎉 You chose the {selectedPlan.title} Plan
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
            An invoice will be generated with your name and email.
          </p>
          <button
            onClick={handleDownloadInvoice}
            className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Download Invoice PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Pricing;
