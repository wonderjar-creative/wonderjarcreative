<?php
/**
 * Theme class file.
 * 
 * @package WonderjarCreativeBackend/Inc
 * @since 1.0.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://www.wonderjarcreative.com/
 */

namespace WonderjarCreativeBackend\Inc;
use WonderjarCreativeBackend\Inc\Loader;
use WonderjarCreativeBackend\Inc\I18n;
use WonderjarCreativeBackend\Inc\Features\RestFeature;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Theme class.
 * 
 * This class initializes the theme and provides methods to get theme information.
 * 
 * @package WonderjarCreativeBackend/Inc
 * @since 1.0.0
 * @link https://www.wonderjarcreative.com/
 */
class Theme {

  /**
   * The slug of the theme.
   *
   * @since 1.0.0
   */
  const THEME_SLUG = 'wonderjarcreative-backend';

  /**
   * The version of the theme.
   *
   * @since 1.0.0
   */
  const VERSION = WONDERJAR_CREATIVE_BACKEND_VERSION ?? '1.0.0';

  /**
   * The loader instance.
   *
   * @since 1.0.0
   * @var Loader $loader The loader instance.
   */
  protected $loader;

  /**
   * The i18n instance.
   *
   * @since 1.0.0
   * @var I18n $i18n The i18n instance.
   */
  protected $i18n;

  /**
   * The REST feature instance.
   *
   * @since 1.0.0
   * @var RestFeature $rest_feature The REST feature instance.
   */
  protected $rest_feature;

  /**
   * Get the instance of the class.
   *
   * @since 1.0.0
   * @return Theme The instance of the class.
   */
  private static $instance = null;

  /**
   * Get the instance of the class.
   *
   * @since 1.0.0
   * @return Theme The instance of the class.
   */
  public static function get_instance() {
    if ( is_null( self::$instance ) ) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  /**
   * Constructor.
   * 
   * @since 1.0.0
   * @return void
   */
  private function __construct() {
    $this->initialize_classes();
    $this->define_hooks();
  }

  /**
   * Initialize the theme classes.
   *
   * This is a modular theme structure where each class can register its own hooks and filters.
   *
   * @since 1.0.0
   * @return void
   */
  private function initialize_classes() {
    $this->loader = new Loader();
    $this->i18n = new I18n( $this->loader );
    $this->rest_feature = new RestFeature( self::THEME_SLUG, self::VERSION, $this->loader );
  }

  /**
   * Define hooks.
   *
   * @since 1.0.0
   * @return void
   */
  private function define_hooks() {
    $this->loader->add_action( 'after_setup_theme', $this, 'setup_theme' );
    $this->loader->add_filter( 'upload_mimes', $this, 'allowed_mime_types' );
    $this->loader->add_action( 'rest_api_init', $this, 'add_cors_headers' );
  }

  /**
   * Run the theme.
   *
   * @since 1.0.0
   * @return void
   */
  public function run() {
    $this->loader->run();
  }

  /**
   * Setup theme defaults and registers support for various WordPress features.
   *
   * @since 1.0.0
   * @return void
   * @link https://developer.wordpress.org/themes/functionality/theme-support/
   * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
   */
  public function setup_theme() {
    // Add theme support
    add_theme_support( 'post-thumbnails' );
    
    // Register navigation menus for the theme
    register_nav_menus( 
      array( 
        'primary-menu' => __( 'Primary menu', self::THEME_SLUG )
      )
    );
  }

  /**
   * Allowed Mime Types.
   * 
   * Filters the allowed mime types for file uploads.
   * 
   * @since 1.0.0
   * @param array $mimes The allowed mime types.
   * @return array The filtered allowed mime types.
   */
  public function allowed_mime_types( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }

  /**
   * Add CORS headers for headless WordPress.
   * 
   * Allows frontend domains to access WordPress REST API and GraphQL.
   * Only applies to API requests, not regular WordPress pages.
   * 
   * @since 1.0.1
   * @return void
   */
  public function add_cors_headers() {
    // Allow requests from production and preview domains
    $allowed_origins = array(
      'https://cms.wonderjarcreative.com',
      'https://www.wonderjarcreative.com',
      'https://wonderjarcreative.com',
      'http://localhost:3000',
    );

    // Get the origin from the request
    $origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if ( empty( $origin ) ) {
      return;
    }

    // Check if origin is allowed (whitelist or Vercel preview)
    $is_allowed = in_array( $origin, $allowed_origins ) || 
                  strpos( $origin, '.vercel.app' ) !== false;
    
    if ( $is_allowed ) {
      header( 'Access-Control-Allow-Origin: ' . $origin );
      header( 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS' );
      header( 'Access-Control-Allow-Credentials: true' );
      header( 'Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With' );
      header( 'Access-Control-Max-Age: 86400' );
    }
  }

  /**
   * Get the theme path.
   *
   * @since 1.0.0
   * @return string
   */
  public static function get_theme_path() {
    return get_stylesheet_directory();
  }

  /**
   * Get the theme url.
   * 
   * @since 1.0.0
   * @return string
   */
  public static function get_theme_url() {
    return get_stylesheet_directory_uri();
  }

  /**
   * Get the theme slug in snake case format.
   *
   * @since 1.0.0
   * @return string
   */
  public static function get_snake_case_slug() {
    return str_replace( '-', '_', self::get_slug() );
  }

  /**
   * Get the theme slug.
   *
   * @since 1.0.0
   * @return string
   */
  public static function get_slug() {
    return self::THEME_SLUG;
  }

  /**
   * Get the theme version.
   *
   * @since 1.0.0
   * @return string
   */
  public static function get_version() {
    return self::VERSION;
  }
}