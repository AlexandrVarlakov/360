<?php
/**
 * The Template for displaying all single products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}






get_header( 'shop' ); ?>
<?php the_post(); 
global $product;

global $WOOCS;
$currencies = $WOOCS-> get_currencies();
$current_currensy = $WOOCS->current_currency;
$number_of_vannas = get_field('количество_ванных_комнат', $product->id);



$wish_list = YITH_WCWL()->get_wishlists(array('is_default' => true));
$isinwishList = YITH_WCWL()->is_product_in_wishlist($product->id, $wish_list[0]['ID']);

//ссылка на кнопку wishList

if(!$isinwishList){
	$key_nonce = wp_create_nonce( 'add_to_wishlist' );
	$yith_wcwl =  '?add_to_wishlist='.$product->id.'&amp;_wpnonce='.$key;
}
else{
	$key_nonce = wp_create_nonce( 'remove_from_wishlist' );
	$yith_wcwl =  '?remove_from_wishlist='.$product->id.'&amp;_wpnonce='.$key;
}



$images = get_field('images', $product->id);
$square = get_field('square', $product->id);
$address = get_field('address', $product->id);
$number_of_parking_spaces = get_field('number_of_parking_spaces', $product->id);
$number_of_rooms = get_the_terms($product->id,'pa_комнат');
$number_of_rooms = $number_of_rooms[0]->name;
$category = get_the_terms( $product->id, 'product_cat');

$article = get_field('article', $product->id);
$rera_no = get_field('rera_no', $product->id);
$dld_permit_number = get_field('dld_permit_number', $product->id);
$Furnishing = get_field('Furnishing', $product->id);
$feaucheres = get_the_terms( $product->id,'feaucheres');
// print_r( $product );
$type_real =  get_the_terms( $product->id,'type_real');
$type_real = $type_real[0];

$manager_id = get_field('manager');
$manager = [
	'name'=>$manager_id->post_title,
	'image'=>get_field('фото_менеджера',$manager_id->ID),
	'detec'=>get_field('должность',$manager_id->ID),
	'telegram'=>get_field('ссылка_на_телеграм',$manager_id->ID),
	'watsapp'=>get_field('ссылка_на_watsapp',$manager_id->ID),
];


$args_products = [
    'limit' =>4,
    'status' =>  'publish',
	'post__not_in'=> array($product->id),
    'orderby' => 'rand'
	
];
$query = new WC_Product_Query( $args_products );
$best_products = $query->get_products();
?>
<main>
    <section class="section realty-single <?php if($isinwishList){ echo 'is-favorite';} ?>">
        <div class="realty-single__inner">
            <div class="realty-single__top">
                <nav class="breadcrumbs">
                    <div class="breadcrumbs__inner">
                        <a href="/" class="breadcrumbs__link">Главная</a>
                        <a href="/type_real/<?= $type_real->slug ?>" class="breadcrumbs__link"><?= $type_real->name ?></a>
                        <a  class="breadcrumbs__link"><?= $product->name ?></a>
                    </div>                    
                </nav>
                <div class="realty-single__title-block">
                    <h1 class="title-md"><?= $product->name ?></h1>
                    <h3 class="part-number"><?= $article ?></h3>
                </div>

                <div class="realty-single__price-block">
                    <p class="h3-fix"><?= $product->get_price_html(); ?></p>
                    
                </div>
            </div>
            
            <div class="realty-single__main">
                <div class="rs-gallery ">
                    <div class="swiper rs-gallery-slider">
                        <div class="swiper-wrapper">
							<?php foreach ($images as $key => $image): ?>
                            <a class="swiper-slide" data-fancybox="rs-gallery" href="<?= $image['url'] ?>">
                                <img src="<?= $image['url'] ?>" alt="">
                            </a>
							<?php endforeach; ?>
                        </div>
						

                        <button  class="text-2 open-rs-gallery yith-wcwl-add-to-wishlist add-to-wishlist-<?php echo $product_id ?>">
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4856 4.25404C15.1227 4.25404 14.7938 4.04581 14.6391 3.72038C14.3599 3.13151 14.0048 2.37896 13.7946 1.96926C13.4842 1.36005 12.9812 1.00557 12.2845 1.00073C12.2729 0.999758 7.72714 0.999758 7.71546 1.00073C7.01881 1.00557 6.51676 1.36005 6.20541 1.96926C5.99622 2.37896 5.64108 3.13151 5.36184 3.72038C5.20714 4.04581 4.8773 4.25404 4.51535 4.25404C2.5733 4.25404 1 5.82017 1 7.7524V13.5016C1 15.4329 2.5733 17 4.51535 17H15.4856C17.4267 17 19 15.4329 19 13.5016V7.7524C19 5.82017 17.4267 4.25404 15.4856 4.25404Z" stroke="#B0BCC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.9075 10.2828C6.90653 11.9806 8.29885 13.3695 10.0016 13.3686C11.7013 13.3666 13.0898 11.9836 13.0927 10.2896C13.0956 8.58883 11.7082 7.20285 10.0035 7.20092C8.28912 7.19898 6.89388 8.6082 6.9075 10.2828Z" stroke="#B0BCC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <?= count($images) ?> фото
                        </button>
						
						<div >
                        <button class="add-to-favorite fvw-single-realty" id="add_to_card-<?= $product->id ?>">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7484 21.8538C10.4636 20.5179 8.33801 18.9456 6.40978 17.1652C5.05414 15.8829 4.02211 14.3198 3.39273 12.5954C2.26015 9.25031 3.58308 5.42083 7.28539 4.28752C9.23117 3.69243 11.3563 4.03255 12.9959 5.20148C14.6361 4.03398 16.7605 3.69398 18.7064 4.28752C22.4087 5.42083 23.7411 9.25031 22.6086 12.5954C21.9792 14.3198 20.9471 15.8829 19.5915 17.1652C17.6633 18.9456 15.5377 20.5179 13.2529 21.8538L13.0054 22L12.7484 21.8538Z" stroke="#B0BCC2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> 
                        </button>
						</div>

                        <div class="rs-gallery-slider__nav">
                            <button class="rs-gallery-slider__prev">
                                <svg width="52" height="22" viewBox="0 0 52 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M51 11H2M10 1L1 11L10 21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <button class="rs-gallery-slider__next">
                                <svg width="52" height="22" viewBox="0 0 52 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11H50M42 1L51 11L42 21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        
                    </div>


                    
                </div>

                <div class="rs-short-description">
                    <div class="rs-manager">
                        <div class="rs-manager__info-block">
                            <img src="<?= $manager['image']['url']?>" alt="" class="rs-manager__photo">
                            <div class="rs-manager__about">
                                <p class="rs-manager__name"><?= $manager['name']?></p>
                                <p class="rs-manager__post"><?= $manager['detec']?></p>
                            </div>
                        </div>
                        <div class="rs-manager__contacts">
                            <a href="<?= $manager['telegram']?>" class="rs-manager__contact-link"><img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/telegram-realty.svg" alt=""></a>
                            <a href="<?= $manager['watsapp']?>" class="rs-manager__contact-link"><img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/whatsapp-realty.svg" alt=""></a>
                        </div>
                    </div>

                    <ul class="rs-short-description__list">
                        <li class="rs-short-description__item">
                            <div class="rs-short-description__item-main">
                                <img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/realty-options/location.svg" alt="" class="rs-short-description__item-icon">
                                <span class="rs-short-description__text text-2"><?= $address ?> </span>
                            </div>
                            <div class="rs-short-description__deep">
                                <a href="#map" class="rs-short-description__link" data-inner-link="">На карте</a>
                            </div>
                        </li>
                        <li class="rs-short-description__item">
                            <div class="rs-short-description__item-main">
                                <img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/realty-options/bedroom.svg" alt="" class="rs-short-description__item-icon">
                                <span class="rs-short-description__text text-2"><?= $number_of_rooms ?> Спальни</span>
                            </div>                            
                        </li>
                        <?php if(isset($number_of_vannas)): ?>
                        <li class="rs-short-description__item">
                            <div class="rs-short-description__item-main">
                                <img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/realty-options/bathroom.svg" alt="" class="rs-short-description__item-icon">
                                <span class="rs-short-description__text text-2"><?= $number_of_vannas ?> Ванные комнаты</span>
                            </div>                            
                        </li>
                        <?php endif; ?>

                        <li class="rs-short-description__item">
                            <div class="rs-short-description__item-main">
                                <img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/realty-options/square-2.svg" alt="" class="rs-short-description__item-icon">
                                <div class="rs-short-description__square">
                                    <span class="rs-short-description__text text-2 text-opacity">Площадь</span>
                                    <span class="rs-short-description__text text-2 " id="switchable-square">1</span>
                                </div>
                            </div>
                            <div class="rs-short-description__deep">
                                <div class="switch-values">
                                    <div class="switch-values__item">
                                        <input type="radio" class="switch-values__radio" name="switch-values" id="switch-values-1" value="<?= round($square * 10.76391041671,0) ?>" data-target="#switchable-square" checked> 
                                        <label for="switch-values-1" class="switch-values__label">sq.ft</label>
                                    </div>
                                    <div class="switch-values__item">
                                        <input type="radio" class="switch-values__radio" name="switch-values" id="switch-values-2" value="<?= $square ?>" data-target="#switchable-square"> 
                                        <label for="switch-values-2" class="switch-values__label">sq.m</label>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="rs-short-description__item">
                            <div class="rs-short-description__item-main">
                                <img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/realty-options/icon-type.svg" alt="" class="rs-short-description__item-icon">
                                <span class="rs-short-description__text text-2 text-opacity">Тип аппартаментов</span>
                            </div>
                            <div class="rs-short-description__deep">
                                <span class="rs-short-description__text text-2"><?= $category[0]->name ?></span>
                            </div>
                        </li>

                        <li class="rs-short-description__item">
                            <div class="rs-short-description__item-main">
                                <img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/realty-options/park-place.svg" alt="" class="rs-short-description__item-icon">
                                <span class="rs-short-description__text text-2 text-opacity">Парковочных мест включено</span>
                            </div>
                            <div class="rs-short-description__deep">
                                <span class="rs-short-description__text text-2"><?= $number_of_parking_spaces ?></span>
                            </div>
                        </li>


                    </ul>

                    <div class="rs-short-description__bottom">
                        <button class="btn btn-darkgreen " data-hystmodal="#feedback-modal">Получить консультацию</button>
                        <button  class="rs-short-description__btn text-2 fw-500"  data-hystmodal="#feedback-modal">
                            <img src="<?php bloginfo('template_directory'); ?>/assets/img/icons/pdf-small.svg" alt="">
                            Скачать PDF
                        </button>
                        <button class="rs-short-description__btn text-2 fw-500 fvw-single-realty" id="add_to_card-<?= $product->id ?>-2">
                            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2484 18.8538C8.96358 17.5179 6.83801 15.9456 4.90978 14.1652C3.55414 12.8829 2.52211 11.3198 1.89273 9.59539C0.760151 6.25031 2.08308 2.42083 5.78539 1.28752C7.73117 0.692435 9.85626 1.03255 11.4959 2.20148C13.1361 1.03398 15.2605 0.693978 17.2064 1.28752C20.9087 2.42083 22.2411 6.25031 21.1086 9.59539C20.4792 11.3198 19.4471 12.8829 18.0915 14.1652C16.1633 15.9456 14.0377 17.5179 11.7529 18.8538L11.5054 19L11.2484 18.8538Z" stroke="#B0BCC2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> 
                            <span class="no-favorite">В избранное</span>                            
                            <span class="in-favorite">В избранном</span>                            
                            
                        </button>
                        
                    </div>
                </div>

                
            </div>
            <script>
            jQuery(function ($) {
                $('#add_to_card-<?= $product->id ?>').click(function () {
					
                $.ajax({
                    method: 'POST',
                    url: yith_wcwl_l10n.ajax_url,
                data: {
                        <?php if(!$isinwishList): ?> 
                            action: 'add_to_wishlist',
                            add_to_wishlist: <?= $product->id ?>,
                        <?php else: ?>
                            action: yith_wcwl_l10n.actions.remove_from_wishlist_action,
                            remove_from_wishlist: <?= $product->id ?>,
                        <?php endif;?>
                        'context':'frontend',
                        'product_type':'simple',
                        'nonce':'<?= $key_nonce ?>'
                    },
                    success: function (data) {
                        console.log(data);
						
                    }
                });
            });
            });
            jQuery(function ($) {
                $('#add_to_card-<?= $product->id ?>-2').click(function () {
					
                $.ajax({
                    method: 'POST',
                    url: yith_wcwl_l10n.ajax_url,
                data: {
                        <?php if(!$isinwishList): ?> 
                            action: 'add_to_wishlist',
                            add_to_wishlist: <?= $product->id ?>,
                        <?php else: ?>
                            action: yith_wcwl_l10n.actions.remove_from_wishlist_action,
                            remove_from_wishlist: <?= $product->id ?>,
                        <?php endif;?>
                        'context':'frontend',
                        'product_type':'simple',
                        'nonce':'<?= $key_nonce ?>'
                    },
                    success: function (data) {
                        console.log(data);
						
                    }
                });
            });
            });
    </script>
            <div class="realty-description">
			<?php 
						if($product->description):?>
                <div class="realty-description__text-block">
                    <h3 class="h3-fix fw-500">Описание</h3>

                    <div class="realty-description__block-content">
                       <?= $product->description ?>
                    </div>
                </div>
				<?php endif; ?>
                <div class="realty-description__listing-details">
                    <h3 class="h3-fix fw-500">Подробнее о листинге</h3>

                    <ul>
					<?php if($address): ?>
                        <li>
                            <span class="text-2 text-opacity">Расположение</span>
                            <span class="text-2"><?= $address ?></span>
                        </li>
						<?php endif; ?>
						<?php if($dld_permit_number): ?>
                        <li>
                            <span class="text-2 text-opacity">Стоимость за м²</span>
                            <span class="text-2"><?= round($product->get_price()/$square,2) ?></span>
                        </li>
						<?php endif; ?>
						<?php if($dld_permit_number): ?>
                        <li>
                            <span class="text-2 text-opacity">RERA No.</span>
                            <span class="text-2"><?= $dld_permit_number ?></span>
                        </li>
						<?php endif; ?>
						<?php if($article): ?>
                        <li>
                            <span class="text-2 text-opacity">Reference No.</span>
                            <div class="copy-button">
                                <span class="text-2" data-copy><?= $article ?></span>
                                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 17V19C13 19.5304 12.7893 20.0391 12.4142 20.4142C12.0391 20.7893 11.5304 21 11 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H5M5 3V15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V6.242C17 5.97556 16.9467 5.71181 16.8433 5.46624C16.7399 5.22068 16.5885 4.99824 16.398 4.812L13.083 1.57C12.7094 1.20466 12.2076 1.00007 11.685 1H7C6.46957 1 5.96086 1.21071 5.58579 1.58579C5.21071 1.96086 5 2.46957 5 3Z" stroke="#1E8CCA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div class="copy-success">Скопировано</div>
                            </div>
                            
                        </li>
						<?php endif; ?>
						<?php if($dld_permit_number): ?>
                        <li>
                            <span class="text-2 text-opacity">DLD Permit Number:</span>
                            <span class="text-2"><?= $dld_permit_number ?></span>
                        </li>
						<?php endif; ?>
						<?php if($Furnishing): ?>
                        <li>
                            <span class="text-2 text-opacity">Меблировка</span>
                            <span class="text-2"><?= $Furnishing ?></span>
                        </li>
						<?php endif; ?>
                    </ul>
                </div>
				<?php 
						if($feaucheres):?>
                <div class="realty-description__features">
                    <h3 class="h3-fix fw-500">Особенности и удобства</h3>
                    
                    <ul>
						<?php 
                        // print_r($feaucheres);
						foreach($feaucheres as $key => $feauchere):
                         $image =  get_field('ikonka',$feauchere);
                        ?>

                        <li> 
                            <?php if(isset($image)): ?>
                            <img src="<?= $image ?>" alt=""> 
                            <?php endif;?>
                            <span class="text-2"><?= $feauchere->name?></span>
                        </li>
						<?php endforeach;
						?>
                    </ul>
                </div>
				<?php
					endif;
						?>
            </div>

            <div class="realty-map" id="map">
                <div class="realty-map__inner">
				
                    <iframe src="https://www.google.com/maps/d/embed?mid=1kGgHdHsreY1lH5SdMXUNRonAz3Xim2o&ehbc=2E312F" width="100%" height="100%" frameborder="0"></iframe>
                </div>
            </div>
            
        </div>
    </section>

    <section class="section s-cards-slider">
        <div class="s-cards-slider__inner">
            <div class="s-cards-slider__title-block">
                <div class="s-cards-slider__left">
                    <h2 class="title-lg">Похожие предложения</h2>
                </div>
                <div class="s-cards-slider__right">
                    <button class="btn btn-darkgreen" data-hystmodal="#feedback-modal">получить консультацию</button>
                </div>
            </div>
            <div class="swiper realty-swiper">
                <div class="swiper-wrapper">
				<?php foreach($best_products as $product):?>
                            <?php get_template_part("template-parts/single_product_card");?>
                <?php endforeach;?>
                </div>
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
    </section>
    
</main>
	
<?php
get_footer( 'shop' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
