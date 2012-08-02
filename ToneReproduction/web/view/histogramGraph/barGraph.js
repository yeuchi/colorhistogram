
var BarGraph = function() {
   // set controls movable
   $(".slider").draggable();
   
   this.init();
}

BarGraph.prototype.dispose = function() {
   this.init = null;
   this.render = null;
   this.getColor = null;
   this.onChangeHighLight = null;
   this.onChangeGamma = null;
   this.onChangeShadow = null;
   this.onTextHighlight = null;
   this.onTextGamma = null;
   this.onTextShadow = null;
   slideBound = null;
   txtBound = null;
}

BarGraph.prototype.init = function() {

   // bind event listeners
   $(".btnHighLight").bind("mouseup", this.onChangeHighLight);
   $(".btnGamma").bind("mouseup", this.onChangeGamma);
   $(".btnShadow").bind("mouseup", this.onChangeShadow);
   
   $(".txtHighlight").bind("change", this.onTextHighlight);
   $(".txtGamma").bind("change", this.onTextGamma);
   $(".txtShadow").bind("change", this.onTextShadow);
}

BarGraph.prototype.render = function() {
   $(".divBarGraph a").remove();
   
   var info = model.getSelectedChannelInfo();
   var max = info.max;
   var color = this.getColor();
 
   for(var i=0; i<modelEnum.HISTOGRAM_LENGTH; i++) {
      var bar = document.createElement("a");
      $(bar).addClass("bar");

      var h = parseInt(info.histogram[i] / max * 100);
      if(null==h||0==h) 
         h = 1;
      else
         $(bar).addClass(color);
      
      var t = 100 - h;
      $(bar).css({"top":t+"px", "left": "0px", "width": "1px", "height": h+"px"});
      $(".divBarGraph").append(bar);  
   }
}

BarGraph.prototype.getColor = function() {
   switch(model.state) {
      case modelEnum.STATE_HISTOGRAM_RED:
         return "colorR";
         
      case modelEnum.STATE_HISTOGRAM_GREEN:
         return "colorG";
         
      case modelEnum.STATE_HISTOGRAM_BLUE:
         return "colorB";
         
      case modelEnum.STATE_HISTOGRAM_ALPHA:
         return "colorA";
         
      default:
      case modelEnum.STATE_HISTOGRAM_GRAY:
         return "colorG";
   }
}

/************** event handler ************************/
BarGraph.prototype.onChangeHighLight = function() {
   var value = slideBound(".btnHighLight");
   $("#txtHighlight").val(value);
   
   var event = jQuery.Event(EVENT_HISTOGRAM_CHANGE_HIGHLIGHT);
   event.pos = value;

   dispatchEvent(event);
}

BarGraph.prototype.onChangeGamma = function() {
   var value = slideBound(".btnGamma");   
   var v = value/255*2;
   $("#txtGamma").val(v);
}

BarGraph.prototype.onChangeShadow = function() {
   var value = slideBound(".btnShadow");
   $("#txtShadow").val(value);
   dispatchEvent(EVENT_HISTOGRAM_CHANGE_SHADOW);
}

BarGraph.prototype.onTextHighlight = function() {
   var value = txtBound("#txtHighlight");
   $(".btnHighLight").css("left", value);
}

BarGraph.prototype.onTextGamma = function() {
   var value = txtBound("#txtGamma");
   var v = parseInt(pos / 2 * 255);
   $(".btnGamma").css("left", v);
}

BarGraph.prototype.onTextShadow = function() {
   var value = txtBound("#txtShadow");
   $(".btnShadow").css("left", value);
}

var slideBound = function(slideId){
   var pos = $(slideId).position();
   $(slideId).css("top", 0);
   
   if(pos.left<0) {
      $(slideId).css("left", 0);
      return 0;
   }
   
   if(pos.left>255) {
      $(slideId).css("left", 255);
      return 255;
   }
   
   return pos.left;   
}

var txtBound = function(txtId) {
   var value = parseInt($(txtId).val());
   if(value<0){
      $(txtId).val(0);
      return 0;
   }
   
   if(value>255){
      $(txtId).val(255);
      return 255;
   }
   
   return value;
}
