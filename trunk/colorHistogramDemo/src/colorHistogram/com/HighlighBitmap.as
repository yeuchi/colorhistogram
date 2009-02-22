// ==================================================================
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
//
// Copyright (c) 2009 C.T.Yeung

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
// ==================================================================
package colorHistogram.com {
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