/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var modelEnum;
var ModelEnum = function() {
   this.init();
   return (modelEnum)?modelEnum:modelEnum=this;
}

ModelEnum.prototype.init = function() {
   this.STATE_INIT = "init";
   this.STATE_IMAGE_SOURCE = "imageSource";
   this.STATE_IMAGE_MODIFIED = "imageModified";
   this.STATE_HISTOGRAM = "histogram";
   this.STATE_CUMULATIVE = "cumulative";
   
   this.SRC = "source";
   this.DES = "destination";
}