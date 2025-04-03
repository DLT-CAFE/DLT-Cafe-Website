<?php
/*
Plugin Name: DLT Cafe Newsletter
Description: Handles newsletter subscriptions with a dedicated admin interface
Version: 1.0.1
Author: DLT Cafe
*/

// Make sure WP is loaded
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Plugin activation hook
register_activation_hook(__FILE__, 'dltcafe_newsletter_activate');
function dltcafe_newsletter_activate() {
    // Create post type on activation
    dltcafe_newsletter_register_post_type();
    
    // Force flush rewrite rules
    flush_rewrite_rules();
    
    // Set version
    update_option('dltcafe_newsletter_version', '1.0.1');
}

// Plugin deactivation hook
register_deactivation_hook(__FILE__, 'dltcafe_newsletter_deactivate');
function dltcafe_newsletter_deactivate() {
    // Force flush rewrite rules
    flush_rewrite_rules();
}

// Register Newsletter Post Type
add_action('init', 'dltcafe_newsletter_register_post_type');
function dltcafe_newsletter_register_post_type() {
    $args = array(
        'public' => false,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => false,
        'show_in_admin_bar' => true,
        'menu_position' => 25,
        'menu_icon' => 'dashicons-email',
        'hierarchical' => false,
        'supports' => array('title', 'custom-fields'),
        'has_archive' => false,
        'can_export' => true,
        'labels' => array(
            'name' => 'Newsletter',
            'singular_name' => 'Subscriber',
            'menu_name' => '📧 Newsletter',
            'all_items' => 'All Subscribers',
            'add_new' => 'Add Subscriber',
            'add_new_item' => 'Add New Subscriber',
            'edit_item' => 'Edit Subscriber',
            'new_item' => 'New Subscriber',
            'view_item' => 'View Subscriber',
            'search_items' => 'Search Subscribers',
            'not_found' => 'No subscribers found',
            'not_found_in_trash' => 'No subscribers found in trash'
        ),
        'capability_type' => 'post',
    );

    register_post_type('newsletter_subscriber', $args);
}

// Log function to help debug
function dltcafe_newsletter_log($message) {
    if (WP_DEBUG === true) {
        if (is_array($message) || is_object($message)) {
            error_log(print_r($message, true));
        } else {
            error_log($message);
        }
    }
}

// Register REST API endpoint
add_action('rest_api_init', 'dltcafe_newsletter_register_endpoint');
function dltcafe_newsletter_register_endpoint() {
    register_rest_route('dltcafe/v1', '/newsletter', array(
        'methods' => 'POST',
        'callback' => 'handle_newsletter_subscription',
        'permission_callback' => '__return_true'
    ));
    
    dltcafe_newsletter_log('REST API endpoint registered: dltcafe/v1/newsletter');
}

// Handler function
function handle_newsletter_subscription($request) {
    dltcafe_newsletter_log('Newsletter subscription request received');
    
    $params = $request->get_params();
    dltcafe_newsletter_log($params);
    
    if (empty($params['email'])) {
        dltcafe_newsletter_log('Newsletter subscription failed: Email is required');
        return new WP_Error('missing_email', 'Email is required', array('status' => 400));
    }

    // Check if email already exists
    $existing = get_posts(array(
        'post_type' => 'newsletter_subscriber',
        'meta_key' => 'email',
        'meta_value' => $params['email'],
        'posts_per_page' => 1
    ));

    if (!empty($existing)) {
        dltcafe_newsletter_log('Newsletter subscription failed: Email already exists - ' . $params['email']);
        return array(
            'success' => false,
            'message' => 'This email is already subscribed.'
        );
    }

    $post_data = array(
        'post_title' => wp_strip_all_tags($params['email']),
        'post_type' => 'newsletter_subscriber',
        'post_status' => 'publish'
    );

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        dltcafe_newsletter_log('Newsletter subscription failed: Database error - ' . $post_id->get_error_message());
        return new WP_Error('db_error', 'Could not save subscription', array('status' => 500));
    }

    // Save subscriber data
    update_post_meta($post_id, 'email', sanitize_email($params['email']));
    if (!empty($params['fullName'])) {
        update_post_meta($post_id, 'full_name', sanitize_text_field($params['fullName']));
    }
    if (!empty($params['interests'])) {
        update_post_meta($post_id, 'interests', $params['interests']);
    }
    update_post_meta($post_id, 'status', 'Subscribed');
    update_post_meta($post_id, 'subscription_date', current_time('mysql'));

    // Send confirmation email
    $to = sanitize_email($params['email']);
    $subject = 'Welcome to DLT Cafe Newsletter';
    $message = "Hello " . (!empty($params['fullName']) ? $params['fullName'] : 'there') . ",\n\n";
    $message .= "Thank you for subscribing to our newsletter! We're excited to have you join our community.\n\n";
    $message .= "You'll receive updates about our latest content, events, and opportunities.\n\n";
    $message .= "Best regards,\nDLT Cafe Team";
    $headers = array('Content-Type: text/plain; charset=UTF-8');
    
    wp_mail($to, $subject, $message, $headers);

    // Notify admin
    $admin_email = get_option('admin_email');
    $admin_subject = 'New Newsletter Subscriber';
    $admin_message = "New subscriber details:\n\n";
    $admin_message .= "Email: {$params['email']}\n";
    if (!empty($params['fullName'])) {
        $admin_message .= "Name: {$params['fullName']}\n";
    }
    if (!empty($params['interests'])) {
        $admin_message .= "Interests: " . implode(', ', $params['interests']) . "\n";
    }
    
    wp_mail($admin_email, $admin_subject, $admin_message, $headers);

    dltcafe_newsletter_log('Newsletter subscription successful: ' . $params['email']);
    
    return array(
        'success' => true,
        'message' => 'Thank you for subscribing to our newsletter!'
    );
}

