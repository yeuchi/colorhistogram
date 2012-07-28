/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
   
   appView = new AppView();
   var model = new Model();
   var controller = new Controller(model);
   
   var onButtonRevert = function() {
      
   }
   
   // event listeners
   $(document).bind(EVENT_BUTTON_REVERT, onButtonRevert);
   
});

