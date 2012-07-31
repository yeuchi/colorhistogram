/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var appView;
var AppView = function() {
   
   this._init();
}

AppView.prototype._init = function() {
   this.modelEnum = new ModelEnum();
   this.state = this.modelEnum.STATE_INIT;
   
   $("body").load("view/appView.html", this._onViewLoaded);
}

// load image into canvas, model
AppView.prototype.loadImage = function(filePath) {
   var imgObj = new Image();
   imgObj.onload = function(){
      // init data 
      model.initImage("myCanvas");
      model.context.drawImage(this, 0,0);
      dispatchEvent(EVENT_IMAGE_LOAD_COMPLETE);                // build my histogram now ?
   };
   imgObj.src = filePath;
}

/********** event handlers *********************/

// init 
AppView.prototype._onViewLoaded = function() {

   // event listeners    
   $(".btnHistogram").bind("click", appView._onBtnHistogram);
   $(".btnCumulative").bind("click", appView._onBtnCumulative);
   $(".btnRevert").bind("click", appView._onBtnRevert);
   $(".btnToggle").bind("click", appView._onBtnToggle);
   $("#combo").bind("change", appView._onChangeImage);
   
   appView.loadInfo("assets/intro.json");
   model.imageUrl = "assets/images/BillnMarc.JPG";
   appView.loadImage(model.imageUrl);
}

AppView.prototype._onChangeImage = function() {
   model.imageUrl = $("#combo").val();
   appView.loadImage(model.imageUrl);
   dispatchEvent(EVENT_COMBO_IMAGE);
}

AppView.prototype._onBtnHistogram = function() {
   $(".divDialog").load("view/histogramGraph/histogram.html",this._onRenderedDivHistogram);
}

AppView.prototype._onBtnCumulative = function() {
   $(".divDialog").load("view/cumulativeGraph/cumulative.html",this._onRenderedDivCumulative);
}

AppView.prototype._onBtnRevert = function() {
   dispatchEvent(EVENT_BUTTON_REVERT);
}

AppView.prototype._onBtnToggle = function() {
   dispatchEvent(EVENT_BUTTON_TOGGLE);
}


AppView.prototype.loadInfo = function(filePath) {
   $.getJSON(filePath, function(data){
      $(".divInfo").append(data.info);
    });
}


// application state change
AppView.prototype.onStateChange = function() {
   switch(model.state){
      case this.modelEnum.STATE_IMAGE_MODIFIED:
         this.render();
         break;
         
      default:
   }
}

AppView.prototype.render = function() {
   if(this.state != model.STATE) {
  
      this._renderImageDes();    
   }
}

AppView.prototype._renderImageDes = function () {
   model.contextDes.clearRect(0,0,model.imageWidth, model.imageHeight);
   model.contextDes.putImageData(model.dataDes, 0, 0);
}

AppView.prototype._onRenderedDivHistogram = function() {
   dispatchEvent(EVENT_BUTTON_HISTOGRAM);                      // go build my histogram !
}

AppView.prototype._onRenderedDivCumulative = function() {
   dispatchEvent(EVENT_BUTTON_CUMULATIVE);                     // go build my cumulative histogram !
}


