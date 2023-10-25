class ScrollingTabs{
    constructor(selector, options = {}){        
        this.options = options;
        this.slider = document.querySelector(selector);        
        this.initWrapper();
        this.initTabs();
        this.activeIndex = -1;
        this.translateX = 0;        
        this.maxTranslateX = this.slider.offsetWidth - this.wrapper.offsetWidth;        
        this.wrapIsDragging = false;
        this.wrapStartDragPosition = { x: 0, y: 0 };        

        this.init(this.tabs);
        this.initListeners();


    }

    initWrapper(){
        this.wrapper = this.slider.querySelector('.scrolling-tabs-wrapper');
    }
    initTabs(){
        this.tabs = this.wrapper.querySelectorAll('.scrolling-tab');
    }
    
    
    initListeners(){
        window.addEventListener('resize', ()=>{
            this.calculateWrapperWidth()
        })

        this.wrapper.addEventListener('mousedown', (event)=>{
            this.startDrag(event);
        })

        this.wrapper.addEventListener('touchstart', (event)=>{
            this.startDrag(event);
        })


        // Слушаем событие перемещения пальца или мыши
        this.wrapper.addEventListener('mousemove', (event)=>{
            this.drag(event)
        });
        this.wrapper.addEventListener('touchmove', (event)=>{
            this.drag( event)
        });

        this.wrapper.addEventListener('mouseleave', (event)=>{ 
            this.endDrag(event)
        });

        // Слушаем событие отпускания пальца или кнопки мыши
        this.wrapper.addEventListener('mouseup', (event)=>{ 
            this.endDrag(event)
        });
        this.wrapper.addEventListener('touchend', (event)=>{
            this.endDrag(event)
        });
    }

    testProperty(property, testObject){
        if (property in testObject) {
            return testObject[property];
        } else {
            return null;
        }
    }

    startDrag(event) {
    
        if (this.wrapper.offsetWidth <= this.slider.offsetWidth ) return false;
    
        this.wrapIsDragging = true;
        this.wrapStartDragPosition = {
          x: event.clientX || event.touches[0].clientX,
          y: event.clientY || event.touches[0].clientY
        };
        
    }

    drag(event) {    
        if (!this.wrapIsDragging) return;    
        const currentPosition = {
          x: event.clientX || event.touches[0].clientX,
          y: event.clientY || event.touches[0].clientY
        };
      
        let deltaX = this.wrapStartDragPosition.x - currentPosition.x;
        
        deltaX = deltaX * -1;
        this.translateX += deltaX / 4;
        if ( this.translateX > 0) this.translateX = 0;
    
        if ( this.translateX <  this.maxTranslateX)  this.translateX = this.maxTranslateX;
        
        this.wrapper.style.transform = 'translateX(' + this.translateX +'px)';
    
        event.preventDefault();
    }
    
    endDrag(event) {
        this.wrapIsDragging = false;
    }
    
    calculateWrapperWidth(){
        this.maxTranslateX = this.slider.offsetWidth - this.wrapper.offsetWidth;
    }

    init(tabs){
        if ( tabs.length ){

            let sheetsContainer = this.slider.getAttribute('data-sheets-container');
            let sheetsContainerNode = document.querySelector(sheetsContainer);
            
            if (!sheetsContainerNode) return false;

            //Проверяем на случайно указанные активные страницы
            const activeSheets = sheetsContainerNode.querySelectorAll('.active');
            if ( activeSheets.length ){
                activeSheets.forEach( activeSheet => {
                    activeSheet.classList.remove('active')
                } )
            }
                      
            let hasActive = false;
            tabs.forEach( (tab, index) => {
                if ( tab.classList.contains('active') && !hasActive){
                    this.activeIndex = index;
                    hasActive = true

                    let sheetLink = tab.getAttribute('data-target');
                    let sheetNode = sheetsContainerNode.querySelector(sheetLink);

                    if ( sheetNode ) sheetNode.classList.add('active')

                } else if ( tab.classList.contains('active') && hasActive ){
                    
                    tab.classList.remove('active')
                }


                tab.addEventListener('click', ()=>{
                    if ( index !== this.activeIndex ){
                        tabs[this.activeIndex].classList.remove('active');
                        let currentSheetLink = tabs[this.activeIndex].getAttribute('data-target');
                        let currentSheetNode = sheetsContainerNode.querySelector(currentSheetLink);
                        
                        currentSheetNode.classList.remove('active');

                        tabs[index].classList.add('active');
                        let newActiveSheetLink = tabs[index].getAttribute('data-target');
                        let newActiveSheetNode = sheetsContainerNode.querySelector(newActiveSheetLink);
                        newActiveSheetNode.classList.add('active');
                        
                        this.activeIndex = index;
                    }
                })
                
            })
            if ( this.activeIndex === -1 ){
                this.activeIndex = 0;
                tabs[this.activeIndex].classList.add('active');
                let newActiveSheetLink = tabs[this.activeIndex].getAttribute('data-target');
                let newActiveSheetNode = sheetsContainerNode.querySelector(newActiveSheetLink);
                newActiveSheetNode.classList.add('active');
            }

        } else {
            return false;
        }
    }
    

}


