<?php
/**
 * Rest Feature file.
 *
 * @package WonderjarCreativeBackend\Inc\Features
 * @since 1.0.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://wonderjarcreative.com
 */

namespace WonderjarCreativeBackend\Inc\Features;
use WonderjarCreativeBackend\Inc\Base\FeatureBase;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * REST Feature class.
 *
 * This class handles modifications specific to the REST API.
 *
 * @package WonderjarCreativeBackend\Inc\Features
 * @since 1.0.0
 * @link https://wonderjarcreative.com
 */
class RestFeature extends FeatureBase {

  /**
   * Initialize the class and set its properties.
   *
   * @since 1.0.0
   * 
   * @param string $slug The slug of the feature.
   * @param string $version The version of the feature.
   * @param WonderjarCreativeBackend\Inc\Loader $loader The loader instance.
   *
   * @return void
   */
  public function __construct( $slug, $version, $loader ) {
    parent::__construct( $slug, $version, $loader );
    $this->define_hooks();
  }

  /**
   * Define the hooks for this feature.
   *
   * @since 1.0.0
   * 
   * @return void
   * 
   * @see WonderjarCreativeBackend\Inc\Loader::add_filter()
   */
  private function define_hooks() {
    $this->loader->add_filter( 'rest_url', $this, 'home_url_as_api_url' );
    $this->loader->add_filter( 'preview_post_link', $this, 'set_headless_preview_link', 10, 2 );
    $this->loader->add_filter( 'rest_prepare_page', $this, 'set_headless_rest_preview_link', 10, 2 );
    $this->loader->add_filter( 'rest_prepare_post', $this, 'set_headless_rest_preview_link', 10, 2 );
    $this->loader->add_action( 'transition_post_status', $this, 'headless_revalidate', 10, 3 );
    $this->loader->add_action( 'rest_api_init', $this, 'register_sitemap_routes' );
    $this->loader->add_action( 'rest_api_init', $this, 'register_template_structure_routes' );
  }

  /**
   * Home URL as API URL.
   * 
   * Changes the REST API root URL to use the home URL as the base.
   *
   * @since 1.0.0
   * 
   * @param string $url The complete URL including scheme and path.
   * 
   * @return string The REST API root URL.
   *
   * @link home_url() https://developer.wordpress.org/reference/functions/home_url/
   * @link site_url() https://developer.wordpress.org/reference/functions/site_url/
   */
  public function home_url_as_api_url( $url ) {
    $url = str_replace( home_url(), site_url(), $url );
    return $url;
  }

  /**
   * Customize the preview button in the WordPress admin.
   *
   * This function modifies the preview link for a post to point to a headless client setup.
   *
   * @since 1.0.0
   * 
   * @param string  $link Original WordPress preview link.
   * @param WP_Post $post Current post object.
   * 
   * @return string Modified headless preview link.
   */
  public function set_headless_preview_link( string $link, \WP_Post $post ): string {
    $frontendUrl = HEADLESS_URL;

    return add_query_arg( 
      [
        'secret' => HEADLESS_SECRET,
        'id' => $post->ID,
      ],
      esc_url_raw( "$frontendUrl/api/preview" )
    );
  }

  /**
   * Customize the REST API response for posts and pages.
   *
   * This function modifies the REST API response to include a custom preview link
   * for draft posts and a modified permalink for published posts.
   *
   * @since 1.0.0
   * 
   * @param \WP_REST_Response $response The REST API response object.
   * @param \WP_Post         $post     The current post object.
   * 
   * @return \WP_REST_Response The modified REST API response object.
   * 
   * @link get_preview_post_link() https://developer.wordpress.org/reference/functions/get_preview_post_link/
   * @link get_permalink() https://developer.wordpress.org/reference/functions/get_permalink/
   * @link get_site_url() https://developer.wordpress.org/reference/functions/get_site_url/
   */
  public function set_headless_rest_preview_link( \WP_REST_Response $response, \WP_Post $post ): \WP_REST_Response {
    if ( 'draft' === $post->post_status ) {
      $response->data['link'] = get_preview_post_link( $post );
      return $response;
    }

    if ( 'publish' === $post->post_status ) {
      $permalink = get_permalink( $post );

      if ( false !== stristr( $permalink, get_site_url() ) ) {
        $frontendUrl = HEADLESS_URL;

        $response->data['link'] = str_ireplace( 
          get_site_url(),
          $frontendUrl,
          $permalink
        );
      }
    }

    return $response;
  }

