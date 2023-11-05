
const hamburger = document.querySelector('.hamburger');
const mobMenuLayer = document.querySelector('.mob-menu-layer');

const mobMenu = document.querySelector('.mob-menu');
const header = document.querySelector('.header');

let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

window.addEventListener('scroll', function(){
	
    if ( window.scrollY > 0 ){
        header.classList.add('scrolled')
    } else{
        header.classList.remove('scrolled')
    }
})

window.addEventListener('scroll', function(){
    if ( window.scrollY > 0 ){
        header.classList.add('scrolled')
    } else{
        header.classList.remove('scrolled')
    }
})


let innerLinks = document.querySelectorAll('a[data-inner-link]');
if ( innerLinks.length ){
    innerLinks.forEach(il => {
        il.addEventListener('click', function(event){
            event.preventDefault();
            let targetClick = document.querySelector(this.getAttribute('href'));

            if (targetClick){


                let ot = targetClick.offsetTop;
                
                let headerHeight = header.offsetHeight;
                ot = ot - headerHeight - 20;
                
                window.scrollTo({
                    top: ot,
                    left: 0,
                    behavior: "smooth"
                });

                
            }
        })
    })
}


hamburger.addEventListener('click', function(){

    if (!this.classList.contains('active')){
        mobMenuLayer.classList.add('active');
        this.classList.add('active');
        header.classList.add('menu-active');
        
        let bodyWidth = document.documentElement.clientWidth;        
        document.body.style.maxWidth  = bodyWidth + 'px';
        document.body.classList.add('no-scroll');
        
        
    } else{
        
        hideMenu();
    }

    
})


const hideMenu = () => {
    const hm = ()=>{
        mobMenuLayer.classList.remove('active');
        setTimeout(()=>{
            
            hamburger.classList.remove('active');
            header.classList.remove('menu-active');
            document.body.classList.remove('no-scroll');
            document.body.removeAttribute('style');

            mobMenu.removeAttribute('style');
            mobMenuLayer.removeAttribute('style');
            mobMenu.removeEventListener('transitionend', hm);   
        }, 200)
        
        
    }
    mobMenuLayer.transitionDuration = "150ms";
    mobMenu.style.transitionDuration = "200ms";
    mobMenu.style.transitionDelay = "0";
    mobMenu.style.transform = "translate(120%, 0)";
    mobMenu.addEventListener('transitionend', hm)
}


mobMenuLayer.addEventListener('click', function(event){
    
    if (event.target.classList.contains('mob-menu-layer')){
        
        hideMenu();
    } 
})


/*

const langSwithers = document.querySelectorAll('.lang-switcher');

langSwithers.forEach( ls => {
    const outerBlock = ls.querySelector('.lang-switcher__outer-block');
    outerBlock.addEventListener('click', function(){
        if ( !ls.classList.contains('active') ){
            ls.classList.add('active');
        } else{
            ls.classList.remove('active');
        }
    })
    const currentValue = ls.querySelector('.lang-switcher__value');
    const langItems = ls.querySelectorAll('.lang-switcher__item');  

    langItems.forEach( item => {
        item.addEventListener('click', function(){
            if ( !this.classList.contains('active') ){
                ls.querySelector('.lang-switcher__item.active').classList.remove('active');
                this.classList.add('active');
                currentValue.innerHTML = this.innerHTML;
                ls.classList.remove('active');
            }
        })
    })
} )*/

document.body.addEventListener('click', function(event){
    const activeSwitch =  document.querySelector('.lang-switcher.active');    
    if ( activeSwitch ){
        if (  !event.target.closest('.lang-switcher') ){
            activeSwitch.classList.remove('active');
        }
    }
})



let realtyGallereies = document.querySelectorAll('.realty-gallery-swiper');




if ( realtyGallereies.length ){
    console.log(realtyGallereies);


  realtyGallereies.forEach(itemSlider => {
    const slider = new Swiper(itemSlider, {
      speed: 300,
      spaceBetween: 10,
  
      pagination: {
        el: itemSlider.querySelector('.realty-gallery-swiper__pagination'),
        clickable: true,
      },
    });
    itemSlider.addEventListener('mousemove', function(event){
      
        if (this.classList.contains('moved')) return false;
        
        
        const xPosition = event.offsetX==undefined?event.layerX:event.offsetX

        const current = slider.activeIndex;
        const count = slider.slides.length;
        const step =  100 / count;
        
        
        const position  = (xPosition / this.offsetWidth) * 100;
        
        const movePosition = Math.trunc(position / step);
        
        if ( movePosition > count ) return false;
        if ( movePosition < 0 ) return false;

        if ( movePosition === current ) return false
        
        slider.slideTo(movePosition, 0, function(){})
        this.classList.add('moved');
        setTimeout(()=>{
          this.classList.remove('moved');
        }, 50)
      

    }, {capture: true})
  });

 

}

