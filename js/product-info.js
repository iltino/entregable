let producto=[];

let comentarios=[];

let related=[];

function setProductID(id) {
    localStorage.setItem("productId", id);
    window.location = "product-info.html"
 }
function showRelatedProducts (related) {

    let htmlContentToAppend = ""
        for(let i = 0; i < related.relatedProducts.length;i++){
            let product = related.relatedProducts[i];
            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" id="recommend" class="list-group-item list-group-item-action">
                <div class="row">
                <div class="col-3">
                <h5><strong>`+ product.name +`</strong></h5>
                <div class="col">
                <img src="`+ product.image +` " alt="product image" class="img-thumbnail" > 
            </div>
            </div>
            </div>
            </div>
            `
        document.getElementById("recommend").innerHTML = htmlContentToAppend; 
        }
    }



function showImage(array){
let figura=array.images
let vacio="";
for(let i = 0; i < figura.length; i++){
    vacio+=`
    <img src="` + figura[i] + `" width=250px alt="product image" class="img-thumbnail">`
}
return vacio


};

function mostrarEstrellas(numero){

     let htmlContentToAppend= ""
      for (let i=0; i< 5; i++){
        if (i<numero){
            htmlContentToAppend+=`<span class="fa fa-star checked"></span>`
        }else (
            htmlContentToAppend+=`<span class="fa fa-star"></span>`
        )
      }
      return htmlContentToAppend

}

function showComentarios(array){
    let htmlContentToAppend= ""
    for(let i = 0; i < array.length; i++){ 
        let calificacion = array[i];

        htmlContentToAppend +=`
        <li class="list-group-item">
            <p><strong>`+ calificacion.user +`</strong> -` + calificacion.dateTime +` -` + calificacion.score +`${mostrarEstrellas(calificacion.score)}</p> 
            <p>` + calificacion.description +`</p> 
        </li>
        `
        document.getElementById("coments").innerHTML=htmlContentToAppend;
    }
}



function showProduct(array){
    let htmlContentToAppend = "";

     
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
            <h2>`+array.name+`</h2> <hr>
            <p><strong>Precio: </strong>`+array.cost+`</p>
            <p><strong>Descripción: </strong>`+array.description+`</p>
            <p><strong>Categoria: </strong>`+array.category+`</p>
            <p><strong>Cantidad Sold: </strong>`+array.soldCount+`</p>
            <p><strong>Imagenes: </strong></p>
            <div class="mostrarImagenes">${showImage(array)}</div>
                    
                        
           </div>
        </div>
        `
        document.getElementById("mostrar").innerHTML = htmlContentToAppend; 
    }




document.addEventListener("DOMContentLoaded", function(e){
    let firstProduct=localStorage.getItem('productId')
    getJSONData(PRODUCT_INFO_URL+firstProduct+".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            producto = resultObj.data;
            showProduct(producto);
            showRelatedProducts (producto);
        }
    


    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL+firstProduct+".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentarios = resultObj.data;
            showComentarios(comentarios);
            
        }
});

/*/document.getElementById("recommend").addEventListener("click",function(){
    localStorage.setItem("ID", id);
        window.location = "products-info.html"
})
/*/
});
