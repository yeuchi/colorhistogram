/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
   
   var view = new View();
   var model = new Model(view);
   var controller = new Controller(model);
   
   
   
   // event listeners
   $(document).bind(EVENT_MAIN_MODEL_LOADED, onModelInit);
   
});

