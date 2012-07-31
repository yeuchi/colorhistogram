/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Controller = function() {
   
}

Controller.prototype.init = function() {
   
}

Controller.prototype.buildHistogram = function() {
   model.initHistogram();
   
   for (var y=0; y<model.imageHeight; y++) {
		var i = y*model.imageWidth*4;			
		for(var x=0; x<model.imageWidth; x++) {
         model.histogramR[model.dataSrc.data[i]];        // R
         model.histogramG[model.dataSrc.data[++i]];		// G
         model.histogramB[model.dataSrc.data[++i]];		// B
         model.histogramA[model.dataSrc.data[++i]];		// A
      }
   }
}
