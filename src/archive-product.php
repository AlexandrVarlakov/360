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
if(isset($_GET['min-price'])){
    $min_price = $min;
    $max_price = $max;
}

////Получение максимальной и минимальной цен///////
?>
        <section class="section s-catalog">
            <div class="s-catalog__inner">
                <div class="s-catalog__top">
                    <nav class="breadcrumbs">
                        <div class="breadcrumbs__inner">
                            <a href="/" class="breadcrumbs__link">Главная</a>
                            <a  class="breadcrumbs__link"><?= $obj->name ?> В ДУБАЕ</a>
                        </div>
                    </nav>
    
                    <div class="s-catalog__title-block">
                        <h2 class="title-md"><?= $obj->name ?></h2>
                    </div>
    
                    <form action="" class="filter-form">
                        <div class="filter-form__search-string-container">
                            <div class="filter-form__search-string-wrap">
                                <button >
                                    <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="filter-zoom-icon">
                                        <path d="M21.3049 21.9286L26 26.5M24.9512 13.1905C24.9512 19.6469 19.5896 24.881 12.9756 24.881C6.36166 24.881 1 19.6469 1 13.1905C1 6.734 6.36166 1.5 12.9756 1.5C19.5896 1.5 24.9512 6.734 24.9512 13.1905Z" stroke="#9A9AB1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> 
                                </button>
                                <input type="text" class="filter-form__search-string" name="search" id="filter-form__search-string" placeholder="Поиск" value="<?= $search ?>" >
                            </div>
    
                            <div class="show-all-filters">
                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.53792 16.0351H1.00049M13.4613 3.96492H21M20.9999 16.0351C20.9999 17.6726 19.6564 19 17.9991 19C16.3418 19 14.9984 17.6726 14.9984 16.0351C14.9984 14.3964 16.3418 13.0702 17.9991 13.0702C19.6564 13.0702 20.9999 14.3964 20.9999 16.0351ZM1 3.96492C1 5.60361 2.34348 6.92983 4.00075 6.92983C5.65803 6.92983 7.00151 5.60361 7.00151 3.96492C7.00151 2.32743 5.65803 1 4.00075 1C2.34348 1 1 2.32743 1 3.96492Z" stroke="#9A9AB1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                  
                                
                                <div class="show-all-filters__qty">3</div>
                            </div>
                        </div>
    
    
                        <div class="filter-form__hr"></div>
