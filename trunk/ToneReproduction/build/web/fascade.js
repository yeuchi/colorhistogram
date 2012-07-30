/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
  
/**************** Declare / Initialization *****/

   model = new Model();
   appView = new AppView();
   var controller = new Controller(model);


/**************** Commands *********************/
   
   // image loaded - create histograms !
   var onImageLoadComplete = function() {
      controller.buildHistogram();
   }
   
   // restore image source
   var onButtonRevert = function() {
      
   }
   
   var onButtonHistogram = function() {
      
   }
   
   var onButtonCumulative = function() {
      
   }
   
/**************** Event listeners **************/

   $(document).bind(EVENT_IMAGE_LOAD_COMPLETE, onImageLoadComplete);
   $(document).bind(EVENT_BUTTON_REVERT, onButtonRevert);
   $(document).bind(EVENT_BUTTON_HISTOGRAM, onButtonHistogram);
   $(document).bind(EVENT_BUTTON_CUMULATIVE, onButtonCumulative);
   
});

