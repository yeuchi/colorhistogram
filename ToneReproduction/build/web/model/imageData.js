/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ImageData = function(canvasID, type) {
   this.modelEnum = new ModelEnum();
   this.histogramR = [];                        // array of 256 entries (8 bit channel)
   this.histogramG = [];
   this.histogramB = [];
   
   this.canvas = document.getElementById(canvasID);
   this.context = this.canvas.getContext("2d");
   this.data = this._getData(type);
}

ImageData.prototype._getData = function(type) {
   switch(type){
      case this.modelEnum.SRC:
         return this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
         
      case this.modelEnum.DES:
         return this.context.createImageData(this.canvas.width, this.canvas.height);
   }
   return null;
}

ImageData.prototype.width = function() {
   return (null==this.canvas)?-1:this.canvas.width;
}

ImageData.prototype.height = function() {
   return (null==this.canvas)?-1:this.canvas.height;
}

ImageData.prototype.buildHistogram = function() {
   
}


