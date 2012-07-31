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
   
   this.shadow = -1;                      // histogram index of shadow
   this.highlight = -1;                   // histogram index of highlight
   this.mode = -1;                        // histogram index of mode (most count)
   this.median = -1;                      // histogram index of median (middle of the population)
   
   this.max = -1;                         // histogram maximum count at mode 
}

ChannelInfo.prototype.initHistogram = function() {
   this.histogram = [];
   
   for(var i=0; i<this.modelEnum.HISTOGRAM_LENGTH; i++) {
      this.histogram.push(0);
   }
}



