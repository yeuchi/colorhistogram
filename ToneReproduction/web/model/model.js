/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var model;
var Model = function() {
   this._modelEnum = new ModelEnum();
   this.imageUrl;
   this.state = this._modelEnum.STATE_INIT;
   
   this.modelEnum = new ModelEnum();
   this.initHistogram();
}

Model.prototype.initHistogram = function() {
   this.histogramR = [];                        // array of 256 entries (8 bit channel)
   this.histogramG = [];
   this.histogramB = [];
   this.histogramA = [];  
}

// application state change
Model.prototype.changeState = function() {
   appView.onStateChange();                     // replace with function binding if observer pattern
}

Model.prototype.initImage = function(id) {
   this.canvas = document.getElementById(id);
   this.context = this.canvas.getContext("2d");
   this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
   this.dataDes = this.context.createImageData(this.canvas.width, this.canvas.height);
}

Model.prototype.imageWidth = function() {
   return (null==this.imgSrc)?-1:this.imgSrc.width;
}

Model.prototype.imageHeight = function() {
   return (null==this.imgSrc)?-1:this.imgSrc.height;
}
