import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Layout
        "AI Dashboard": "AI Dashboard",
        "Menu": "Menu",
        "Dashboard": "Dashboard",
        "Users": "Users",
        "Settings": "Settings",
        "Pricing": "Pricing",
        "Toggle": "Toggle",
        "Close": "Close",
        "Cancel": "Cancel",
        "Submit": "Submit",
        "Save Changes": "Save Changes",
        
        // Charts
        "Monthly Sales (Bar Chart)": "Monthly Sales (Bar Chart)",
        "Monthly Users & Revenue": "Monthly Users & Revenue",
        "Plan Distribution (Pie Chart)": "Plan Distribution (Pie Chart)",
        "Sales": "Sales",
        "Revenue": "Revenue",
        "Jan": "Jan", "Feb": "Feb", "Mar": "Mar",
        "Apr": "Apr", "May": "May", "Jun": "Jun",
        
        // Stats
        "Total Users": "Total Users",
        "Growth": "Growth",
        "Orders": "Orders",
        "this month": "this month",
        
        // Users Page
        "User Management": "User Management",
        "Manage and organize your users": "Manage and organize your users",
        "Add User": "Add User",
        "Add New User": "Add New User",
        "Edit User": "Edit User",
        "Update User": "Update User",
        "Search by name or email...": "Search by name or email...",
        "All Roles": "All Roles",
        "Showing {{count}} of {{total}} users": "Showing {{count}} of {{total}} users",
        "No users found.": "No users found.",
        "Page {{current}} of {{total}}": "Page {{current}} of {{total}}",
        "Actions": "Actions",
        "Edit": "Edit",
        "Delete": "Delete",
        
        // Form Fields
        "Name": "Name",
        "Email": "Email",
        "Role": "Role",
        "Enter name": "Enter name",
        "Enter email": "Enter email",
        "Enter your name": "Enter your name",
        "Enter your email": "Enter your email",
        "Select role": "Select role",
        
        // Roles
        "Admin": "Admin",
        "Editor": "Editor",
        "Viewer": "Viewer",
        
        // Plans
        "Free": "Free",
        "Pro": "Pro",
        "Enterprise": "Enterprise",
        "1 Project": "1 Project",
        "Community Support": "Community Support",
        "10 Projects": "10 Projects",
        "Email Support": "Email Support",
        "Analytics": "Analytics",
        "Unlimited Projects": "Unlimited Projects",
        "Priority Support": "Priority Support",
        "AI Tools": "AI Tools",
        "Most Popular": "Most Popular",
        
        // Dashboard
        "Welcome back! Here is your overview.": "Welcome back! Here is your overview.",
        "Add New Entry": "Add New Entry",
        "Submit Your Info": "Submit Your Info",
        "Submitted successfully!": "Submitted: {{name}}",
        
        // Pricing
        "Pricing Plans": "Pricing Plans",
        "Choose the perfect plan for your needs": "Choose the perfect plan for your needs",
        "Enter Your Details": "Enter Your Details",
        "Choose Plan": "Choose Plan",
        "You chose the {{plan}} Plan": "You chose the {{plan}} Plan",
        "An invoice will be generated with your details.": "An invoice will be generated with your details.",
        "Download Invoice PDF": "Download Invoice PDF",
        
        // Settings
        "Manage your preferences and account settings": "Manage your preferences and account settings",
        "Enable Notifications": "Enable Notifications",
        "Receive email and push notifications": "Receive email and push notifications",
        "Dark Mode": "Dark Mode",
        "Switch between light and dark theme": "Switch between light and dark theme",
        "Notifications": "Notifications",
        
        // Toasts
        "User added successfully!": "User added successfully!",
        "User updated successfully!": "User updated successfully!",
        "User deleted successfully!": "User deleted successfully!",
        "Settings saved successfully!": "Settings saved successfully!",
        "Please enter your name and email before choosing a plan.": "Please enter your name and email before choosing a plan.",
        "Plan selected: {{plan}}": "Plan selected: {{plan}}",
        "Invoice downloaded!": "Invoice downloaded!",
        
        // Validation
        "Name is required": "Name is required",
        "Email is required": "Email is required",
        "Invalid email": "Invalid email"
      }
    },
    ar: {
      translation: {
        // Layout
        "AI Dashboard": "لوحة التحكم الذكية",
        "Menu": "القائمة",
        "Dashboard": "لوحة التحكم",
        "Users": "المستخدمين",
        "Settings": "الإعدادات",
        "Pricing": "الأسعار",
        "Toggle": "تبديل",
        "Close": "إغلاق",
        "Cancel": "إلغاء",
        "Submit": "إرسال",
        "Save Changes": "حفظ التغييرات",
        
        // Charts
        "Monthly Sales (Bar Chart)": "المبيعات الشهرية",
        "Monthly Users & Revenue": "المستخدمين والإيرادات الشهرية",
        "Plan Distribution (Pie Chart)": "توزيع الخطط",
        "Sales": "المبيعات",
        "Revenue": "الإيرادات",
        "Jan": "يناير", "Feb": "فبراير", "Mar": "مارس",
        "Apr": "أبريل", "May": "مايو", "Jun": "يونيو",
        
        // Stats
        "Total Users": "إجمالي المستخدمين",
        "Growth": "النمو",
        "Orders": "الطلبات",
        "this month": "هذا الشهر",
        
        // Users Page
        "User Management": "إدارة المستخدمين",
        "Manage and organize your users": "إدارة وتنظيم المستخدمين",
        "Add User": "إضافة مستخدم",
        "Add New User": "إضافة مستخدم جديد",
        "Edit User": "تعديل المستخدم",
        "Update User": "تحديث المستخدم",
        "Search by name or email...": "البحث بالاسم أو البريد الإلكتروني...",
        "All Roles": "جميع الأدوار",
        "Showing {{count}} of {{total}} users": "عرض {{count}} من {{total}} مستخدم",
        "No users found.": "لم يتم العثور على مستخدمين.",
        "Page {{current}} of {{total}}": "صفحة {{current}} من {{total}}",
        "Actions": "الإجراءات",
        "Edit": "تعديل",
        "Delete": "حذف",
        
        // Form Fields
        "Name": "الاسم",
        "Email": "البريد الإلكتروني",
        "Role": "الدور",
        "Enter name": "أدخل الاسم",
        "Enter email": "أدخل البريد الإلكتروني",
        "Enter your name": "أدخل اسمك",
        "Enter your email": "أدخل بريدك الإلكتروني",
        "Select role": "اختر الدور",
        
        // Roles
        "Admin": "مدير",
        "Editor": "محرر",
        "Viewer": "مشاهد",
        
        // Plans
        "Free": "مجاني",
        "Pro": "احترافي",
        "Enterprise": "مؤسسي",
        "1 Project": "مشروع واحد",
        "Community Support": "دعم المجتمع",
        "10 Projects": "١٠ مشاريع",
        "Email Support": "دعم عبر البريد",
        "Analytics": "التحليلات",
        "Unlimited Projects": "مشاريع غير محدودة",
        "Priority Support": "دعم ذو أولوية",
        "AI Tools": "أدوات الذكاء الاصطناعي",
        "Most Popular": "الأكثر شعبية",
        
        // Dashboard
        "Welcome back! Here is your overview.": "مرحباً بعودتك! هذه نظرة عامة.",
        "Add New Entry": "إضافة إدخال جديد",
        "Submit Your Info": "أرسل معلوماتك",
        "Submitted successfully!": "تم الإرسال: {{name}}",
        
        // Pricing
        "Pricing Plans": "خطط الأسعار",
        "Choose the perfect plan for your needs": "اختر الخطة المثالية لاحتياجاتك",
        "Enter Your Details": "أدخل بياناتك",
        "Choose Plan": "اختر الخطة",
        "You chose the {{plan}} Plan": "لقد اخترت خطة {{plan}}",
        "An invoice will be generated with your details.": "سيتم إنشاء فاتورة ببياناتك.",
        "Download Invoice PDF": "تحميل الفاتورة PDF",
        
        // Settings
        "Manage your preferences and account settings": "إدارة تفضيلاتك وإعدادات حسابك",
        "Enable Notifications": "تفعيل الإشعارات",
        "Receive email and push notifications": "استلام إشعارات البريد والإشعارات الفورية",
        "Dark Mode": "الوضع الداكن",
        "Switch between light and dark theme": "التبديل بين الوضع الفاتح والداكن",
        "Notifications": "الإشعارات",
        
        // Toasts
        "User added successfully!": "تمت إضافة المستخدم بنجاح!",
        "User updated successfully!": "تم تحديث المستخدم بنجاح!",
        "User deleted successfully!": "تم حذف المستخدم بنجاح!",
        "Settings saved successfully!": "تم حفظ الإعدادات بنجاح!",
        "Please enter your name and email before choosing a plan.": "يرجى إدخال اسمك وبريدك الإلكتروني قبل اختيار الخطة.",
        "Plan selected: {{plan}}": "تم اختيار الخطة: {{plan}}",
        "Invoice downloaded!": "تم تحميل الفاتورة!",
        
        // Validation
        "Name is required": "الاسم مطلوب",
        "Email is required": "البريد الإلكتروني مطلوب",
        "Invalid email": "بريد إلكتروني غير صالح"
      }
    }
  },
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;