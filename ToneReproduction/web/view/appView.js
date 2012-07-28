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

/********** event handlers *********************/

// init 
AppView.prototype._onViewLoaded = function() {

   // event listeners 
   
   $(".btnAdjust").bind("click", appView._onBtnAdjust);
   $(".btnRevert").bind("click", appView._onBtnRevert);
   $(".btnToggle").bind("click", appView._onBtnToggle);
   $("#combo").bind("change", appView._onChangeImage);
   
   appView.loadInfo("assets/intro.json");
}

AppView.prototype._onChangeImage = function() {
   dispatchEvent(EVENT_CHANGE_IMAGE);
   var url = $("#combo").val();
   $(".imgSrc").attr("src", url);
}

AppView.prototype._onBtnAdjust = function() {
   dispatchEvent(EVENT_BUTTON_ADJUST);
}

AppView.prototype._onBtnRevert = function() {
   dispatchEvent(EVENT_BUTTON_REVERT);
}

AppView.prototype._onBtnToggle = function() {
   dispatchEvent(EVENT_BUTTON_TOGGLE);
}


AppView.prototype._onRenderedDivHistogram = function() {
   
}

AppView.prototype._onRenderedDivCumulative = function() {
   
}


AppView.prototype.loadInfo = function(filePath) {
   $.getJSON(filePath, function(data){
      $(".divInfo").append(data.info);
    });
}


// application state change
AppView.prototype.onStateChange = function() {
   
   this.render();
   
}

AppView.prototype.render = function() {
   if(this.state != model.STATE) {
  
      switch(model.state) {
         case this.modelEnum.STATE_HISTOGRAM:
            $(".divHistogram").load("view/histogram/histogram.html",_onRenderedDivHistogram);
            break;
            
         case this.modelEnum.STATE_CUMULATIVE:
            $(".divHistogram").load("view/cumulative/cumulative.html",_onRenderedDivCumulative);
            break;
      }         
      
   }
}



