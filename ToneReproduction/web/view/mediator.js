/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var mediator;
var Mediator = function() {
   this.modelEnum = new ModelEnum();
   this.state = this.modelEnum.STATE_INIT;
   this._init();
}

Mediator.prototype._init = function() {
   $("body").load("view/view.html", this._onViewLoaded);
   
   // event listeners 
   $("#combo").change(function() {
      alert("changed");
   });
   $(".btnAdjust").click(this._onBtnAdjust);
   $(".btnRevert").click(this._onBtnRevert);
   $(".btnToggle").click(this._onBtnToggle);
}

/********** event handlers *********************/
Mediator.prototype._onViewLoaded = function() {

    switch(view.state) {
       case view.modelEnum.STATE_INIT:
          view.loadInfo("assets/intro.json");
          break;
          
       case view.modelEnum.STATE_HISTOGRAM:
          view.loadInfo("assets/histogram.json");
          break;
    }
}

Mediator.prototype.onChangeImage = function() {
   var url = $("#combo").val();
   $(".imgSrc").attr("src", url);
}

Mediator.prototype._onBtnAdjust = function() {
   
}

Mediator.prototype._onBtnRevert = function() {
   dispatchEvent(EVENT_BUTTON_REVERT);
}

Mediator.prototype._onBtnToggle = function() {
   
}

Mediator.prototype.loadInfo = function(filePath) {
   $.getJSON(filePath, function(data){
      $(".divInfo").append(data.info);
    });
}


// application state change
Mediator.prototype.onStateChange = function() {
   
   this.render();
   
}

Mediator.prototype.render = function() {
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

Mediator.prototype._onRenderedDivHistogram = function() {
   
}

Mediator.prototype._onRenderedDivCumulative = function() {
   
}


