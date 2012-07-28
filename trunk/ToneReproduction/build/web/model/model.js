/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var model;
var Model = function() {
   this._modelEnum = new ModelEnum();
   this.state = this._modelEnum.STATE_INIT;
   
   this.histogramR = [];
   this.histogramG = [];
   this.histogramB = [];
}

// application state change
Model.prototype.changeState = function() {
   
   appView.onStateChange();                  // replace with function binding if observer pattern
}
