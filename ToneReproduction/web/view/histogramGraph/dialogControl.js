var DialogControl = function() {
   $(".divHistogram").draggable();
   this.init();
}

DialogControl.prototype.init = function() {
   $(".btnOK").bind("click", {pointer: this}, this.onHistogramOk)
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
   
   $("#comboChannel").bind("change", {pointer: this}, this.onChangeChannel);
}

DialogControl.prototype.dispose = function() {
   this.init = null;
   this.initCombo = null;
   this.onChangeChannel = null;
   
   this.onHistogramOk = null;
   
   this.getChangeChannelEvent = null;
}

DialogControl.prototype.loadInfo = function(filePath) {
   $(".divInfo p").remove();
   $.getJSON(filePath, function(data){
      $(".divInfo").append(data.info);
   });
}
   
DialogControl.prototype.onHistogramOk = function(event) {
   var ptr = event.data.pointer;
   ptr.loadInfo("assets/thanks.json");
   
   dispatchEvent(EVENT_BUTTON_HISTOGRAM_OK);
   $(".divDialog div").remove();
}

DialogControl.prototype.onHistogramAuto = function() {
   dispatchEvent(EVENT_HISTOGRAM_BUTTON_EQUALIZE);
   this.dispose();   
}

DialogControl.prototype.onChangeChannel = function(event) {  
   var ptr = event.data.pointer;
   var event = ptr.getChangeChannelEvent();
   dispatchEvent(event);
   this.dispose();
}

DialogControl.prototype.getChangeChannelEvent = function() {
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



