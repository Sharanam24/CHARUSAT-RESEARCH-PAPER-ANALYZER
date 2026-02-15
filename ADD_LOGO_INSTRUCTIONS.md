# 🎨 How to Add Your CHARUSAT University Logo

## ✅ What I've Done

I've updated all your HTML pages and CSS to include a logo next to "CHARUSAT Research Analyzer" in the navigation bar.

### Files Updated:
- ✅ `css/styles.css` - Added logo styling
- ✅ `index.html` - Added logo to navigation
- ✅ `papers.html` - Added logo to navigation
- ✅ `authors.html` - Added logo to navigation
- ✅ `analytics.html` - Added logo to navigation
- ✅ `about.html` - Added logo to navigation
- ✅ Created `images/` folder

---

## 📁 What You Need to Do

### Step 1: Get Your CHARUSAT Logo

1. Find your university logo image file
2. Recommended formats: PNG (with transparent background) or JPG
3. Recommended size: 200x200 pixels or similar square/rectangular format

### Step 2: Add Logo to Project

1. **Save your logo file as:** `charusat-logo.png`
2. **Place it in the folder:** `images/charusat-logo.png`

That's it! The logo will automatically appear on all pages.

---

## 🎨 Logo Styling

The logo is styled to:
- Height: 50px (width adjusts automatically)
- Positioned next to the text "CHARUSAT Research Analyzer"
- Maintains aspect ratio
- Looks professional on dark blue navigation bar

### Current CSS:
```css
.logo {
    display: flex;
    align-items: center;
    gap: 1rem;  /* Space between logo and text */
}

.logo-img {
    height: 50px;
    width: auto;
    object-fit: contain;
}
```

---

## 🔧 Customize Logo Size

If you want to change the logo size, edit `css/styles.css`:

```css
.logo-img {
    height: 60px;  /* Change this value */
    width: auto;
}
```

---

## 📝 Alternative: Use a Different Logo Name

If your logo file has a different name (e.g., `university-logo.jpg`), you can either:

**Option 1: Rename your file to `charusat-logo.png`**

**Option 2: Update all HTML files**

Find and replace in all HTML files:
```html
<!-- Change from: -->
<img src="images/charusat-logo.png" alt="CHARUSAT Logo" class="logo-img">

<!-- Change to: -->
<img src="images/your-logo-name.jpg" alt="CHARUSAT Logo" class="logo-img">
```

---

## 🖼️ Don't Have a Logo?

### Option 1: Download CHARUSAT Logo
- Visit CHARUSAT official website
- Download the official logo
- Save as `charusat-logo.png` in `images/` folder

### Option 2: Use a Placeholder
I can create a simple placeholder for you if needed.

### Option 3: Remove Logo
If you don't want a logo, the text will still look good on its own!

---

## ✅ Verification

After adding your logo:

1. **Start the frontend:**
   ```bash
   python -m http.server 3000
   ```

2. **Open in browser:**
   ```
   http://localhost:3000
   ```

3. **Check navigation bar:**
   - Logo should appear on the left
   - Text "CHARUSAT Research Analyzer" next to it
   - Both should be on dark blue background

---

## 🎯 Result

Your navigation will look like:

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO] CHARUSAT Research Analyzer    Home Papers ...   │
└─────────────────────────────────────────────────────────┘
```

---

## 🆘 Troubleshooting

### Logo Not Showing?

**Check 1: File Location**
```
Your-Project/
├── images/
│   └── charusat-logo.png  ← Logo should be here
├── index.html
├── css/
└── js/
```

**Check 2: File Name**
- Must be exactly: `charusat-logo.png`
- Case-sensitive on some systems

**Check 3: Browser Cache**
- Press `Ctrl + F5` to hard refresh
- Or clear browser cache

**Check 4: File Format**
- PNG, JPG, or SVG work best
- Make sure it's a valid image file

### Logo Too Big/Small?

Edit `css/styles.css`:
```css
.logo-img {
    height: 40px;  /* Smaller */
    /* or */
    height: 70px;  /* Bigger */
}
```

### Logo Not Aligned?

The CSS uses flexbox for perfect alignment. If it looks off, check:
```css
.logo {
    display: flex;
    align-items: center;  /* Vertical alignment */
    gap: 1rem;            /* Space between logo and text */
}
```

---

## 📸 Example

Once you add your logo, it will appear on:
- ✅ Home/Dashboard page
- ✅ Papers page
- ✅ Authors page
- ✅ Analytics page
- ✅ About page

All pages will have a consistent, professional look with your university branding!

---

**Need help? Just ask!** 🚀
