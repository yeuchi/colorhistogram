/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var model;
var Model = function() {
   this._modelEnum = new ModelEnum();
   this.imageUrl;
   this.state = this._modelEnum.STATE_INIT;
   this.listInfo = [];
   this.initHistogram();
   
   return(model)?model:model=this;
}

Model.prototype.initHistogram = function() {
   this.listInfo = [];
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_RED));
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_GREEN));
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_BLUE));
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_ALPHA));
}

Model.prototype.getChannelInfo = function(color) {
   for(var i=0; i<4; i++) {
      if(this.listInfo[i].channel==color)
         return this.listInfo[i];
   }
   return null;
}

// application state change
Model.prototype.changeState = function() {
   appView.onStateChange();                     // replace with function binding if observer pattern
}

Model.prototype.initImage = function(id, imgObj) {
   this.canvas = document.getElementById(id);
   this.context = this.canvas.getContext("2d");
   this.context.drawImage(imgObj, 0,0);
   this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
   this.dataDes = this.context.createImageData(this.canvas.width, this.canvas.height);
}

Model.prototype.imageWidth = function() {
   return (null==this.dataSrc)?-1:this.dataSrc.width;
}

Model.prototype.imageHeight = function() {
   return (null==this.dataSrc)?-1:this.dataSrc.height;
}