let realtySlider = new Swiper(".realty-swiper", {
    speed: 1000,
    /*autoplay: {
        delay: 6000,
    },*/
    slidesPerView: 1,
    spaceBetween: 12,
    
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
    },
    
    breakpoints: {
        
        640: {
            slidesPerView: 2,
            spaceBetween: 12
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
})

Fancybox.bind('[data-fancybox]', {
    compact: false,
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2,
      },
    },
    Toolbar: {
      display: {
        left: [
          "infobar",
        ],
        middle : [],
        right: [
          "iterateZoom",
          "close",
        ],
      }
    }
  });  



  

//  
Fancybox.bind('[data-fancybox="rs-gallery"]', {
    compact: false,
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2,
      },
    },
    Toolbar: {
      display: {
        left: [
          "infobar",
        ],
        middle : [],
        right: [
          "iterateZoom",
          "close",
        ],
      }
    }
  });  
  
  
const rsOpenGallery = document.querySelector('.open-rs-gallery');

if (rsOpenGallery){
    

    rsOpenGallery.addEventListener('click', function(){
        let parent = this.closest('.swiper');
        let firstSlide = parent.querySelector('.swiper-slide');
        firstSlide.click();
    })
}


let timerCloseCount = document.querySelector('.timer-count')

const feedbackform = new HystModal({
    linkAttributeName: "data-hystmodal",
    backscroll: true,
    waitTransitions: false,
    
});

const thanksModal = new HystModal({
    linkAttributeName: "data-hystmodal-thanks",
    backscroll: true,
    waitTransitions: false,
    beforeOpen: function(modal){
        let timerCount = 5;
        timerCloseCount.innerHTML = timerCount;

        let closeInterval = setInterval(()=>{
            if ( timerCount < 2 ){
                modal.close();
                clearInterval(closeInterval);
            }
            timerCount--;
            timerCloseCount.innerHTML = timerCount;
        }, 1000)
    },
})







const feedbackInputs = document.querySelectorAll('.f-feedback-input');
if ( feedbackInputs.length ){
    feedbackInputs.forEach( fi => {
        fi.addEventListener('focus', function(){
            this.classList.remove('error');
        })    
    } )
}


const inputs = document.querySelectorAll('.input');
if ( inputs.length ){
    inputs.forEach( inp => {
        inp.addEventListener('focus', function(){
            this.classList.remove('error');
        })    
    } )
}

function testRequired( input ){
    if ( !input.hasAttribute('required') ) return true;
    let value = input.value;
    value = value.trim();
    if ( value.length > 0 ) return true;
    
    let container = input.closest('div');
    let error = container.querySelector('.form-error');
    error.innerHTML = 'Поле не может быть пустым';

    input.classList.add('error');
    return false;
}

function testMinLength( input ){
    if ( !input.hasAttribute('minlength') ) return true;
    let minLegth = Number(input.getAttribute('minlength'));

    let value = input.value;
    value = value.trim();
    
    if ( value.length >= minLegth ) return true;

    let container = input.closest('div');
    let error = container.querySelector('.form-error');
    error.innerHTML = 'Ошибка! проверьте правильность ввода данных';

    input.classList.add('error');
    return false;

}


let form = document.querySelector('.feedback-modal__form');
form.onsubmit = function(event){
    event.preventDefault();

    if ( testRequired(this.name)  && testRequired(this.phone) && testMinLength(this.phone)){
        let nameInput = this.name;
        let phoneInput = this.phone;
        let data_body = "name=" + this.name.value + '&phone=' +  this.phone.value; 
        fetch("script-name.php", {
            method: "POST",
            body: data_body,
            headers:{"content-type": "application/x-www-form-urlencoded"} 
        })
        .then( (response) => {
            if (response.status !== 200) {
                return Promise.reject();
            }
            nameInput.value = '';
            phoneInput.value = '';
            return response.text()
        })
        .then(i => console.log(i))
        .catch(() => {console.log('ошибка')
    
            nameInput.value = '';
            phoneInput.value = '';
            feedbackform.close();
            feedbackform.open('#thanks-modal');
        });
    }


    
}


let getCatalogForm = document.querySelector('.s-catalog-form__form');

if ( getCatalogForm ){
    getCatalogForm.onsubmit = function(event){
        event.preventDefault();
        console.log(this.contact);
        if ( testRequired(this.contact)  && testMinLength(this.contact)){
            let contact = this.contact;
            
            let data_body = "contact=" + this.contact.value; 
            fetch("script-name.php", {
                method: "POST",
                body: data_body,
                headers:{"content-type": "application/x-www-form-urlencoded"} 
            })
            .then( (response) => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                contact.value = '';
                
                return response.text()
            })
            .then(i => console.log(i))
            .catch(() => {console.log('ошибка')
        
                contact.value = '';
                
                thanksModal.open('#thanks-modal')
            });
        }
    
    
        
    }
}




