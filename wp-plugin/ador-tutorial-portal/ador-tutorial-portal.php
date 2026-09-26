<?php
/**
 * Plugin Name: Ador Tutorial Center Portal
 * Plugin URI: https://adortutorial.com
 * Description: Official Multilingual Academic Operations Platform & Live Tutoring Job Board for Ador Tutorial Center. Seamlessly integrates with Ultimate Member, Elementor, and WordPress pages via the [ador_portal] shortcode.
 * Version: 1.0.0
 * Author: Ador Tutorial Center (adortutorial.com)
 * Author URI: https://adortutorial.com
 * License: GPLv2 or later
 * Text Domain: ador-tutorial-portal
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('ADOR_PORTAL_VERSION', '1.0.0');
define('ADOR_PORTAL_DIR', plugin_dir_path(__FILE__));
define('ADOR_PORTAL_URL', plugin_dir_url(__FILE__));

/**
 * Register Shortcode [ador_portal] or [ador_tutorial_portal]
 *
 * Usage:
 * [ador_portal]
 * [ador_portal height="950px"]
 * [ador_portal view="website"] -> loads official website with Mission, Vision, Values, Job Board
 * [ador_portal view="tutor"]   -> loads Tutor Portal
 * [ador_portal view="parent"]  -> loads Parent Portal
 * [ador_portal view="admin"]   -> loads Admin Hub
 */
function ador_portal_render_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '950px',
        'view' => 'website',
    ), $atts, 'ador_portal');

    $app_url = ADOR_PORTAL_URL . 'app/index.html';
    $target_view = sanitize_text_field($atts['view']);

    // Auto-detect Ultimate Member user role if logged in
    if (function_exists('um_user') && is_user_logged_in()) {
        $um_role = strtolower((string)um_user('role'));
        if (strpos($um_role, 'tutor') !== false) {
            $target_view = 'tutor';
        } elseif (strpos($um_role, 'parent') !== false) {
            $target_view = 'parent';
        } elseif (current_user_can('manage_options')) {
            $target_view = 'admin';
        }
    }

    if (!empty($target_view)) {
        $app_url .= '#' . urlencode($target_view);
    }

    $height_css = esc_attr($atts['height']);

    $html = '<div class="ador-portal-embed-wrapper" style="width:100%;min-height:' . $height_css . ';margin:0 auto;position:relative;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px -5px rgba(0,0,0,0.06);background:#f8fafc;">';
    $html .= '<iframe src="' . esc_url($app_url) . '" style="width:100%;height:' . $height_css . ';min-height:' . $height_css . ';border:none;display:block;" title="Ador Tutorial Center Platform" allow="clipboard-write; payment" loading="lazy"></iframe>';
    $html .= '</div>';

    return $html;
}
add_shortcode('ador_portal', 'ador_portal_render_shortcode');
add_shortcode('ador_tutorial_portal', 'ador_portal_render_shortcode');
add_shortcode('ador_job_board', 'ador_portal_render_shortcode');
add_shortcode('ador_jobs', 'ador_portal_render_shortcode');

/**
 * Clean & Non-Intrusive Shortcode [ador_portal]
 * 
 * You can place [ador_portal] on ANY page of your choice (for example: /portal/).
 * This plugin NEVER modifies your homepage, never alters your existing theme,
 * and never injects content automatically into existing pages.
 */

/**
 * Automatically clean up any accidental injection from previous versions on the Front Page
 */
function ador_portal_clean_front_page_if_needed() {
    $front_page_id = get_option('page_on_front');
    if ($front_page_id) {
        $front_post = get_post($front_page_id);
        if ($front_post && !empty($front_post->post_content)) {
            $cleaned = false;
            $content = $front_post->post_content;
            
            // Remove automatic markers if previously injected
            if (strpos($content, '<!-- Ador Tutorial Portal -->') !== false || strpos($content, '[ador_portal]') !== false) {
                $new_content = str_replace(array(
                    "\n\n<!-- Ador Tutorial Portal -->\n[ador_portal]",
                    "<!-- Ador Tutorial Portal -->\n[ador_portal]",
                    "<!-- Ador Tutorial Portal -->",
                    "[ador_portal]"
                ), '', $content);

                if ($new_content !== $content) {
                    wp_update_post(array(
                        'ID'           => $front_page_id,
                        'post_content' => trim($new_content)
                    ));
                    $cleaned = true;
                }
            }
        }
    }
}
register_activation_hook(__FILE__, 'ador_portal_clean_front_page_if_needed');

// Clean & Fullscreen Template Handler: Removes Twenty Twenty-Five "My Blog" header and footer!
function ador_portal_clean_template_redirect($template) {
    if (is_admin()) {
        return $template;
    }

    $portal_page = get_page_by_path('portal');
    $portal_id = $portal_page ? $portal_page->ID : 0;

    $is_portal_page = is_page('portal') || (is_page() && get_the_ID() === $portal_id);
    $is_front_page_portal = (is_front_page() && $portal_id && get_option('page_on_front') == $portal_id);

    // Also check if current page content contains [ador_portal]
    global $post;
    $has_shortcode = ($post && !empty($post->post_content) && strpos($post->post_content, 'ador_portal') !== false);

    if ($is_portal_page || $is_front_page_portal || $has_shortcode) {
        $clean_file = plugin_dir_path(__FILE__) . 'templates/clean-portal.php';
        if (file_exists($clean_file)) {
            return $clean_file;
        }
    }

    return $template;
}
add_filter('template_include', 'ador_portal_clean_template_redirect', 9999);

