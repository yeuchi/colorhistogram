/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var DialogControl = function() {
   $(".divHistogram").draggable();
   this.init();
}

DialogControl.prototype.init = function() {
   $(".btnOK").bind("click", this.onHistogramOk)
   $(".btnCancel").bind("click", this.onHistogramCancel);  
   $("#comboChannel").bind("change", this.onChangeChannel);
   
   this.initCombo();
}

DialogControl.prototype.initCombo = function() {
   var list = $("#comboChannel").children();
   
   switch(model.state) {
      case modelEnum.STATE_HISTOGRAM_RED:
         list[modelEnum.INDEX_RED].selected = true;
         break;
         
      case modelEnum.STATE_HISTOGRAM_GREEN:
         list[modelEnum.INDEX_GREEN].selected = true;
         break;
         
      case modelEnum.STATE_HISTOGRAM_BLUE:
         list[modelEnum.INDEX_BLUE].selected = true;
         break;
         
      case modelEnum.STATE_HISTOGRAM_ALPHA:
         list[modelEnum.INDEX_ALPHA].selected = true;
         break;
         
      case modelEnum.STATE_HISTOGRAM_GRAY:
         list[modelEnum.INDEX_GRAY].selected = true;
         break;
   }
}

DialogControl.prototype.dispose = function() {
   this.onHistogramCancel = null;
   this.onHistogramOk = null;
}
   
DialogControl.prototype.onHistogramOk = function() {
   dispatchEvent(EVENT_BUTTON_HISTOGRAM_OK);
   $(".divDialog div").remove();
}
   
DialogControl.prototype.onHistogramCancel = function() {
   dispatchEvent(EVENT_BUTTON_HISTOGRAM_CANCEL);
   $(".divDialog div").remove();
}

DialogControl.prototype.onChangeChannel = function() {  
   var event = getChangeChannelEvent();
   dispatchEvent(event);
}

var getChangeChannelEvent = function() {
   var eventValue = $("#comboChannel").val();
   switch(eventValue) {
      case modelEnum.CHANNEL_RED:
         return EVENT_HISTOGRAM_COMBO_RED;
         
      case modelEnum.CHANNEL_GREEN:
         return EVENT_HISTOGRAM_COMBO_GREEN;
         
      case modelEnum.CHANNEL_BLUE:
         return EVENT_HISTOGRAM_COMBO_BLUE;
         
      case modelEnum.CHANNEL_ALPHA:
         return EVENT_HISTOGRAM_COMBO_ALPHA;
      
      default:
      case modelEnum.CHANNEL_GRAY:
         return EVENT_HISTOGRAM_COMBO_GRAY;
   }
}



