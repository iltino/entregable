let categoriesAutos = [];



let direccion=PRODUCTS_URL;

function setProductID(id) {
    localStorage.setItem("productId", id);
    window.location = "product-info.html"
    
}

function filtrar(){
    //parseInt porque es un string, y necesito un integer
    let inicial = parseInt(document.getElementById('minimo').value);//tomo el valor mínimo
    let final = parseInt(document.getElementById('maximo').value);//tomo el valor máximo
    let listaFiltrada = categoriesAutos.filter(producto => producto.cost >= inicial && producto.cost <= final );
    // arr.sort((a,b)=>a-b)
    listaFiltrada.sort((ant,sig)=>ant.cost-sig.cost);
  
    showCategoriesList (listaFiltrada);

}  
function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let auto = array[i];
        htmlContentToAppend += `
        <div onclick="setProductID(${auto.id})" class= "list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + auto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ auto.name +`</h4> 
                        <h4>`+ "USD "+ auto.cost +`</h4>
                        <p> `+ auto.description +`</p> 
                        </div>
                        <small class="text-muted">` + auto.soldCount + ` artículos</small> 
                        
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("autos").innerHTML = htmlContentToAppend; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    let categories=localStorage.getItem('catID')
    getJSONData(direccion+categories+".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesAutos = resultObj.data.products;
            showCategoriesList(categoriesAutos);
            
        }
    


    });
    document.getElementById("filtrando").addEventListener("click" ,()=>{ 
      filtrar();

    });
     document.getElementById("sortAsc").addEventListener("click", function(){
        
        let result = [];
        result = categoriesAutos.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        showCategoriesList(result)
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
       
        let result = [];
        result = categoriesAutos.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        showCategoriesList(result)
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        
        let result = [];
        result = categoriesAutos.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
        showCategoriesList(result)
    });
});






