<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;



class Extremes_Price
{
    public static function additional_taxes($additional_taxes, $res = array())
    {
        if (!empty($additional_taxes)) {
            $t = explode('+', $additional_taxes);
            if (!empty($t) and is_array($t)) {
                foreach ($t as $string) {
                    $tmp = explode(':', $string);
                    $tax_slug = $tmp[0];
                    $tax_terms = explode(',', $tmp[1]);
                    $slugs = array();
                    foreach ($tax_terms as $term_id) {
                        $term = get_term(intval($term_id), $tax_slug);
                        if (is_object($term)) {
                            $slugs[] = $term->slug;
                        }
                    }
                    if (!empty($slugs)) {
                        $res[] = array(
                            'taxonomy' => $tax_slug,
                            'field' => 'slug',
                            'terms' => $slugs
                        );
                    }
                }
            }
        }
        return $res;
    }

    public static function get_price($additional_taxes = "")
    {
        global $wpdb, $wp_the_query;
        $args = $wp_the_query->query_vars;
        $tax_query = isset($args['tax_query']) ? $args['tax_query'] : array();
        if (is_object($wp_the_query->tax_query)) {
            $tax_query = $wp_the_query->tax_query->queries;
        }
        $meta_query = isset($args['meta_query']) ? $args['meta_query'] : array();
        $tax_query = self::additional_taxes($additional_taxes, $tax_query);
        $temp_arr = array();
        if (isset($args['taxonomy']) and isset($args[$args['taxonomy']]) and !empty($args[$args['taxonomy']])) {
            $temp_arr = explode(',', $args[$args['taxonomy']]);
            if (!$temp_arr or count($temp_arr) < 1) {
                $temp_arr = array();
            }
        }
        if (!empty($args['taxonomy']) && !empty($args['term'])) {
            $tax_query[] = array(
                'taxonomy' => $args['taxonomy'],
                'terms' => (empty($temp_arr)) ? array($args['term']) : $temp_arr,
                'field' => 'slug',
            );
        }
        if (!empty($meta_query) and is_array($meta_query)) {
            foreach ($meta_query as $key => $query) {
                if (!empty($query['price_filter']) || !empty($query['rating_filter'])) {
                    unset($meta_query[$key]);
                }
            }
        }
        $meta_query = new WP_Meta_Query($meta_query);
        $tax_query = new WP_Tax_Query($tax_query);
        $meta_query_sql = $meta_query->get_sql('post', $wpdb->posts, 'ID');
        $tax_query_sql = $tax_query->get_sql($wpdb->posts, 'ID');
        $sql = "SELECT min( FLOOR( price_meta.meta_value + 0.0) ) as min_price, max( CEILING( price_meta.meta_value + 0.0) )as max_price FROM {$wpdb->posts} ";
        $sql .= " LEFT JOIN {$wpdb->postmeta} as price_meta ON {$wpdb->posts}.ID = price_meta.post_id " . $tax_query_sql['join'] . $meta_query_sql['join'];
        $sql .= " WHERE {$wpdb->posts}.post_type = 'product'
        AND {$wpdb->posts}.post_status = 'publish'
        AND price_meta.meta_key IN ('" . implode("','", array_map('esc_sql', apply_filters('woocommerce_price_filter_meta_keys', array('_price')))) . "')
        AND price_meta.meta_value > '' ";
        $sql .= $tax_query_sql['where'] . $meta_query_sql['where'];
        return $wpdb->get_row($sql);
    }

    public static function get_max_price($additional_taxes = "")
    {
        $prices = self::get_price($additional_taxes);
        $max = ceil($prices->max_price);
        return $max;
    }

    public static function get_min_price($additional_taxes = "")
    {
        $prices = self::get_price($additional_taxes);
        $min = floor($prices->min_price);
        return $min;
    }
}




get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */

$post_per_page = 12;
$string_query = '';
$args_products['status'] =  'publish';
$args_products['orderby'] = 'meta_value_num';
$args_products['meta_key'] = '_price';
$args_products['order'] = 'DESC';



global $WOOCS;
$currencies = $WOOCS-> get_currencies();
$current_currensy = $WOOCS->current_currency;

