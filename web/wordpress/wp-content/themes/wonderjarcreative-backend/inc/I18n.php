<?php
/**
 * I18n class file.
 * 
 * @package WonderjarCreativeBackend/Inc
 * @since 1.0.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://www.wonderjarcreative.com/
 */

namespace WonderjarCreativeBackend\Inc;
use WonderjarCreativeBackend\Inc\Theme;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Class I18n.
 * 
 * @package WonderjarCreativeBackend/Inc
 * @since 1.0.0
 * @link https://www.wonderjarcreative.com/
 */
class I18n {

  /**
   * The loader instance.
   *
   * @since 1.0.0
   * @var Loader $loader The loader instance.
   */
  protected $loader;

  /**
   * The vite manifest.
   *
   * @since 1.0.0
   * @var array $manifest The vite manifest file.
   */
  protected $manifest;

  /**
   * Constructor.
   *
   * @since 1.0.0
   * @param Loader $loader The loader instance.
   * @return void
   */
  public function __construct( $loader ) {
    $this->loader = $loader;
    $this->register_hooks();
  }

  /**
   * Register hooks.
   *
   * @since 1.0.0
   * @return void
   */
  public function register_hooks() {
    // Since WordPress 6.7 this needs to be called at the init hook or later.
    $this->loader->add_action( 'init', $this, 'load_textdomain' );
  }

  /**
   * Load the theme's text domain for translation.
   *
   * @since 1.0.0
   * @return void
   */
  public function load_textdomain() {
    load_theme_textdomain( 
      'wonderjarcreative-backend',
      Theme::get_theme_path() . '/languages' );
  }
}