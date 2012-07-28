/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var View = function() {
   this._modelEnum = new ModelEnum();
   this._state = this._modelEnum.STATE_HISTOGRAM;
}

// application state change
View.prototype.onStateChange = function() {
   
}

View.prototype.render = function() {
   if(this._state != model.STATE) {
      var 
      switch(model.state) {
         case this._modelEnum.STATE_HISTOGRAM:
            $(".divHistogram").load(,_onRenderedDivHistogram);
            break;
            
         case this._modelEnum.STATE_CUMULATIVE:
            $(".divHistogram").load(,_onRenderedDivHistogram);
            break;
      }         
      
   }
}

View.prototype._onRenderedDivHistogram = function() {
   
}

View.prototype.load = function() {
   
}