// Add admin columns
add_filter('manage_newsletter_subscriber_posts_columns', 'set_newsletter_columns');
function set_newsletter_columns($columns) {
    return array(
        'cb' => '<input type="checkbox" />',
        'title' => __('Email'),
        'full_name' => __('Full Name'),
        'interests' => __('Interests'),
        'subscription_date' => __('Subscribed On'),
        'status' => __('Status')
    );
}

add_action('manage_newsletter_subscriber_posts_custom_column', 'custom_newsletter_column_content', 10, 2);
function custom_newsletter_column_content($column, $post_id) {
    switch ($column) {
        case 'full_name':
            echo esc_html(get_post_meta($post_id, 'full_name', true));
            break;
        case 'interests':
            $interests = get_post_meta($post_id, 'interests', true);
            if (is_array($interests)) {
                echo esc_html(implode(', ', $interests));
            }
            break;
        case 'subscription_date':
            $date = get_post_meta($post_id, 'subscription_date', true);
            echo $date ? date('M j, Y', strtotime($date)) : '';
            break;
        case 'status':
            $status = get_post_meta($post_id, 'status', true) ?: 'Subscribed';
            echo '<span class="status-badge status-' . sanitize_html_class(strtolower($status)) . '">' . esc_html($status) . '</span>';
            break;
    }
}

// Make columns sortable
add_filter('manage_edit-newsletter_subscriber_sortable_columns', 'set_newsletter_sortable_columns');
function set_newsletter_sortable_columns($columns) {
    $columns['full_name'] = 'full_name';
    $columns['subscription_date'] = 'subscription_date';
    $columns['status'] = 'status';
    return $columns;
}

// Add Export functionality
add_action('admin_menu', 'dltcafe_add_export_page');
function dltcafe_add_export_page() {
    add_submenu_page(
        'edit.php?post_type=newsletter_subscriber',
        'Export Subscribers',
        'Export Subscribers',
        'manage_options',
        'newsletter-export',
        'render_newsletter_export_page'
    );
    
    dltcafe_newsletter_log('Export page added to admin menu');
}

// Render export page
function render_newsletter_export_page() {
    // Check if export was requested
    if (isset($_POST['export_subscribers']) && check_admin_referer('newsletter_export_nonce')) {
        export_subscribers_to_csv();
    }
    
    // Render export form
    ?>
    <div class="wrap">
        <h1>Export Newsletter Subscribers</h1>
        <div class="card" style="max-width: 600px; padding: 20px; margin-top: 20px;">
            <h2>Download Subscriber Data</h2>
            <p>Export all your newsletter subscribers to a CSV file. This file can be imported into email marketing services.</p>
            
            <form method="post">
                <?php wp_nonce_field('newsletter_export_nonce'); ?>
                
                <div style="margin-bottom: 20px;">
                    <h3>Select Fields to Export</h3>
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="checkbox" name="export_fields[]" value="email" checked disabled> 
                        Email Address (always included)
                    </label>
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="checkbox" name="export_fields[]" value="full_name" checked> 
                        Full Name
                    </label>
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="checkbox" name="export_fields[]" value="interests" checked> 
                        Interests
                    </label>
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="checkbox" name="export_fields[]" value="subscription_date" checked> 
                        Subscription Date
                    </label>
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="checkbox" name="export_fields[]" value="status" checked> 
                        Status
                    </label>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3>Export Options</h3>
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="checkbox" name="active_only" checked> 
                        Only export active subscribers
                    </label>
                </div>
                
                <button type="submit" name="export_subscribers" class="button button-primary">
                    <span class="dashicons dashicons-download" style="margin-top: 3px;"></span> 
                    Export to CSV
                </button>
            </form>
        </div>
    </div>
    <?php
}

