# 🎯 بازی ضرب
**طراح: سهیلا ملک‌محمدی | دبستان نیایش ۱**

یک بازی آموزشی جدول ضرب برای دانش‌آموزان دبستانی — با تابلوی امتیازات آنلاین و سیستم امتیازدهی ستاره.

---

## ✨ ویژگی‌ها

- جداول ضرب ۲ تا ۹ (هر مرحله یک جدول)
- سه سطح دشواری: ساده / متوسط / سخت
- تایمر دلخواه برای هر سوال
- بدون تکرار سوال در هر مرحله
- صدای تشویق و هشدار
- انیمیشن انتقال بین مرحله‌ها
- تابلوی امتیازات آنلاین (ذخیره بهترین امتیاز هر نفر)
- ⭐ امتیازدهی ستاره توسط بازیکنان
- پنل مدیریت برای معلم (حذف امتیازات)

---

## 🚀 راه‌اندازی — قدم به قدم

### قدم ۱ — Supabase (پایگاه داده رایگان)

1. برو به https://supabase.com و ثبت‌نام کن (رایگان)
2. New Project بساز
3. برو به SQL Editor و این کد را Run کن:

```sql
CREATE TABLE scores (
  id        SERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  score     INTEGER NOT NULL,
  difficulty TEXT,
  date      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ratings (
  id    SERIAL PRIMARY KEY,
  stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
  date  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE scores  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow all" ON scores  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON ratings FOR ALL USING (true) WITH CHECK (true);
```

4. از Settings → API این دو مقدار را کپی کن:
   - Project URL  →  جای SB_URL
   - anon / public key  →  جای SB_KEY

### قدم ۲ — کلیدها را در فایل HTML وارد کن

```javascript
const SB_URL = 'https://xxxxxxxxxxxxxx.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### قدم ۳ — آپلود روی Netlify

1. netlify.com → Add new site → Deploy manually
2. فایل HTML را داخل کادر بکش
3. لینک رایگان بگیر

---

## 👩‍🏫 پنل معلم

نام "teacher" را در صفحه اول وارد کن تا دکمه حذف امتیازات ظاهر شود.

---

## ⭐ آمار امتیازدهی ستاره

در Supabase → SQL Editor این query را اجرا کن:

```sql
SELECT 
  COUNT(*) as total_ratings,
  ROUND(AVG(stars), 2) as average_stars,
  COUNT(CASE WHEN stars = 5 THEN 1 END) as five_stars,
  COUNT(CASE WHEN stars = 4 THEN 1 END) as four_stars,
  COUNT(CASE WHEN stars = 3 THEN 1 END) as three_stars
FROM ratings;
```

---

## 📁 فایل‌ها

| فایل | توضیح |
|------|-------|
| `bazi_zarb_v3.html` | فایل اصلی بازی |
| `README.md` | این راهنما |

---

## 🆓 هزینه: کاملاً رایگان

| سرویس | پلن رایگان |
|-------|-----------|
| Netlify | 100GB bandwidth/ماه |
| Supabase | 500MB database، نامحدود request |

---

*ساخته شده با ❤️ برای دانش‌آموزان دبستان نیایش ۱*