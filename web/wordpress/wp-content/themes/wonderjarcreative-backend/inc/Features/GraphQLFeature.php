<?php
/**
 * GraphQL Feature file.
 *
 * @package WonderjarCreativeBackend\Inc\Features
 * @since 1.4.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://wonderjarcreative.com
 */

namespace WonderjarCreativeBackend\Inc\Features;
use WonderjarCreativeBackend\Inc\Base\FeatureBase;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * GraphQL Feature class.
 *
 * This class handles custom GraphQL field registrations for WPGraphQL.
 *
 * @package WonderjarCreativeBackend\Inc\Features
 * @since 1.4.0
 * @link https://wonderjarcreative.com
 */
class GraphQLFeature extends FeatureBase {

  /**
   * Initialize the class and set its properties.
   *
   * @since 1.4.0
   * @param string $slug The slug of the feature.
   * @param string $version The version of the feature.
   * @param WonderjarCreativeBackend\Inc\Loader $loader The loader instance.
   * @return void
   */
  public function __construct( $slug, $version, $loader ) {
    parent::__construct( $slug, $version, $loader );
    $this->define_hooks();
  }

  /**
   * Define the hooks for this feature.
   *
   * @since 1.4.0
   * @return void
   */
  private function define_hooks() {
    $this->loader->add_action( 'graphql_register_types', $this, 'register_template_slug_field' );
  }

  /**
   * Register the templateSlug field for Page and Post types.
   *
   * Exposes the actual template file slug (e.g., "page-header-absolute-no-title")
   * rather than the human-readable title that templateName returns.
   *
   * @since 1.4.0
   * @return void
   * @link https://www.wpgraphql.com/docs/register-graphql-fields
   */
  public function register_template_slug_field() {
    // Register for Page type
    register_graphql_field( 'Page', 'templateSlug', [
      'type' => 'String',
      'description' => __( 'The template file slug (e.g., "page-header-absolute-no-title")', 'wonderjarcreative-backend' ),
      'resolve' => function( $post ) {
        return $this->get_template_slug( $post->databaseId );
      }
    ]);

    // Register for Post type
    register_graphql_field( 'Post', 'templateSlug', [
      'type' => 'String',
      'description' => __( 'The template file slug (e.g., "page-header-absolute-no-title")', 'wonderjarcreative-backend' ),
      'resolve' => function( $post ) {
        return $this->get_template_slug( $post->databaseId );
      }
    ]);
  }

  /**
   * Get the template slug for a post.
   *
   * Retrieves the template slug from post meta and normalizes it.
   * For block themes, the template is stored without .php extension.
   *
   * @since 1.4.0
   * @param int $post_id The post ID.
   * @return string The template slug or 'page' for default template.
   */
  private function get_template_slug( $post_id ) {
    $template = get_post_meta( $post_id, '_wp_page_template', true );

    // If no template or default, return 'page'
    if ( empty( $template ) || $template === 'default' ) {
      return 'page';
    }

    // Remove .php extension if present (classic themes)
    $slug = preg_replace( '/\.php$/', '', $template );

    // Remove any path prefix (e.g., "templates/")
    $slug = basename( $slug );

    return $slug;
  }
}
