<?php
/**
 * FeatureBase class file.
 *
 * This class provides a foundation for creating feature classes in the Fossilicious Theme.
 *
 * @package WonderjarCreativeBackend\Inc\Base
 * @since 1.0.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://wonderjarcreative.com
 */

namespace WonderjarCreativeBackend\Inc\Base;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * FeatureBase class.
 *
 * This class serves as a base for all features in the theme.
 * It provides methods to get the theme name, version, and other common functionality.
 * 
 * @package WonderjarCreativeBackend\Inc\Base
 * @since 1.0.0
 * @link https://wonderjarcreative.com
 */
abstract class FeatureBase {

  /**
   * The slug of the theme.
   * 
   * @since 1.0.0
   * @var string $slug The slug of the theme.
   */
  protected $slug;

  /**
   * The version of the theme.
   * @since 1.0.0
   * @var string $version The version of the theme.
   */
  protected $version;

  /**
   * The loader instance.
   *
   * @since 1.0.0
   * @var WonderjarCreativeBackend\Inc\Loader $loader The loader instance.
   */
  protected $loader;

  /**
   * Initialize the class and set its properties.
   * 
   * @since 1.0.0
   * @param string $slug The slug of the feature.
   * @param string $version The version of the feature.
   * @param WonderjarCreativeBackend\Inc\Loader $loader The loader instance.
   * @return void
   */
  public function __construct( $slug, $version, $loader ) {
    $this->slug = $slug;
    $this->version = $version;
    $this->loader = $loader;
  }

  /**
   * Get the loader instance.
   *
   * @since 1.0.0
   * @return WonderjarCreativeBackend\Inc\Loader The loader instance.
   */
  public function get_loader() {
    return $this->loader;
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
    return self::$slug;
  }

  /**
   * Get the theme version.
   *
   * @since 1.0.0
   * @return string
   */
  public static function get_version() {
    return self::$version;
  }
}