import { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { Check, Download, Sparkles } from "lucide-react";

const Pricing = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  // Currency formatter - Saudi Riyal
  const formatCurrency = (amount) => {
    const num = parseFloat(amount.replace(/[^\d.]/g, ''));
    if (isRTL) {
      return `﷼ ${new Intl.NumberFormat('ar-SA').format(num)}`;
    }
    return `$${num}`;
  };

  // Plans with translation
  const plans = [
    { 
      title: t('Free'), 
      price: isRTL ? "0" : "0", 
      priceLabel: isRTL ? "﷼ ٠" : "$0",
      features: [t('1 Project'), t('Community Support')], 
      highlight: false 
    },
    { 
      title: t('Pro'), 
      price: isRTL ? "71.25" : "19", // 19 USD ≈ 71.25 SAR
      priceLabel: isRTL ? "﷼ ٧١٫٢٥/شهر" : "$19/mo",
      features: [t('10 Projects'), t('Email Support'), t('Analytics')], 
      highlight: true 
    },
    { 
      title: t('Enterprise'), 
      price: isRTL ? "371.25" : "99", // 99 USD ≈ 371.25 SAR
      priceLabel: isRTL ? "﷼ ٣٧١٫٢٥/شهر" : "$99/mo",
      features: [t('Unlimited Projects'), t('Priority Support'), t('AI Tools')], 
      highlight: false 
    },
  ];

  const handleChoose = (plan) => {
    if (!userInfo.name || !userInfo.email) {
      toast.error(t('Please enter your name and email before choosing a plan.'));
      return;
    }
    setSelectedPlan(plan);
    toast.success(t('Plan selected: {{plan}}', { plan: plan.title }));
  };

  const handleDownloadInvoice = () => {
    const invoiceNumber = Math.floor(100000 + Math.random() * 900000);
    const doc = new jsPDF();
    
    // For Arabic, use different approach
    if (isRTL) {
      // Note: jsPDF Arabic support limited. For production use arabic PDF lib
      doc.setFontSize(18);
      doc.text("فاتورة", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.text(`رقم الفاتورة: ${invoiceNumber}`, 190, 30, { align: "right" });
      doc.text(`التاريخ: ${new Date().toLocaleDateString('ar-SA')}`, 190, 38, { align: "right" });
      doc.text(`العميل: ${userInfo.name}`, 190, 50, { align: "right" });
      doc.text(`البريد: ${userInfo.email}`, 190, 58, { align: "right" });
      
      doc.text(`الخطة: ${selectedPlan.title}`, 190, 80, { align: "right" });
      doc.text(`السعر: ${selectedPlan.priceLabel}`, 190, 88, { align: "right" });
      doc.text("المميزات:", 190, 98, { align: "right" });
      selectedPlan.features.forEach((f, i) => {
        doc.text(`• ${f}`, 190, 108 + i * 10, { align: "right" });
      });
      
      doc.setFontSize(10);
      doc.text("شكراً لشرائك!", 105, 270, { align: "center" });
    } else {
      doc.setFontSize(18);
      doc.text("Invoice", 105, 20, null, null, "center");
      
      doc.setFontSize(12);
      doc.text(`Invoice #: ${invoiceNumber}`, 20, 30);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 38);
      doc.text(`Customer: ${userInfo.name}`, 20, 50);
      doc.text(`Email: ${userInfo.email}`, 20, 58);
      
      doc.text(`\nPlan: ${selectedPlan.title}`, 20, 80);
      doc.text(`Price: ${selectedPlan.priceLabel}`, 20, 88);
      doc.text("Features:", 20, 98);
      selectedPlan.features.forEach((f, i) => {
        doc.text(`• ${f}`, 30, 108 + i * 10);
      });
      
      doc.setFontSize(10);
      doc.text("Thank you for your purchase!", 105, 270, null, null, "center");
    }

    doc.save(`invoice-${selectedPlan.title}-${invoiceNumber}.pdf`);
    toast.success(t('Invoice downloaded!'));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3">
          {t('Pricing Plans')}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          {t('Choose the perfect plan for your needs')}
        </p>
      </div>

      {/* User Info Form */}
      <div className="mb-10 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">
          {t('Enter Your Details')}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              {t('Name')}
            </label>
            <input
              type="text"
              required
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={t('Enter your name')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              {t('Email')}
            </label>
            <input
              type="email"
              required
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={t('Enter your email')}
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative rounded-2xl shadow-lg p-8 border-2 hover:scale-105 transition-all duration-300 ${
              plan.highlight
                ? "border-green-500 dark:border-green-400 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-zinc-800"
                : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Sparkles size={16} />
                  {t('Most Popular')}
                </span>
              </div>
            )}
            
            <h2 className="text-2xl font-bold mb-2 text-zinc-800 dark:text-white">
              {plan.title}
            </h2>
            <p className="text-4xl font-bold mb-6 text-zinc-900 dark:text-white">
              {plan.priceLabel}
            </p>
            
            <ul className="space-y-3 mb-8 text-sm text-zinc-600 dark:text-zinc-300">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={18} className="text-green-500 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => handleChoose(plan)}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                plan.highlight
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30"
                  : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200"
              }`}
            >
              {t('Choose Plan')}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Selected Plan Section */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 max-w-2xl mx-auto text-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-2xl border-2 border-green-500 dark:border-green-400"
        >
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            🎉 {t('You chose the {{plan}} Plan', { plan: selectedPlan.title })}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            {t('An invoice will be generated with your details.')}
          </p>
          <button
            onClick={handleDownloadInvoice}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-lg shadow-green-500/30"
          >
            <Download size={20} />
            {t('Download Invoice PDF')}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Pricing;