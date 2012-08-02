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
   this.channelSelected = this.modelEnum.INDEX_GRAY;
}

/************* apply histogram change, shadow, gamma, highlight *************/
Controller.prototype.modifyGamma = function(value) {
   var info = model.getSelectedChannelInfo();
   info.gamma = value; 
   this.applyLUT(info);
}

Controller.prototype.modifyHighlight = function(value) {
   var info = model.getSelectedChannelInfo();
   info.highlight = value;
   this.applyLUT(info);
}

Controller.prototype.modifyShadow = function(value) {
   var info = model.getSelectedChannelInfo();
   info.shadow = value;
   this.applyLUT(info);
}

Controller.prototype.equalize = function() {
   var info = model.getSelectedChannelInfo();
   info.shadow = info.minVar;
   info.highlight = info.maxVar;
   // dare I linearize the image ???
   this.applyLUT(info);
}

Controller.prototype.applyLUT = function(info) {
   var lut = new HistogramLUT(info);
   lut.apply(model.dataSrc, model.dataDes);
   model.changeState(model.state);                                               // post state change for view to consume
}

/************* collect image statistics, info *******************************/
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
   this.findStat(model.listInfo[index]);
   this.findShadow(model.listInfo[index]);
   this.findHighlight(model.listInfo[index]);
 
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
   // for histogram equalization, base of standard deviation.
   // find 3 * varience as shadow.
   var var3 = model.imageHeight()*model.imageWidth() * .001;
   var count = 0;
   for(var m=0; m<this.modelEnum.HISTOGRAM_LENGTH; m++) {
      count += info.histogram[m];
      if(count>var3) {
         info.minVar = m;
         return;
      }
   }
}

Controller.prototype.findHighlight = function(info) {
   // for histogram equalization, base of standard deviation.
   // find 3 * varience as shadow.
   var var3 = model.imageHeight()*model.imageWidth() * .001;
   var count = 0;
   for(var m=this.modelEnum.HISTOGRAM_LENGTH-1; m>=0; m--) {
      count += info.histogram[m];
      if(count>var3) {
         info.maxVar = m;
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
