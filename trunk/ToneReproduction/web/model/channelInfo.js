/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ChannelInfo = function(color) {
   this.modelEnum = new ModelEnum();
   this.channel = color;
   this.init();
}

ChannelInfo.prototype.init = function() {
   this.initHistogram();
   
   // adjustable parameters
   this.shadow = 0;                       // histogram index of shadow
   this.highlight = 255;                  // histogram index of highlight
   this.gamma = 1.0;                      // contrast - gamma curve 
   
   // statistics collected from image
   this.mode = -1;                        // histogram index of mode (most count)
   this.median = -1;                      // histogram index of median (middle of the population)
   this.minVar = -1;                      // 3variance from normal distribution .1% of data
   this.maxVar = -1;
   this.max = -1;                         // histogram maximum count at mode 
}

ChannelInfo.prototype.initHistogram = function() {
   this.histogram = [];
   
   for(var i=0; i<this.modelEnum.HISTOGRAM_LENGTH; i++) {
      this.histogram.push(0);
   }
}

ChannelInfo.prototype.pixelOffset = function() {
   switch(this.channel) {
      case this.modelEnum.CHANNEL_RED:
      case this.modelEnum.CHANNEL_GRAY:
         return this.modelEnum.INDEX_RED;
         
      case this.modelEnum.CHANNEL_GREEN:
         return this.modelEnum.INDEX_GREEN;
         
      case this.modelEnum.CHANNEL_BLUE:
         return this.modelEnum.INDEX_BLUE;
         
      case this.modelEnum.CHANNEL_ALPHA:
         return this.modelEnum.INDEX_ALPHA;
   }
}



