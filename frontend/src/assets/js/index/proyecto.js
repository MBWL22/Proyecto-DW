// Función para renderizar el contenido existente en los tres tipos de editores
function update(){
    var idoc = document.getElementById('iframe').contentWindow.document;

	idoc.open();
    idoc.write(editor.getValue());
    idoc.write('<style>'+editor2.getValue()+'</style>');
    idoc.write('<scri'+'pt>'+editor3.getValue()+'</scri'+'pt>');
	idoc.close();
}

// Función para establecer los valores de los tres tipos de editores

function setupEditor(){
  // Valores para el editor tipo html.
window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/html");
  editor.setValue(`<!DOCTYPE html>
  <html>
  <head>
  </head>  
  <body>
  </body>  
  </html>`,1);
  // Valores para el editor tipo css.
window.editor2 = ace.edit("editor2");
    editor2.setTheme("ace/theme/twilight");
    editor2.session.setMode("ace/mode/css");  
  // Valores para el editor tipo javaScript.
window.editor3 = ace.edit("editor3");
    editor3.setTheme("ace/theme/twilight");
    editor3.session.setMode("ace/mode/javascript");

    
}
setupEditor();
update();







