var DialogControl = function() {
   $(".divHistogram").draggable();
   this.init();
}

DialogControl.prototype.init = function() {
   $(".btnOK").bind("click", this.onHistogramOk)
   $(".btnCancel").bind("click", this.onHistogramCancel); 
   $(".btnAuto").bind("click", this.onHistogramAuto);  

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
   
   $("#comboChannel").bind("change", this.onChangeChannel);
}

DialogControl.prototype.dispose = function() {
   this.init = null;
   this.initCombo = null;
   this.onChangeChannel = null;
   
   this.onHistogramCancel = null;
   this.onHistogramOk = null;
   
   getChangeChannelEvent = null;
}
   
DialogControl.prototype.onHistogramOk = function() {
   dispatchEvent(EVENT_BUTTON_HISTOGRAM_OK);
   this.dispose();
   $(".divDialog div").remove();
}
   
DialogControl.prototype.onHistogramCancel = function() {
   dispatchEvent(EVENT_BUTTON_HISTOGRAM_CANCEL);
   this.dispose();
   $(".divDialog div").remove();
   
}

DialogControl.prototype.onHistogramAuto = function() {
   dispatchEvent(EVENT_HISTOGRAM_BUTTON_EQUALIZE);
   this.dispose();   
}

DialogControl.prototype.onChangeChannel = function() {  
   var event = getChangeChannelEvent();
   dispatchEvent(event);
   this.dispose();
}

var getChangeChannelEvent = function() {
   var event = jQuery.Event(EVENT_HISTOGRAM_COMBO_CHANGE);
   switch($("#comboChannel").val())
   {
      case modelEnum.CHANNEL_RED:
         event.index = modelEnum.INDEX_RED;
         break;
         
      case modelEnum.CHANNEL_GREEN:
         event.index = modelEnum.INDEX_GREEN;
         break;
         
      case modelEnum.CHANNEL_BLUE:
         event.index = modelEnum.INDEX_BLUE;
         break;
         
      case modelEnum.CHANNEL_ALPHA:
         event.index = modelEnum.INDEX_ALPHA;
         break;
         
      case modelEnum.CHANNEL_GRAY:
         event.index = modelEnum.INDEX_GRAY;
         break;
   }
   return event;
}



