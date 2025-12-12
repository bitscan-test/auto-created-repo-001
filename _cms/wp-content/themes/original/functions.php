<?php
// ウィジェットエリア
// サイドバーのウィジェット
register_sidebar( array(
     'name' => __( 'sidebar' ),
     'id' => 'sidebar1',
     'before_widget' => '<li class="widget %2$s">',
     'after_widget' => '</li>',
     'before_title' => '<h3 class="widgetTitle">',
     'after_title' => '</h3>',
) );
 register_sidebar( array(
     'name' => __( 'side-widget1' ),
     'id' => 'side-widget1',
     'before_widget' => '<li class="widget %2$s">',
     'after_widget' => '</li>',
     'before_title' => '<h3 class="widgetTitle">',
     'after_title' => '</h3>',
) );
 


 


 add_theme_support( 'post-thumbnails' );

 
 


//Custom CSS Widget
add_action('admin_menu', 'custom_css_hooks');
add_action('save_post', 'save_custom_css');
add_action('wp_head','insert_custom_css');
function custom_css_hooks() {
  add_meta_box('custom_css', 'Custom CSS', 'custom_css_input', 'post', 'normal', 'high');
  add_meta_box('custom_css', 'Custom CSS', 'custom_css_input', 'page', 'normal', 'high');
}
function custom_css_input() {
  global $post;
  echo '<input type="hidden" name="custom_css_noncename" id="custom_css_noncename" value="'.wp_create_nonce('custom-css').'" />';
  echo '<textarea name="custom_css" id="custom_css" rows="5" cols="30" style="width:100%;">'.get_post_meta($post->ID,'_custom_css',true).'</textarea>';
}
function save_custom_css($post_id) {
  if (!wp_verify_nonce($_POST['custom_css_noncename'], 'custom-css')) return $post_id;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return $post_id;
  $custom_css = $_POST['custom_css'];
  update_post_meta($post_id, '_custom_css', $custom_css);
}
function insert_custom_css() {
  if (is_page() || is_single()) {
    if (have_posts()) : while (have_posts()) : the_post();
      echo '<style type="text/css">'.get_post_meta(get_the_ID(), '_custom_css', true).'</style>';
      endwhile; endif;
      rewind_posts();
  }
}



/* カスタム投稿タイプ */
add_action( 'init', 'create_post_type' );
function create_post_type() {
  register_post_type( 'news', /* post-type */
    array(
      'labels' => array(
        'name' => __( '新着情報' ),
        'singular_name' => __( '新着情報' )
      ),'supports' => array(
            'title',
'excerpt',
            'editor',
'thumbnail',//このカスタム投稿でアイキャッチ
   'comments'),	
'publicly_queryable' => false,//プレビュー
    'has_archive' => true,//アーカイブ一覧取得可能
      'public' => true,
      'menu_position' => 5,
		
    )
  );
  

}





function remove_menus () {
    if (!current_user_can('level_9')) { //level9以下のユーザーの場合メニューをunsetする
    global $menu;
    unset($menu[75]);//ツール
    }
}
add_action('admin_menu', 'remove_menus');





function custom_excerpt_length( $length ) {
     return 190; 
}       
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

//概要（抜粋）の省略文字
function my_excerpt_more($more) {
	return '…';
}
add_filter('excerpt_more', 'my_excerpt_more');





?>