<?php if(count($all_products)>0): ?>
                        <p class="filter-form__search-results text-3 text-opacity text-uppercase fw-400">Найдено <?= $count ?> предложений</p>
    <?php endif;?>

                        <div class="filter-form__deep-filters">
                            <div class="input-wrap">
                                <p class="text-nav">Тип жилья</p>
                                <div class="combo-select">
                                    <div class="combo-select__outer-box">
                                        <div class="combo-select__current-value"><?= $category ?></div>
                                        <div class="combo-select__arrow">
                                            <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 1L6.5 6L1 1" stroke="#B0BCC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg> 
                                        </div>
                                    </div>
                                    <div class="combo-select__drop">
                                        <div class="combo-select__drop--scroll">
                                            <ul>
                                                <?php foreach( $categories as $key=> $category_data): ?>
                                                <li>                                                
                                                    <label for="realty-type-<?= $category_data->term_id ?>" class="combo-select__item-text"><?= $category_data->name ?>
                                                        <input type="radio" name="realty-type" id="realty-type-<?= $category_data->term_id ?>" data-value="<?= $category_data->name ?>" value="<?= $category_data->name ?>" class="combo-select__radio" 
                                                        <?php 
                                                        if($category_data->name == 'Все'){ echo 'data-default';}
                                                            if($category == $category_data->name) {echo 'checked';} 
                                                        ?>
                                                        >
                                                    </label>
                                                </li>
                                                <?php endforeach; ?>
                                                
                                            </ul>
                                        </div>
                                        
        
                                        
                                    </div>
                                </div>
                            </div>
                            

                            <div class="input-wrap">
                                <p class="text-nav ">Количество комнат</p>

                                <div class="combo-select" data-type="multi" data-placeholder="Кол-во комнат">
                                    <div class="combo-select__outer-box">
                                        <div class="combo-select__current-value"></div>
                                        <div class="combo-select__arrow">
                                            <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 1L6.5 6L1 1" stroke="#B0BCC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg> 
                                        </div>
                                    </div>
                                    <div class="combo-select__drop">
                                        <div class="combo-select__drop--scroll">
                                            <ul>
                                                <?php foreach($rooms as $key=>$room): ?>
                                                <li>                                                
                                                    <label for="rooms-<?= $room->term_id ?>" class="combo-select__item-text">
                                                        <input type="checkbox" name="rooms[]" id="rooms-<?= $room->term_id ?>"  value="<?= $room->name ?>" class="combo-select__checkbox " 
                                                       
                                                        <?php 
                                                        if(isset($number_of_rooms) && in_array($room->name,$number_of_rooms)) {echo 'checked';} 
                                                        ?>
                                                        >
                                                        <span><?= $room->name ?></span>
                                                    </label>
                                                </li>
                                                <?php endforeach; ?>
                                            </ul>
                                        </div>
                                        
        
                                        
                                    </div>
                                </div>
                            </div>

                            <!--
                            <div class="type-deal-wrap">
                                <p class="text-nav ">Вас интересует</p>

                                <div class="type-deal">
                                    <div class="type-deal__item">
                                        <input type="radio" class="type-deal__radio" name="type-deal" id="type-deal-1" value="Аренда" >
                                        <label for="type-deal-1" class="type-deal__label">Аренда</label>
                                    </div>
                                    <div class="type-deal__item">
                                        <input type="radio" class="type-deal__radio" name="type-deal" id="type-deal-2" value="Покупка"> 
                                        <label for="type-deal-2" class="type-deal__label">Покупка</label>
                                    </div>
                                </div>
                            </div>
                            -->

                            <div class="filter-currency-container">
                                <div class="filter-currency-block">
                                    <p class="text-nav">Стоимость</p>
                                    <div class="filter-currency-input-wrap"> 
                                        <label for="filter-currency-min" class="filter-currency-label">от</label>
                                        <input type="text" class="filter-currency-input" id="filter-currency-min" name="min-price"  data-default="<?= $min_price ?>" value="<?= $min_price ?>">
                                    </div>
                                    
                                </div>
                                <div class="filter-currency-block">
                                    <div class="filter-currency-types">
                                        <?php foreach($currencies as $currency): ?>
                                        <div class="currency-type">
                                            <input type="radio"  id="currency-type-<?= $currency['name'] ?>" name="currency" class="currency-type-radio" value="<?= $currency['name'] ?>"
                                            <?php
                                            if($current_currensy == $currency['name']){
                                                echo 'checked';
                                            }
                                            ?>
                                            >
                                            <label for="currency-type-<?= $currency['name'] ?>" class="currency-type-label"><?= $currency['name'] ?></label>
                                        </div>
                                        <?php endforeach; ?>
                                        
                                    </div>
                                    <div class="filter-currency-input-wrap"> 
                                        <label for="filter-currency-max" class="filter-currency-label">до</label>
                                        <input type="text" class="filter-currency-input" id="filter-currency-max" name="max-price"   data-default="<?= $max_price ?>" value="<?= $max_price ?>">
                                    </div>
                                </div>
                            </div>

                            <div class="filter-submit-wrap">
                                <button class="btn btn-darkgreen">Поиск</button>
                            </div>
                        </div>


                        <div class="filter-form__sort-wrap">
                            <div class="combo-select">
                                <div class="combo-select__outer-box">
                                    <div class="combo-select__current-value">
                                        <?php
                                        if($order == 'DESC price'){ echo'Сначала дорогие';}
                                        elseif($order == 'ASK price'){ echo'Сначала недорогие';}
                                        elseif($order == 'ASK square'){ echo'Площадь по возрастанию';}
                                        elseif($order == 'DESC square'){ echo'Площадь по возрастанию';}
                                        else{  echo'Сначала дорогие';}
                                        ?>
                                    
                                
                                </div>
                                    <div class="combo-select__arrow">
                                        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 1L6.5 6L1 1" stroke="#B0BCC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg> 
                                    </div>
                                </div>
                                <div class="combo-select__drop">
                                    <div class="combo-select__drop--scroll">
                                        <ul>
                                            <li>                                                
                                                <label for="order-by-1" class="combo-select__item-text">Сначала дорогие
                                                    <input type="submit" name="order-by" id="order-by-1" data-value="Сначала дорогие" value="DESC price"  class="combo-select__radio" data-default="" 
                                                    <?php
                                                    if($order == 'DESC price')echo'checked';
                                                    ?>
                                                    >
                                                </label>
                                            </li>

                                            <li>                                                
                                                <label for="order-by-2" class="combo-select__item-text">Сначала недорогие
                                                    <input type="submit" name="order-by" id="order-by-2" data-value="Сначала недорогие" value="ASK price" class="combo-select__radio" 
                                                    <?php
                                                    if($order == 'ASK price')echo'checked';
                                                    ?>
                                                    >
                                                </label>
                                            </li>
                                                                                      
                                            <li>                                                
                                                <label for="order-by-3" class="combo-select__item-text">Площадь по возрастанию
                                                    <input type="submit" name="order-by" id="order-by-3" data-value="Площадь по возрастанию" value="ASK square" class="combo-select__radio"
                                                    <?php
                                                    if($order == 'ASK square')echo'checked';
                                                    ?>
                                                    >
                                                </label>
                                            </li>

                                            <li>                                                
                                                <label for="order-by-4" class="combo-select__item-text">Площадь по убыванию
                                                    <input type="submit" name="order-by" id="order-by-4" data-value="Площадь по убыванию" value="DESC square" class="combo-select__radio" 
                                                    <?php
                                                    if($order == 'DESC square')echo'checked';
                                                    ?>
                                                    >
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    
    
                                    
                                </div>
                            </div>
                        </div>


                        
                    </form>
                </div>
                
                                            
                <div class="realty-grid" >
                    <?php
                    if(count($all_products)>0):
                    foreach($all_products as $product):
                        global $product;
                        get_template_part("template-parts/single_product_card");
                    endforeach;
                    elseif(count($all_products) == 0):
                        echo "Результатов не найдено";
                    endif;
                    ?>

                </div>

                <?php if((int)$count > (int)$post_per_page): ?>
                <div class="download-more-realty-block">
                    <button class="download-more-realt title" id="download-realties">ПОКАЗАТЬ ЕЩЁ <?= $post_per_page ?> ИЗ <?= $count ?></button>
                </div>
                <?php endif; ?>
                    <script>
						let rr = document.querySelector('.realty-grid');
                        var page = 2;
                        let page_mobile = 12
						let downloadRealtiesBtn = document.querySelector('#download-realties');
                        jQuery( function( $ ){ // есть разные варианты этой строчки, но такая мне нравится больше всего, т.к. всегда работает
                            $( '#download-realties' ).click( function(){ // при клике на элемент с id="misha_button" 
                                $.ajax({
                                    url: '<?php echo admin_url('admin-ajax.php'); ?>',
                                    type: 'POST',
                                    data: 'action=myfilter&<?= $string_query ?>&page='+page+'&per_page='+<?=$post_per_page?>, // можно также передать в виде объекта
                                    success: function( data ) {
                                        
                                        if(page*<?=$post_per_page?> >= <?= $count ?>){
                                            
                                            $( '#download-realties' ).css('display','none') 
                                        }
                                        page = page +1;
                                        $('.realty-grid').append()
                                       
                                        data.data.forEach(element => {
                                            $('.realty-grid').append(element)
                                            let event = new Event("reartyappended", {bubbles: true}); 
  										    rr.dispatchEvent(event);
                                        });
										
                                    }
                                });
                                
                            });
                        });
						
						
														
							window.addEventListener('scroll', function(event){
								if (  document.documentElement.clientWidth <= 640 ){
									
									let cssData = rr.getBoundingClientRect();
									let listBottom = cssData.bottom;
									let listHeight = cssData.height;
									

									if ( (listBottom <=  document.documentElement.clientHeight - 100) && (!rr.classList.contains('loading'))){
	                                    rr.classList.add('loading');
										jQuery( function( $ ){
											$.ajax({
												url: '<?php echo admin_url('admin-ajax.php'); ?>',
												type: 'POST',
												data: 'action=myfilter&<?= $string_query ?>&page='+page_mobile+'&per_page='+<?=1?>, // можно также передать в виде объекта
												success: function( data ) {                
													if(page_mobile*<?=$post_per_page?> >= <?= $count ?>){
														$( '#download-realties' ).css('display','none') 
													}
													page_mobile = page_mobile +1;
													$('.realty-grid').append()

													data.data.forEach(element => {
														$('.realty-grid').append(element)
														let event = new Event("reartyappended", {bubbles: true}); 
														rr.dispatchEvent(event);
													});
												   rr.classList.remove('loading');
												}
											});
										});

									}
								}

							})
							
						
                        </script>

            </div>
        </section>
<?php 
get_footer( 'shop' );
