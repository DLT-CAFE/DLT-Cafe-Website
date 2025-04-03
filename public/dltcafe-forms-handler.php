<?php
/*
Plugin Name: DLT Cafe Forms Handler
Description: Handles form submissions from the Next.js frontend
Version: 1.1
Author: DLT Cafe
*/

// Register Custom Post Types
add_action('init', 'dltcafe_register_post_types');
function dltcafe_register_post_types() {
    register_post_type('contact_submissions', [
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'labels' => [
            'name' => 'Contact Forms',
            'singular_name' => 'Contact Form',
            'menu_name' => 'Contact Forms',
            'all_items' => 'All Submissions',
            'add_new' => 'Add New',
            'add_new_item' => 'Add New Submission',
            'edit_item' => 'Edit Submission',
            'new_item' => 'New Submission',
            'view_item' => 'View Submission',
            'search_items' => 'Search Submissions',
            'not_found' => 'No submissions found',
            'not_found_in_trash' => 'No submissions found in trash'
        ],
        'supports' => ['title', 'custom-fields'],
        'menu_icon' => 'dashicons-email-alt',
        'menu_position' => 30,
        'capability_type' => 'post'
    ]);

    register_post_type('join_submissions', [
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'labels' => [
            'name' => 'Join Requests',
            'singular_name' => 'Join Request',
            'menu_name' => 'Join Requests',
            'all_items' => 'All Requests',
            'add_new' => 'Add New',
            'add_new_item' => 'Add New Request',
            'edit_item' => 'Edit Request',
            'new_item' => 'New Request',
            'view_item' => 'View Request',
            'search_items' => 'Search Requests',
            'not_found' => 'No requests found',
            'not_found_in_trash' => 'No requests found in trash'
        ],
        'supports' => ['title', 'custom-fields'],
        'menu_icon' => 'dashicons-id-alt',
        'menu_position' => 32,
        'capability_type' => 'post'
    ]);

    // Flush rewrite rules only on plugin activation
    if (get_option('dltcafe_plugin_version') != '1.1') {
        flush_rewrite_rules();
        update_option('dltcafe_plugin_version', '1.1');
    }
}

// Register REST API endpoints
add_action('rest_api_init', 'dltcafe_register_endpoints');
function dltcafe_register_endpoints() {
    register_rest_route('dltcafe/v1', '/contact', [
        'methods' => 'POST',
        'callback' => 'handle_contact_submission',
        'permission_callback' => '__return_true'
    ]);

    register_rest_route('dltcafe/v1', '/join', [
        'methods' => 'POST',
        'callback' => 'handle_join_submission',
        'permission_callback' => '__return_true'
    ]);
}

// Handler functions
function handle_contact_submission($request) {
    $params = $request->get_params();
    
    // Validate required fields
    if (empty($params['name']) || empty($params['email'])) {
        return new WP_Error('missing_fields', 'Required fields are missing', ['status' => 400]);
    }

    // Create post
    $post_data = [
        'post_title' => wp_strip_all_tags($params['name']),
        'post_type' => 'contact_submissions',
        'post_status' => 'publish'
    ];

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        return new WP_Error('db_error', 'Could not save submission', ['status' => 500]);
    }

    // Save custom fields
    update_post_meta($post_id, 'email', sanitize_email($params['email']));
    update_post_meta($post_id, 'phone', sanitize_text_field($params['phone']));
    update_post_meta($post_id, 'message', wp_kses_post($params['message']));
    update_post_meta($post_id, 'status', 'New');
    
    // Send email notification
    $to = get_option('admin_email');
    $subject = 'New Contact Form Submission';
    $message = "Name: {$params['name']}\n";
    $message .= "Email: {$params['email']}\n";
    $message .= "Phone: {$params['phone']}\n";
    $message .= "Message: {$params['message']}";
    wp_mail($to, $subject, $message);

    return [
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!'
    ];
}

