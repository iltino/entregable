function login(){
    let usuario=document.getElementById("usuario").value;
    let contraseña=document.getElementById("pass").value;
    let email=document.getElementById("email").value
    if(usuario=="") { 
        alert("Ingrese un usuario valido") 
    }else if(contraseña==""){
        alert("Ingrese una contraseña valida")
    }else if(email==""){
        alert("Ingrese un email valido")
    }else{
        localStorage.setItem('user',usuario);
        
        alert("Usuario correcto! Bienvenido")
        location.href="index.html"; 
        
    }  
}


document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("btnVerifica").addEventListener("click", () => {
        login();
    });
})