const downloadMoreAreas = document.querySelector('.download-more-areas');
const areasList = document.querySelector('.areas-list');


const downloadMoreRealty = document.querySelector('.download-more-realty');
const realtyList = document.querySelector('.realty-grid');

const downloadMoreArticles = document.querySelector('.download-more-articles');
const blogList = document.querySelector('.blog-grid');

let testAreasList = [
    {
        img: 'assets/img/areas/1.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/2.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/3.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/4.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/5.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/6.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/1.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/2.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/3.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/4.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/5.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    },
    {
        img: 'assets/img/areas/6.jpg',
        name: 'Dubai Islands', 
        url: 'area-single.html'
    }


]

let testRealtyList = [
    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },
    
    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },

    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },

    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },
    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },
    
    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },

    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },

    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },
    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },
    
    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },

    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },

    {
        img: ['assets/img/gallery/1.jpg', 'assets/img/gallery/2.jpg', 'assets/img/gallery/3.jpg'],
        name: 'SAFA TWO OT DAMAC PROPERTIES', 
        url: 'realty-single.html',
        price: '$2.565.000',
        type: 'Apartment',
        address: 'The Address Beach Resort',
        options: [ 
            {   iconUrl: 'assets/img/icons/realty-options/floors.svg',
                value: '3'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/rooms.svg',
                value: '4'
            }, 
            {   iconUrl: 'assets/img/icons/realty-options/square.svg',
                value: '1 939 sq.ft'
            }, 
        ]
    },   

]

if ( realtyList ){
    realtyList.addEventListener('reartyappended', function(){

        let newSwipers =  this.querySelectorAll('.swiper.realty-gallery-swiper:not(swiper-initialized)');
        if ( newSwipers.length ){
            newSwipers.forEach(itemSlider => {
                const slider = new Swiper(itemSlider, {
                  speed: 300,
                  spaceBetween: 10,
              
                  pagination: {
                    el: itemSlider.querySelector('.realty-gallery-swiper__pagination'),
                    clickable: true,
                  },
                });
                itemSlider.addEventListener('mousemove', function(event){
                  
                    if (this.classList.contains('moved')) return false;
                    
                    
                    const xPosition = event.offsetX==undefined?event.layerX:event.offsetX
            
                    const current = slider.activeIndex;
                    const count = slider.slides.length;
                    const step =  100 / count;
                    
                    
                    const position  = (xPosition / this.offsetWidth) * 100;
                    
                    const movePosition = Math.trunc(position / step);
                    
                    if ( movePosition > count ) return false;
                    if ( movePosition < 0 ) return false;
            
                    if ( movePosition === current ) return false
                    
                    slider.slideTo(movePosition, 0, function(){})
                    this.classList.add('moved');
                    setTimeout(()=>{
                      this.classList.remove('moved');
                    }, 50)
                  
            
                }, {capture: true})
              });
        }
    })
}





let testBlogArticles = [
    {
        url: "article.html", 
        img: "assets/img/blogs/1.jpg",
        category: "лайфстайл", 
       
        category_name: "lifestyle", 
        date_public: "9.10.2023",
        title: "Palm Jebel Ali — новый проект в Дубае",
        text: "Застройщик Nakheel Properties представляет новый жилой проект на островах Palm Jebel Ali",
    },
    {
        url: "article.html", 
        img: "assets/img/blogs/2.jpg",
        category: "лайфстайл", 
       
        category_name: "lifestyle", 
        date_public: "9.10.2023",
        title: "Palm Jebel Ali — новый проект в Дубае",
        text: "Застройщик Nakheel Properties представляет новый жилой проект на островах Palm Jebel Ali",
    },
    {
        url: "article.html", 
        img: "assets/img/blogs/3.jpg",
        category: "лайфстайл", 
       
        category_name: "lifestyle", 
        date_public: "9.10.2023",
        title: "Palm Jebel Ali — новый проект в Дубае",
        text: "Застройщик Nakheel Properties представляет новый жилой проект на островах Palm Jebel Ali",
    },
    {
        url: "article.html", 
        img: "assets/img/blogs/4.jpg",
        category: "лайфстайл", 
       
        category_name: "lifestyle", 
        date_public: "9.10.2023",
        title: "Palm Jebel Ali — новый проект в Дубае",
        text: "Застройщик Nakheel Properties представляет новый жилой проект на островах Palm Jebel Ali",
    },
    {
        url: "article.html", 
        img: "assets/img/blogs/5.jpg",
        category: "лайфстайл", 
       
        category_name: "lifestyle", 
        date_public: "9.10.2023",
        title: "Palm Jebel Ali — новый проект в Дубае",
        text: "Застройщик Nakheel Properties представляет новый жилой проект на островах Palm Jebel Ali",
    },
    {
        url: "article.html", 
        img: "assets/img/blogs/6.jpg",
        category: "лайфстайл", 
       
        category_name: "lifestyle", 
        date_public: "9.10.2023",
        title: "Palm Jebel Ali — новый проект в Дубае",
        text: "Застройщик Nakheel Properties представляет новый жилой проект на островах Palm Jebel Ali",
    },
];


