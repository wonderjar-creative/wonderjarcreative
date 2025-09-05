<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', "local" );

/** Database username */
define( 'DB_USER', "root" );

/** Database password */
define( 'DB_PASSWORD', "root" );

/** Database hostname */
define( 'DB_HOST', "localhost" );

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
define( 'AUTH_KEY',         '_u^Xq_bI1R&d(P ACaF_#!,|Kxi42[JZXP/y%NZ0Kyb#.Gcy,A0V2pg9J - x}J:' );
define( 'SECURE_AUTH_KEY',  '%D;/lB!_PJ:&/h@-9h+Bf;d@/y9Ave~dlS<vwnM6}-B4:f_3wR~INtOpgHHnXck2' );
define( 'LOGGED_IN_KEY',    '--}ZCMRX:_2_f)taU-16EW)c[RBkGPi0#x19|6m8zuGs]eVxi_2LJgZ>%w#s^vs.' );
define( 'NONCE_KEY',        ']nJjP~]XcbARkO &Dd}<*~WUBCr|NAv(Rix:szEW;NhpIw]!f-gBdJAwv0{I*u@m' );
define( 'AUTH_SALT',        'ZQb|hRy){zO$U}h-fiNBh,xZdsi4@x*tNnv`J &eq1<VCQz~+KZ>S3kLMm`K{A4+' );
define( 'SECURE_AUTH_SALT', '3QO66J8]xPy4xaBhuo;$M@4HS826RNr_s0,K~<rpey7k(+B6w!+YxL1w>%$PrU>0' );
define( 'LOGGED_IN_SALT',   'BmFBE<[>]=h.=7pNxDR+c^6n?kTJf$.8ORUa>EDFX)q0^%%gCs&tyl8#BYk~Dr$W' );
define( 'NONCE_SALT',       '0{!+,N`.p3!)Y$7E5YSck]]sZ:;9ME$`Q{MFIK# 98!Z<Yq|};oV;K8MjW}0>qB>' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

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
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISLAY', false );

/* Add any custom values between this line and the "stop editing" line. */



define( 'FS_METHOD', 'direct' );
/**
 * The WP_SITEURL and WP_HOME options are configured to access from any hostname or IP address.
 * If you want to access only from an specific domain, you can modify them. For example:
 *  define('WP_HOME','http://example.com');
 *  define('WP_SITEURL','http://example.com');
 *
 */
if ( defined( 'WP_CLI' ) ) {
	$_SERVER['HTTP_HOST'] = '127.0.0.1';
}

define( 'WP_HOME', 'http://fossilicious.local' );
define( 'WP_SITEURL', 'http://fossilicious.local' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

/**
 * Disable pingback.ping xmlrpc method to prevent WordPress from participating in DDoS attacks
 * More info at: https://docs.bitnami.com/general/apps/wordpress/troubleshooting/xmlrpc-and-pingback/
 */
if ( !defined( 'WP_CLI' ) ) {
	// remove x-pingback HTTP header
	add_filter("wp_headers", function($headers) {
		unset($headers["X-Pingback"]);
		return $headers;
	});
	// disable pingbacks
	add_filter( "xmlrpc_methods", function( $methods ) {
		unset( $methods["pingback.ping"] );
		return $methods;
	});
}
