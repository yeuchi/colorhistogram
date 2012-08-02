/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var model;
var Model = function() {
   this.init();  
   return(model)?model:model=this;
}

Model.prototype.init = function() {
   this._modelEnum = new ModelEnum();
   this.imageUrl;
   this.state = this._modelEnum.STATE_INIT;
   
   this.listInfo = [];                                                  // list of channelInfo objects
   this.initHistogram();
}

Model.prototype.initHistogram = function() {
   this.listInfo = [];
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_RED));
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_GREEN));
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_BLUE));
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_ALPHA));
   this.listInfo.push(new ChannelInfo(this._modelEnum.CHANNEL_GRAY));
}

Model.prototype.getChannelInfo = function(color) {
   for(var i=0; i<5; i++) {
      if(this.listInfo[i].channel==color)
         return this.listInfo[i];
   }
   return null;
}

// use only when histogram state
Model.prototype.getSelectedChannelInfo = function() {
   switch(this.state) {
      case this._modelEnum.STATE_HISTOGRAM_RED:
         return this.listInfo[this._modelEnum.INDEX_RED];
         
      case this._modelEnum.STATE_HISTOGRAM_GREEN:
         return this.listInfo[this._modelEnum.INDEX_GREEN];
         
      case this._modelEnum.STATE_HISTOGRAM_BLUE:
         return this.listInfo[this._modelEnum.INDEX_BLUE];
         
      case this._modelEnum.STATE_HISTOGRAM_ALPHA:
         return this.listInfo[this._modelEnum.INDEX_ALPHA];
         
      default:
      case this._modelEnum.STATE_HISTOGRAM_GRAY:
         return this.listInfo[this._modelEnum.INDEX_GRAY];
   }
}

// application state change
Model.prototype.changeState = function(state) {
   this.state = state;
   appView.onStateChange();                     // replace with function binding if observer pattern
}

Model.prototype.initImage = function(id, imgObj) {
   this.canvas = document.getElementById(id);
   this.context = this.canvas.getContext("2d");
   this.context.drawImage(imgObj, 0,0);
   this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
   this.dataDes = this.context.createImageData(this.canvas.width, this.canvas.height);
   
   var len = this.imageHeight()*this.imageWidth()*4;
   for(var i=0; i<len; i++) 
      this.dataDes.data[i] = this.dataSrc.data[i];
}

Model.prototype.imageWidth = function() {
   return (null==this.dataSrc)?-1:this.dataSrc.width;
}

Model.prototype.imageHeight = function() {
   return (null==this.dataSrc)?-1:this.dataSrc.height;
}