  /**
   * Headless revalidate.
   * 
   * Adds the headless_revalidate function to the save_post action hook.
   * This function makes a PUT request to the headless site' api/revalidate endpoint with JSON body: paths = ['/path/to/page', '/path/to/another/page']
   * Requires HEADLESS_URL and HEADLESS_SECRET to be defined in wp-config.php
   *
   * @since 1.0.0
   * 
   * @param int $post_ID The ID of the post being saved.
   * 
   * @return void
   * 
   * @link wp_remote_request() https://developer.wordpress.org/reference/functions/wp_remote_request/
   * @link is_wp_error() https://developer.wordpress.org/reference/functions/is_wp_error/
   * @link error_log() https://developer.wordpress.org/reference/functions/error_log/
   */
  public function headless_revalidate( string $new_status, string $old_status, object $post ): void {
    if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
      return;
    }

    if ( ( 'draft' === $new_status && 'draft' === $old_status ) || 'inherit' === $new_status ) {
      return;
    }

    $frontendUrl = HEADLESS_URL;
    $headlessSecret = HEADLESS_SECRET;

    $data = json_encode( [
      'tags' => ['wordpress'],
    ] );

    $response = wp_remote_request( "$frontendUrl/api/revalidate/", [
      'method' => 'PUT',
      'body' => $data,
      'headers' => [
        'X-Headless-Secret-Key' => $headlessSecret,
        'Content-Type' => 'application/json',
      ],
    ] );