function handle_join_submission($request) {
    $params = $request->get_params();
    
    if (empty($params['name']) || empty($params['email']) || empty($params['role'])) {
        return new WP_Error('missing_fields', 'Required fields are missing', ['status' => 400]);
    }

    $post_data = [
        'post_title' => wp_strip_all_tags($params['name']),
        'post_type' => 'join_submissions',
        'post_status' => 'publish'
    ];

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        return new WP_Error('db_error', 'Could not save submission', ['status' => 500]);
    }

    // Save all fields
    $fields = ['email', 'role', 'experience', 'linkedin', 'portfolio'];
    foreach ($fields as $field) {
        if (!empty($params[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($params[$field]));
        }
    }
    update_post_meta($post_id, 'status', 'New');

    // Send email notification
    $to = get_option('admin_email');
    $subject = 'New Join Request Submission';
    $message = "Name: {$params['name']}\nEmail: {$params['email']}\nRole: {$params['role']}\n";
    if (!empty($params['experience'])) {
        $message .= "Experience: {$params['experience']}\n";
    }
    if (!empty($params['linkedin'])) {
        $message .= "LinkedIn: {$params['linkedin']}\n";
    }
    if (!empty($params['portfolio'])) {
        $message .= "Portfolio: {$params['portfolio']}\n";
    }
    wp_mail($to, $subject, $message);

    return [
        'success' => true,
        'message' => 'Thank you for your interest in joining us. We will review your application and get back to you soon!'
    ];
}

// Add admin columns for Contact Forms
add_filter('manage_contact_submissions_posts_columns', 'set_contact_columns');
function set_contact_columns($columns) {
    return array(
        'cb' => '<input type="checkbox" />',
        'title' => __('Name'),
        'email' => __('Email'),
        'phone' => __('Phone'),
        'message' => __('Message'),
        'date' => __('Date'),
        'status' => __('Status')
    );
}

add_action('manage_contact_submissions_posts_custom_column', 'custom_contact_column_content', 10, 2);
function custom_contact_column_content($column, $post_id) {
    switch ($column) {
        case 'email':
            echo esc_html(get_post_meta($post_id, 'email', true));
            break;
        case 'phone':
            echo esc_html(get_post_meta($post_id, 'phone', true));
            break;
        case 'message':
            $message = get_post_meta($post_id, 'message', true);
            echo wp_trim_words($message, 15, '... <a href="' . get_edit_post_link($post_id) . '">Read more</a>');
            break;
        case 'status':
            $status = get_post_meta($post_id, 'status', true) ?: 'New';
            echo '<span class="status-badge status-' . sanitize_html_class(strtolower($status)) . '">' . esc_html($status) . '</span>';
            break;
    }
}

// Add admin columns for Join Requests
add_filter('manage_join_submissions_posts_columns', 'set_join_columns');
function set_join_columns($columns) {
    return array(
        'cb' => '<input type="checkbox" />',
        'title' => __('Name'),
        'email' => __('Email'),
        'role' => __('Role'),
        'social_link' => __('Social Link'),
        'date' => __('Date'),
        'status' => __('Status')
    );
}

add_action('manage_join_submissions_posts_custom_column', 'custom_join_column_content', 10, 2);
function custom_join_column_content($column, $post_id) {
    switch ($column) {
        case 'email':
            echo esc_html(get_post_meta($post_id, 'email', true));
            break;
        case 'role':
            echo esc_html(get_post_meta($post_id, 'role', true));
            break;
        case 'social_link':
            $link = get_post_meta($post_id, 'linkedin', true);
            if ($link) {
                echo '<a href="' . esc_url($link) . '" target="_blank" class="social-link">';
                echo '<span class="dashicons dashicons-admin-links"></span> View Profile</a>';
            }
            break;
        case 'status':
            $status = get_post_meta($post_id, 'status', true) ?: 'New';
            echo '<span class="status-badge status-' . sanitize_html_class(strtolower($status)) . '">' . esc_html($status) . '</span>';
            break;
    }
}

// Make columns sortable
add_filter('manage_edit-contact_submissions_sortable_columns', 'set_contact_sortable_columns');
function set_contact_sortable_columns($columns) {
    $columns['email'] = 'email';
    $columns['status'] = 'status';
    return $columns;
}

add_filter('manage_edit-join_submissions_sortable_columns', 'set_join_sortable_columns');
function set_join_sortable_columns($columns) {
    $columns['email'] = 'email';
    $columns['role'] = 'role';
    $columns['status'] = 'status';
    return $columns;
}

