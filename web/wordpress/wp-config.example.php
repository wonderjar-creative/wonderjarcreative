<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'your_database_name_here' );

/** Database username */
define( 'DB_USER', 'your_database_user_here' );

/** Database password */
define( 'DB_PASSWORD', 'your_database_password_here' );

/** Database hostname */
define( 'DB_HOST', 'your_database_host_here' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'your_auth_key_here' );
define( 'SECURE_AUTH_KEY',   'your_secure_auth_key_here' );
define( 'LOGGED_IN_KEY',     'your_logged_in_key_here' );
define( 'NONCE_KEY',         'your_nonce_key_here' );
define( 'AUTH_SALT',         'your_auth_salt_here' );
define( 'SECURE_AUTH_SALT',  'your_secure_auth_salt_here' );
define( 'LOGGED_IN_SALT',    'your_logged_in_salt_here' );
define( 'NONCE_SALT',        'your_nonce_salt_here' );
define( 'WP_CACHE_KEY_SALT', 'your_cache_key_salt_here' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_'; // Change if you want a custom prefix


/* Add any custom values between this line and the "stop editing" line. */

define('HEADLESS_SECRET', 'your_headless_secret_here');
define('HEADLESS_URL', 'your_headless_url_here'); // e.g. http://localhost:3000 for local development
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'your_graphql_jwt_auth_secret_key_here');
define('GRAPHQL_JWT_AUTH_CORS_ENABLE', true); // Set to true or false as needed

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'your_environment_type_here' ); // e.g. local, staging, production
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
