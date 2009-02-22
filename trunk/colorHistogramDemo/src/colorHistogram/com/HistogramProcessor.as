// ==================================================================
// Copyright (c) 1998, 1999, 2000 Thai Open Source Software Center Ltd

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// Module:		colorHistogramDemo.as
//
// Description:	demonstrate the color histogram component
//
// Input:		bitmapData
// Output:		bitmapData - color corrected
//
// Author(s):	C.T. Yeung			cty
//
// History:
// 15Jul08		Basic functionality v.5.0						cty
// 24Dec08		Using BitmapData.palette() method instead of
//				walking pixels manually.						cty
// 18Feb09		Bug fix, requantize curve out of bound values 	cty
// ==================================================================
package colorHistogram.com {
	import flash.display.BitmapData;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	// --------------------------------------------------------------------------
	public class HistogramProcessor 
	// --------------------------------------------------------------------------
	{
		
		public const CHANNEL_RANGE:int = 256;
		public const CHANNEL_RGB:int = 0;
		public const CHANNEL_RED:int = 1;
		public const CHANNEL_GRN:int = 2;
		public const CHANNEL_BLU:int = 3;
		public const CHANNEL_ALP:int = 4;
		
		public const COLOR_RGB:uint = 0x888888;
		public const COLOR_RED:uint = 0xFF0000;
		public const COLOR_GRN:uint = 0x00FF00;
		public const COLOR_BLU:uint = 0x0000FF;
		public const COLOR_ALP:uint = 0xFF000000;
			
		protected var lutR:Array;
		protected var lutG:Array;
		protected var lutB:Array;
		protected var lutA:Array;
		
		protected var bmpData:BitmapData;

/////////////////////////////////////////////////////////////////////////////////////////
// construct / Initialization
		
		// ------------------------------------------------------------------------------	
		public function HistogramProcessor():void {
		// ------------------------------------------------------------------------------
			lutR = new Array();
			lutG = new Array();
			lutB = new Array();
			lutA = new Array();
		}
		
		// ------------------------------------------------------------------------------
		private function initLUT():void {
		// ------------------------------------------------------------------------------
			lutR = new Array();
			lutG = new Array();
			lutB = new Array();
			lutA = new Array();
			
			for ( var i:int=0; i<CHANNEL_RANGE; i++ ) {
				lutR.push(i);
				lutG.push(i);
				lutB.push(i);
				lutA.push(i);
			}
		}
		
		// ------------------------------------------------------------------------------
		// do look up table for curve
		public function doLookUp(bmp:BitmapData,	// source bitmap data
								 lut:Array,			// look up table to implement
								 channel:String )	// color channel to affect
								 :BitmapData		// return bitmap data
		// ------------------------------------------------------------------------------ 
	 	{
	 		if ( bmpData != null ) 
				bmpData.dispose();
				
			this.bmpData = bmp.clone();
			switch(channel) {
				case "RGB":
				lutR = lut;
				lutG = lut;
				lutB = lut;
				break;
				
				case "Red":
				lutR = lut;
				break;
				
				case "Green":
				lutG = lut;
				break;
				
				case "Blue":
				lutB = lut;
				break;
				
				case "Alpha":
				lutA = lut;
				break;
			}
			onLookUp(channel);
			return this.bmpData;
	 	}
	 	
		// ------------------------------------------------------------------------------
		// Performs a histogram equalization and or gamma adjustment
		public function process(bmp:BitmapData,		// bitmap data
								black:int,			// new black point
								white:int,			// new white point
								gamma:Number,		// gamma correction
								channel:String)		// color channel to operate
								:BitmapData {		// processed bitmap to return
		// ------------------------------------------------------------------------------	
			initLUT();
			
			if ( bmpData != null )
				bmpData.dispose();
				
			this.bmpData = bmp.clone();
			onEqualize(Number(black), Number(white), channel);
			onGamma(gamma, channel);
			onLookUp(channel);
			return this.bmpData;
		}
		
		// ------------------------------------------------------------------------------------
		// Histogram equalization - left and right outter most point, travel inward and 
		// seek first 3% (?).  Re-interpret that point as boundaries, 0 and 255. 
		// Equalize, or stretch all the points in between to fit. 
		public function onEqualize(	blk:Number,
									wht:Number,
									channel:String):void {
		// ------------------------------------------------------------------------------------	
			if (( blk == 0 ) && ( wht == CHANNEL_RANGE-1 ))
				return;
				
			var offset:int = blk;
			var factor:Number = Number(CHANNEL_RANGE-1)/(wht-blk);
			
			switch(channel) {
				case "RGB":
				lutR = onEqualizeLUT(factor, offset, lutR);
				lutG = onEqualizeLUT(factor, offset, lutG);
				lutB = onEqualizeLUT(factor, offset, lutB);
				break;
				
				case "Red":
				lutR = onEqualizeLUT(factor, offset, lutR);
				break;
				
				case "Green":
				lutG = onEqualizeLUT(factor, offset, lutG);
				break;
				
				case "Blue":
				lutB = onEqualizeLUT(factor, offset, lutB);
				break;
				
				case "Alpha":
				lutA = onEqualizeLUT(factor, offset, lutA);
				break;
			}
		}
		
		
		// ------------------------------------------------------------------------------------
		// Create look up table for histogram equalization
		// Algorithm maybe found in image processing text such as Gonzales or Pratt
		protected function onEqualizeLUT(factor:Number, 
									 	 offset:int,
									 	 lut:Array):Array {
		// ------------------------------------------------------------------------------------		
			for ( var i:int=0; i< CHANNEL_RANGE; i++)
				lut[i] = requant((Number(lut[i]) - Number(offset)) * factor); 
			return lut;
		}

		// ------------------------------------------------------------------------------------
		// Can be accomplished by finding the difference from center
		// and create a inverse curve (smooth) than apply it as a look up table
		// on the image.
		// Instead, I will use a gamma function as I did in C# program for now.
		public function onGamma(dGamma:Number,		// gamma adjustment  
								channel:String)		// color channel to operate on
								:void {
		// ------------------------------------------------------------------------------------	
			var denom:Number = Math.pow(CHANNEL_RANGE-1, dGamma);
			
			switch(channel) {
				case "RGB":
				lutR = onGammaLUT(dGamma, denom, lutR);
				lutG = onGammaLUT(dGamma, denom, lutG);
				lutB = onGammaLUT(dGamma, denom, lutB);
				break;
				
				case "Red":
				lutR = onGammaLUT(dGamma, denom, lutR);
				break;
				
				case "Green":
				lutG = onGammaLUT(dGamma, denom, lutG);
				break;
				
				case "Blue":
				lutB = onGammaLUT(dGamma, denom, lutB);
				break;
				
				case "Alpha":
				lutA = onGammaLUT(dGamma, denom, lutA);
				break;
			}
		}
		
		// ------------------------------------------------------------------------------------	
		// Algorithm maybe found in image processing, Pratt
		protected function onGammaLUT(dGamma:Number,	
									  denom:Number,
									  lut:Array):Array {
		// ------------------------------------------------------------------------------------	
			for ( var i:int=0; i<CHANNEL_RANGE; i++) 
				lut[i] = requant(Math.pow(Number(lut[i]), dGamma)/denom*(CHANNEL_RANGE-1));
			return lut;
		}
		
		// ------------------------------------------------------------------------------------	
		// Run image through look up table
		private function onLookUp(channel:String):void {
		// ------------------------------------------------------------------------------------		
			var pxl:uint;
			var r:uint;
			var g:uint;
			var b:uint;
			var a:uint;
			
			var rtbl:Array = createTable("Red");
			var gtbl:Array = createTable("Green");
			var btbl:Array = createTable("Blue");
			
			switch(channel) {
				case "RGB":
				bmpData.paletteMap(bmpData, new Rectangle(0,0,bmpData.width, bmpData.height), new Point(0,0), rtbl, gtbl, btbl);
				break;
				
				case "Red":
				bmpData.paletteMap(bmpData, new Rectangle(0,0,bmpData.width, bmpData.height), new Point(0,0), rtbl);
				break;
				
				case "Green":
				bmpData.paletteMap(bmpData, new Rectangle(0,0,bmpData.width, bmpData.height), new Point(0,0), null, gtbl);
				break;
				
				case "Blue":
				bmpData.paletteMap(bmpData, new Rectangle(0,0,bmpData.width, bmpData.height), new Point(0,0), null, null, btbl);
				break;
			}
		}
		
		private function createTable(channel:String):Array
		{
			var i:int=0;
			var array:Array = new Array();
			
			switch(channel)
			{
				case "Red":
				for ( i=0; i<256; i++) 
					array.push(requant(lutR[i]) << (8*2));
				break;
				
				case "Green":
				for ( i=0; i<256; i++) 
					array.push(requant(lutG[i]) << 8);
				break;
				
				case "Blue":
				for ( i=0; i<256; i++) 
					array.push(requant(lutB[i]));
				break;
			}	
			
			return array;
		}
		
		// ------------------------------------------------------------------------------------	
		// keep number with 0 to 255 range
		protected function requant(n:Number):Number 
		// ------------------------------------------------------------------------------------	
		{
			return (n<0)?0:(n>(CHANNEL_RANGE-1))?(CHANNEL_RANGE-1):n;
		}
			
	}
}