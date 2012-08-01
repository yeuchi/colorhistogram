/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var controller;
var Controller = function() {
   if(controller)
      return controller;
   
   this.init();
   controller = this;
   return this;
}

Controller.prototype.init = function() {
   this.modelEnum = new ModelEnum();
}

Controller.prototype.buildHistogram = function(index) {
   // create a local copy of use global copy in model ?
   model.initHistogram();
   var offset = this.getOffset(index);
         
   // count and create histogram for just 1 channel
   for (var y=0; y<model.imageHeight(); y++) {
		var i = y*model.imageWidth()*4;			
		for(var x=0; x<model.imageWidth(); x++) {
         this.upCount(i+offset, model.listInfo[index]);
         i+=4;
      }
   }

   // construct statistics
   this.findShadow(model.listInfo[index]);
   this.findHighlight(model.listInfo[index]);
   this.findStat(model.listInfo[index]);

   
   model.changeState(this.declareHistogramState(index)); 
}

Controller.prototype.declareHistogramState = function(index) {
   switch(index) {
      case this.modelEnum.INDEX_RED:
         return this.modelEnum.STATE_HISTOGRAM_RED;
         
      case this.modelEnum.INDEX_GREEN:
         return this.modelEnum.STATE_HISTOGRAM_GREEN;
         
      case this.modelEnum.INDEX_BLUE:
         return this.modelEnum.STATE_HISTOGRAM_BLUE;
         
      case this.modelEnum.INDEX_ALPHA:
         return this.modelEnum.STATE_HISTOGRAM_ALPHA;
         
      case this.modelEnum.INDEX_GRAY:
         return this.modelEnum.STATE_HISTOGRAM_GRAY;
   }
}

Controller.prototype.getOffset = function(index) {
   if(index == this.modelEnum.INDEX_GRAY)
      return this.modelEnum.INDEX_RED;
   
   return index;
}

Controller.prototype.upCount = function(index, info) {
   // individual channel
   var value;
   if(info.channel!=this.modelEnum.CHANNEL_GRAY)
      value = model.dataSrc.data[index];

   // gray scale
   else 
      value = parseInt((model.dataSrc.data[index] +
                        model.dataSrc.data[index+1] +
                        model.dataSrc.data[index+2])/3);
               
   info.histogram[value]++;
}

Controller.prototype.findShadow = function(info) {
   for(var m=0; m<this.modelEnum.HISTOGRAM_LENGTH; m++) {
      if(info.histogram[m]>0) {
         info.shadow = m;
         return;
      }
   }
}

Controller.prototype.findHighlight = function(info) {
   for(var m=this.modelEnum.HISTOGRAM_LENGTH-1; m>=0; m--) {
      if(info.histogram[m]>0) {
         info.highlight = m;
         return;
      }
   }
}

Controller.prototype.findStat = function(info) {
   var medianPos = model.imageWidth * model.imageHeight / 2;
   var count = 0;
   
   for(var m=0; m<this.modelEnum.HISTOGRAM_LENGTH; m++) {
      
      // median
      count += info.histogram[m];
      if(count>medianPos)
         info.median = m;
      
      // mode, max
      if(info.histogram[m]>info.max) {
         info.mode = m;
         info.max = info.histogram[m];
      }
   }
}
