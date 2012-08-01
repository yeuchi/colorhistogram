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
   
   this.STATE_HISTOGRAM_RED = "stateHistogramRed";
   this.STATE_HISTOGRAM_GREEN = "stateHistogramGreen";
   this.STATE_HISTOGRAM_BLUE = "stateHistogramBlue";
   this.STATE_HISTOGRAM_ALPHA = "stateHistogramAlpha";
   this.STATE_HISTOGRAM_GRAY = "stateHistogramGray";
   
   this.STATE_CUMULATIVE_RED = "stateCumulativeRed";
   this.STATE_CUMULATIVE_GREEN = "stateCumulativeGreen";
   this.STATE_CUMULATIVE_BLUE = "stateCumulativeBlue";
   this.STATE_CUMULATIVE_ALPHA = "stateCumulativeAlpha";
   this.STATE_CUMULATIVE_GRAY = "stateCumulativeGray";
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
   this.CHANNEL_GRAY = "grayChannel";
   
   /* listInfo index */
   this.INDEX_RED = 0;
   this.INDEX_GREEN = 1;
   this.INDEX_BLUE = 2;
   this.INDEX_ALPHA = 3;
   this.INDEX_GRAY = 4;
}