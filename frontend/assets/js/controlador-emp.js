//------------------------------------VALIDACIONES Y PETICIONES---------------------------------------
$("#style-b").click(function(){
    var lgpassword =validarCampoVacio("password-login");
    var lgemail =validarCampoVacio("user-email-login");
    if (lgpassword==true || lgemail==true){
        $("#div-error-login").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
        '</i><span style="font-size: 15px;">Error: All highlighted fields are required </span></div>');
    }else{
        $.ajax({
            url:"ajax/loginempleados.php",
            data:"usuario="+$("#user-email-login").val()+"&password="+$("#password-login").val(),
            method:"POST",
            dataType:"json",
            success:function(respuesta){
                if (respuesta.codigo == 0){
                    console.log(respuesta);
                //window.location = "home-instructor.php"; //Redirreccionar desde js
                }else{
                    console.log(respuesta);
                  $("#div-error-login").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
                    '</i><span style="font-size: 15px;">Error: Verifique su correo electronico u contraseña </span></div>');
                    $("#password-login").removeClass("is-valid");
                    $("#password-login").addClass("is-invalid");
                    $("#user-email-login").removeClass("is-valid");
                    $("#user-email-login").addClass("is-invalid");
                }
            },
            error:function(error){
                console.log(error);
            }
        });
    }

});

/*
$("#btn-continue-parent").click(function(){
    var code =validarCampoVacio("acces-code-parent");

    if (code==true){
        $("#div-error-parent").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
        '</i><span style="font-size: 15px;">Invalid access code </span></div>');
    }

});*/

$("#btn-continue-student").click(function(){
    var code =validarCampoVacio("acces-code-student");
    if (code==true){
        $("#div-error-student").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
        '</i><span style="font-size: 15px;">Invalid access code </span></div>');
        $("#acces-code-student").removeClass("is-valid");
        $("#acces-code-student").addClass("is-invalid");
    }else{
        var parametros= "accessCodeCourse="+$("#acces-code-student").val();

         console.log(parametros);
           $.ajax({
             url:"ajax/comprobar-codigo.php",
             method:"POST",
             data:parametros,
             dataType:"json",
             success:function(respuesta){
                 if (respuesta.codigo==0){
                     console.log(respuesta.mensaje);
                     $("#div-error-student").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
                     '</i><span style="font-size: 15px;">Error: El codigo de acceso es invalido</span></div>');
                     $("#acces-code-student").removeClass("is-valid");
                     $("#acces-code-student").addClass("is-invalid");
                 }else{
                    console.log(respuesta.mensaje); 
                     window.location ="estudiante.php";
                 }
             } ,
             error:function(error){
                 console.log(error);
                }
            });

    }

});
$("#btn-registro-est").click(function(){
    var pNombre =validarCampoVacio("fname-est");
    var sNombre= validarCampoVacio("posicion-nombre-est");
    var email= validarCampoVacio("email-est");
    var password=validarCampoVacio("password-est");
    var passwordConfi=validarCampoVacio("confirm-password-est");
    var date=validarCampoVacio("date-cumple-est");
    

    if (pNombre==true && sNombre==true && email==true && password==true && passwordConfi==true && date==true){
        $("#div-ins-error").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
        '</i><span style="font-size: 15px;">Error: All highlighted fields are required</span></div>');
    }else if($("#password-est").val()!=$("#confirm-password-est").val()){
        $("#div-ins-error").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
        '</i><span style="font-size: 15px;">Error: Las contraseñas deben coincidir</span></div>');
       $("#password-ins").removeClass("is-valid");
       $("#confirm-password-ins").removeClass("is-valid");
       $("#confirm-password-ins").addClass("is-invalid");
       $("#password-ins").addClass("is-invalid");
    }else{
        var parametros= 
        "nombre="+$("#fname-est").val()+"&"+
        "apellido="+$("#posicion-nombre-est").val()+"&"+
        "emailUsuario="+$("#email-est").val()+"&"+
        "password="+$("#password-est").val()+"&"+
        "dateBD="+$("#date-cumple-est").val()+"&"+
        "&tipoUsuario=estudiante";

         console.log(parametros);
           $.ajax({
             url:"ajax/guardar-usuarios.php",
             method:"POST",
             data:parametros,
             dataType:"json",
             success:function(respuesta){
                 if (respuesta.codigo==0){
                     console.log(respuesta.mensaje);
                     $("#div-ins-error").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
                     '</i><span style="font-size: 15px;">Error: ya hay una cuenta existente con este correo electronico</span></div>');
                     $("#email-ins").removeClass("is-valid");
                     $("#email-ins").addClass("is-invalid");
                 }else{
                    console.log(respuesta.mensaje); 
                    window.location = "home-estudiante.php";
                 }
             } ,
             error:function(error){
                 console.log(error);
                }
            });
    }
         
});

