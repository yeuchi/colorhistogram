// ActionScript file
package com {
	import flash.geom.Point;
	
	// --------------------------------------------------------------------------
	public class HistTable 
	// --------------------------------------------------------------------------
	{
		
		[Bindable] private var table:Array;
		
		// --------------------------------------------------------------------------
		public function HistTable(	startPos:int,
									count:int ):void 
		// --------------------------------------------------------------------------
		{
			init(startPos, count);
		}
		
		// --------------------------------------------------------------------------
		public function init(startPos:int,
							 count:int):void 
		// --------------------------------------------------------------------------
		{
			table = new Array();
			for (var i:int=startPos; i<startPos+count; i++) {
				table.push(new Point(i, 0));
			}
		}
		
		// --------------------------------------------------------------------------
		public function get Table():Array 
		// --------------------------------------------------------------------------
		{
			return table;
		}
		
		// --------------------------------------------------------------------------
		public function setPoint(pt:Point):Boolean 
		// --------------------------------------------------------------------------
		{
			if (( pt.x < Point(table[0]).x) || 
				(pt.x > Point(table[table.length-1]).x))
				return false;
			
			Point(table[pt.x]).y = pt.y;
			return true;
		}
		
		// --------------------------------------------------------------------------
		public function increment (index:int):Boolean 
		// --------------------------------------------------------------------------
		{
			if ((table == null) ||
				(index < Point(table[0]).x)||
				(index > Point(table[table.length-1]).x))
				return false;
				
			Point(table[index]).y ++;
			return true;
		}
		
		// --------------------------------------------------------------------------
		public function decrement (index:int):Boolean 
		// --------------------------------------------------------------------------
		{
			if ((table == null) ||
				(index < Point(table[0]).x)||
				(index > Point(table[table.length-1]).x))
				return false;
				
			Point(table[index]).y --;
			return true;
		}
		
		// --------------------------------------------------------------------------
		public function get StartPos():int 
		// --------------------------------------------------------------------------
		{
			return( table == null )? -1 : int(Point(table[0]).x);
		}
		
		// --------------------------------------------------------------------------
		public function get EndPos():int 
		// --------------------------------------------------------------------------
		{
			return( table == null )? -1 : int(Point(table[table.length-1]).x);
		}
		
		// --------------------------------------------------------------------------
		public function get Sum():Number 
		// --------------------------------------------------------------------------
		{
			if ( table == null )
				return -1;
			
			var sum:Number=0;		
			for ( var i:int=0; i<table.length; i++)
				sum += Point(table[i]).y;
				
			return sum;
		}
		
		// --------------------------------------------------------------------------
		public function get Mode():Point 
		// --------------------------------------------------------------------------
		{
			if(table==null)
				return null;
				
			var mode:int =0;
			var max:Number = 0;
			for (var i:int=0; i<table.length; i++) {
				if ( Point(table[i]).y > max ) {
					mode = i;
					max = Point(table[i]).y;
				}
			}
			var pt:Point = new Point(mode, max);
			return pt;
		}
		
		// --------------------------------------------------------------------------
		public function get Median():int 
		// --------------------------------------------------------------------------
		{
			var sum:Number = this.Sum;
			var count:Number = 0;
			for (var i:int=0; i<table.length; i++) {
				count += Point(table[i]).y;
				if ( count >= sum )
					return i;
			}
			return -1;
		}
		
		// --------------------------------------------------------------------------
		public function get Mean():Number 
		// --------------------------------------------------------------------------
		{
			return (table == null )?-1:( Sum / table.length );
		}
		
		// --------------------------------------------------------------------------
		public function getCount(index:int):Number 
		// --------------------------------------------------------------------------
		{
			try {
				if ( table == null )
					return 0;
				
				return ( Point(table[index]).y );
			}
			catch (e:Error) {}
			return -1;
		}
		
		// --------------------------------------------------------------------------
		public function clear():void 
		// --------------------------------------------------------------------------
		{
			table = null;
		}
		
	}
}