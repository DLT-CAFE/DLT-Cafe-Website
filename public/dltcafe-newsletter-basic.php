<?php
/*
Plugin Name: DLT Cafe Newsletter
Description: Advanced newsletter subscription handler with export and dashboard features
Version: 1.1
Author: DLT Cafe
*/

// Safety check
if (!defined('ABSPATH')) {
    exit;
}

// Register the post type
function dltcafe_newsletter_register_cpt() {
    $labels = array(
        'name'               => 'Newsletter',
        'singular_name'      => 'Subscriber',
        'menu_name'          => '📧 Newsletter',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Subscriber',
        'edit_item'          => 'Edit Subscriber',
        'new_item'           => 'New Subscriber',
        'view_item'          => 'View Subscriber',
        'search_items'       => 'Search Subscribers',
        'not_found'          => 'No subscribers found',
        'not_found_in_trash' => 'No subscribers found in trash'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => false,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 25,
        'menu_icon'          => 'dashicons-email',
        'supports'           => array('title')
    );

    register_post_type('newsletter', $args);
}
add_action('init', 'dltcafe_newsletter_register_cpt');

// Activation hook
function dltcafe_newsletter_activate() {
    dltcafe_newsletter_register_cpt();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'dltcafe_newsletter_activate');

// Deactivation hook
function dltcafe_newsletter_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'dltcafe_newsletter_deactivate');