$("#btn-registro-ins").click(function(){
    var pNombre =validarCampoVacio("fname-ins");
    var sNombre= validarCampoVacio("posicion-nombre");
    var email= validarCampoVacio("email-ins");
    var password=validarCampoVacio("password-ins");
    var passwordConfi=validarCampoVacio("confirm-password-ins");

    if (pNombre==true && sNombre==true && email==true && password==true && passwordConfi==true){
        $("#div-ins-error").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
        '</i><span style="font-size: 15px;">Error: All highlighted fields are required</span></div>');
    }else if($("#password-ins").val()!=$("#confirm-password-ins").val()){
        $("#div-ins-error").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
        '</i><span style="font-size: 15px;">Error: Las contraseñas deben coincidir</span></div>');
       $("#password-ins").removeClass("is-valid");
       $("#confirm-password-ins").removeClass("is-valid");
       $("#confirm-password-ins").addClass("is-invalid");
       $("#password-ins").addClass("is-invalid");
    }else{
        var parametros= 
        "nombre="+$("#fname-ins").val()+"&"+
        "apellido="+$("#posicion-nombre").val()+"&"+
        "emailUsuario="+$("#email-ins").val()+"&"+
        "password="+$("#password-ins").val()+"&tipoUsuario=instructor";

         console.log(parametros);
           $.ajax({
             url:"ajax/guardar-usuarios.php",
             method:"POST",
             data:parametros,
             dataType:"json",
             success:function(respuesta){
                 if (respuesta.codigo==0){
                     console.log(respuesta.mensaje);
                     $("#div-ins-error").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
                     '</i><span style="font-size: 15px;">Error: ya hay una cuenta existente con este correo electronico</span></div>');
                     $("#email-ins").removeClass("is-valid");
                     $("#email-ins").addClass("is-invalid");
                 }else{
                    console.log(respuesta.mensaje); 
                    window.location = "home-instructor.php";
                 }
             } ,
             error:function(error){
                 console.log(error);
                }
            });
    }
         
});


function validarCampoVacio(id){
    if(document.getElementById(id).value == ""){
        document.getElementById(id).classList.remove("is-valid");
        document.getElementById(id).classList.add("is-invalid");
        return true;
    }else{
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.add("is-valid");
        return false;
    }
}


$("#btn-ingresar-curso").click(function(){
       var parametros= "nameCourse="+$("#selec-ingresar-curso").val();
       console.log(parametros);
        $.ajax({
            url:"ajax/ingresar-curso.php",
            data:parametros,
            method:"POST",
            dataType:"json",

            success:function(respuesta){
                console.log(respuesta);
                if (respuesta.codigo == 0){
                window.location = "curso-oficial.php"; //Redirreccionar desde js
                 }else{
                    console.log(respuesta);
                    $("#error-ingresar-curso").html('<div class="error-div"><i class="fas fa-exclamation-circle" style="color: #E3556A; font-size: 25px">'+
                    '</i><span style="font-size: 15px;">Error: seleccione un curso</span></div>');
                }
            },
            error:function(error){
                console.log(error);
            }
        });
});

//-------------------------------------------FIN DE VALIDACIONES Y PETICIONES-----------------------------------------------------------------------------