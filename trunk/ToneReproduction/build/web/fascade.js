
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
   var onButtonHistogramRed = function() {
      controller.buildHistogram(modelEnum.INDEX_RED);
   }
   
   var onButtonHistogramGreen = function() {
      controller.buildHistogram(modelEnum.INDEX_GREEN);
   }
   
   var onButtonHistogramBlue = function() {
      controller.buildHistogram(modelEnum.INDEX_BLUE);
   }
   
   var onButtonHistogramAlpha = function() {
      controller.buildHistogram(modelEnum.INDEX_ALPHA);
   }
   
   var onButtonHistogramGray = function() {
      controller.buildHistogram(modelEnum.INDEX_GRAY);
   }
   
   var onButtonHistogramEqualize = function() {
      // perform equalization
   }
   
   var onSliderHistogramHighlight = function(event) {
      controller.modifyHighlight(event.pos);
   }
   
   /* cumulative - curve commands */
   var onButtonCumulative = function() {
      
   }
   
/**************** Event listeners **************/

   $(document).bind(EVENT_IMAGE_LOAD_COMPLETE, onImageLoadComplete);
   $(document).bind(EVENT_BUTTON_REVERT, onButtonRevert);
   
   /* histogram events */
   $(document).bind(EVENT_BUTTON_HISTOGRAM, onButtonHistogramGray);
   $(document).bind(EVENT_BUTTON_HISTOGRAM, onButtonHistogramGray);
   $(document).bind(EVENT_HISTOGRAM_COMBO_RED, onButtonHistogramRed);
   $(document).bind(EVENT_HISTOGRAM_COMBO_GREEN, onButtonHistogramGreen);
   $(document).bind(EVENT_HISTOGRAM_COMBO_BLUE, onButtonHistogramBlue);
   $(document).bind(EVENT_HISTOGRAM_COMBO_ALPHA, onButtonHistogramAlpha);
   $(document).bind(EVENT_HISTOGRAM_COMBO_GRAY, onButtonHistogramGray);
   $(document).bind(EVENT_HISTOGRAM_BUTTON_EQUALIZE, onButtonHistogramEqualize);
   $(document).bind(EVENT_HISTOGRAM_CHANGE_HIGHLIGHT, onSliderHistogramHighlight);
   
   /* cumulative - curve events */
   $(document).bind(EVENT_BUTTON_CUMULATIVE, onButtonCumulative);
  
});