if ( downloadMoreArticles && blogList){
    function createArticleCard( url, img, category, category_name,  date_public, title, text ){
        let article  = createNode('a', 'article', '', url);
        let imgBlock = createNode('div', 'article__img');
        let imgArticle = createNode('img', '', img);
        let articleInfoBlock = createNode('div', 'article__info');
        let articleCategory =  createNode('div', 'article__category' + ' ' + category_name, '', '', category);
        let articleDatePublic =  createNode('div', 'text-1 text-opacity',  '', '', date_public);
        let articleTextBlock =  createNode('div', 'article__text-block');
        let articleTitle =  createNode('h3', 'article__title h3', '', '', title);
        let articleText =  createNode('p', 'text-1', '', '', text);
        

        imgBlock.append(imgArticle);
        article.append(imgBlock);

        articleInfoBlock.append(articleCategory);
        articleInfoBlock.append(articleDatePublic);
        article.append(articleInfoBlock);

        articleTextBlock.append(articleTitle);
        articleTextBlock.append(articleText);

        article.append(articleTextBlock);

        return article;
    }

        let testI = 0;
        window.addEventListener('scroll', function(event){
            if ( testI < 6 && document.documentElement.clientWidth <= 640 ){
                let cssData = blogList.getBoundingClientRect()
        
                let listBottom = cssData.bottom;
                let listHeight = cssData.height;
        
                
                if ( listBottom <=  document.documentElement.clientHeight - 100){
                    
                    let colCurrent = createNode('div', 'blog-grid-col');
                    
                

                    let card =  createArticleCard(testBlogArticles[testI].url, testBlogArticles[testI].img,  testBlogArticles[testI].category, testBlogArticles[testI].category_name,  testBlogArticles[testI].date_public, testBlogArticles[testI].title, testBlogArticles[testI].text);
                    card.classList.add('appended');
                    colCurrent.append(card);     
                    
                    testI++;           

                    card =  createArticleCard(testBlogArticles[testI].url, testBlogArticles[testI].img,  testBlogArticles[testI].category, testBlogArticles[testI].category_name,  testBlogArticles[testI].date_public, testBlogArticles[testI].title, testBlogArticles[testI].text);
                    card.classList.add('appended');
                    colCurrent.append(card);     
                    testI++;           
                    blogList.append(colCurrent);
                }
            }
        })
    
    downloadMoreArticles.addEventListener('click', function(){
        
                
        let colCurrent;

        testBlogArticles.forEach( (articleItem, index) => {
            let card =  createArticleCard(articleItem.url, articleItem.img,  articleItem.category, articleItem.category_name, articleItem.category_url, articleItem.date_public, articleItem.title, articleItem.text);
             
            card.classList.add('appended');
            card.style.animationDelay = (index * 200) + 'ms';
            

            if (index === 0 || index === 2 || index === 4) {
                colCurrent = createNode('div', 'blog-grid-col');
                blogList.append(colCurrent);
                colCurrent.append(card);
            } else{
                colCurrent.append(card);
            }

            
        } )
            
        
    })
}


                

if (areasList && downloadMoreAreas){

    
    let testI = 0;
    window.addEventListener('scroll', function(event){
        if ( testI < 3 && document.documentElement.clientWidth <= 640 ){
            let cssData = areasList.getBoundingClientRect()

            let listBottom = cssData.bottom;
            let listHeight = cssData.height;

            
            if ( listBottom <=  document.documentElement.clientHeight - 100){
                let card = createAreasCard(testAreasList[testI].name, testAreasList[testI].url, testAreasList[testI].img);
                card.classList.add('appended');    
                areasList.append(card);    
                testI++;           
            }
        }

        
    })

    function createAreasCard(name, link, img){

        let a = document.createElement('a');
        a.classList.add('area-item');
        a.href = link;

        let imgBlock = document.createElement('div');
        imgBlock.classList.add('area-item__img');

        let imgCard = document.createElement('img');
        imgCard.src = img;

        imgBlock.append(imgCard);

        let nameBlock = document.createElement('div');
        nameBlock.classList.add('area-item__name');

        let arrowIcon = document.createElement('img');
        arrowIcon.src = "assets/img/icons/areas-arrow.svg";

        let areaName = document.createElement('span');
        areaName.classList.add('title');
        areaName.innerHTML = name;

        nameBlock.append(areaName);
        nameBlock.append(arrowIcon);
        
        a.append(imgBlock);
        a.append(nameBlock);
                 
        return a;         
                
    }

    downloadMoreAreas.addEventListener('click', function(){
        testAreasList.forEach((area, index) => {
            let card = createAreasCard(area.name, area.url, area.img);
            card.classList.add('appended');
    
            card.style.animationDelay = (index * 200) + 'ms';
    
            areasList.append(card);
        })
    })

   
}




