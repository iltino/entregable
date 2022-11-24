let carrito=[];

let direccion=CART_INFO_URL;



function showCarrito (carrito){
 let htmlContentToAppend="";
 for (let i = 0; i < carrito.length; i++) {
    let element = carrito[i];
    htmlContentToAppend+=`
    <tr><td class="col-2"><img src=${element.image} width=120 > </td>
    <td>${element.name} </td>
    <td>  <span class="pre"> ${element.currency} ${element.unitCost}</span> </td>
    <td> <input type="number" class="cant text-center" onchange="multiplicar(${element.unitCost})" min=1 id="calculo" value="${element.count}" ></td>
    <td> <div id="subTotal">  <span class="subt"> ${element.currency} ${element.count*element.unitCost}</span></div> </td>
    </tr>`
    
  
 }

 document.getElementById("cart").innerHTML = htmlContentToAppend;
 

}

function multiplicar(cantidad){
let sumatoria= document.getElementById("calculo").value;
let calculoTotal= sumatoria*cantidad
document.getElementById("subTotal").innerHTML="USD " + calculoTotal;

}



function calcular(){
  let cantidades = document.getElementsByClassName('cant');
  let precios = document.getElementsByClassName('pre');
  let subtotales = document.getElementsByClassName('subt');
  let envios = document.getElementsByName('envio');//Agarre todos los radio que se llaman "envio"
  let subtotal=0, costoEnvio=0, total = 0
  for (i=0; i< cantidades.length; i++){
      subtotal+=parseInt(cantidades[i].value) * parseFloat(precios[i].innerHTML);
      subtotales[i].innerHTML = (parseInt(cantidades[i].value) * parseFloat(precios[i].innerHTML)).toFixed(2);
     
      //cantidades[i].addEventListener('change',()=>{calcular();})    
  }
  
  for (let envio of envios){ //recorro los radio
      if (envio.checked){//pregunto si esta marcado
          costoEnvio = subtotal * envio.value; //calculo el subtotal
      }
      envio.addEventListener('click',()=>{calcular()})
  }
  total = subtotal + costoEnvio;
  document.getElementById('CostProduct').innerHTML=subtotal.toFixed(2);
  document.getElementById('TypeEnvio').innerHTML=costoEnvio.toFixed(2);
  document.getElementById('CostTotal').innerHTML=total.toFixed(2);
}

document.addEventListener('DOMContentLoaded',()=>{

  showCarrito(carrito)
  calcular()
})





document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carrito = resultObj.data.articles;
            showCarrito(carrito);
            
            
            
        }
    


    });
     
});

// (function () {
//     'use strict'
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.querySelectorAll('.needs-validation')
  
//     // Loop over them and prevent submission
//     Array.prototype.slice.call(forms)
//       .forEach(function (form) {
//         form.addEventListener('submit', function (event) {
//           if (!form.checkValidity()) {
//             event.preventDefault()
//             event.stopPropagation()
//           }
  
//           form.classList.add('was-validated')
//         }, false)
//       })
//   })()



    

     
    
  