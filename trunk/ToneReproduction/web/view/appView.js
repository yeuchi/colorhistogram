
var appView;
var AppView = function() {
   
   this._init();
   return(appView)?appView:appView=this;
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
      model.initImage("myCanvas", this);
      
      dispatchEvent(EVENT_IMAGE_LOAD_COMPLETE);                // build my histogram now ?
   };
   imgObj.src = filePath;
}

AppView.prototype.clear = function() {
   $(".divDialog div").remove();
}

/********** event handlers *********************/

// init 
AppView.prototype._onViewLoaded = function() {

   // event listeners    
   $(".btnHistogram").bind("click", appView._onBtnHistogram);
   $(".btnCumulative").bind("click", appView._onBtnCumulative);
   $("#combo").bind("change", appView._onChangeImage);
   
   appView.loadInfo("assets/intro.json");
   model.imageUrl = "assets/images/horse.png";
   appView.loadImage(model.imageUrl);
}

AppView.prototype._onChangeImage = function() {
   model.imageUrl = $("#combo").val();
   appView.loadImage(model.imageUrl);
   dispatchEvent(EVENT_COMBO_IMAGE);
}

AppView.prototype._onBtnHistogram = function() {
  appView.clear();
  var event = jQuery.Event(EVENT_HISTOGRAM_COMBO_CHANGE);
  event.index = modelEnum.INDEX_GRAY;
  dispatchEvent(event);
}

AppView.prototype._onBtnCumulative = function() {
  appView.clear();
  dispatchEvent(EVENT_BUTTON_CUMULATIVE); 
}

AppView.prototype.loadInfo = function(filePath) {
   $(".divInfo p").remove();
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
         
      case this.modelEnum.STATE_HISTOGRAM_RED:
      case this.modelEnum.STATE_HISTOGRAM_GREEN:
      case this.modelEnum.STATE_HISTOGRAM_BLUE:
      case this.modelEnum.STATE_HISTOGRAM_ALPHA:
      case this.modelEnum.STATE_HISTOGRAM_GRAY:
         this.render();
         
         $(".divDialog div").remove();
         $(".divDialog").load("view/histogramGraph/histogram.html");
         break;
      
      case this.modelEnum.STATE_CUMULATIVE_RED:
      case this.modelEnum.STATE_CUMULATIVE_GREEN:
      case this.modelEnum.STATE_CUMULATIVE_BLUE:
      case this.modelEnum.STATE_CUMULATIVE_ALPHA:
      case this.modelEnum.STATE_CUMULATIVE_GRAY:
         $(".divDialog div").remove();
         $(".divDialog").load("view/cumulativeGraph/cumulative.html");
         break;
      default:
   }
}

AppView.prototype.render = function() {
   model.context.clearRect(0,0,model.imageWidth(), model.imageHeight());
   model.context.putImageData(model.dataDes, 0, 0);
}



