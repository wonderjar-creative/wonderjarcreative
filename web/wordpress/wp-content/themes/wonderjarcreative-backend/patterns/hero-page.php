<?php
/**
 * Title: Hero Page
 * Slug: wonderjarcreative-backend/hero-page
 * Categories: banner, hero
 * Description: Hero section for page with dynamic content.
 *
 * @package WonderjarCreativeBackend
 * @since 1.4.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://wonderjarcreative.com
 */

?>
<!-- wp:cover {"overlayColor":"teal","isUserOverlayColor":true,"minHeight":70,"minHeightUnit":"vh","isDark":false,"align":"full","className":"dot-pattern","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}}} -->
<div class="wp-block-cover alignfull is-light dot-pattern" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70);min-height:70vh"><span aria-hidden="true" class="wp-block-cover__background has-teal-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide">
  <!-- wp:heading {"textAlign":"center","level":1,"align":"wide","className":"text-3xl md:text-5xl lg:text-7xl","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|40"}}},"metadata":{
    "bindings":{
      "content":{
        "source":"wonderjarcreative-backend/page-meta",
        "args":{
          "key":"hero_title"
        }  
      }
    }
  }} -->
  <h1 class="wp-block-heading alignwide has-text-align-center text-3xl md:text-5xl lg:text-7xl" style="margin-bottom:var(--wp--preset--spacing--40)">About Us</h1>
  <!-- /wp:heading -->

  <!-- wp:paragraph {"align":"center","className":"text-lg md:text-xl","metadata":{
    "bindings":{
      "content":{
        "source":"wonderjarcreative-backend/page-meta",
        "args":{
          "key":"hero_description"
        }  
      }
    }
  } -->
  <p class="has-text-align-center text-lg md:text-xl">Learn how we turn ideas into meaningful digital experiences</p>
  <!-- /wp:paragraph -->
</div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->
