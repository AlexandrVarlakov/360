

const comboSelects = document.querySelectorAll('.combo-select');


document.addEventListener('click', function(event){
    let t = event.target.closest('.combo-select');
    if ( t === null){
        let activeCS =  document.querySelector('.combo-select.active');
        if ( activeCS ) activeCS.classList.remove('active');
    }
})


if ( comboSelects.length ){

    comboSelects.forEach( cs => {
        let outerBox = cs.querySelector('.combo-select__outer-box');
        let dropList = cs.querySelector('.combo-select__drop');
        let currentValue = cs.querySelector('.combo-select__current-value');
        

        


        outerBox.addEventListener('click', function(){
            if (  !cs.classList.contains('active') ){

                let activeCS =  document.querySelector('.combo-select.active');
                if ( activeCS ) activeCS.classList.remove('active');

                cs.classList.add('active');
            } else{
                cs.classList.remove('active')
            }
        })

        if ( !cs.hasAttribute('data-type') ){
            const items = cs.querySelectorAll('input[type="radio"]');
                let t = cs.querySelector('input[type="radio"]:checked');
                let parent, insertValue;
                if  ( t ) {
                    parent = t.closest('label');
                    insertValue = parent.querySelector('.combo-select__inserted-value');    

                    
                }
                

                
                if ( insertValue ){
                    currentValue.innerHTML = insertValue.innerHTML;
                    
                } else if ( t ){
                    currentValue.innerHTML =  t.getAttribute('data-value');
                }
            
                


            items.forEach( item =>  {
                item.addEventListener('change', function(){
                    let parent = this.closest('label');
                    let insertValue = parent.querySelector('.combo-select__inserted-value');

                    if ( insertValue ){
                        currentValue.innerHTML = insertValue.innerHTML;
                    } else{
                        currentValue.innerHTML = this.getAttribute('data-value');
                    }                    
                    cs.classList.remove('active');                
                })
            })
        } else{

            const items = cs.querySelectorAll('input[type="checkbox"]');
            currentValue.innerHTML = testCheckedCheckboxes(cs);

            items.forEach( item =>  {
                item.addEventListener('change', function(){
                    
                    currentValue.innerHTML = testCheckedCheckboxes(cs)
                })
            })
        }


        

        

        
    } )
}

function testCheckedCheckboxes(parent){
    let activeItems = parent.querySelectorAll('input[type="checkbox"]:checked')
    let value = '';
    activeItems.forEach( (ai, index) => {
        let delimetr = ''
        if (value.length) delimetr = ',';
        value = value + delimetr + ai.value;
        
    } )

    if (value === '') return parent.querySelector('.combo-select__placeholder').innerHTML;

    return value;
}

