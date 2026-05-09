import { useTranslation } from 'react-i18next';

const Switch = ({ isOn, handleToggle, label, disabled = false }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label || t('Toggle')}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
        dark:focus:ring-offset-zinc-800
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isOn 
          ? 'bg-green-500 dark:bg-green-600' 
          : 'bg-gray-300 dark:bg-zinc-700'
        }
      `}
    >
      <span className="sr-only">{label || t('Toggle')}</span>
      
      {/* Thumb - RTL aware */}
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full bg-white shadow-lg 
          transition-transform duration-200 ease-in-out
          ${isOn 
            ? isRTL 
              ? '-translate-x-6' // RTL mein left jao
              : 'translate-x-6'  // LTR mein right jao
            : 'translate-x-1'    // Off state
          }
        `}
      />
    </button>
  );
};

export default Switch;