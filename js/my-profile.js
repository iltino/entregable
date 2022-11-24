
function guardar(){
    let firstName=document.getElementById("firstName").value;
    let secondName=document.getElementById("secondName").value;



   
        localStorage.setItem('firstName',firstName);
        
        
        
    }  









(function() {
    'use strict';
    window.addEventListener('load', function() {
      
      var forms = document.getElementsByClassName('needs-validation');
      
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
    
  })();