// Export to CSV function
function export_subscribers_to_csv() {
    // Get selected fields (email is always included)
    $fields = isset($_POST['export_fields']) ? $_POST['export_fields'] : array();
    array_unshift($fields, 'email'); // Ensure email is first
    $fields = array_unique($fields);
    
    // Set up query args
    $args = array(
        'post_type' => 'newsletter_subscriber',
        'posts_per_page' => -1,
        'order' => 'DESC',
        'orderby' => 'date'
    );
    
    // Filter by status if active_only is checked
    if (isset($_POST['active_only'])) {
        $args['meta_query'] = array(
            array(
                'key' => 'status',
                'value' => 'Unsubscribed',
                'compare' => '!='
            )
        );
    }
    
    $subscribers = get_posts($args);
    
    // Prepare headers
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=newsletter-subscribers-' . date('Y-m-d') . '.csv');
    
    // Create a file pointer connected to the output stream
    $output = fopen('php://output', 'w');
    
    // Add UTF-8 BOM to fix special characters in Excel
    fputs($output, "\xEF\xBB\xBF");
    
    // Add the header row
    $header = array_map('ucwords', str_replace('_', ' ', $fields));
    fputcsv($output, $header);
    
    // Add the data rows
    foreach ($subscribers as $subscriber) {
        $row = array();
        
        foreach ($fields as $field) {
            if ($field === 'email') {
                $row[] = $subscriber->post_title;
            } else {
                $value = get_post_meta($subscriber->ID, $field, true);
                
                if (is_array($value)) {
                    $value = implode(', ', $value);
                }
                
                $row[] = $value;
            }
        }
        
        fputcsv($output, $row);
    }
    
    fclose($output);
    exit;
}

// Add Dashboard Widget
add_action('wp_dashboard_setup', 'dltcafe_newsletter_add_dashboard_widget');
function dltcafe_newsletter_add_dashboard_widget() {
    wp_add_dashboard_widget(
        'dltcafe_newsletter_stats',
        '📧 Newsletter Statistics',
        'display_newsletter_stats_widget'
    );
    
    dltcafe_newsletter_log('Dashboard widget added');
}

function display_newsletter_stats_widget() {
    // Get total subscribers
    $total = wp_count_posts('newsletter_subscriber');
    
    // Get this month's subscribers
    $this_month = get_posts(array(
        'post_type' => 'newsletter_subscriber',
        'date_query' => array(
            array(
                'year' => date('Y'),
                'month' => date('m')
            )
        ),
        'posts_per_page' => -1
    ));
    
    // Get last 5 subscribers
    $recent = get_posts(array(
        'post_type' => 'newsletter_subscriber',
        'posts_per_page' => 5,
        'orderby' => 'date',
        'order' => 'DESC'
    ));
    
    echo '<div class="newsletter-stats-container">';
    
    // Display stats
    echo '<div class="stats-overview">';
    echo '<p><strong>Total Subscribers:</strong> ' . $total->publish . '</p>';
    echo '<p><strong>New This Month:</strong> ' . count($this_month) . '</p>';
    
    // Add quick links
    echo '<div class="quick-links" style="margin-top: 15px;">';
    echo '<a href="' . admin_url('edit.php?post_type=newsletter_subscriber') . '" class="button button-secondary">View All</a> ';
    echo '<a href="' . admin_url('edit.php?post_type=newsletter_subscriber&page=newsletter-export') . '" class="button button-secondary">Export</a>';
    echo '</div>';
    
    echo '</div>';
    
    // Display recent subscribers
    if (!empty($recent)) {
        echo '<h4>Recent Subscribers</h4>';
        echo '<ul class="recent-subscribers">';
        foreach ($recent as $subscriber) {
            $full_name = get_post_meta($subscriber->ID, 'full_name', true);
            $date = get_post_meta($subscriber->ID, 'subscription_date', true);
            echo '<li>';
            echo '<strong>' . ($full_name ?: 'Anonymous') . '</strong><br>';
            echo '<small>' . $subscriber->post_title . '</small>';
            if ($date) {
                echo '<br><small class="text-muted">' . date('M j, Y', strtotime($date)) . '</small>';
            }
            echo '</li>';
        }
        echo '</ul>';
    }
    
    echo '</div>';
}

