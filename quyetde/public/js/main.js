window.onload = function(){
    document.getElementsByClassName('True').addEventListener('click',clickTrue);
    document.getElementsByClassName('False').addEventListener('click',clickFalse); 

    fetch('/',{
        method: 'GET',
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        
    })
    .catch()

}