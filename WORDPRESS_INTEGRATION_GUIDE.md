# 🚀 Ador Tutorial Center — WordPress Integration Guide

Dear Eyerusalem,

Below are the complete, step-by-step instructions for integrating your **Ador Tutorial Center Platform** directly into any WordPress site.

We have provided three ready-to-use packages in the project (available for direct download or upload):
1. **`ador-tutorial-center-wp-plugin.zip`** (Recommended) — Complete WordPress Plugin. Upload and activate in 60 seconds.
2. **`ador-tutorial-center-dist.zip`** — Standalone pre-built web application for custom hosting, subdomains, or folder uploads.
3. **`ador-tutorial-center-source.zip`** — Complete developer source code repository.

---

## 🌟 Method 1: WordPress Plugin (Easiest & Recommended)

This method requires **zero coding** and takes under 1 minute.

### Step 1: Upload the Plugin
1. Log in to your WordPress Admin dashboard (`yourdomain.com/wp-admin`).
2. In the left sidebar, navigate to **Plugins** > **Add New Plugin**.
3. Click the **Upload Plugin** button at the top of the page.
4. Click **Choose File** and select:
   ```
   ador-tutorial-center-wp-plugin.zip
   ```
5. Click **Install Now**.
6. When installation finishes, click **Activate Plugin**.

### Step 2: Display on Any Page or Post
You can now embed the platform anywhere on your website using the shortcode:
```text
[ador_tutorial_center]
```

#### In the WordPress Block Editor (Gutenberg):
1. Go to **Pages** > **Add New** (or edit an existing page like "Tutorial Portal" or "Parent Portal").
2. Click the `+` button to add a new block.
3. Search for **Shortcode** and insert it.
4. Type `[ador_tutorial_center]`.
5. (Optional) Set a custom height:
   ```text
   [ador_tutorial_center height="1000px"]
   ```
6. Set the page template to **Full Width** (or **Elementor Full Width**) if available in your theme.
7. Click **Publish** or **Update**.

#### In Elementor:
1. Open the page in **Elementor**.
2. Drag the **Shortcode** widget into your section.
3. Paste `[ador_tutorial_center]`.
4. Set section width to **Full Width**.
5. Save and preview!

### Step 3: Access via WordPress Admin Menu
The plugin also adds a dedicated **"Ador Center"** item in your WordPress admin sidebar (`/wp-admin`), allowing administrative staff to manage payments, tutor verification, and monthly reports directly from inside WordPress!

---

## 🌐 Method 2: Subfolder or Subdomain Hosting (cPanel / FTP)

If you prefer running the application as a standalone site or subdomain (e.g., `portal.adortutorial.et` or `adortutorial.et/portal`):

1. Unzip **`ador-tutorial-center-dist.zip`**.
2. Open your hosting control panel (cPanel File Manager, Plesk, or FTP).
3. Create a folder in your `public_html` directory named `portal` (or set the root directory of your subdomain `portal.adortutorial.et`).
4. Upload all files from the unzipped `ador-portal-dist` folder into that directory.
5. In your WordPress menu (**Appearance** > **Menus**):
   - Add a **Custom Link** pointing to `https://yourdomain.com/portal/` (or `https://portal.yourdomain.com`).
   - Label it "Portal" or "Ador System".

---

## 🎨 Theme & Brand Styling
- **Branding Palette**: Ador Royal Blue (`#003399` / `#1e40af`) and White (`#ffffff`), in strict compliance with your brand guidelines.
- **Multilingual Support**: English and Amharic (አማርኛ) are built-in, uniformly applied to all dashboards (Parent, Tutor, Admin, and Coordinator).

---

## 📞 Support & Verification
If you need any adjustments or hosting support, feel free to reach out. Thank you for your leadership, Eyerusalem!
