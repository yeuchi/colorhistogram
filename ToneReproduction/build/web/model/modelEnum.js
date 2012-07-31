/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var modelEnum;
var ModelEnum = function() {
   this.initState();
   this.initConst();
   return (modelEnum)?modelEnum:modelEnum=this;
}

ModelEnum.prototype.initState = function() {
   this.STATE_INIT = "init";
   this.STATE_IMAGE_SOURCE = "imageSource";
   this.STATE_IMAGE_MODIFIED = "imageModified";
   
   this.STATE_HISTOGRAM = "histogram";
   this.STATE_CUMULATIVE = "cumulative";
}

ModelEnum.prototype.initConst = function() {   
   this.SRC = "source";
   this.DES = "destination";
   
   this.HISTOGRAM_LENGTH = 256;
   this.NUM_CHANNELS = 4;
   
   this.CHANNEL_RED = "redChannel";
   this.CHANNEL_GREEN = "greenChannel";
   this.CHANNEL_BLUE = "blueChannel";
   this.CHANNEL_ALPHA = "alphaChannel";
}