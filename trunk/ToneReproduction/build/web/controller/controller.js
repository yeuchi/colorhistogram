/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Controller = function() {
   this.init();
}

Controller.prototype.init = function() {
   this.modelEnum = new ModelEnum();
}

Controller.prototype.buildHistogram = function() {
   // create a local copy of use global copy in model ?
   model.initHistogram();
   
   for (var y=0; y<model.imageHeight(); y++) {
		var i = y*model.imageWidth()*4;			
		for(var x=0; x<model.imageWidth(); x++) {
         for(var c=0; c<this.modelEnum.NUM_CHANNELS; c++)
            this.upCount(c, model.listInfo[c]);
      }
   }

   // get max and min
   for(var k=0; k<this.modelEnum.NUM_CHANNELS; k++){
      this.findShadow(k, model.listInfo[k]);
      this.findHighlight(k, model.listInfo[k]);
      this.findStat(k, model.listInfo[k]);
   }
   model.changeState(this.modelEnum.STATE_HISTOGRAM); 
}

Controller.prototype.upCount = function(index, info) {
   var value = model.dataSrc.data[index];
   info.histogram[value]++;
}

Controller.prototype.findShadow = function(index, info) {
   for(var m=0; m<this.modelEnum.HISTOGRAM_LENGTH; m++) {
      if(info.histogram[m]>0) {
         info.shadow = m;
         return;
      }
   }
}

Controller.prototype.findHighlight = function(index, info) {
   for(var m=this.modelEnum.HISTOGRAM_LENGTH-1; m>=0; m--) {
      if(info.histogram[m]>0) {
         info.highlight = m;
         return;
      }
   }
}

Controller.prototype.findStat = function(index, info) {
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
