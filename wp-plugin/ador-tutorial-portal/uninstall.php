<?php
/**
 * Fired when the plugin is uninstalled.
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Cleanup any options or transients if needed
delete_option('ador_portal_options');
