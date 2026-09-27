# Fleex Garments — Modern E-Commerce Storefront

A modern e-commerce storefront for Fleex Garments with a structured catalog, wishlist, real-time search and filtering, and seamless WhatsApp ordering and customer support redirect.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`. When you push to GitHub, it will automatically build and publish your website.

1. **Create a new GitHub Repository**:
   - Go to [github.com/new](https://github.com/new).
   - Name your repository (e.g. `fleex-garments`).
   - Set it to **Public** (GitHub Pages is free for public repositories).
   - Do not initialize with a README if you are pushing existing code.

2. **Initialize Git & Push Your Code**:
   In your project terminal, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Fleex Garments storefront"
   git branch -M main
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Open your repository on GitHub.
   - Click on **Settings** (top tab).
   - Click on **Pages** in the left sidebar under *Code and automation*.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.
   - Your site will automatically build and be live at:
     ```
     https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/
     ```

---

### Option 2: Deploy from Branch via `/docs` (Easiest & Instant)

We have pre-built the compiled website into the `docs/` folder:

1. Push the code to GitHub (`git add . && git commit -m "Add docs" && git push origin main`).
2. Go to **Settings** -> **Pages** in your GitHub repository.
3. Under **Build and deployment** -> **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and set the folder dropdown to **`/docs`** (instead of `/ (root)`).
5. Click **Save**. GitHub Pages will immediately serve `docs/index.html`!

---

## 📱 How to Customize Your WhatsApp Number

By default, the storefront uses a demo business number (`+15557892026`). You can update it in two ways:

1. **In the Web App**:
   - Click **WhatsApp Support** or the floating WhatsApp button.
   - Click **Change Phone** in the concierge modal.
   - Enter your international phone number with country code (e.g. `+1 234 567 8901` or `+91 98765 43210`) and click **Save**. It will be saved locally.

2. **In Code**:
   - Open `src/utils/whatsapp.ts`.
   - Update `DEFAULT_STORE_PHONE`:
     ```ts
     export const DEFAULT_STORE_PHONE = '+1234567890'; // Replace with your phone number
     ```

---

## 🛠 Local Development

To run the project locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server
npm run dev

# 3. Build for production
npm run build
```
