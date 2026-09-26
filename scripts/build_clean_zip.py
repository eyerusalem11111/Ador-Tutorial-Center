#!/usr/bin/env python3
import os
import shutil
import subprocess
import zipfile
import time

def add_dir_to_zip(zf, dir_rel_path):
    """Add explicit directory entry with proper Unix and DOS attributes."""
    if not dir_rel_path.endswith('/'):
        dir_rel_path += '/'
    zinfo = zipfile.ZipInfo(dir_rel_path)
    zinfo.date_time = time.localtime(time.time())[:6]
    # 0o040755: Directory mode | 0x10: MS-DOS Directory attribute
    zinfo.external_attr = (0o040755 << 16) | 0x10
    zf.writestr(zinfo, b'')

def add_file_to_zip(zf, file_full_path, file_rel_path):
    """Add file with proper permissions and timestamps."""
    zinfo = zipfile.ZipInfo(file_rel_path)
    zinfo.date_time = time.localtime(os.path.getmtime(file_full_path))[:6]
    zinfo.external_attr = 0o100644 << 16
    with open(file_full_path, 'rb') as f:
        zf.writestr(zinfo, f.read(), compress_type=zipfile.ZIP_DEFLATED)

def build():
    print("=== 1. Building Vite frontend ===")
    for p in ['public/ador-tutorial-portal.zip', 'dist/ador-tutorial-portal.zip']:
        if os.path.exists(p):
            os.remove(p)

    subprocess.run(["npm", "run", "build"], check=True)
    
    print("=== 2. Setting up clean staging directory ===")
    staging_root = "/tmp/clean_plugin_staging"
    if os.path.exists(staging_root):
        shutil.rmtree(staging_root)

    plugin_dir = os.path.join(staging_root, "ador-tutorial-portal")
    app_dir = os.path.join(plugin_dir, "app")
    app_assets_dir = os.path.join(app_dir, "assets")
    os.makedirs(app_assets_dir, exist_ok=True)

    src_plugin = "wp-plugin/ador-tutorial-portal"
    # Copy plugin root files
    for f in ["ador-tutorial-portal.php", "uninstall.php", "readme.txt", "index.php"]:
        src_f = os.path.join(src_plugin, f)
        if os.path.exists(src_f):
            shutil.copy2(src_f, os.path.join(plugin_dir, f))

    # Copy templates if present
    src_templates = os.path.join(src_plugin, "templates")
    if os.path.exists(src_templates):
        dst_templates = os.path.join(plugin_dir, "templates")
        shutil.copytree(src_templates, dst_templates, dirs_exist_ok=True)

    # Copy entire dist content into app/ (excluding zip files)
    for root, dirs, files in os.walk("dist"):
        rel_root = os.path.relpath(root, "dist")
        if rel_root == ".":
            target_dir = app_dir
        else:
            target_dir = os.path.join(app_dir, rel_root)
        os.makedirs(target_dir, exist_ok=True)

        for file in files:
            if file.endswith(".zip"):
                continue
            src_file = os.path.join(root, file)
            dst_file = os.path.join(target_dir, file)
            shutil.copy2(src_file, dst_file)

    shutil.copy2(os.path.join(src_plugin, "index.php"), os.path.join(app_dir, "index.php"))

    print("=== 3. Packaging into Standard WordPress Plugin ZIP ===")
    zip_path = "public/ador-tutorial-portal.zip"
    if os.path.exists(zip_path):
        os.remove(zip_path)

    # We will build zip with explicit directory entries first
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        # Add root plugin dir
        add_dir_to_zip(zf, "ador-tutorial-portal/")
        
        for root, dirs, files in os.walk(plugin_dir):
            rel_dir = os.path.relpath(root, staging_root)
            if rel_dir != "ador-tutorial-portal":
                add_dir_to_zip(zf, rel_dir)
            for f in files:
                full_path = os.path.join(root, f)
                rel_file = os.path.relpath(full_path, staging_root)
                add_file_to_zip(zf, full_path, rel_file)

    print(f"Created {zip_path} ({os.path.getsize(zip_path):,} bytes)")
    shutil.copy2(zip_path, "dist/ador-tutorial-portal.zip")

    print("=== 4. Verifying ZIP contents & Directory flags ===")
    with zipfile.ZipFile(zip_path, "r") as zf:
        for item in zf.infolist():
            print(f"  {item.filename:48} is_dir={item.is_dir()!s:5} attr={oct(item.external_attr >> 16):8} size={item.file_size:,}")

if __name__ == "__main__":
    build()