class ScrollingLinks{
    constructor(selector, options = {}){        
        this.options = options;
        this.slider = document.querySelector(selector);        
        this.initWrapper();
        this.initTabs();
        this.activeIndex = -1;
        this.translateX = 0;        
        this.maxTranslateX = this.slider.offsetWidth - this.wrapper.offsetWidth;        
        this.wrapIsDragging = false;
        this.wrapStartDragPosition = { x: 0, y: 0 };        

        this.init(this.tabs);
        this.initListeners();


    }

    initWrapper(){
        this.wrapper = this.slider.querySelector('.scrolling-tabs-wrapper');
    }
    initTabs(){
        this.tabs = this.wrapper.querySelectorAll('.scrolling-tab');
    }
    
    
    initListeners(){
        window.addEventListener('resize', ()=>{
            this.calculateWrapperWidth()
        })

        this.wrapper.addEventListener('mousedown', (event)=>{
            this.startDrag(event);
        })

        this.wrapper.addEventListener('touchstart', (event)=>{
            this.startDrag(event);
        })


        // Слушаем событие перемещения пальца или мыши
        this.wrapper.addEventListener('mousemove', (event)=>{
            this.drag(event)
        });
        this.wrapper.addEventListener('touchmove', (event)=>{
            this.drag( event)
        });

        this.wrapper.addEventListener('mouseleave', (event)=>{ 
            this.endDrag(event)
        });

        // Слушаем событие отпускания пальца или кнопки мыши
        this.wrapper.addEventListener('mouseup', (event)=>{ 
            this.endDrag(event)
        });
        this.wrapper.addEventListener('touchend', (event)=>{
            this.endDrag(event)
        });
    }

    testProperty(property, testObject){
        if (property in testObject) {
            return testObject[property];
        } else {
            return null;
        }
    }

    startDrag(event) {
    
        if (this.wrapper.offsetWidth <= this.slider.offsetWidth ) return false;
    
        this.wrapIsDragging = true;
        this.wrapStartDragPosition = {
          x: event.clientX || event.touches[0].clientX,
          y: event.clientY || event.touches[0].clientY
        };
        
    }

    drag(event) {    
        if (!this.wrapIsDragging) return;    
        const currentPosition = {
          x: event.clientX || event.touches[0].clientX,
          y: event.clientY || event.touches[0].clientY
        };
      
        let deltaX = this.wrapStartDragPosition.x - currentPosition.x;
        
        deltaX = deltaX * -1;
        this.translateX += deltaX / 4;
        if ( this.translateX > 0) this.translateX = 0;
    
        if ( this.translateX <  this.maxTranslateX)  this.translateX = this.maxTranslateX;
        
        this.wrapper.style.transform = 'translateX(' + this.translateX +'px)';
    
        event.preventDefault();
    }
    
    endDrag(event) {
        this.wrapIsDragging = false;
    }
    
    calculateWrapperWidth(){
        this.maxTranslateX = this.slider.offsetWidth - this.wrapper.offsetWidth;
    }

    init(tabs){
        if ( tabs.length ){

            let sheetsContainer = this.slider.getAttribute('data-sheets-container');
            let sheetsContainerNode = document.querySelector(sheetsContainer);
            
            if (!sheetsContainerNode) return false;

            //Проверяем на случайно указанные активные страницы
            const activeSheets = sheetsContainerNode.querySelectorAll('.active');
            if ( activeSheets.length ){
                activeSheets.forEach( activeSheet => {
                    activeSheet.classList.remove('active')
                } )
            }
                      
            let hasActive = false;
            tabs.forEach( (tab, index) => {
                if ( tab.classList.contains('active') && !hasActive){
                    this.activeIndex = index;
                    hasActive = true

                    let sheetLink = tab.getAttribute('data-target');
                    let sheetNode = sheetsContainerNode.querySelector(sheetLink);

                    if ( sheetNode ) sheetNode.classList.add('active')

                } else if ( tab.classList.contains('active') && hasActive ){
                    
                    tab.classList.remove('active')
                }


                
                
            })
            if ( this.activeIndex === -1 ){
                this.activeIndex = 0;
                tabs[this.activeIndex].classList.add('active');
                let newActiveSheetLink = tabs[this.activeIndex].getAttribute('data-target');
                let newActiveSheetNode = sheetsContainerNode.querySelector(newActiveSheetLink);
                newActiveSheetNode.classList.add('active');
            }

        } else {
            return false;
        }
    }
    

}


if ( document.querySelector('.scrolling-tabs.realty-tabs') ){
    let st = new ScrollingTabs('.scrolling-tabs.realty-tabs');
}
if ( document.querySelector('.scrolling-tabs.blog-tabs') ){
    let st = new ScrollingLinks('.scrolling-tabs.blog-tabs');
}


