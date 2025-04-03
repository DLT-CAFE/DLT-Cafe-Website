# Newsletter Plugin Installation Guide

## The Problem
WordPress is showing "Invalid post type" error and the newsletter menu is not appearing in the admin panel, despite the plugin being activated.

## Solution: Simplified Plugin Approach

I've created a simplified version of the newsletter plugin that should work more reliably.

### Step 1: Upload and Activate the New Plugin

1. First, deactivate and remove the existing `dltcafe-newsletter.php` plugin:
   - Go to WordPress Admin -> Plugins
   - Deactivate "DLT Cafe Newsletter" plugin
   - Delete the plugin

2. Upload the new `dltcafe-newsletter-basic.php` file to `wp-content/plugins/` directory

3. Activate the new plugin from the WordPress admin plugins page

### Step 2: Verify It's Working

The plugin should create a "Newsletter" menu item in the WordPress admin sidebar.

To test if the REST API endpoint is working:
1. Fill out the newsletter form on your website
2. Check your browser's developer tools (Network tab) while submitting
3. Verify that the `/wp-json/dltcafe/v1/newsletter` endpoint is being called
4. Check the WordPress admin -> Newsletter section for new entries

### Step 3: Troubleshooting

If the plugin still doesn't appear:

1. Check WordPress debug log (if enabled) for errors
2. Try these database fix commands in phpMyAdmin SQL tab:
   ```sql
   DELETE FROM wp_options WHERE option_name LIKE '%newsletter%';
   DELETE FROM wp_postmeta WHERE meta_key LIKE '%newsletter%';
   ```

3. Reset WordPress permalink structure:
   - Go to Settings -> Permalinks 
   - Click "Save Changes" without making any changes

4. Check file permissions:
   - Ensure the plugin file has permissions set to 644
   - Ensure the plugin directory has permissions set to 755

### Step 4: Compatibility Notes

This new plugin uses a simpler post type name (`newsletter` instead of `newsletter_subscriber`), which should avoid conflicts with other plugins and be more reliable.

The forms.ts file has also been updated to be more resilient to handle any potential issues with the API endpoint.

### If All Else Fails

If the plugin still doesn't appear, you can try implementing the newsletter functionality directly in your theme's functions.php file as a last resort. 