// Получение всех полей из GET ЗАПРОСА

$obj = get_queried_object();//Объект категории
if(isset($obj)){
    $args_products['tax_query'] = array(
        array(
          'taxonomy' => 'type_real',
          'field'    => 'term_id',
          'terms'     =>  $obj->term_id,
          'operator'  => 'IN'
          )
        );
    $string_query = $string_query . '&category='.$obj->term_id; 
}
$order = $_GET['order-by'];
if(isset( $order )) {
    $string_query = $string_query . '&order-by='.$order; 
    switch ($order) {
        case 'DESC price':
            $args_products['orderby'] = 'meta_value_num';
            $args_products['meta_key'] = '_price';
            $args_products['order'] = 'DESC';
            break;
        case 'ASK price':
            $args_products['orderby'] = 'meta_value_num';
            $args_products['meta_key'] = '_price';
            $args_products['order'] = 'ASC';
            break;
        case 'ASK square':
            $args_products['orderby'] = 'meta_value_num';
            $args_products['meta_key'] = 'square';
            $args_products['order'] = 'ASC';
            break;
        case 'DESC square':
            $args_products['orderby'] = 'meta_value_num';
            $args_products['meta_key'] = 'square';
            $args_products['order'] = 'DESC';
            break; 
        default:
            # code...
            break;
    }
}
$min = str_replace(' ',"",$_GET['min-price']);
$max = str_replace(' ',"",$_GET['max-price']);
$min = str_replace(',',".",$min);
$max = str_replace(',',".",$max);



if(isset($_GET['min-price'])){
    global $WOOCS;
    $current = $WOOCS->current_currency;
    $min_converted = $WOOCS->convert_from_to_currency($min, $current, 'USD');
    $max_converted = $WOOCS->convert_from_to_currency($max, $current, 'USD');
    $args_products['price_range'] = $min_converted.'|'.$max_converted;
    $string_query = $string_query .'&min-price='. $min_converted; 
    $string_query = $string_query .'&max-price='. $max_converted; 
}

$number_of_rooms = $_GET['rooms'];
if(isset($number_of_rooms)){
   array_push($args_products['tax_query'], array(
    'taxonomy' => 'pa_комнат',
    'field'    => 'name',
    'terms'     =>  $number_of_rooms,
    'operator'  => 'IN'
    )); 
    $string_query = $string_query .'&rooms='. implode(',',$number_of_rooms); 
}
$category = $_GET['realty-type'];
if(isset($category)){
    
    array_push($args_products['tax_query'], array(
        'taxonomy' => 'product_cat',
        'field'    => 'name',
        'terms'     =>  $category,
        'operator'  => 'IN'
        )); 
        $string_query = $string_query .'&realty-type='. $category; 
}
else{
    $category = 'Все';
}

$search = $_GET['search'];
if(isset($search)){
   $args_products['s']= $search;
   $string_query = $string_query .'&search='. $search; 
}

$categories = get_categories( [
	'taxonomy'     => 'product_cat',
	'order'        => 'ASC',
] );
$rooms = get_terms('pa_комнат');


$args_products['limit'] = -1;
$args_products['posts_per_page'] = -1;
$query = new WC_Product_Query( $args_products );

$count = count($query->get_products());
$args_products['posts_per_page'] = $post_per_page;
$query = new WC_Product_Query( $args_products );


$all_products = $query->get_products([
    
]);

/*echo "<pre>";
print_r($query1->get_products([]));
echo "</pre>";*/


//Получение максимальной и минимальной цен
$min_price = 999999999999;
$max_price = 0;
foreach($all_products as $product){
    if($product->get_price() < $min_price){
        $min_price = $product->get_price();
    }
    if( $product->get_price() > $max_price){
        $max_price = $product->get_price();
    }
}

$extremes_price = new Extremes_Price;
$varlakov_min_price = $extremes_price->get_min_price();
$varlakov_max_price = $extremes_price->get_max_price();
if(isset($_GET['min-price'])){
    $min_price = $min;
    $max_price = $max;
} else{
	$min_price = $varlakov_min_price;
    $max_price = $varlakov_max_price;
}

