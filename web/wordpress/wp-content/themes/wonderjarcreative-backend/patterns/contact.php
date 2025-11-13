<?php
/**
 * Title: Contact
 * Slug: wonderjarcreative-backend/contact
 * Categories: page
 * Description: Contact page pattern with cover and contact form.
 * 
 * @package WonderjarCreativeBackend
 * @since 1.0.0
 * @author wjmatt <matt@wonderjarcreative.com>
 * @link https://wonderjarcreative.com
 */
?>
<!-- wp:cover {"url":"<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/assets/images/hero-bg.jpg","dimRatio":50,"overlayColor":"contrast","minHeight":400,"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}}} -->
<div class="wp-block-cover alignfull" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80);min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/assets/images/hero-bg.jpg" data-object-fit="cover"/><div class="wp-block-cover__inner-container">
<!-- wp:group {"align":"wide","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group alignwide">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3.5rem","fontWeight":"700"},"spacing":{"margin":{"bottom":"var:preset|spacing|40"}}}} -->
<h1 class="has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--40);font-size:3.5rem;font-weight:700">Get In Touch</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem"}}} -->
<p class="has-text-align-center" style="font-size:1.25rem">Have a project in mind? Let's talk about how we can bring your vision to life.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|60","left":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns alignwide">
<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}}} -->
<h2 style="margin-bottom:var(--wp--preset--spacing--50);font-size:2.5rem;font-weight:700">Let's Work Together</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}}} -->
<p style="margin-bottom:var(--wp--preset--spacing--50)">Whether you need a complete brand overhaul, a new website, or ongoing creative support, we're here to help turn your ideas into reality.</p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|40","margin":{"top":"var:preset|spacing|50"}}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group" style="margin-top:var(--wp--preset--spacing--50)">
<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700"}}} -->
<p style="font-weight:700">📧 Email</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="mailto:hello@wonderjarcreative.com">hello@wonderjarcreative.com</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700"}}} -->
<p style="font-weight:700">📍 Location</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Phoenix, Arizona</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700"}}} -->
<p style="font-weight:700">🕐 Hours</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Monday - Friday, 9am - 5pm MST</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">
<!-- wp:gravityforms/form {"formId":"1","title":true,"description":true,"ajax":true} /-->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"backgroundColor":"contrast","textColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-base-color has-contrast-background-color has-text-color has-background has-link-color" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"700"},"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}}} -->
<h2 class="has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--50);font-size:2rem;font-weight:700">Frequently Asked Questions</h2>
<!-- /wp:heading -->

<!-- wp:group {"align":"wide","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group alignwide">
<!-- wp:details {"showContent":false,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"border":{"bottom":{"width":"1px"},"top":[],"right":[],"left":[]}},"borderColor":"contrast-2"} -->
<details class="wp-block-details has-border-color has-contrast-2-border-color" style="margin-bottom:var(--wp--preset--spacing--30);border-bottom-width:1px"><summary><strong>What types of projects do you work on?</strong></summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"spacing":{"margin":{"top":"var:preset|spacing|30"}}}} -->
<p style="margin-top:var(--wp--preset--spacing--30)">We specialize in brand identity, web design and development, print design, and creative strategy. From startups to established businesses, we work with clients across all industries.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details {"showContent":false,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"border":{"bottom":{"width":"1px"},"top":[],"right":[],"left":[]}},"borderColor":"contrast-2"} -->
<details class="wp-block-details has-border-color has-contrast-2-border-color" style="margin-bottom:var(--wp--preset--spacing--30);border-bottom-width:1px"><summary><strong>How long does a typical project take?</strong></summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"spacing":{"margin":{"top":"var:preset|spacing|30"}}}} -->
<p style="margin-top:var(--wp--preset--spacing--30)">Project timelines vary based on scope and complexity. A basic website might take 4-6 weeks, while a complete brand identity could take 8-12 weeks. We'll provide a detailed timeline during our initial consultation.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details {"showContent":false,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"border":{"bottom":{"width":"1px"},"top":[],"right":[],"left":[]}},"borderColor":"contrast-2"} -->
<details class="wp-block-details has-border-color has-contrast-2-border-color" style="margin-bottom:var(--wp--preset--spacing--30);border-bottom-width:1px"><summary><strong>What is your process like?</strong></summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"spacing":{"margin":{"top":"var:preset|spacing|30"}}}} -->
<p style="margin-top:var(--wp--preset--spacing--30)">We start with a discovery phase to understand your goals, followed by research and strategy. Then we move into design concepts, revisions, and finally implementation. You'll be involved at every stage.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details {"showContent":false,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"border":{"bottom":{"width":"1px"},"top":[],"right":[],"left":[]}},"borderColor":"contrast-2"} -->
<details class="wp-block-details has-border-color has-contrast-2-border-color" style="margin-bottom:var(--wp--preset--spacing--30);border-bottom-width:1px"><summary><strong>Do you offer ongoing support?</strong></summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"spacing":{"margin":{"top":"var:preset|spacing|30"}}}} -->
<p style="margin-top:var(--wp--preset--spacing--30)">Yes! We offer maintenance packages for websites and ongoing creative support for brands. We're here to help you grow and evolve over time.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->