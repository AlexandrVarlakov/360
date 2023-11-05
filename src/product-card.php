<?php
if (isset($args['product_id'])) {
    $product = wc_get_product($args['product_id']);
} else {
    global $product;
}

$images = get_field('images', $product->id);
$square = get_field('square', $product->id);
$address = get_field('address', $product->id);
$number_of_parking_spaces = get_field('количество_ванных_комнат', $product->id);
$number_of_rooms = get_the_terms($product->id, 'pa_комнат');
$number_of_rooms = $number_of_rooms[0]->name;
$category = get_the_terms($product->id, 'product_cat');
$wish_list = YITH_WCWL()->get_wishlists(array('is_default' => true));
$isinwishList = YITH_WCWL()->is_product_in_wishlist($product->id, $wish_list[0]['ID']);
if (!$isinwishList) {
    $key_nonce = wp_create_nonce('add_to_wishlist');
    $yith_wcwl = '?add_to_wishlist=' . $product->id . '&amp;_wpnonce=' . $key;
} else {
    $key_nonce = wp_create_nonce('remove_from_wishlist');
    $yith_wcwl = '?remove_from_wishlist=' . $product->id . '&amp;_wpnonce=' . $key;
}
$rand = random_int(0,999999);

?>
<div class="swiper-slide">

    <div data-key= "<?=$key_nonce?>" <?= "data-id = '". $product->id . "'"  ?> class="realty-card  <?php
    if (isset($args['product_id']))
        echo 'appended';
    ?> <?php if ($isinwishList) {
         echo 'is-favorite';
     } ?>" <?php if (isset($args['product_id']))
          echo "style='animation-delay:" . (int) $args['index'] * 50 . "ms'"; ?>>
        <button class="add-to-favorite fvw-realty-card" id="add_to_card-<?= $product->id ?>">
            <!-- onclick="window.location.href = '<?= $yith_wcwl ?>'" -->
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.7484 21.8538C10.4636 20.5179 8.33801 18.9456 6.40978 17.1652C5.05414 15.8829 4.02211 14.3198 3.39273 12.5954C2.26015 9.25031 3.58308 5.42083 7.28539 4.28752C9.23117 3.69243 11.3563 4.03255 12.9959 5.20148C14.6361 4.03398 16.7605 3.69398 18.7064 4.28752C22.4087 5.42083 23.7411 9.25031 22.6086 12.5954C21.9792 14.3198 20.9471 15.8829 19.5915 17.1652C17.6633 18.9456 15.5377 20.5179 13.2529 21.8538L13.0054 22L12.7484 21.8538Z"
                    stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <div class="realty-card__img-block">
            <div class="realty-card__img-block--inner">
                <div class="swiper realty-gallery-swiper">
                    <div class="swiper-wrapper">
                        <?php foreach ($images as $key => $image): ?>
                            <a class="swiper-slide" href="<?= $image['url'] ?>"
                                data-fancybox="realty-gallery-<?= $product->id+ $rand ?>">
                                <img src="<?= $image['url'] ?>" alt="">
                            </a>
                        <?php endforeach; ?>
                    </div>
                    <div class="realty-gallery-swiper__pagination"></div>
                </div>
            </div>
        </div>
        <a href="<?= get_permalink($product->id) ?>" class="realty-card__body">
            <h3 class="title">
                <?= $product->name ?>
            </h3>
            <div class="realty-card__description">
                <span class="realty-card__type">
                    <?= $category[0]->name ?>
                </span>
                <span class="realty-card__location">
                    <?= $address ?>
                </span>
            </div>

            <div class="realty-card__options">
                <?php if (isset($number_of_rooms)): ?>
                    <div class="realty-card__option-item">
                        <img src="https://element360.ae/wp-content/uploads/2023/10/Vector-9.png" alt=""
                            class="realty-card__option-icon" width="23" height="23">
                        <?= $number_of_rooms ?>
                    </div>
                <?php endif; ?>
                <?php if (isset($number_of_parking_spaces) && $number_of_parking_spaces != ''): ?>
                    <div class="realty-card__option-item">
                        <img src="https://element360.ae/wp-content/uploads/2023/10/Vector-10.png" alt=""
                            class="realty-card__option-icon" width="23" height="23">
                        <?= $number_of_parking_spaces ?>
                    </div>
                <?php endif; ?>
                <div class="realty-card__option-item">
                    <img src="https://element360.ae/wp-content/uploads/2023/10/Vector-11.png" alt=""
                        class="realty-card__option-icon" width="23" height="23">
                    <?= round($square * 10.76391041671, 0) ?> sq.ft
                </div>
            </div>
        </a>
        <div class="realty-card__footer">
            <p class="realty-card__price h4">
                <?= wc_price($product->price); ?>
            </p>
        </div>
    </div>
    <script>
			/*jQuery(function ($) {
                $('body').on('click', '#add_to_card-<?= $product->id ?>', function () {
					let parentCard = this.closest('.realty-card');
					let favoriteQty = document.querySelector('.link-favorites__qty');
					let qty = Number(favoriteQty.innerHTML);
					
					if ( parentCard.classList.contains('is-favorite') ){
						   parentCard.classList.remove('is-favorite');
							qty--;
							favoriteQty.innerHTML = qty;
					    } else {
						    parentCard.classList.add('is-favorite');
							qty++;
							favoriteQty.innerHTML = qty;
					    }	
					
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
                        console.log(data)
						
                    }
                });
            });
            })*/
		
            
    </script>
</div>