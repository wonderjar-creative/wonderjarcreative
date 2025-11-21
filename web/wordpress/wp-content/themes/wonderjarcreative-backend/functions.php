<?php
/**
 * Wonderjar Creative Backend functions and definitions.
 * 
 * @package WonderjarCreativeBackend
 * @since 1.0.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://wonderjarcreative.com
 */

use WonderjarCreativeBackend\Inc\Activator;
use WonderjarCreativeBackend\Inc\Deactivator;
use WonderjarCreativeBackend\Inc\Theme;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Define version constant.
 * 
 * All other "constants" are defined as class properties or constants.
 *
 * @since 1.0.0
 */
define( 'WONDERJAR_CREATIVE_BACKEND_VERSION', '1.0.1' );

/**
 * Include Composer's autoloader.
 * 
 * @since 1.0.0
 */
require_once __DIR__ . '/vendor/autoload.php';

/**
 * Run the toolkit.
 *
 * @since 1.0.0
 */
Theme::get_instance()->run();