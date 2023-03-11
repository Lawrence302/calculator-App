console.log('hi')

const present = document.querySelector('.present')
const history = document.querySelector('.history')
const buttons = document.querySelectorAll('.num');

buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // checking for all the operation relatated buttons 
        if(e.target.classList.contains('math')){
            // copying history content to present content for futher operations
            if(present.textContent === '' && history.textContent){
                present.textContent = history.textContent;
                history.textContent = '';
            }
            // returning if only - is found in the text content box inorder to avoid errors
            if(present.textContent === '-'){
                return;
            }
        
            /*giving rights only to - to be entered when the box is empty since any other operation before the number 
            will couse issues */
            if(present.textContent === '' && e.target.textContent!== '-'){
                return;
            }

            // ensuring that repetition of operators is avoided
            // console.log(present.textContent.charAt(present.textContent.length - 1))
            if(present.textContent.charAt(present.textContent.length - 1) === e.target.textContent){
                let thischar = present.textContent.charAt(present.textContent.length -1 )
                return thischar.replace(thischar, e.target.textContent);
            }


            //rewriting the operator if another operator is written after
            if(present.textContent.charAt(present.textContent.length - 1).match(/[/|*|-|+|%]/)){
                // thischar = present.textContent.charAt(present.textContent.length - 1);
                // console.log(thischar)
                 present.textContent = present.textContent.slice(0,-1) + e.target.textContent;
                //  present.textContent 

                 return
            }
            
        }

        
        // pefforming operations as the keys are pressed 
        if(present.textContent.charAt(present.textContent.length - 1).match(/[/|*|-|+|%]/) && e.target.classList.contains('digit')){
            const keep = present.textContent;
            present.textContent += e.target.textContent;
            history.textContent = eval(present.textContent);
            present.textContent = keep;
        }

        // hadling all special keys
        switch(e.target.textContent){
            case 'AC':
                present.textContent = '';
                history.textContent = '';
                break;
            case '←':
                present.textContent = present.textContent.slice(0,-1);
                break;
            case '=':
                if(present.textContent === '' && history.textContent){
                    present.textContent = history.textcontent;
                    return;
                }
                try{
                    history.textContent = eval(present.textContent);
                    present.textContent = '';
                }catch(e){
                    history.textContent = 'Error!';
                }
                break;
            case '.':
                const keep = present.textContent;
                if(present.textContent.includes('.')){
                    return;
                }

                present.textContent += '.';
                break;
                
                
            case '+/_':

                    if(present.textContent === '-'){
                        return;
                    }
                    
                    if(Math.sign(present.textContent) === -1){
                        history.textContent = Math.abs(present.textContent);
                        present.textContent = '';
                    }else{
                        history.textContent = present.textContent * (-1);
                        present.textContent = '';
                    }
               
                break;

            case '%':
                const hold = present.textContent;
                present.textContent = eval(present.textContent)/100;
                history.textContent = hold + '%';

                break;
            default:
                present.textContent += e.target.textContent;

        }
        // console.log(e.target.textContent);
    })
})