import os
import shutil
import zipfile

def zip_directory(src_dir, zip_filepath, prefix=''):
    os.makedirs(os.path.dirname(zip_filepath), exist_ok=True)
    with zipfile.ZipFile(zip_filepath, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(src_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, src_dir)
                arcname = os.path.join(prefix, rel_path) if prefix else rel_path
                zipf.write(full_path, arcname)
    size_mb = os.path.getsize(zip_filepath) / (1024 * 1024)
    print(f"Created: {zip_filepath} ({size_mb:.2f} MB)")

def main():
    # 1. Package WordPress Plugin
    wp_staging = '/tmp/wp-plugin-staging'
    if os.path.exists(wp_staging):
        shutil.rmtree(wp_staging)
    plugin_root = os.path.join(wp_staging, 'ador-tutorial-center')
    app_folder = os.path.join(plugin_root, 'app')
    os.makedirs(app_folder, exist_ok=True)

    # Copy dist into plugin's app folder (excluding any previously generated zip files)
    for item in os.listdir('dist'):
        if item.endswith('.zip'):
            continue
        s = os.path.join('dist', item)
        d = os.path.join(app_folder, item)
        if os.path.isdir(s):
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)

    # Write plugin PHP
    php_code = """<?php
/**
 * Plugin Name: Ador Tutorial Center Portal & Management Platform
 * Plugin URI: https://adortutorial.et
 * Description: Complete multi-role tutoring portal, parent tuition verification desk, tutor recruitment platform, monthly academic progress reports, and bilingual English/Amharic interface for Ador Tutorial Center.
 * Version: 1.0.0
 * Author: Ador Tutorial Center & Eyerusalem Melaku
 * Author URI: https://adortutorial.et
 * License: GPL2
 * Text Domain: ador-tutorial-center
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Shortcode: [ador_tutorial_center]
 * Optional attributes: height="950px" width="100%"
 */
function ador_tutorial_center_shortcode($atts) {
    $a = shortcode_atts(array(
        'height' => '950px',
        'width' => '100%',
        'border_radius' => '16px',
    ), $atts);

    $plugin_url = plugin_dir_url(__FILE__);
    $app_url = $plugin_url . 'app/index.html';

    $output = '<div class="ador-tutorial-center-wrapper" style="width:' . esc_attr($a['width']) . '; max-width: 100%; margin: 1.5rem auto; clear: both;">';
    $output .= '  <div style="position: relative; width: 100%; height:' . esc_attr($a['height']) . '; border-radius:' . esc_attr($a['border_radius']) . '; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 51, 153, 0.12); border: 1px solid #cbd5e1; background: #ffffff;">';
    $output .= '    <iframe src="' . esc_url($app_url) . '" title="Ador Tutorial Center" style="width: 100%; height: 100%; border: none; min-height: 650px;" allow="clipboard-read; clipboard-write; fullscreen"></iframe>';
    $output .= '  </div>';
    $output .= '</div>';

    return $output;
}
add_shortcode('ador_tutorial_center', 'ador_tutorial_center_shortcode');

/**
 * Admin Menu Page
 */
function ador_tutorial_center_admin_menu() {
    add_menu_page(
        'Ador Tutorial Center',
        'Ador Center',
        'manage_options',
        'ador-tutorial-center',
        'ador_tutorial_center_admin_page',
        'dashicons-welcome-learn-more',
        30
    );
}
add_action('admin_menu', 'ador_tutorial_center_admin_menu');

function ador_tutorial_center_admin_page() {
    $plugin_url = plugin_dir_url(__FILE__);
    $app_url = $plugin_url . 'app/index.html';
    ?>
    <div class="wrap" style="margin-right: 20px;">
        <h1 style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-weight: 800; color: #1e3a8a;">
            <span>Ador Tutorial Center &bull; Executive Operations Portal</span>
        </h1>
        <p style="color: #475569; font-size: 14px; margin-bottom: 16px;">
            To embed the tutorial center onto any public page, post, or Elementor container, insert this shortcode: <code style="font-size: 14px; background: #e0e7ff; color: #1e40af; padding: 3px 8px; border-radius: 4px; font-weight: bold;">[ador_tutorial_center]</code>
        </p>
        <div style="width: 100%; height: 86vh; background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #cbd5e1;">
            <iframe src="<?php echo esc_url($app_url); ?>" style="width: 100%; height: 100%; border: none;" allow="clipboard-read; clipboard-write; fullscreen"></iframe>
        </div>
    </div>
    <?php
}
"""
    with open(os.path.join(plugin_root, 'ador-tutorial-center.php'), 'w') as f:
        f.write(php_code)

    readme_code = """=== Ador Tutorial Center Portal ===
Contributors: Eyerusalem Melaku, Ador Tutorial Center
Tags: tutoring, education, ethiopia, amharic, student management, payment verification
Requires at least: 5.0
Tested up to: 6.7
Stable tag: 1.0.0
License: GPLv2 or later

== Description ==
Complete tutorial center management platform for Ador Tutorial Center (Addis Ababa, Ethiopia).
Features bilingual English/Amharic UI, Parent tuition desk, Tutor 500 ETB membership verification, monthly progress reports, salary payouts, and role-based access control.

== Quick Start ==
1. Go to WP Admin > Plugins > Add New > Upload Plugin.
2. Choose ador-tutorial-center-wp-plugin.zip and click Install Now.
3. Activate the plugin.
4. Add [ador_tutorial_center] to any page or post.
"""
    with open(os.path.join(plugin_root, 'readme.txt'), 'w') as f:
        f.write(readme_code)

    # Create WordPress Plugin ZIP
    os.makedirs('public', exist_ok=True)
    zip_directory(wp_staging, 'public/ador-tutorial-center-wp-plugin.zip')

    # 2. Package dist standalone ZIP
    zip_directory('dist', 'public/ador-tutorial-center-dist.zip', prefix='ador-portal-dist')

    # 3. Package source code ZIP (only source files, fast!)
    src_staging = '/tmp/src-staging'
    if os.path.exists(src_staging):
        shutil.rmtree(src_staging)
    src_root = os.path.join(src_staging, 'ador-tutorial-center')
    os.makedirs(src_root, exist_ok=True)

    # Copy source items
    for item in ['src', 'public', 'index.html', 'package.json', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'vite.config.ts', 'README.md', 'metadata.json']:
        if os.path.exists(item):
            d = os.path.join(src_root, item)
            if os.path.isdir(item):
                shutil.copytree(item, d)
            else:
                shutil.copy2(item, d)

    zip_directory(src_staging, 'public/ador-tutorial-center-source.zip')

    # Also copy the zip files to dist so they can be downloaded directly from the running production app!
    for zip_file in ['ador-tutorial-center-wp-plugin.zip', 'ador-tutorial-center-dist.zip', 'ador-tutorial-center-source.zip']:
        src_path = os.path.join('public', zip_file)
        if os.path.exists(src_path):
            shutil.copy2(src_path, os.path.join('dist', zip_file))

    print("All ZIP packages generated and copied to public/ and dist/ successfully!")

if __name__ == '__main__':
    main()