if (realtyList && downloadMoreRealty){


    let testI = 0;
    window.addEventListener('scroll', function(event){
        if ( testI < 3 && document.documentElement.clientWidth <= 640 ){
            let cssData = realtyList.getBoundingClientRect()

            let listBottom = cssData.bottom;
            let listHeight = cssData.height;

            
            if ( listBottom <=  document.documentElement.clientHeight - 100){
                
                let card =  createRealtyCard(testRealtyList[testI].img, testRealtyList[testI].name, testRealtyList[testI].url, testRealtyList[testI].price, testRealtyList[testI].type, testRealtyList[testI].address, testRealtyList[testI].options);
                card.classList.add('appended');
                realtyList.append(card);     
                testI++;           
            }
        }

        
    })


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }
      
    

    
    function createRealtyCard(imgs, name, url, price, type, address, options){
        let realtyCard = createNode('div', 'realty-card');
        let realtyCardImgBlock = createNode('div', 'realty-card__img-block');
        let realtyCardImgBlockInner = createNode('div', 'realty-card__img-block--inner');
        let swiper  = createNode('div', 'swiper realty-gallery-swiper');
        let swiperWrapper = createNode('div', 'swiper-wrapper');
        let swiperPagination = createNode('div', 'realty-gallery-swiper__pagination');        
        let realtyCardBody = createNode('a', 'realty-card__body', '', url);
        let realtyName = createNode('h3', 'title', '', '', name);
        let realtyCardDescription = createNode('div', 'realty-card__description');
        let realtyCardDescriptionType = createNode('span', 'realty-card__type', '', '', type);
        let realtyCardDescriptionAddress = createNode('span', 'realty-card__location', '', '', address);
        let realtyCardOptions = createNode('span', 'realty-card__options');
        let realtyCardFooter = createNode('div', 'realty-card__footer');
        let realtyCardPrice = createNode('p', 'realty-card__price h4', '', '', price);
        

        realtyCard.append(realtyCardImgBlock);        
        realtyCardImgBlock.append(realtyCardImgBlockInner);
        realtyCardImgBlockInner.append(swiper);
        swiper.append(swiperWrapper);
        swiper.append(swiperPagination);        
        realtyCard.append(realtyCardBody);
        realtyCardBody.append(realtyName);
        realtyCardBody.append(realtyCardDescription);
        realtyCardDescription.append(realtyCardDescriptionType);
        realtyCardDescription.append(realtyCardDescriptionAddress);
        realtyCardBody.append(realtyCardOptions);
        realtyCard.append(realtyCardFooter);        
        realtyCardFooter.append(realtyCardPrice);

        let randomGalleryIndex =  getRandomInt(10000, 1000000);
        imgs.forEach( img => {
            let swiperSlide = document.createElement('a');
            swiperSlide.href = img;
            swiperSlide.setAttribute('data-fancybox', 'realty-gallery-' + randomGalleryIndex);
            swiperSlide.setAttribute('class', 'swiper-slide');
            let imgNode = document.createElement('img');
            imgNode.src = img;
            swiperSlide.append(imgNode);
            swiperWrapper.append(swiperSlide);
        } )

        options.forEach( opt => {
            let item = createNode('span', 'realty-card__option-item', '', '', opt.value);
            
            let iconOption = createNode('img', 'realty-card__option-icon', opt.iconUrl, '');
            item.prepend(iconOption);

            realtyCardOptions.append(item);

        } )

        

        

        const slider = new Swiper(swiper, {
            speed: 300,
            spaceBetween: 10,
        
            pagination: {
              el: swiper.querySelector('.realty-gallery-swiper__pagination'),
              clickable: true,
            },
          });

          
          swiper.addEventListener('mousemove', function(event){
            
              if (this.classList.contains('moved')) return false;
              
              
              const xPosition = event.offsetX==undefined?event.layerX:event.offsetX
      
              const current = slider.activeIndex;
              const count = slider.slides.length;
              const step =  100 / count;
              
              
              const position  = (xPosition / this.offsetWidth) * 100;
              
              const movePosition = Math.trunc(position / step);
              
              if ( movePosition > count ) return false;
              if ( movePosition < 0 ) return false;
      
              if ( movePosition === current ) return false
              
              slider.slideTo(movePosition, 0, function(){})
              this.classList.add('moved');
              setTimeout(()=>{
                this.classList.remove('moved');
              }, 50)
            
      
          }, {capture: true})
          

        return realtyCard
    }



    downloadMoreRealty.addEventListener('click', function(){
        
        
        

        testRealtyList.forEach( (realtyItem, index) => {
            let card =  createRealtyCard(realtyItem.img, realtyItem.name, realtyItem.url, realtyItem.price, realtyItem.type, realtyItem.address, realtyItem.options);
            card.classList.add('appended');
            card.style.animationDelay = (index * 200) + 'ms';
            
            realtyList.append(card);
        } )
  
        
    })
}