// REST API endpoint
function dltcafe_newsletter_rest_init() {
    register_rest_route('dltcafe/v1', '/newsletter', array(
        'methods'  => 'POST',
        'callback' => 'dltcafe_handle_newsletter_submission',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'dltcafe_newsletter_rest_init');

// Handler function
function dltcafe_handle_newsletter_submission($request) {
    $params = $request->get_params();
    
    // Log the submission for debugging
    if (WP_DEBUG) {
        error_log('Newsletter submission received: ' . json_encode($params));
    }
    
    // Basic validation
    if (empty($params['email']) || !is_email($params['email'])) {
        return new WP_Error('invalid_email', 'Please provide a valid email address.');
    }
    
    // Check for duplicates
    $existing = get_posts(array(
        'post_type' => 'newsletter',
        'title' => $params['email'],
        'posts_per_page' => 1
    ));
    
    if (!empty($existing)) {
        return array(
            'success' => false,
            'message' => 'This email is already subscribed.'
        );
    }
    
    // Create new subscriber
    $post_id = wp_insert_post(array(
        'post_title' => sanitize_email($params['email']),
        'post_type' => 'newsletter',
        'post_status' => 'publish'
    ));
    
    if (is_wp_error($post_id)) {
        return new WP_Error('db_error', 'Could not save subscription: ' . $post_id->get_error_message());
    }
    
    // Save metadata
    if (!empty($params['fullName'])) {
        update_post_meta($post_id, 'full_name', sanitize_text_field($params['fullName']));
    }
    
    if (!empty($params['interests'])) {
        update_post_meta($post_id, 'interests', $params['interests']);
    }
    
    update_post_meta($post_id, 'subscription_date', current_time('mysql'));
    update_post_meta($post_id, 'status', 'Subscribed');
    update_post_meta($post_id, 'ip_address', $_SERVER['REMOTE_ADDR']);
    
    // Send confirmation email
    $to = sanitize_email($params['email']);
    $subject = 'Welcome to DLT Cafe Newsletter';
    $message = "Hello " . (!empty($params['fullName']) ? $params['fullName'] : 'there') . ",\n\n";
    $message .= "Thank you for subscribing to our newsletter!\n\n";
    $message .= "You'll receive updates about our latest content, events, and opportunities.\n\n";
    $message .= "Best regards,\nDLT Cafe Team";
    
    wp_mail($to, $subject, $message);
    
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
    
    wp_mail($admin_email, $admin_subject, $admin_message);
    
    return array(
        'success' => true,
        'message' => 'Thank you for subscribing to our newsletter!'
    );
}

// Admin columns
function dltcafe_newsletter_columns($columns) {
    return array(
        'cb' => '<input type="checkbox" />',
        'title' => __('Email'),
        'full_name' => __('Full Name'),
        'interests' => __('Interests'),
        'subscription_date' => __('Subscribed On'),
        'status' => __('Status')
    );
}
add_filter('manage_newsletter_posts_columns', 'dltcafe_newsletter_columns');

function dltcafe_newsletter_custom_column($column, $post_id) {
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
add_action('manage_newsletter_posts_custom_column', 'dltcafe_newsletter_custom_column', 10, 2);

// Make columns sortable
function dltcafe_newsletter_sortable_columns($columns) {
    $columns['full_name'] = 'full_name';
    $columns['subscription_date'] = 'subscription_date';
    $columns['status'] = 'status';
    return $columns;
}
add_filter('manage_edit-newsletter_sortable_columns', 'dltcafe_newsletter_sortable_columns');

// Add Export functionality
function dltcafe_add_export_page() {
    add_submenu_page(
        'edit.php?post_type=newsletter',
        'Export Subscribers',
        'Export Subscribers',
        'manage_options',
        'newsletter-export',
        'render_newsletter_export_page'
    );
}
add_action('admin_menu', 'dltcafe_add_export_page');

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
    array_unshift($fields, 'email');
    $fields = array_unique($fields);
    
    // Set up query args
    $args = array(
        'post_type' => 'newsletter',
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
function dltcafe_newsletter_add_dashboard_widget() {
    wp_add_dashboard_widget(
        'dltcafe_newsletter_stats',
        '📧 Newsletter Statistics',
        'display_newsletter_stats_widget'
    );
}
add_action('wp_dashboard_setup', 'dltcafe_newsletter_add_dashboard_widget');

function display_newsletter_stats_widget() {
    // Get total subscribers
    $total = wp_count_posts('newsletter');
    
    // Get this month's subscribers
    $this_month = get_posts(array(
        'post_type' => 'newsletter',
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
        'post_type' => 'newsletter',
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
    echo '<a href="' . admin_url('edit.php?post_type=newsletter') . '" class="button button-secondary">View All</a> ';
    echo '<a href="' . admin_url('edit.php?post_type=newsletter&page=newsletter-export') . '" class="button button-secondary">Export</a>';
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
function dltcafe_newsletter_admin_styles() {
    $screen = get_current_screen();
    
    // Only add these styles on relevant pages
    if (!$screen || ($screen->post_type !== 'newsletter' && $screen->id !== 'dashboard')) {
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
add_action('admin_head', 'dltcafe_newsletter_admin_styles');

// Add bulk actions
function dltcafe_newsletter_bulk_actions($bulk_actions) {
    $bulk_actions['mark_subscribed'] = __('Mark as Subscribed');
    $bulk_actions['mark_unsubscribed'] = __('Mark as Unsubscribed');
    return $bulk_actions;
}
add_filter('bulk_actions-edit-newsletter', 'dltcafe_newsletter_bulk_actions');

function dltcafe_handle_bulk_actions($redirect_to, $action, $post_ids) {
    if ($action === 'mark_subscribed' || $action === 'mark_unsubscribed') {
        foreach ($post_ids as $post_id) {
            update_post_meta($post_id, 'status', $action === 'mark_subscribed' ? 'Subscribed' : 'Unsubscribed');
        }
    }
    return $redirect_to;
}
add_filter('handle_bulk_actions-edit-newsletter', 'dltcafe_handle_bulk_actions', 10, 3);

// Add filter for status
function dltcafe_add_status_filter() {
    global $typenow;
    
    if ($typenow === 'newsletter') {
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
add_action('restrict_manage_posts', 'dltcafe_add_status_filter');

function dltcafe_status_filter_query($query) {
    global $pagenow, $typenow;
    
    if ($pagenow === 'edit.php' && $typenow === 'newsletter' && isset($_GET['subscriber_status']) && $_GET['subscriber_status'] !== '') {
        $query->query_vars['meta_key'] = 'status';
        $query->query_vars['meta_value'] = ucfirst($_GET['subscriber_status']);
    }
}
add_filter('parse_query', 'dltcafe_status_filter_query');

// Check WordPress menu screen
function dltcafe_check_admin_page() {
    global $pagenow;
    if ($pagenow === 'plugins.php') {
        error_log('DLT Cafe Newsletter Basic plugin is active and running');
    }
}
add_action('admin_init', 'dltcafe_check_admin_page'); 