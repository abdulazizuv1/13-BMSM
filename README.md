# 13-son Bolalar Musiqa va San'at Maktabi Veb-sayti

Ushbu loyiha Farg'ona viloyati, Quva tumanida joylashgan 13-sonli Bolalar Musiqa va San'at Maktabi uchun maxsus ishlab chiqilgan zamonaviy web-ilovadir.

## Texnologiyalar (Tech Stack)

Loyihada quyidagi zamonaviy texnologiyalar qo'llanilgan:
- **Frontend Framework:** React.js
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Backend / Database:** Firebase (Firestore, Storage, Authentication)
- **Styling:** Maxsus CSS (Vanilla CSS & CSS Variables)
- **Icons:** React Icons (Feather Icons)
- **Animations:** AOS (Animate On Scroll) & Framer Motion
- **Sliders:** Swiper.js

## Asosiy Imkoniyatlar

### Foydalanuvchilar (O'quvchilar va Ota-onalar) uchun:
- **Bosh sahifa:** Maktabning qisqacha tarixi, afzalliklari, rasmlar galereyasi, yangiliklar va aloqa formasi (Telegram bot integratsiyasi bilan).
- **Faoliyat bo'limi:** Maktabdagi barcha o'quv yo'nalishlari (fortepiano, an'anaviy xonanda, xoreografiya va h.k.) va maktab faxrlari haqida ma'lumotlar.
- **Maktab bo'limi:** Rahbariyat, o'qituvchi va xodimlar haqida to'liq ma'lumotlar, ustozlarning profil ma'lumotlari.
- **Ta'lim jarayoni:** O'quv rejalari va ko'rik-tanlovlar to'g'risida axborot.
- **Rasmiy hujjatlar:** Maktab pasporti va boshqa me'yoriy hujjatlarni yuklab olish imkoniyati.
- **News (Yangiliklar):** So'nggi xabarlar va voqealarni alohida sahifada o'qish.

### Ma'muriyat (Admin) uchun (CMS - Content Management System):
- **Xavfsizlik:** Firebase Authentication orqali tizimga kirish (Login).
- **Boshqaruv Paneli (Dashboard):** Umumiy statistika va sahifalarga tezkor o'tish imkoniyati.
- **Yangiliklar boshqaruvi (News Manager):** Yangi maqola / yangilik qo'shish, rasmlar yuklash, tahrirlash va o'chirish.
- **Galereya boshqaruvi (Gallery Manager):** Bosh sahifa uchun fotosuratlar qo'shish va olib tashlash.
- **Aloqa formasi:** Foydalanuvchilardan kelgan xabarlarni to'g'ridan-to'g'ri maktab ma'muriyatining Telegram botiga yuborish tizimi (Telegram API).
- **Yo'nalishlar, Faxrlar, O'qituvchilar va Rahbariyat:** Firebase Firestore yordamida har bir bo'limdagi kartochkalarni (rasm, F.I.SH., tavsif) CRUID amallari orqali boshqarish.

## Loyihani O'rnatish va Ishga Tushirish

Loyihani o'zingizning kompyuteringizda ishga tushirish uchun quyidagi amallarni bajaring:

### 1-qadam: Kutubxonalarni o'rnatish
Loyiha jildida terminalingizni oching va quyidagi buyruqni ishlating:

```bash
npm install
```

### 2-qadam: Firebase sozlamalari
Loyiha to'g'ri ishlashi uchun siz Firebase loyihasini yaratishingiz kerak.
1. Firebase Console (https://console.firebase.google.com/) orqali yangi loyiha sating.
2. Firestore Database, Firebase Storage va Authentication (Email/Password) xizmatlarini yoqing.
3. Loyihaning asosiy papkasida (`13-BMSM`) `.env` nomli fayl yarating.
4. Ushbu fayl ichiga o'zingizning Firebase konfiguratsiyangizni Vite formatida (.env.example ga qarang) kiriting:

```env
VITE_FIREBASE_API_KEY="AIzaSyA..."
VITE_FIREBASE_AUTH_DOMAIN="loyiha-nomi.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="loyiha-nomi"
VITE_FIREBASE_STORAGE_BUCKET="loyiha-nomi.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abcdefg"
```

*Eslatma: Bu yerdagi ma'lumotlar maxfiy bo'lishi sababli, `.env` fayli GitHub/GitLab kabi ochiq repozitoriylarga yuklanmasligi kerak (bu oldindan `.gitignore` da hisobga olingan).*

### 3-qadam: Loyihani ishga tushirish

Dastur kodlarini mahalliy serverda ishga tushirish uchun:
```bash
npm run dev
```
Bu komanda orqali ushbu dastur ko'pincha `http://localhost:5173` manzilida ishga tushadi.

### 4-qadam: Ishlab chiqarishga tayyorlash (Build)
Loyihani hostingga joylash (deploy) uchun avval uni build qilib, siqilgan (optimized) holatga keltirish zarur:

```bash
npm run build
```
Bu amal natijasida `dist/` jildi paydo bo'ladi. Xuddi shu jildni Netlify, Vercel yoki Firebase Hosting tizimlariga joylash kifoya qiladi.

## Litsenziya

Barcha huquqlar Farg'ona viloyati, Quva tumani 13-sonli Bolalar Musiqa va San'at Maktabi ma'muriyatiga tegishli.
