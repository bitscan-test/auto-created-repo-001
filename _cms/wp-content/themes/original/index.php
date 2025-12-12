<!DOCTYPE html>
<html lang="ja"><?php
$webroot = $_SERVER['DOCUMENT_ROOT'];
include($webroot."/init.php"); ?>
	<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#"><?php include_once(ROOTPATH."assets/inc/gtm_head.html"); ?>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title><?= $init['meta']['blog']['title'] ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
		<meta name="format-detection" content="telephone=no">
		<meta name="twitter:card" content="summary_large_image">
		<meta property="og:locale" content="ja_JP">
		<meta name="description" content="<?= $init['meta']['blog']['description'] ?>">
		<meta name="keyword" content="<?= $init['meta']['blog']['keyword'] ?>">
		<meta property="og:title" content="<?= $init['meta']['blog']['title'] ?>">
		<meta property="og:description" content="<?= $init['meta']['blog']['description'] ?>">
		<meta property="og:url" content="<?= $init['clinic']['url'] ?>">
		<meta property="og:image" content="<?= $init['clinic']['url'] ?>images/cmn/pic_ogp.jpg">
		<meta property="og:type" content="website">
		<link rel="dns-prefetch" href="//ajax.googleapis.com">
		<link rel="apple-touch-icon" href="/<?= $dir; ?>assets/images/apple-touch-icon.png">
		<link rel="icon" type="image/png" href="/<?= $dir; ?>assets/images/android-chrome-256x256.png">
		<link rel="shortcut icon" href="/<?= $dir; ?>assets/images/favicon.ico">
		<link rel="preconnect" href="//fonts.googleapis.com">
		<link rel="preconnect" href="//fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;700&amp;display=swap" rel="stylesheet">

<link href="https://fonts.googleapis.com/css2?family=Ms+Madi&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="/<?= $dir; ?>assets/css/style_<?= $init["color"]; ?>.css?<?= filemtime("./assets/css/style_".$init["color"].".css") ?>">
<link href="<?php bloginfo('template_directory'); ?>/style.css" rel="stylesheet" type="text/css" />
		<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?zRicjqTQ7cc%3D&box=nmn9AmAO85Q%3D&aa=1&ab=2"></script>
		<script type="application/ld+json">
			{
				"@context": "http://schema.org",
				"@type": "BreadcrumbList",
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"item": {
							"@id": "<?= $init['clinic']['url'] ?>",
							"name": "HOME"
						}
					}
				]
			}
	</script>
<?php wp_head(); ?>
	</head>
	<body id="p-services">
		<div class="wrapper" id="wrapper"><?php include_once(ROOTPATH."/assets/inc/header.html"); ?>
			<main class="main__contents" id="main">
				<!-- headding-->
				<h1 class="headding"><?= $init['meta']['blog']['h1'] ?></h1>
				<!-- mainvisual-->
					
					
				<header class="banner_sub">
					<div class="banner_sub__img">
						<picture>
							<source media="(max-width:1024px)" srcset="/assets/images/main/banner_1_sp.jpg"><img
							src="/assets/images/main/banner_1.jpg">
						</picture>
					</div>
					<div class="banner_sub__ttl">
						<p class="animation fadeInLft">コラム</p>
						<p class="is-en sub_ttl animation fadeInLft">COLUMN</p>
					</div>
				</header>
				<!-- breadcrumbs-->
				<div class="pankuzu">
					<div class="container">
						<p><a href="/<?= $dir; ?>">top > </a> コラム</p>
					</div>
				</div>
				<!-- menu-->
				
				
				
				<!-- single-->
				<section class="service_blog">
					<div class="container">
    <div id="mainbox">
            
      <?php if ( have_posts() ) : ?>
      <?php while ( have_posts() ) : the_post(); ?>
						
						
						<div class="blog__row">
						
							<div class="blog__cnt animation fadeInRgt">
								<h1 class="blog_tit"><a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
	<div>
  <?php echo mb_substr( get_the_excerpt(), 0, 150 ) . '[...]'; ?>
                    <a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>" class="more">続きを読む</a>
				  </div>
							</div>
						</div>
										
		<?php endwhile; ?>
<!--startページャー-->
<div class="pager"><?php global $wp_rewrite;
$paginate_base = get_pagenum_link(1);
if (strpos($paginate_base, '?') || ! $wp_rewrite->using_permalinks()) {
$paginate_format = '';
$paginate_base = add_query_arg('paged', '%#%');
} else {
$paginate_format = (substr($paginate_base, -1 ,1) == '/' ? '' : '/') .
user_trailingslashit('page/%#%/', 'paged');;
$paginate_base .= '%_%';
}
echo paginate_links( array(
'base' => $paginate_base,
'format' => $paginate_format,
'total' => $wp_query->max_num_pages,
'mid_size' => 5,
'current' => ($paged ? $paged : 1),
'prev_text' => '&laquo;',
'next_text' => '&raquo;',
)); ?></div>
<!--endページャー--> 
       
       
<?php else : ?>
  
	<p>記事が見つかりません</p>

           <?php endif; ?>　

				
 </div><!--mainbox-->

        <div id="side">
            <ul>
                <?php dynamic_sidebar( 'side-widget1' ); ?>
            </ul>

        </div>
      
          <br clear="all">
		  			
						</div>
						
						

					</div>
				</section>
				<!-- banner-->
				<!-- end Content-->
			</main><?php include_once(ROOTPATH."/assets/inc/footer.html"); ?>
		</div><?php include_once(ROOTPATH."/assets/inc/script.html"); ?>
		<script></script>
	<?php wp_footer(); ?>
	</body>
</html>