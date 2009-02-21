package com {
	import flash.display.Bitmap;
	
	public class HighlighBitmap extends Bitmap {
		
		protected var clrOn:uint;
		protected var clrOff:uint;
		
		public function HighlighBitmap()void {
			
		}
		public function set colorOn(clr:uint):void {
			clrOn = clr;			
		}
		
		public function set colorOff(clr:uint):void {
			clrOff = clr;
		}
	}
}