# نظام التصميم - Toluene Photolysis Pro Simulator

## 🎨 فلسفة التصميم
**التصميم العلمي الحديث:** دمج الجمالية العصرية مع الدقة العلمية. الواجهة تعكس طبيعة البحث الفيزيائي من خلال:
- تصميم داكن احترافي (Dark Mode) يقلل إرهاق العين
- تدرجات لونية تعكس الطيف الفيزيائي (UV، الأطوال الموجية)
- رسوم توضيحية حية تظهر العمليات الفيزيائية بشكل فوري

## 🎭 نظام الألوان

### الألوان الأساسية
- **Primary (الأزرق الفاتح):** `#00D9FF` - يمثل الأشعة فوق البنفسجية (UV)
- **Secondary (الأرجواني):** `#9D4EDD` - يمثل الطاقة والتفاعلات
- **Accent (الأخضر):** `#3A86FF` - يمثل النتائج الإيجابية والاستقرار
- **Background:** `#0A0E27` - خلفية داكنة عميقة
- **Surface:** `#1A1F3A` - سطح للعناصر

### الألوان الثانوية (للبيانات)
- **Decay (التحلل):** `#FF006E` - أحمر وردي
- **Refractive Index:** `#FFB700` - برتقالي
- **Photolysis Rate:** `#00F5FF` - سماوي
- **Temperature:** `#FF4365` - أحمر

## 🔤 نظام الخطوط

### الخطوط المستخدمة
- **Display Font:** `Poppins` (Bold 700) - للعناوين الرئيسية
- **Heading Font:** `Inter` (Semibold 600) - للعناوين الفرعية
- **Body Font:** `Inter` (Regular 400) - للنصوص الأساسية
- **Mono Font:** `JetBrains Mono` - للأكواد والقيم الرقمية

### التسلسل الهرمي
- **H1 (Display):** 48px, Bold, Letter-spacing: -1px
- **H2 (Heading):** 32px, Semibold, Letter-spacing: -0.5px
- **H3 (Subheading):** 24px, Semibold
- **Body:** 16px, Regular, Line-height: 1.6
- **Small:** 14px, Regular, Color: muted

## 🎯 المكونات الرئيسية

### 1. Navigation
- Sidebar ثابت على اليسار (للشاشات الكبيرة)
- Navigation items مع أيقونات من Lucide React
- Active state مع underline أزرق

### 2. Cards & Panels
- Border-radius: 12px
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Shadow: 0 8px 32px rgba(0, 0, 0, 0.3)

### 3. Buttons
- Primary: Background `#00D9FF`, Text dark
- Secondary: Border `#9D4EDD`, Transparent background
- Hover: Brightness increase + slight scale

### 4. Charts & Graphs
- استخدام Recharts مع ألوان مخصصة
- Grid lines: rgba(255, 255, 255, 0.1)
- Tooltip: Dark background مع border أزرق

## 🎬 الحركة والانتقالات
- Transition duration: 300ms (ease-in-out)
- Hover effects: Scale 1.05 + shadow increase
- Page transitions: Fade in 200ms
- Chart animations: 800ms smooth curve

## 📐 المسافات والتخطيط
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Container max-width: 1400px
- Sidebar width: 280px

## 🎨 الأيقونات والرسوميات
- استخدام Lucide React للأيقونات
- SVG custom للرسوميات العلمية
- Animations للعناصر التفاعلية

## 🌐 الاستجابة (Responsive Design)
- Mobile: < 640px (Stack layout)
- Tablet: 640px - 1024px (2-column)
- Desktop: > 1024px (Full layout with sidebar)
