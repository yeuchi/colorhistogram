
$(document).ready(function() {
  
/**************** Declare / Initialization *****/

   model = new Model();
   appView = new AppView();
   controller = new Controller();


/**************** Commands *********************/
   
   // image loaded - create histograms !
   var onImageLoadComplete = function() {
      
   }
   
   // restore image source
   var onButtonRevert = function() {
      
   }
   
   /* histogram commands */
   var onComboHistogram = function(event) {
      controller.buildHistogram(event.index);
   }
   
   var onButtonHistogramEqualize = function() {
      controller.equalize();
   }
   
   var onSliderHistogramHighlight = function(event) {
      controller.modifyHighlight(event.pos);
   }
   
   var onSliderHistogramShadow = function(event) {
      controller.modifyShadow(event.pos);
   }

   var onSliderHistogramGamma = function(event) {
      controller.modifyGamma(event.pos);
   }
   
   /* cumulative - curve commands */
   var onButtonCumulative = function() {
      
   }
   
/**************** Event listeners **************/

   $(document).bind(EVENT_IMAGE_LOAD_COMPLETE, onImageLoadComplete);
   $(document).bind(EVENT_BUTTON_REVERT, onButtonRevert);
   
   /* histogram events */
   $(document).bind(EVENT_HISTOGRAM_COMBO_CHANGE, onComboHistogram);
   $(document).bind(EVENT_HISTOGRAM_BUTTON_EQUALIZE, onButtonHistogramEqualize);
   $(document).bind(EVENT_HISTOGRAM_CHANGE_HIGHLIGHT, onSliderHistogramHighlight);
   
   /* cumulative - curve events */
   $(document).bind(EVENT_BUTTON_CUMULATIVE, onButtonCumulative);
  
});

