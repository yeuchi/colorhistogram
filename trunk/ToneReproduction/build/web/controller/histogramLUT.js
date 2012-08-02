/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var HistogramLUT = function() {
   this.modelEnum = new ModelEnum();
}

HistogramLUT.prototype.init = function(info) {
   this.info = info;
   this.lut = [];
   for(var i=0; i<this.modelEnum.HISTOGRAM_LENGTH; i++)  
      this.lut.push(i);
}

HistogramLUT.prototype.apply = function(dataSrc, dataDes) {
   this.gamma();
   this.shadow();
   this.highlight();
    
   // apply look up table
   var offset = this.info.pixelOffset;  
   for (var y=0; y<model.imageHeight(); y++) {
		var i = y*model.imageWidth()*4;			
		for(var x=0; x<model.imageWidth(); x++) {
         if(this.info.channel == this.modelEnum.CHANNEL_GRAY) {
            dataDes.data[i+1] = this.lut[dataSrc.data[i+1]];
            dataDes.data[i+2] = this.lut[dataSrc.data[i+2]];
         }
         dataDes.data[i+offset] = this.lut[dataSrc.data[i+offset]];
         i+=4;
      }
   } 
   
}

// make them private, stick them in constructor
HistogramLUT.prototype.gamma = function(value) {
   if(1==this.info.gamma)
      return;
   
}

HistogramLUT.prototype.shadow = function(value) {
   if(0==this.info.shadow)
      return;
}

HistogramLUT.prototype.highlight = function(value) {
   if(255==this.info.highlight)
      return;
   
   for(var i=0; i<this.modelEnum.CHANNEL_LENGTH; i++)
      this.lut[i] = ceiling(this.lut[i]*multiplier);
}

HistogramLUT.prototype.ceiling = function(value) {
   return (value>255)?255:value;
}


