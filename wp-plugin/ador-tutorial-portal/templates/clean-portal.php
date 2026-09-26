<?php
/**
 * Fullscreen Clean Template for Ador Tutorial Center
 * Completely removes WordPress theme headers, "My Blog", footers, and sidebars
 * to display the Ador Tutorial Center as a full, edge-to-edge website.
 */
if (!defined('ABSPATH')) {
    exit;
}

$app_dir_url = plugin_dir_url(dirname(__FILE__)) . 'app/';
$app_index_url = $app_dir_url . 'index.html';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Ador Tutorial Center | Master Any Subject with Expert Tutors</title>
    <meta name="description" content="Premier tutorial and home tutoring service in Ethiopia. Connect with top tutors for Ministry prep, national exams, and international curricula.">
    <link rel="icon" type="image/svg+xml" href="<?php echo esc_url($app_dir_url . 'favicon.svg'); ?>">
    <link rel="apple-touch-icon" href="<?php echo esc_url($app_dir_url . 'ador-logo.png'); ?>">
    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            height: 100vh;
            overflow: hidden;
            background-color: #0f172a;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        #ador-app-frame {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            border: none;
            display: block;
            z-index: 99999;
        }
        /* Hide WordPress admin bar on front end for visitors, or allow clean display */
        #wpadminbar {
            opacity: 0.1;
            transition: opacity 0.3s;
        }
        #wpadminbar:hover {
            opacity: 1;
        }
    </style>
</head>
<body>
    <iframe 
        id="ador-app-frame" 
        src="<?php echo esc_url($app_index_url); ?>" 
        allow="camera; microphone; geolocation; clipboard-write; payment" 
        allowfullscreen>
    </iframe>
</body>
</html>
<?php
exit;