// Optional dedicated /portal/ page creation only if user explicitly wants it
function ador_portal_ensure_dedicated_portal_page() {
    $portal_page = get_page_by_path('portal');
    if (!$portal_page) {
        wp_insert_post(array(
            'post_title'     => 'Ador Portal',
            'post_name'      => 'portal',
            'post_content'   => '[ador_portal height="100vh"]',
            'post_status'    => 'publish',
            'post_type'      => 'page',
            'comment_status' => 'closed'
        ));
    }
}
register_activation_hook(__FILE__, 'ador_portal_ensure_dedicated_portal_page');

// Handle Admin Actions (Set as Homepage or Clean Homepage)
function ador_portal_handle_admin_actions() {
    if (isset($_GET['ador_action']) && current_user_can('manage_options')) {
        if ($_GET['ador_action'] === 'clean_homepage') {
            ador_portal_clean_front_page_if_needed();
            update_option('show_on_front', 'posts');
            wp_redirect(admin_url('admin.php?page=ador-tutorial-portal&cleaned=1'));
            exit;
        }

        if ($_GET['ador_action'] === 'set_as_homepage') {
            $portal_page = get_page_by_path('portal');
            if (!$portal_page) {
                $page_id = wp_insert_post(array(
                    'post_title'     => 'Ador Portal',
                    'post_name'      => 'portal',
                    'post_content'   => '[ador_portal height="100vh"]',
                    'post_status'    => 'publish',
                    'post_type'      => 'page',
                    'comment_status' => 'closed'
                ));
            } else {
                $page_id = $portal_page->ID;
            }
            update_option('show_on_front', 'page');
            update_option('page_on_front', $page_id);
            wp_redirect(admin_url('admin.php?page=ador-tutorial-portal&set_home=1'));
            exit;
        }
    }
}
add_action('admin_init', 'ador_portal_handle_admin_actions');

function ador_portal_register_admin_menu() {
    add_menu_page(
        __('Ador Tutorial Portal', 'ador-tutorial-portal'),
        __('Ador Portal', 'ador-tutorial-portal'),
        'manage_options',
        'ador-tutorial-portal',
        'ador_portal_admin_dashboard_view',
        'dashicons-welcome-learn-more',
        25
    );
}
add_action('admin_menu', 'ador_portal_register_admin_menu');

function ador_portal_admin_dashboard_view() {
    $admin_url = ADOR_PORTAL_URL . 'app/index.html#admin';
    $is_home_set = (get_option('show_on_front') === 'page' && get_option('page_on_front') == get_page_by_path('portal')?->ID);
    ?>
    <div class="wrap" style="margin: 20px 20px 20px 0;">
        <h1 style="display:flex;align-items:center;gap:10px;">
            <span style="color:#1d4ed8;font-weight:800;">ADOR TUTORIAL CENTER</span> 
            <span style="font-size:13px;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:6px;font-weight:600;">Website & Operations Portal</span>
        </h1>

        <?php if (isset($_GET['set_home'])) : ?>
            <div class="notice notice-success is-dismissible" style="margin:15px 0;">
                <p><strong>Success!</strong> The Ador Tutorial Center Portal is now active as your main website homepage at <code><?php echo esc_url(home_url('/')); ?></code>!</p>
            </div>
        <?php endif; ?>

        <?php if (isset($_GET['cleaned'])) : ?>
            <div class="notice notice-info is-dismissible" style="margin:15px 0;">
                <p><strong>Restored!</strong> Homepage was reset to standard WordPress default.</p>
            </div>
        <?php endif; ?>

        <div style="background:#fff;padding:18px 24px;border-radius:10px;border:1px solid #ccd0d4;margin:15px 0;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="margin-top:0;color:#0f172a;font-size:16px;">Quick Display Settings</h3>
            <p style="margin:0 0 14px 0;font-size:14px;color:#475569;line-height:1.6;">
                <?php if ($is_home_set) : ?>
                    <span style="display:inline-block;padding:3px 10px;background:#dcfce7;color:#15803d;border-radius:20px;font-weight:600;font-size:12px;">Active Homepage</span>
                    Your Ador Tutorial platform is currently live as the <strong>front page of <?php echo esc_html($_SERVER['HTTP_HOST'] ?? 'your website'); ?></strong>.
                <?php else : ?>
                    Want this application to be the <strong>main homepage</strong> of your fresh WordPress site? Click the blue button below!
                <?php endif; ?>
            </p>

            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
                <a href="<?php echo esc_url(admin_url('admin.php?page=ador-tutorial-portal&ador_action=set_as_homepage')); ?>" class="button button-primary" style="background:#1d4ed8;border-color:#1e40af;padding:6px 16px;height:auto;font-size:13px;font-weight:600;">
                    &starf; Make This My Website Homepage
                </a>
                <a href="<?php echo esc_url(home_url('/portal/')); ?>" target="_blank" class="button button-secondary" style="padding:6px 14px;height:auto;font-size:13px;">
                    View Portal Page (/portal/) &rarr;
                </a>
                <?php if ($is_home_set) : ?>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=ador-tutorial-portal&ador_action=clean_homepage')); ?>" class="button" style="color:#b91c1c;border-color:#fca5a5;padding:6px 14px;height:auto;font-size:13px;">
                        Reset Homepage
                    </a>
                <?php endif; ?>
            </div>
        </div>

        <div style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #ccd0d4;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            <iframe src="<?php echo esc_url($admin_url); ?>" style="width:100%;height:900px;border:none;display:block;" title="Ador Admin Cockpit"></iframe>
        </div>
    </div>
    <?php
}
