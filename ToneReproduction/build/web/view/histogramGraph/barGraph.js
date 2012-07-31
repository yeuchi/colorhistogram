/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var BarGraph = function() {
   this.init();
}

BarGraph.prototype.init = function() {
   $(".slider").draggable({
            drag: function( event, ui ) {
               var slider = arguments[1].draggable;
               $(slider).css("top", 0);
            }
   });
   
   $(".btnHighLight").bind("mouseup", this.onChangeHighLight);
   $(".btnMidTone").bind("mouseup", this.onChangeMidTone);
   $(".btnShadow").bind("mouseup", this.onChangeShadow);
   
   $(".txtHighlight").bind("change", this.onTextHighlight);
   $(".txtMidTone").bind("change", this.onTextMidTone);
   $(".txtShadow").bind("change", this.onTextShadow);
}

BarGraph.prototype.render = function() {
   
}

/************** event handler ************************/
BarGraph.prototype.onChangeHighLight = function() {
   var value = slideBound(".btnHighLight");
   $("#txtHighlight").val(value);
}

BarGraph.prototype.onChangeMidTone = function() {
   var value = slideBound(".btnMidTone");
   $("#txtMidTone").val(value);
}

BarGraph.prototype.onChangeShadow = function() {
   var value = slideBound(".btnShadow");
   $("#txtShadow").val(value);
}

BarGraph.prototype.onTextHighlight = function() {
   var value = txtBound("#txtHighlight");
   $(".btnHighLight").css("left", value);
}

BarGraph.prototype.onTextMidTone = function() {
   var value = txtBound("#txtMidTone");
   $(".btnMidTone").css("left", value);
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
