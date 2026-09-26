import os, zipfile, shutil

# Create .htaccess for Apache / cPanel to handle SPA routing and caching
htaccess_content = """<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
"""

with open('dist/.htaccess', 'w') as f:
    f.write(htaccess_content)

# Now create adortutorial-full-site.zip containing everything directly at the root of the zip:
output_zip = 'public/adortutorial-full-site.zip'
if os.path.exists(output_zip):
    os.remove(output_zip)

with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('dist'):
        for file in files:
            # Skip any existing nested zip files
            if file.endswith('.zip'):
                continue
            filepath = os.path.join(root, file)
            arcname = os.path.relpath(filepath, 'dist')
            zipf.write(filepath, arcname)

# Also copy into dist so it is downloadable via public URL
shutil.copy2('public/adortutorial-full-site.zip', 'dist/adortutorial-full-site.zip')

print(f"Full site ZIP created successfully at {output_zip}!")
print(f"Zip file size: {os.path.getsize(output_zip)} bytes")

# List contents of zip
with zipfile.ZipFile(output_zip, 'r') as zipf:
    print("Files in ZIP root:")
    for name in zipf.namelist()[:15]:
        print(" -", name)
