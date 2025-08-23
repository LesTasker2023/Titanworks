# 🚀 Supabase Setup Guide

## ✅ **What We've Built**

Your Daedalus platform now has a **complete authentication system** ready to connect to Supabase:

### **🔧 Components Installed:**

- ✅ **Supabase Client & Server** configurations
- ✅ **Next.js Middleware** for session management
- ✅ **AuthProvider** context for global auth state
- ✅ **Login Page** with Google, GitHub, and Magic Link auth
- ✅ **UserProfile** dropdown in navigation
- ✅ **Error Handling** for failed auth attempts
- ✅ **Environment Configuration** with fallbacks

## 🎯 **Next Steps - Connect to Your Supabase Project**

### **1. Create Your Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with GitHub
3. Click **"New Project"**
4. Choose organization and fill in:
   - **Project Name**: `daedalus-platform`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
5. Wait ~2 minutes for project creation

### **2. Get Your Project Keys**

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep secret!)

### **3. Update Your Environment Variables**

Edit `.env.local` file in your project root:

```bash
# Replace these with your actual Supabase values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

# Database URL (from Supabase Settings → Database)
DATABASE_URL=postgresql://postgres:your_password@db.your-project-id.supabase.co:5432/postgres

# Generate a random secret (use: openssl rand -base64 32)
NEXTAUTH_SECRET=your_random_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### **4. Configure OAuth Providers**

#### **Google OAuth:**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable **Google+ API**
4. Create **OAuth 2.0 Client ID**
5. Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
6. In Supabase: **Authentication** → **Providers** → **Google**
   - Enable Google provider
   - Add your Client ID and Client Secret

#### **GitHub OAuth:**

1. Go to GitHub → **Settings** → **Developer Settings** → **OAuth Apps**
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `Daedalus Platform`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `https://your-project-id.supabase.co/auth/v1/callback`
4. In Supabase: **Authentication** → **Providers** → **GitHub**
   - Enable GitHub provider
   - Add your Client ID and Client Secret

### **5. Test Authentication**

1. Restart your dev server: `yarn dev`
2. Visit: `http://localhost:3000/auth/login`
3. Try signing in with Google or GitHub
4. Check the navigation - you should see your profile avatar!

## 🔥 **What Works Now**

- ✅ **Social Login** (Google, GitHub)
- ✅ **Magic Link** email authentication
- ✅ **User Profile** dropdown in navigation
- ✅ **Session Management** with automatic refresh
- ✅ **Protected Routes** (middleware ready)
- ✅ **Graceful Fallbacks** when Supabase isn't configured

## 🚨 **If You Hit Issues**

### **"Authentication will not work" warnings:**

- Normal! This shows until you add real Supabase credentials

### **OAuth redirect errors:**

- Double-check callback URLs match exactly
- Make sure providers are enabled in Supabase

### **Environment variables not loading:**

- Restart dev server after updating `.env.local`
- Ensure no extra spaces or quotes in env values

### **Build/runtime errors:**

- Check console for specific error messages
- Verify all Supabase URLs are valid (no typos)

## 🎯 **Next After Auth Works**

Once authentication is working, you can:

1. **Add user data** to your platforms (save preferences, content)
2. **Implement user roles** (admin, creator, viewer)
3. **Add database tables** for your app data
4. **Build user dashboards** with personalized content
5. **Enable real-time features** with Supabase subscriptions

## 📊 **Database Schema (Coming Next)**

After auth is working, we'll add:

- **User profiles** table
- **Platform-specific data** (videos, products, bookings)
- **Analytics tracking** per user
- **Settings and preferences**

---

**🚀 You've built the foundation. Now make it real by connecting Supabase!**

_Total setup time: ~15 minutes_  
_Result: Production-ready authentication system_