    if ( is_wp_error( $response ) ) {
      error_log( $response->get_error_message() );
    }
  }

  /**
   * Register REST API routes for sitemap.
   * 
   * Registers custom REST API routes for generating sitemap data.
   * 
   * @since 1.0.0
   * 
   * @return void
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::generate_posts_api()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::generate_taxonomy_api()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::generate_author_api()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::generate_totalpages_api()
   * 
   * @link register_rest_route() https://developer.wordpress.org/reference/functions/register_rest_route/
   */
  function register_sitemap_routes() {
    register_rest_route( 'sitemap/v1', '/posts', array( 
      'methods' => 'GET',
      'callback' => [ $this, 'generate_posts_api' ],
    ));
    register_rest_route( 'sitemap/v1', '/taxonomy', array( 
      'methods' => 'GET',
      'callback' => [ $this, 'generate_taxonomy_api' ],
    ));
    register_rest_route( 'sitemap/v1', '/author', array( 
      'methods' => 'GET',
      'callback' => [ $this, 'generate_author_api' ],
    ));
    register_rest_route( 'sitemap/v1', '/totalpages', array( 
      'methods' => 'GET',
      'callback' => [ $this, 'generate_totalpages_api' ],
    ));
  }

  /**
   * Generate author API.
   * 
   * Generates the author API.
   * 
   * @since 1.0.0
   * 
   * @return array An array of author URLs.
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_user_inputs()
   * 
   * @link get_users() https://developer.wordpress.org/reference/functions/get_users/
   * @link get_author_posts_url() https://developer.wordpress.org/reference/functions/get_author_posts_url/
   * @link esc_url() https://developer.wordpress.org/reference/functions/esc_url/
   * @link home_url() https://developer.wordpress.org/reference/functions/home_url/
   */
  public function generate_author_api() {
    [$args] = self::get_user_inputs();
    $author_urls = array();
    $authors = get_users( $args );
    foreach ( $authors as $author ) {
      $fullUrl = esc_url( get_author_posts_url( $author->ID ) );
      $url = str_replace( home_url(), '', $fullUrl );
      $tempArray = [
        'url' => $url,
      ];
      array_push( $author_urls, $tempArray );
    }
    return array_merge( $author_urls );
  }

  /**
   * Generate taxonomy API.
   * 
   * Generates the taxonomy API.
   * 
   * @since 1.0.0
   * 
   * @return array An array of taxonomy URLs.
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_user_inputs()
   * 
   * @link get_tags() https://developer.wordpress.org/reference/functions/get_tags/
   * @link get_categories() https://developer.wordpress.org/reference/functions/get_categories/
   * @link get_category_link() https://developer.wordpress.org/reference/functions/get_category_link/
   * @link get_tag_link() https://developer.wordpress.org/reference/functions/get_tag_link/
   * @link esc_url() https://developer.wordpress.org/reference/functions/esc_url/
   * @link home_url() https://developer.wordpress.org/reference/functions/home_url/
   */
  public function generate_taxonomy_api() {
    [$args,, $taxonomy] = self::get_user_inputs();
    $taxonomy_urls = array();
    $taxonomys = $taxonomy == 'tag' ? get_tags( $args ) : get_categories( $args );
    foreach ( $taxonomys as $taxonomy ) {
      $fullUrl = esc_url( get_category_link( $taxonomy->term_id ) );
      $url = str_replace( home_url(), '', $fullUrl );
      $tempArray = [
        'url' => $url,
      ];
      array_push( $taxonomy_urls, $tempArray );
    }
    return array_merge( $taxonomy_urls );
  }

  /**
   * Generate posts API.
   * 
   * Generates the posts API.
   * 
   * @since 1.0.0
   * 
   * @return array An array of post URLs with their modified dates.
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_user_inputs()
   * 
   * @link WP_Query https://developer.wordpress.org/reference/classes/wp_query/
   * @link get_permalink() https://developer.wordpress.org/reference/functions/get_permalink/
   * @link get_the_modified_date() https://developer.wordpress.org/reference/functions/get_the_modified_date/
   * @link wp_reset_postdata() https://developer.wordpress.org/reference/functions/wp_reset_postdata/
   */
  public function generate_posts_api() {
    [, $postArgs] = self::get_user_inputs();
    $postUrls = array();
    $query = new \WP_Query( $postArgs );

    while ( $query->have_posts() ) {
      $query->the_post();
      $uri = str_replace( home_url(), '', get_permalink() );
      $tempArray = [
        'url' => $uri,
        'post_modified_date' => get_the_modified_date(),
      ];
      array_push( $postUrls, $tempArray );
    }
    wp_reset_postdata();
    return array_merge( $postUrls );
  }

  /**
   * Generate total pages API.
   * 
   * Generates the total pages API for posts, categories, tags, and users.
   * 
   * @since 1.0.0
   * 
   * @return array An array containing the total counts of posts, categories, tags, and users.
   * 
   * @link get_post_types() https://developer.wordpress.org/reference/functions/get_post_types/
   * @link get_categories() https://developer.wordpress.org/reference/functions/get_categories/
   * @link get_tags() https://developer.wordpress.org/reference/functions/get_tags/
   * @link get_users() https://developer.wordpress.org/reference/functions/get_users/
   */
  public function generate_totalpages_api() {
    $args = array( 
      'exclude_from_search' => false
    );
    $argsTwo = array( 
      'publicly_queryable' => true
    );
    $post_types = get_post_types( $args, 'names' );
    $post_typesTwo = get_post_types( $argsTwo, 'names' );
    $post_types = array_merge( $post_types, $post_typesTwo );
    unset( $post_types['attachment'] );
    $defaultArray = [
      'category' => count( get_categories() ),
      'tag' => count( get_tags() ),
      'user' => ( int )count_users()['total_users'],
    ];
    $tempValueHolder = array();
    foreach ( $post_types as $postType ) {
      $tempValueHolder[$postType] = ( int )wp_count_posts( $postType )->publish;
    }
    return array_merge( $defaultArray, $tempValueHolder );
  }

  /**
   * Register template structure routes.
   *
   * @since 1.0.0
   * 
   * @return void
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_full_template_structure()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_template_structure_template()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_template_structure_part()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_template_structure_pattern()
   * 
   * @link register_rest_route() https://developer.wordpress.org/reference/functions/register_rest_route/
   */
  public function register_template_structure_routes() {
    register_rest_route( 'template-structure/v1', '/full', [
      'methods' => 'GET',
      'callback' => [ $this, 'get_full_template_structure' ],
      'permission_callback' => '__return_true'
    ]);
    register_rest_route( 'template-structure/v1', '/templates/(?P<slug>[a-zA-Z0-9-_]+)', [
      'methods' => 'GET',
      'callback' => [ $this, 'get_template_structure_template' ],
      'permission_callback' => '__return_true'
    ]);
    register_rest_route( 'template-structure/v1', '/parts/(?P<slug>[a-zA-Z0-9-_]+)', [
      'methods' => 'GET',
      'callback' => [ $this, 'get_template_structure_part' ],
      'permission_callback' => '__return_true'
    ]);
    register_rest_route( 'template-structure/v1', '/patterns/(?P<slug>[a-zA-Z0-9-_]+)', [
      'methods' => 'GET',
      'callback' => [ $this, 'get_template_structure_pattern' ],
      'permission_callback' => '__return_true'
    ]);
  }

  /**
   * Get full template structure.
   *
   * Fetches template structure blocks from the specified directories.
   * Used by the REST API endpoint to retrieve template blocks for
   * the frontend at build time.
   *
   * @since 1.0.0
   * 
   * @param WP_REST_Request $request The REST API request.
   * 
   * @return array An array of template structure blocks with their slugs and content.
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_theme_path()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::render_dynamic_blocks()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::normalize_block_keys()
   * 
   * @link parse_blocks() https://developer.wordpress.org/reference/functions/parse_blocks/
   */
  public function get_full_template_structure( $request ) {
    $base = self::get_theme_path();
    $dirs = [
      'templates' => $base . '/templates',
      'parts'     => $base . '/parts',
      'patterns'  => $base . '/patterns',
    ];
    $result = [];

    foreach ( $dirs as $type => $dir ) {
      if ( is_dir( $dir ) ) {
        $files = array_filter( scandir( $dir ), function( $f ) use ($type) {
          // Patterns can be .php or .html, others .html only
          if ( $type === 'patterns' ) {
            return !in_array( $f, ['.', '..'] ) && in_array( pathinfo( $f, PATHINFO_EXTENSION ), ['php', 'html'] );
          }
          return !in_array( $f, ['.', '..'] ) && pathinfo( $f, PATHINFO_EXTENSION ) === 'html';
        });

        $result[$type] = [];

        foreach ( $files as $file ) {
          $slug = pathinfo( $file, PATHINFO_FILENAME );
          $file_path = $dir . '/' . $file;
          $content = file_get_contents( $file_path );
          if ( $content === false ) continue;

          // Remove PHP docblock if present
          if ( preg_match( '/<\?php(.*?)\?>/s', $content, $matches ) ) {
            $content = str_replace( $matches[0], '', $content );
          }

          // Normalize line breaks
          $content = preg_replace('/\r\n|\r|\n/', '', $content);
          $content = preg_replace('/\n{2,}/', "\n", $content);

          // Parse blocks, normalize and render
          $blocks = parse_blocks(trim($content));
          $blocks = self::render_dynamic_blocks($blocks);
          $blocks = self::normalize_block_keys( $blocks );
          $blocks = array_values($blocks);

          $result[$type][$slug] = [
            'slug' => $slug,
            'content' => $content,
            'blocks' => $blocks,
            'blocksJSON' => json_encode( $blocks ),
          ];
        }
      }
    }
    return $result;
  }

  /**
   * Get the template structure for a template.
   *
   * @since 1.0.0
   * 
   * @param WP_REST_Request $request The REST API request.
   * 
   * @return array|WP_Error The template structure or an error.
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_theme_path()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::render_dynamic_blocks()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::normalize_block_keys()
   * 
   * @link parse_blocks() https://developer.wordpress.org/reference/functions/parse_blocks/
   */
  public function get_template_structure_template( $request ) {
    $slug = $request['slug'];
    $base = self::get_theme_path() . '/templates';
    $file = $base . '/' . $slug . '.html';
    $content = file_get_contents( $file );
    if ( $content === false ) return;

    // Remove PHP docblock if present
    if ( preg_match( '/<\?php(.*?)\?>/s', $content, $matches ) ) {
      $content = str_replace( $matches[0], '', $content );
    }

    // Normalize line breaks
    $content = preg_replace('/\r\n|\r|\n/', '', $content);
    $content = preg_replace('/\n{2,}/', "\n", $content);

    // Parse blocks, normalize and render
    $blocks = parse_blocks(trim($content));
    $blocks = self::render_dynamic_blocks($blocks);
    $blocks = self::normalize_block_keys( $blocks );
    $blocks = array_values($blocks);

    return [
      'slug' => $slug,
      'content' => $content,
      'blocks' => $blocks,
      'blocksJSON' => json_encode( $blocks ),
    ];
  }

  /**
   * Get the template structure for a part.
   *
   * @since 1.0.0
   * @param WP_REST_Request $request The REST API request.
   * @return array|WP_Error The template structure or an error.
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_theme_path()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::render_dynamic_blocks()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::normalize_block_keys
   * 
   * @link parse_blocks() https://developer.wordpress.org/reference/functions/parse_blocks/
   */
  public function get_template_structure_part( $request ) {
    $slug = $request['slug'];
    $base = self::get_theme_path() . '/parts';
    $file = $base . '/' . $slug . '.html';
    $content = file_get_contents( $file );
    if ( $content === false ) return;

    // Remove PHP docblock if present
    if ( preg_match( '/<\?php(.*?)\?>/s', $content, $matches ) ) {
      $content = str_replace( $matches[0], '', $content );
    }

    // Normalize line breaks
    $content = preg_replace('/\r\n|\r|\n/', '', $content);
    $content = preg_replace('/\n{2,}/', "\n", $content);

    // Parse blocks, normalize and render
    $blocks = parse_blocks(trim($content));
    $blocks = self::render_dynamic_blocks($blocks);
    $blocks = self::normalize_block_keys( $blocks );
    $blocks = array_values($blocks);

    return [
      'slug' => $slug,
      'content' => $content,
      'blocks' => $blocks,
      'blocksJSON' => json_encode( $blocks ),
    ];
  }

  /**
   * Get the template structure for a pattern.
   *
   * @since 1.0.0
   * @param WP_REST_Request $request The REST API request.
   * @return array|WP_Error The template structure or an error.
   * 
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::get_theme_path()
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::render_dynamic_blocks
   * @see WonderjarCreativeBackend\Inc\Features\RestFeature::normalize_block_keys
   * 
   * @link parse_blocks() https://developer.wordpress.org/reference/functions/parse_blocks/
   */
  public function get_template_structure_pattern( $request ) {
    $slug = $request['slug'];
    $base = self::get_theme_path() . '/patterns';
    $file_html = $base . '/' . $slug . '.html';
    $file_php = $base . '/' . $slug . '.php';
    if ( file_exists( $file_html ) ) {
      $file = $file_html;
    } elseif ( file_exists( $file_php ) ) {
      $file = $file_php;
    }
    $content = file_get_contents( $file );
    if ( $content === false ) return;

    // Remove PHP docblock if present
    if ( preg_match( '/<\?php(.*?)\?>/s', $content, $matches ) ) {
      $content = str_replace( $matches[0], '', $content );
    }

    // Normalize line breaks
    $content = preg_replace('/\r\n|\r|\n/', '', $content);
    $content = preg_replace('/\n{2,}/', "\n", $content);

    // Parse blocks, normalize and render
    $blocks = parse_blocks(trim($content));
    $blocks = self::render_dynamic_blocks($blocks);
    $blocks = self::normalize_block_keys( $blocks );
    $blocks = array_values($blocks);

    return [
      'slug' => $slug,
      'content' => $content,
      'blocks' => $blocks,
      'blocksJSON' => json_encode( $blocks ),
    ];
  }

  /**
   * Get user inputs.
   * 
   * Gets the user inputs from the GET request.
   * 
   * @since 1.0.0
   * @return array An array containing the arguments for users, posts, and taxonomy.
   */
  private static function get_user_inputs() {
    $pageNo = sprintf( "%d", $_GET['pageNo'] );
    $perPage = sprintf( "%d", $_GET['perPage'] );
    $taxonomy = array_key_exists( 'taxonomyType', $_GET ) ? $_GET['taxonomyType'] : 'category';
    $postType = $_GET['postType'];
    $paged = $pageNo ? $pageNo : 1;
    $perPage = $perPage ? $perPage : 100;
    $offset = ( $paged - 1 ) * $perPage;
    $args = array( 
      'number' => $perPage,
      'offset' => $offset,
    );
    $postArgs = array( 
      'posts_per_page' => $perPage,
      'post_type' => strval( $postType ? $postType : 'post' ),
      'paged' => $paged,
    );

    return [$args, $postArgs, $taxonomy];
  }

  /**
   * Check if a block is dynamic.
   *
   * @since 1.0.0
   * @param string $block_name The block name.
   * @return bool True if the block is dynamic, false otherwise.
   */
  private static function is_dynamic_block($block_name) {
    $block_type = \WP_Block_Type_Registry::get_instance()->get_registered($block_name);
    if ( 'core/template-part' === $block_name || 'core/pattern' === $block_name ) {
      return false;
    }
    return $block_type && $block_type->is_dynamic();
  }

  /**
   * Render dynamic blocks.
   *
   * @since 1.0.0
   * 
   * @param array $blocks The blocks to render.
   * 
   * @return array The rendered blocks.
   * 
   * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/#is_dynamic
   * @link https://developer.wordpress.org/reference/functions/render_block/
   */
  private static function render_dynamic_blocks( $blocks ) {
    return array_map( function( $block ) {
      if ( self::is_dynamic_block( $block['blockName'] ) ) {
        $block['isDynamic'] = true;
        $block['dynamicContent'] = render_block( $block );
      }

      if ( isset( $block['innerBlocks'] ) ) {
        $block['innerBlocks'] = array_values( self::render_dynamic_blocks( $block['innerBlocks'] ) );
      }
      return $block;
    }, $blocks );
  }

  /**
   * Normalize block keys.
   * 
   * Normalizes block keys to ensure compatibility with the frontend.
   * Converts 'blockName' to 'name' and 'attrs' to 'attributes'.
   * 
   * @since 1.0.0
   * 
   * @param array $blocks The blocks to normalize.
   * 
   * @return array The normalized blocks.
   */
  private static function normalize_block_keys( $blocks ) {
    return array_map( function( $block ) {
      if ( isset( $block['blockName'] ) && ! isset( $block['name'] ) ) {
        $block['name'] = $block['blockName'];
        unset( $block['blockName'] );
      }

      if ( isset( $block['attrs'] ) && ! isset( $block['attributes'] ) ) {
        $block['attributes'] = $block['attrs'];
        unset( $block['attrs'] );
      }

      if ( isset( $block['innerHTML'] ) && ! isset( $block['saveContent'] ) ) {
        $block['saveContent'] = $block['innerHTML'];
        unset( $block['innerHTML'] );
      }

      if ( isset( $block['innerBlocks'] ) ) {
        $block['innerBlocks'] = array_values( self::normalize_block_keys( $block['innerBlocks'] ) );
      }

      return $block;
    }, $blocks );
  }
}