// Add admin styles
add_action('admin_head', 'dltcafe_admin_styles');
function dltcafe_admin_styles() {
    echo '<style>
        /* Column widths */
        .column-email { width: 20%; }
        .column-message { width: 30%; }
        .column-role { width: 15%; }
        .column-status { width: 100px; }
        .column-social_link { width: 15%; }
        
        /* Status badges */
        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }
        .status-new {
            background-color: #e3f2fd;
            color: #1976d2;
        }
        .status-read {
            background-color: #f5f5f5;
            color: #616161;
        }
        
        /* Social link styling */
        .social-link {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            color: #2271b1;
        }
        .social-link:hover {
            color: #135e96;
        }
        .social-link .dashicons {
            margin-right: 4px;
        }
        
        /* Message column */
        .column-message a {
            color: #2271b1;
            text-decoration: none;
        }
        .column-message a:hover {
            color: #135e96;
            text-decoration: underline;
        }
    </style>';
}

// Add bulk actions
add_filter('bulk_actions-edit-contact_submissions', 'register_contact_bulk_actions');
function register_contact_bulk_actions($bulk_actions) {
    $bulk_actions['mark_read'] = __('Mark as Read');
    $bulk_actions['mark_unread'] = __('Mark as Unread');
    return $bulk_actions;
}

add_filter('handle_bulk_actions-edit-contact_submissions', 'handle_contact_bulk_actions', 10, 3);
function handle_contact_bulk_actions($redirect_to, $action, $post_ids) {
    if ($action === 'mark_read' || $action === 'mark_unread') {
        foreach ($post_ids as $post_id) {
            update_post_meta($post_id, 'status', $action === 'mark_read' ? 'Read' : 'New');
        }
    }
    return $redirect_to;
}

// Add Dashboard Widget for Contact Forms and Join Requests
add_action('wp_dashboard_setup', 'dltcafe_add_dashboard_widgets');
function dltcafe_add_dashboard_widgets() {
    wp_add_dashboard_widget(
        'dltcafe_recent_submissions',
        'Recent Form Submissions',
        'display_recent_submissions_widget'
    );
}

function display_recent_submissions_widget() {
    echo '<div class="dltcafe-widget-container">';
    
    // Recent Contact Forms
    $recent_contacts = get_posts([
        'post_type' => 'contact_submissions',
        'posts_per_page' => 5,
        'orderby' => 'date',
        'order' => 'DESC'
    ]);
    
    if (!empty($recent_contacts)) {
        echo '<h4 style="margin-bottom: 10px;">Recent Contact Forms</h4>';
        echo '<ul class="dltcafe-widget-list">';
        foreach ($recent_contacts as $contact) {
            $email = get_post_meta($contact->ID, 'email', true);
            $status = get_post_meta($contact->ID, 'status', true) ?: 'New';
            echo sprintf(
                '<li><a href="%s">%s</a> - %s <span class="status-badge status-' . sanitize_html_class(strtolower($status)) . '">%s</span></li>',
                get_edit_post_link($contact->ID),
                $contact->post_title,
                $email,
                $status
            );
        }
        echo '</ul>';
    }
    
    // Recent Join Requests
    $recent_joins = get_posts([
        'post_type' => 'join_submissions',
        'posts_per_page' => 5,
        'orderby' => 'date',
        'order' => 'DESC'
    ]);
    
    if (!empty($recent_joins)) {
        echo '<h4 style="margin: 15px 0 10px;">Recent Join Requests</h4>';
        echo '<ul class="dltcafe-widget-list">';
        foreach ($recent_joins as $join) {
            $role = get_post_meta($join->ID, 'role', true);
            $status = get_post_meta($join->ID, 'status', true) ?: 'New';
            echo sprintf(
                '<li><a href="%s">%s</a> - %s <span class="status-badge status-' . sanitize_html_class(strtolower($status)) . '">%s</span></li>',
                get_edit_post_link($join->ID),
                $join->post_title,
                $role,
                $status
            );
        }
        echo '</ul>';
    }
    
    echo '</div>';
}