const showMobFilters = document.querySelector('.show-all-filters');
const deepFiltersBlock = document.querySelector('.filter-form__deep-filters');

if ( showMobFilters && deepFiltersBlock){
    
    showMobFilters.addEventListener('click', function(){
        if ( deepFiltersBlock.classList.contains('active') ){
            deepFiltersBlock.classList.remove('active')
        } else{
            deepFiltersBlock.classList.add('active')
        }
    })
}



function createNode(nodeType, nodeClasses = '', nodeSrc = '' , nodeHref = '', innerHTML=''){
    let node = document.createElement(nodeType);

    if ( nodeClasses ){
        node.setAttribute('class', nodeClasses);
    }

    if ( nodeType === 'img' ){
        node.src = nodeSrc;
    }

    if ( nodeType === 'a' ){
        node.href = nodeHref;
    }

    if ( innerHTML !== ''){
        node.innerHTML = innerHTML;
    }

    return node;
}


let switchValues = document.querySelectorAll('.switch-values__radio');
let switchValuesChecked = document.querySelectorAll('.switch-values__radio:checked');
if ( switchValues.length ){
    switchValuesChecked.forEach( sw => {
        let value =  sw.value;
        document.querySelector(sw.getAttribute('data-target')).innerHTML = value;
    } )

    switchValues.forEach( sw => {
        sw.addEventListener('change', function(){
            if ( this.checked ){
                
                document.querySelector(this.getAttribute('data-target')).innerHTML = this.value;
            }
        })
    } )
}

let copyBtns = document.querySelectorAll('.copy-button');

copyBtns.forEach( btn => {
    btn.addEventListener('click', function(){
        if ( !this.classList.contains('active') ){
            
            let text = this.querySelector('*[data-copy]').innerHTML;
            let self = this;

            navigator.clipboard.writeText(text).then(() => {
                self.classList.add('active');
                setTimeout(()=>{
                    self.classList.remove('active');
                }, 1500 )
            })

            

            
        }
    })
} )



