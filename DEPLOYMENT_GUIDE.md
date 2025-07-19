# 🚀 AMC MATH PRACTICE - DEPLOYMENT GUIDE

## 📋 PREREQUISITES

### **Required Accounts**
- ✅ GitHub account (free)
- ✅ Vercel account (free)

### **Local Setup**
- ✅ Node.js 16+ installed
- ✅ Git configured
- ✅ Project builds successfully (`npm run build`)

---

## 🌐 STEP 1: GITHUB REPOSITORY SETUP

### **1.1 Create GitHub Repository**
1. Go to [https://github.com](https://github.com)
2. Click the **'+'** icon in the top right
3. Select **'New repository'**
4. Fill in the details:
   - **Repository name**: `amc-math-practice`
   - **Description**: `Personalized AMC math practice app for Bella and Annie`
   - **Visibility**: **Public** (required for Vercel)
   - **DO NOT** initialize with README (we already have one)
5. Click **'Create repository'**

### **1.2 Upload to GitHub**
```bash
# Add the remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/amc-math-practice.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **1.3 Verify Upload**
- Visit: `https://github.com/YOUR_USERNAME/amc-math-practice`
- Confirm all files are uploaded
- Check that README.md displays correctly

---

## ⚡ STEP 2: VERCEL DEPLOYMENT

### **2.1 Connect to Vercel**
1. Go to [https://vercel.com](https://vercel.com)
2. Click **'Sign Up'** (use GitHub account for easy integration)
3. After signup, click **'New Project'**

### **2.2 Import GitHub Repository**
1. Click **'Import Git Repository'**
2. Find and select your `amc-math-practice` repository
3. Click **'Import'**

### **2.3 Configure Project Settings**
Vercel will auto-detect it's a Vite project. Verify these settings:

**Project Name**: `amc-math-practice` (or your preferred name)

**Framework Preset**: `Vite` (should be auto-detected)

**Root Directory**: `./` (leave as default)

**Build Command**: `npm run build` (should be auto-detected)

**Output Directory**: `dist` (should be auto-detected)

**Install Command**: `npm install` (should be auto-detected)

### **2.4 Deploy**
1. Click **'Deploy'**
2. Wait for build to complete (usually 1-2 minutes)
3. Vercel will provide a URL like: `https://amc-math-practice-xxx.vercel.app`

---

## 🎯 STEP 3: CUSTOM DOMAIN (OPTIONAL)

### **3.1 Add Custom Domain**
1. In Vercel dashboard, go to your project
2. Click **'Settings'** → **'Domains'**
3. Add your custom domain (e.g., `amc-math-practice.com`)
4. Follow DNS configuration instructions

### **3.2 Free Vercel Subdomain**
- Your app will be available at: `https://amc-math-practice.vercel.app`
- You can customize the subdomain in project settings

---

## 🔧 STEP 4: VERIFICATION

### **4.1 Test Your Live App**
1. Visit your Vercel URL
2. Test all features:
   - ✅ User selection (Annie/Bella)
   - ✅ All difficulty levels
   - ✅ Love messages appear correctly
   - ✅ Analytics and progress tracking
   - ✅ Achievement system
   - ✅ Help and guidance screens

### **4.2 Performance Check**
- ✅ Page loads quickly
- ✅ All images display correctly
- ✅ Responsive design works on mobile
- ✅ No console errors

---

## 🔄 STEP 5: AUTOMATIC DEPLOYMENTS

### **5.1 How It Works**
- Every time you push to GitHub `main` branch
- Vercel automatically rebuilds and deploys
- Your live site updates automatically

### **5.2 Making Updates**
```bash
# Make your changes locally
# Test with: npm run dev

# Commit and push
git add .
git commit -m "Your update description"
git push origin main

# Vercel automatically deploys the update!
```

---

## 🛠️ TROUBLESHOOTING

### **Build Failures**
1. **Check Vercel logs** in the deployment dashboard
2. **Verify local build**: `npm run build`
3. **Check Node.js version**: Ensure compatibility

### **Missing Files**
1. **Check .gitignore**: Ensure important files aren't excluded
2. **Verify GitHub upload**: All files should be in repository
3. **Check build output**: Ensure `dist` folder contains all assets

### **Performance Issues**
1. **Optimize images**: Use WebP format where possible
2. **Check bundle size**: Monitor JavaScript bundle size
3. **Enable caching**: Vercel handles this automatically

---

## 📊 DEPLOYMENT METRICS

### **Expected Performance**
- **Build Time**: 1-2 minutes
- **First Load**: < 2 seconds
- **Bundle Size**: ~70KB (gzipped)
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

### **Vercel Features**
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Automatic deployments**
- ✅ **Preview deployments** (for pull requests)
- ✅ **Analytics** (optional)

---

## 🎉 SUCCESS INDICATORS

Your deployment is successful when:
- ✅ GitHub repository contains all files
- ✅ Vercel build completes without errors
- ✅ Live site loads and functions correctly
- ✅ All features work as expected
- ✅ Love messages appear for both daughters
- ✅ Math questions generate correctly
- ✅ Analytics and progress tracking function

---

## 🔗 USEFUL LINKS

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/amc-math-practice`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **Live Site**: `https://amc-math-practice.vercel.app`
- **Vercel Documentation**: `https://vercel.com/docs`

---

## 🎁 BONUS: SHARING WITH YOUR DAUGHTERS

Once deployed, you can:
1. **Share the URL** with Bella and Annie
2. **Bookmark it** on their devices
3. **Set it as homepage** for easy access
4. **Share with teachers** for educational use

**Your personalized AMC Math Practice app will be live and accessible from anywhere!** 🌟 