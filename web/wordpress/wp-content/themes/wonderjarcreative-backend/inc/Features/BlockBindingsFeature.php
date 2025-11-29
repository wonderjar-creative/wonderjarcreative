<?php
/**
 * Block Bindings Feature file.
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
 * Block Bindings Feature class.
 *
 * This class handles modifications specific to block bindings.
 *
 * @package WonderjarCreativeBackend\Inc\Features
 * @since 1.4.0
 * @link https://wonderjarcreative.com
 */
class BlockBindingsFeature extends FeatureBase {

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
   * @see WonderjarCreativeBackend\Inc\Loader::add_filter()
   */
  private function define_hooks() {
    $this->loader->add_filter( 'init', $this, 'register_meta_fields' );
    $this->loader->add_action( 'init', $this, 'register_block_bindings' );
    $this->loader->add_action( 'add_meta_boxes', $this, 'register_meta_boxes' );
    $this->loader->add_action( 'save_post', $this, 'save_meta_boxes' );
  }

  /**
   * Register meta fields for block bindings.
   * 
   * @since 1.4.0
   * @return void
   * @see https://developer.wordpress.org/reference/functions/register_meta/
   */
  public function register_meta_fields() {
    // Register meta fields for hero block bindings
    $this->register_hero_meta_fields();
  }

  /**
   * Register meta fields for hero block bindings.
   * 
   * @since 1.4.0
   * @return void
   * @see https://developer.wordpress.org/reference/functions/register_post_meta/
   */
  private function register_hero_meta_fields() {
    $fields = [ 'hero_title', 'hero_description' ];
    
    foreach ( $fields as $field ) {
      register_post_meta( '', $field, [
        'type' => 'string',
        'description' => ucfirst( str_replace( '_', ' ', $field ) ) . ' for hero section',
        'single' => true,
        'show_in_rest' => true,
        'default' => '',
      ]);
    }
  }

  /**
   * Register block bindings for dynamic content.
   * 
   * @since 1.4.0
   * @return void
   * @see https://developer.wordpress.org/reference/functions/register_block_bindings_source/
   */
  public function register_block_bindings() {
    // Register block binding source for post meta
    register_block_bindings_source(
      'wonderjarcreative-backend/post-meta',
      [
        'label'              => _x( 'Post Meta', 'Label for the block binding placeholder in the editor', 'wonderjarcreative-backend' ),
        'get_value_callback' => function( $source_args, $block_instance, $attribute_name ) {
          $post_id = $block_instance->context['postId'] ?? get_the_ID();
          $meta_key = $source_args['key'] ?? '';
          
          if (empty($meta_key)) {
              return '';
          }
          
          $meta_value = get_post_meta($post_id, $meta_key, true);
          
          // Fallback logic for empty meta values
          if (empty($meta_value)) {
            switch ($meta_key) {
              case 'hero_title':
                // Fallback to page title
                return get_the_title($post_id);
              
              case 'hero_description':
                // Fallback to excerpt or empty string
                $excerpt = get_the_excerpt($post_id);
                return !empty($excerpt) ? $excerpt : '';
              
              default:
                return '';
            }
          }
          
          return $meta_value;
        },
      ]
    );
  }

  /**
   * Register meta boxes for hero fields.
   * 
   * @since 1.4.0
   * @return void
   * @see https://developer.wordpress.org/reference/functions/add_meta_box/
   */ 
  public function register_meta_boxes() {
    add_meta_box(
      'hero-meta-box',
      __( 'Hero Section Meta', 'wonderjarcreative-backend' ),
      [ $this, 'render_hero_meta_box' ],
      [ 'post', 'page' ],
      'normal',
      'high'
    );
  }

  /**
   * Render the hero meta box.
   * 
   * @since 1.4.0
   * @param WP_Post $post The current post object.
   * @return void
   */ 
  public function render_hero_meta_box( $post ) {
    $hero_title = ! empty( get_post_meta( $post->ID, 'hero_title', true ) ) ? get_post_meta( $post->ID, 'hero_title', true ) : get_the_title( $post->ID );
    $hero_description = get_post_meta( $post->ID, 'hero_description', true );

    wp_nonce_field( 'hero_meta_box_nonce', 'hero_meta_box_nonce_field' );
    ?>
    <p>
      <label for="hero_title"><?php _e( 'Hero Title:', 'wonderjarcreative-backend' ); ?></label><br>
      <input type="text" id="hero_title" name="hero_title" value="<?php echo esc_attr( $hero_title ); ?>" style="width:100%;" />
    </p>
    <p>
      <label for="hero_description"><?php _e( 'Hero Description:', 'wonderjarcreative-backend' ); ?></label><br>
      <textarea id="hero_description" name="hero_description" style="width:100%;"><?php echo esc_textarea( $hero_description ); ?></textarea>
    </p>
    <?php
  }

  /**
   * Save the hero meta box data.
   * 
   * @since 1.4.0
   * @param int $post_id The ID of the post being saved.
   * @return void
   */
  public function save_meta_boxes( $post_id ) {
    // Verify nonce
    if ( ! isset( $_POST['hero_meta_box_nonce_field'] ) || ! wp_verify_nonce( $_POST['hero_meta_box_nonce_field'], 'hero_meta_box_nonce' ) ) {
      return;
    }

    // Check autosave
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
      return;
    }

    // Check user permissions
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
      return;
    }

    // Save hero title
    if ( isset( $_POST['hero_title'] ) ) {
      update_post_meta( $post_id, 'hero_title', sanitize_text_field( $_POST['hero_title'] ) );
    }

    // Save hero description
    if ( isset( $_POST['hero_description'] ) ) {
      update_post_meta( $post_id, 'hero_description', sanitize_textarea_field( $_POST['hero_description'] ) );
    }
  } 
}