let rsGallery = new Swiper(".swiper.rs-gallery-slider", {
    speed: 1000,
    autoplay: {
        delay: 6000,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    
    
    navigation: {
        nextEl: '.rs-gallery-slider__next',
        prevEl: '.rs-gallery-slider__prev',
    },
    
})

/*

const addFavoriteInSingleRealty = document.querySelectorAll('.fvw-single-realty');
const addFavoriteInRealtyCard = document.querySelectorAll('.fvw-realty-card');


if (addFavoriteInSingleRealty.length){
    addFavoriteInSingleRealty.forEach( btn => {
        btn.addEventListener('click', function(){

            const parent = this.closest('.realty-single');
            if (!parent.classList.contains('is-favorite')){
                parent.classList.add('is-favorite');
            } else{
                parent.classList.remove('is-favorite');
            }

        })
    } )
}
*/
/*
if (  addFavoriteInRealtyCard.length ){
    addFavoriteInRealtyCard.forEach( btn => {
        btn.addEventListener('click', function(){

            const parent = this.closest('.realty-card');
            if (!parent.classList.contains('is-favorite')){
                parent.classList.add('is-favorite');
            } else{
                parent.classList.remove('is-favorite');
            }

        })
    } )
}*/


let swiperNav  = new Swiper(".swiper.sa-inner-nav-swiper", {
    speed: 1000,
    slidesPerView: "auto",
    spaceBetween: 35,
    freeMode: true,
    watchSlidesProgress: true,

    
    breakpoints: {
        
        1024: {            
            spaceBetween: 45
        }
    }
})


let filterCurrencyInputs = document.querySelectorAll('.filter-currency-input');

if ( filterCurrencyInputs.length ){

    filterCurrencyInputs.forEach( fi => {
        currencyMask = IMask(
            fi,
            {
              mask: [
                  { mask: '' },
                  {
                      mask: 'num',
                      lazy: false,
                      blocks: {
                          num: {
                              mask: Number,
                              scale: 2,
                              thousandsSeparator: ' ',
                              padFractionalZeros: true,
                              
                          }
                      }
                  }
              ]
            });
    } )

    
}


const linksToAnchor = document.querySelectorAll('.link-to-anchor');

if ( linksToAnchor.length ){
    let innerNav = document.querySelector('.sa-inner-nav');
    linksToAnchor.forEach( la => {
        la.addEventListener('click', function(event){
            event.preventDefault();

            let targetClick = document.querySelector(this.getAttribute('href'));

            if (targetClick){


                let ot = targetClick.offsetTop;
                
                let innerNavHeight = innerNav.offsetHeight;
                ot = ot - innerNavHeight - 20;
                
                window.scrollTo({
                    top: ot,
                    left: 0,
                    behavior: "smooth"
                });

                
            }

        })
    } )
    let lastScroll = 0;
    window.addEventListener('scroll', function(){

        let deltaScroll = window.scrollY - lastScroll;
        console.log(deltaScroll);
        lastScroll = window.scrollY;
        

        linksToAnchor.forEach( la => {
            let targetLink = document.querySelector(la.getAttribute('href'));

            if (targetLink){

                if ( deltaScroll > 0) {

                    let br = targetLink.getBoundingClientRect().top;
                    let windowHeight = window.innerHeight;
                    let result = br - windowHeight / 2;
                    

                    if ( result < 100 && result > 0 ){
                        let activeLinks =  innerNav.querySelectorAll('.link-to-anchor.active-link'); 
                        if ( activeLinks.length ){
                            activeLinks.forEach( al => {
                                al.classList.remove('active-link');
                            } )
                        }

                        la.classList.add('active-link')
                    }

                } else{
                    let br = targetLink.getBoundingClientRect().bottom;
                    let windowHeight = window.innerHeight;
                    let result = br - windowHeight / 2;
                    

                    if ( result < 100 && result > 0 ){
                        let activeLinks =  innerNav.querySelectorAll('.link-to-anchor.active-link'); 
                        if ( activeLinks.length ){
                            activeLinks.forEach( al => {
                                al.classList.remove('active-link');
                            } )
                        }

                        la.classList.add('active-link')
                    }
                }



                
            }
            
        })
    })
}




let articleNavLinks = document.querySelectorAll('.article-nav-link');
if ( articleNavLinks.length ){
    articleNavLinks.forEach( nl => {
        nl.addEventListener('click', function(event){
            event.preventDefault();

            let targetClick = document.querySelector(this.getAttribute('href'));

            if (targetClick){


                let ot = targetClick.offsetTop;
                
                let headerHeight = header.offsetHeight;
                ot = ot - headerHeight - 20;
                
                window.scrollTo({
                    top: ot,
                    left: 0,
                    behavior: "smooth"
                });

                
            }
        })
    } )
}


let areaMap = document.querySelector('#map');

if (  areaMap  ){
    areaMap.addEventListener('click', function(){
        areaMap.classList.add('clicked')
    })
}





let sortByRadioInputs = document.querySelectorAll('input[name="order-by"]');

if ( sortByRadioInputs.length ){
    sortByRadioInputs.forEach( ri => {
        ri.addEventListener('change', function(){
            let formNode = this.closest('form');
            formNode.submit();
        })
    
    } )
}


const filterForm = document.querySelector('.filter-form');



if ( filterForm ){
    let filterQty = document.querySelector('.show-all-filters__qty');    
    function testChanges(){
        let qty = 0;
        let checkboxChecked = filterForm.querySelectorAll('input[name="rooms[]"]:checked');
        let checkboxRadio = filterForm.querySelectorAll('input[type="radio"]:checked:not([data-default], [name="order-by"] )');
        qty = checkboxChecked.length;
        qty = qty + checkboxRadio.length;

        let inputs = filterForm.querySelectorAll('.filter-currency-input');
        
        let rangeTest = false;

        inputs.forEach( inp => {
            let v = inp.value;
            v = v.replace(/[\s.%]/g, '');
            v = parseInt(v);

            let df = inp.getAttribute('data-default');
            df = df.replace(/[\s.%]/g, '');
            df = parseInt(df);

            console.log(v, df)  ; 
            //console.log(valueCur, valueDefault);
            if ( v !== df ) {
                rangeTest = true;
                console.log(v, df)  ; 
            }
        } )

        if ( rangeTest ) qty++;

        if ( qty ) {
            filterQty.innerHTML = qty;
            filterQty.classList.add('active');
        } else{
            filterQty.innerHTML = qty;
            filterQty.classList.remove('active');
        }
    }
    testChanges();
    let checkboxes = filterForm.querySelectorAll('[name="rooms[]"]');
    
    checkboxes.forEach( cb => {
        cb.addEventListener('change', testChanges);
    } )

    let radios = filterForm.querySelectorAll('input[type="radio"]');
    radios.forEach( rb => {
        rb.addEventListener('change', testChanges);
    } )

    let inputs = filterForm.querySelectorAll('.filter-currency-input');
    inputs.forEach( inp => {
        inp.addEventListener('input', ()=>{
            testChanges();
        });
    } )
    /*let checkboxChecked = filterForm.querySelectorAll('input[type="checkbox"]:checked');
        let checkboxRadio = filterForm.querySelectorAll('input[type="radio"]:checked');
        qty = checkboxChecked.length;
        qty = qty + checkboxRadio.length;

        inp.addEventListener('input', function(){
            let defaultValue = this.getAttribute('data-default');
        })*/
}


/*


let maskPlaceHolder = '';
let maskPlaceHolder1 = '';
let mask;
let mask1;
phoneInput.addEventListener("countrychange", function(e) {
	
	this.value = "";
    maskPlaceHolder = this.getAttribute('placeholder');
    if ( maskPlaceHolder ){
        let newMask = maskPlaceHolder.replace(new RegExp("[0-9]", "g"), "0");      
        console.log(newMask);        
        const maskOptions = {
            mask: newMask

        };
        if ( mask ){
			mask.updateOptions({mask: newMask});
		} else{
			mask = IMask(this, maskOptions);  
		}
    }
});
phoneInput.addEventListener("focus", function(e) {

    if ( !maskPlaceHolder){
        let maskPlaceHolder = this.getAttribute('placeholder');
        
        if ( maskPlaceHolder ){
            let newMask = maskPlaceHolder.replace(new RegExp("[0-9]", "g"), "0");   
			console.log(newMask);        
            const maskOptions = {
                mask: newMask
    
            };
            if ( mask ){
				mask.updateOptions({mask: newMask});
			} else{
				mask = IMask(this, maskOptions);  
			}
        }
    }

    
});
if ( phoneInput1 ){
	phoneInput1.addEventListener("countrychange", function(e) {
	this.value = "";
    maskPlaceHolder1 = this.getAttribute('placeholder');
		
    if ( maskPlaceHolder1 ){
        let newMask = maskPlaceHolder1.replace(new RegExp("[0-9]", "g"), "0");      
        
        const maskOptions = {
            mask: newMask

        };
		
		if ( mask1 ){
			mask1.updateOptions({mask: newMask});
		} else{
			mask1 = IMask(this, maskOptions);  
		}
		
        
    }
});
phoneInput1.addEventListener("focus", function(e) {

    if ( !maskPlaceHolder1){
        let maskPlaceHolder1 = this.getAttribute('placeholder');
        
        if ( maskPlaceHolder1 ){
            let newMask = maskPlaceHolder1.replace(new RegExp("[0-9]", "g"), "0");   
			console.log(newMask);        
            const maskOptions = {
                mask: newMask
    
            };
            if ( mask1 ){
				mask1.updateOptions({mask: newMask});
			} else{
				mask1 = IMask(this, maskOptions);  
			}    
        }
    }

    
});

*/



/*
let rr = document.querySelector('.realty-grid');
window.addEventListener('scroll', function(event){
    if (  document.documentElement.clientWidth <= 640 ){
        let cssData = rr.getBoundingClientRect();
        let listBottom = cssData.bottom;
        let listHeight = cssData.height;


        if ( listBottom <=  document.documentElement.clientHeight - 100){
            
            jQuery( function( $ ){
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
                            downloadRealtiesBtn.dispatchEvent(event);
                        });
                
                    }
                });
            });

        }
    }

})*/


/*

let form = document.querySelector('.get-guide__form');
   if ( form ){
	form.onsubmit = function(event){
    event.preventDefault();
    console.log(1111)
    if ( testRequired(this.name)  && testRequired(this.phone) && testMinLength(this.phone)){
        let nameInput = this.name;
        let phoneInput = this.phone;
        let action = this.action1;
        let data_body = "name=" + this.name.value + '&phone=' +  this.phone.value+'&action=sendEmail'+'&phone_code='+ this.action1.value; 
        fetch(form.getAttribute('action'), {
            method: "POST",
            body: data_body,
            headers:{"content-type": "application/x-www-form-urlencoded"} 
        })
        .then( (response) => {
            console.log('nuce')
            if (response.status !== 200) {
                return Promise.reject();
            }
            feedbackform.close();
            feedbackform.open('#thanks-modal');
            nameInput.value = '';
            phoneInput.value = '';
            return response.text()
        })
        .then(i => console.log(i))
        .catch(() => {console.log('ошибка')
    
            nameInput.value = '';
            phoneInput.value = '';
            feedbackform.close();
            feedbackform.open('#thanks-modal');
            
        });
    }


    
}
	
}
*/