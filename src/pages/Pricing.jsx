import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js'; // ← Import add kar

const Pricing = () => {
  const { t, i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: 'Free',
      price: 0,
      features: ['1 Project', 'Community Support']
    },
    {
      name: 'Pro',
      price: 29,
      features: ['10 Projects', 'Email Support', 'Analytics'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      features: ['Unlimited Projects', 'Priority Support', 'AI Tools']
    }
  ];

  const generateInvoice = (plan) => {
    if (!userInfo.name || !userInfo.email) {
      toast.error(t('Please enter your name and email before choosing a plan.'));
      return;
    }

    const isRTL = i18n.language === 'ar';
    
    const invoiceHTML = `
      <div style="font-family: 'Cairo', sans-serif; direction: ${isRTL ? 'rtl' : 'ltr'}; padding: 40px; text-align: ${isRTL ? 'right' : 'left'};">
        <h1 style="color: #1f2937; margin-bottom: 30px;">${t('Invoice')}</h1>
        
        <div style="margin-bottom: 20px;">
          <p><strong>${t('Date')}:</strong> ${new Date().toLocaleDateString('ar-SA')}</p>
          <p><strong>${t('Name')}:</strong> ${userInfo.name}</p>
          <p><strong>${t('Email')}:</strong> ${userInfo.email}</p>
        </div>
        
        <hr style="margin: 20px 0;">
        
        <h2 style="color: #3b82f6;">${t('Plan')}: ${t(plan.name)}</h2>
        <p style="font-size: 24px; font-weight: bold;">${t('Price')}: $${plan.price}/${t('month')}</p>
        
        <h3 style="margin-top: 30px;">${t('Features')}:</h3>
        <ul style="list-style: none; padding: 0;">
          ${plan.features.map(f => `<li style="margin: 8px 0;">• ${t(f)}</li>`).join('')}
        </ul>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p>${t('Thank you for your business!')}</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `invoice-${plan.name}-${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(invoiceHTML).save();
    toast.success(t('Invoice downloaded!'));
  };

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-zinc-900 min-h-screen" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">{t('Pricing Plans')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('Choose the perfect plan for your needs')}</p>

      {/* User Info Form */}
      <div className="mb-8 max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">{t('Enter Your Details')}</h2>
        <input
          type="text"
          placeholder={t('Enter your name')}
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          className="w-full mb-3 px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        />
        <input
          type="email"
          placeholder={t('Enter your email')}
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        />
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`border rounded-xl p-6 dark:border-zinc-700 ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
            {plan.popular && (
              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">{t('Most Popular')}</span>
            )}
            <h3 className="text-2xl font-bold mt-4 text-black dark:text-white">{t(plan.name)}</h3>
            <p className="text-4xl font-bold my-4 text-black dark:text-white">
              ${plan.price}<span className="text-base text-gray-500">/{t('month')}</span>
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check size={18} className="text-green-500" />
                  {t(feature)}
                </li>
              ))}
            </ul>
            <button
              onClick={() => generateInvoice(plan)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {t('Download Invoice PDF')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;