// Add admin styles
add_action('admin_head', 'dltcafe_newsletter_admin_styles');
function dltcafe_newsletter_admin_styles() {
    // Only add styles on newsletter pages
    $screen = get_current_screen();
    if (!$screen || !in_array($screen->post_type, array('newsletter_subscriber'))) {
        return;
    }
    
    echo '<style>
        /* Newsletter Stats Widget */
        .newsletter-stats-container {
            margin: -12px;
            padding: 12px;
        }
        
        .stats-overview {
            background: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        .stats-overview p {
            margin: 8px 0;
        }
        
        .recent-subscribers {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .recent-subscribers li {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        
        .recent-subscribers li:last-child {
            border-bottom: none;
        }
        
        .recent-subscribers small {
            color: #666;
        }
        
        .text-muted {
            color: #888;
        }
        
        /* Status badges */
        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }
        
        .status-subscribed {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .status-unsubscribed {
            background-color: #ffebee;
            color: #c62828;
        }
        
        /* Column widths */
        .column-full_name { width: 20%; }
        .column-interests { width: 20%; }
        .column-subscription_date { width: 15%; }
        .column-status { width: 100px; }
    </style>';
}

// Add bulk actions
add_filter('bulk_actions-edit-newsletter_subscriber', 'register_newsletter_bulk_actions');
function register_newsletter_bulk_actions($bulk_actions) {
    $bulk_actions['mark_subscribed'] = __('Mark as Subscribed');
    $bulk_actions['mark_unsubscribed'] = __('Mark as Unsubscribed');
    return $bulk_actions;
}

add_filter('handle_bulk_actions-edit-newsletter_subscriber', 'handle_newsletter_bulk_actions', 10, 3);
function handle_newsletter_bulk_actions($redirect_to, $action, $post_ids) {
    if ($action === 'mark_subscribed' || $action === 'mark_unsubscribed') {
        foreach ($post_ids as $post_id) {
            update_post_meta($post_id, 'status', $action === 'mark_subscribed' ? 'Subscribed' : 'Unsubscribed');
        }
    }
    return $redirect_to;
}

// Add filter for status
add_action('restrict_manage_posts', 'add_newsletter_status_filter');
function add_newsletter_status_filter() {
    global $typenow;
    
    if ($typenow === 'newsletter_subscriber') {
        $current = isset($_GET['subscriber_status']) ? $_GET['subscriber_status'] : '';
        ?>
        <select name="subscriber_status">
            <option value=""><?php _e('All Statuses'); ?></option>
            <option value="subscribed" <?php selected($current, 'subscribed'); ?>><?php _e('Subscribed'); ?></option>
            <option value="unsubscribed" <?php selected($current, 'unsubscribed'); ?>><?php _e('Unsubscribed'); ?></option>
        </select>
        <?php
    }
}

add_filter('parse_query', 'newsletter_status_filter_query');
function newsletter_status_filter_query($query) {
    global $pagenow, $typenow;
    
    if ($pagenow === 'edit.php' && $typenow === 'newsletter_subscriber' && isset($_GET['subscriber_status']) && $_GET['subscriber_status'] !== '') {
        $query->query_vars['meta_key'] = 'status';
        $query->query_vars['meta_value'] = ucfirst($_GET['subscriber_status']);
    }
}

// Add plugin action links
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'add_newsletter_action_links');
function add_newsletter_action_links($links) {
    $plugin_links = array(
        '<a href="' . admin_url('edit.php?post_type=newsletter_subscriber') . '">' . __('Manage Subscribers') . '</a>',
    );
    return array_merge($plugin_links, $links);
}

// Update forms service to use the new post type
add_filter('dltcafe_fix_newsletter_api', 'fix_newsletter_api_path');
function fix_newsletter_api_path($data) {
    dltcafe_newsletter_log('Fixing newsletter API path');
    return $data;
}

// Add debugging toggle in admin
add_action('admin_init', 'dltcafe_newsletter_admin_init');
function dltcafe_newsletter_admin_init() {
    register_setting('general', 'dltcafe_newsletter_debug', 'intval');
    add_settings_field(
        'dltcafe_newsletter_debug',
        '📧 Newsletter Debug',
        'dltcafe_newsletter_debug_callback',
        'general',
        'default',
        array(
            'label_for' => 'dltcafe_newsletter_debug',
        )
    );
}

function dltcafe_newsletter_debug_callback($args) {
    $debug = get_option('dltcafe_newsletter_debug', 0);
    ?>
    <select name="dltcafe_newsletter_debug" id="<?php echo esc_attr($args['label_for']); ?>">
        <option value="0" <?php selected($debug, 0); ?>>Off</option>
        <option value="1" <?php selected($debug, 1); ?>>On</option>
    </select>
    <p class="description">
        Enable debugging for the DLT Cafe Newsletter plugin.
    </p>
    <?php
} 