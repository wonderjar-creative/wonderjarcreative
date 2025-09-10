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
  const VERSION = '1.0.0';

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
  }

  /**
   * Define hooks.
   *
   * @since 1.0.0
   * @return void
   */
  private function define_hooks() {
    $this->loader->add_action( 'wp_enqueue_scripts', $this, 'enqueue_scripts' );
  }

  /**
   * Enqueue scripts.
   *
   * @since 1.0.0
   * @return void
   */
  public function enqueue_scripts() {
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
    return str_replace( '-', '_', self::THEME_SLUG );
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