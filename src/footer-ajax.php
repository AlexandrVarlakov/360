<script>
			jQuery(function ($) {
                $('body').on('click', '.add-to-favorite.fvw-realty-card', function () {
					
					
					let btnIdId = this.id;
					let productId =  btnIdId.replace('add_to_card-', '');
					let parentCard = this.closest('.realty-card');
					let favoriteQty = document.querySelector('.link-favorites__qty');
					let qty = Number(favoriteQty.innerHTML);
					let keyNonce = parentCard.getAttribute('data-key'); 
					let isFavorite = false;
					
					
					if ( parentCard.classList.contains('is-favorite') ){
						    let favoriteCards = document.querySelectorAll('.realty-card[data-id="' + productId + '"]');
							
						    if  ( favoriteCards.length ){
								favoriteCards.forEach( fc => {
									fc.classList.remove('is-favorite');
								} )
							}						
						
							qty--;
							favoriteQty.innerHTML = qty;
					    } else {
						    let favoriteCards = document.querySelectorAll('.realty-card[data-id="' + productId + '"]');
							
						    if  ( favoriteCards.length ){
								favoriteCards.forEach( fc => {
									fc.classList.add('is-favorite');
								} )
							}
							qty++;
							isFavorite = true;
							favoriteQty.innerHTML = qty;
					}	
					let cardAction = {};
					if(isFavorite){
							cardAction.action = 'add_to_wishlist';
                            cardAction.add_to_wishlist  = productId;													
						} else{
							cardAction.action  = yith_wcwl_l10n.actions.remove_from_wishlist_action;
							cardAction.remove_from_wishlist = productId;
					}
					cardAction["context"] = 'frontend';
					cardAction["product_type"] = 'simple';
					cardAction["nonce"] = keyNonce;
					console.log(cardAction);
                 $.ajax({
                    method: 'POST',
                    url: yith_wcwl_l10n.ajax_url,
                    data: cardAction,
                    success: function (data) {
                        console.log(data)
						
                    }
                });
            });
				
				$('body').on('click', '.fvw-single-realty', function () {
					
					
					let parentCard = this.closest('.realty-single');
					let productId = parentCard.id;
					let favoriteQty = document.querySelector('.link-favorites__qty');
					let qty = Number(favoriteQty.innerHTML);
					let keyNonce = parentCard.getAttribute('data-key'); 
					let isFavorite = false;
					
					if ( parentCard.classList.contains('is-favorite') ){
						parentCard.classList.remove('is-favorite');
						qty--;
						favoriteQty.innerHTML = qty;
					} else{
						parentCard.classList.add('is-favorite');
						qty++;
						isFavorite = true;
						favoriteQty.innerHTML = qty;
					}
					
					let cardAction = {};
					if(isFavorite){
							cardAction.action = 'add_to_wishlist';
                            cardAction.add_to_wishlist  = productId;													
						} else{
							cardAction.action  = yith_wcwl_l10n.actions.remove_from_wishlist_action;
							cardAction.remove_from_wishlist = productId;
					}
						cardAction["context"] = 'frontend';
						cardAction["product_type"] = 'simple';
						cardAction["nonce"] = keyNonce;
						console.log(cardAction);
						 $.ajax({
							method: 'POST',
							url: yith_wcwl_l10n.ajax_url,
							data: cardAction,
							success: function (data) {
								console.log(data)

							}
						});
					
				})
				
				
				
            })
</script>
