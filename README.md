# 🎯 ضرب‌یار — راهنمای نصب روی Netlify

## آنچه نیاز داری
- یک اکانت رایگان روی github.com
- یک اکانت رایگان روی netlify.com

---

## مرحله ۱ — آپلود پروژه روی GitHub

1. برو به **github.com** و وارد شو (یا ثبت‌نام کن)
2. روی **+ New repository** کلیک کن
3. اسم بذار: `zarb-yar`
4. گزینه **Public** رو انتخاب کن
5. روی **Create repository** کلیک کن
6. حالا پوشه `zarb_yar` رو از طریق GitHub Desktop یا drag & drop آپلود کن

### روش سریع‌تر (بدون GitHub Desktop):
1. در صفحه repository جدید، روی **uploading an existing file** کلیک کن
2. تمام فایل‌های داخل پوشه `zarb_yar` رو drag & drop کن
3. توجه: ساختار پوشه‌ها مهمه:
   ```
   📁 zarb_yar/
   ├── netlify.toml
   ├── package.json
   ├── 📁 public/
   │   └── index.html
   └── 📁 netlify/
       └── 📁 functions/
           └── leaderboard.js
   ```
4. روی **Commit changes** کلیک کن

---

## مرحله ۲ — اتصال به Netlify

1. برو به **netlify.com** و وارد شو
2. روی **Add new site** → **Import an existing project** کلیک کن
3. گزینه **GitHub** رو انتخاب کن و اجازه دسترسی بده
4. repository `zarb-yar` رو انتخاب کن
5. تنظیمات build:
   - **Build command:** (خالی بذار)
   - **Publish directory:** `public`
6. روی **Deploy site** کلیک کن

---

## مرحله ۳ — فعال کردن Netlify Blobs (برای ذخیره امتیازات)

Netlify Blobs به صورت خودکار فعاله! نیازی به تنظیم اضافه نیست.

---

## مرحله ۴ — لینک رایگان بگیر

بعد از deploy، Netlify یه لینک مثل این میده:
```
https://amazing-baklava-123456.netlify.app
```

این لینک رو به دانش‌آموزها بده! 🎉

---

## تغییر آدرس (اختیاری)

1. در Netlify برو به **Site settings** → **Domain management**
2. روی **Options** → **Edit site name** کلیک کن
3. اسم دلخواه مثل `zarb-yar-class5` بنویس
4. آدرس میشه: `https://zarb-yar-class5.netlify.app`

---

## پنل معلم (مدیریت تابلوی امتیازات)

برای حذف امتیاز دانش‌آموز:
1. در بازی، اسم **teacher** رو وارد کن
2. وارد بازی شو
3. روی 🏆 کلیک کن
4. کنار هر اسم یه آیکون 🗑 ظاهر میشه

---

## سوالات رایج

**آیا امتیازات پاک میشن؟**
خیر. Netlify Blobs داده رو دائمی نگه میداره.

**چند نفر میتونن همزمان بازی کنن؟**
تعداد نامحدود. Netlify CDN توزیع‌شده است.

**اگه دو نفر اسم یکسان داشتن چی؟**
بالاترین امتیاز نگه داشته میشه.

**آیا رایگانه؟**
بله! Netlify free tier برای این پروژه کافیه.
