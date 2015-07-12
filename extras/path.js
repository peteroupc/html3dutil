function CurvePath(){
 this.segments=[]
 this.incomplete=false
 this.startPos=[0,0]
 this.endPos=[0,0]
}
CurvePath.CLOSE=0
CurvePath.LINE=1
CurvePath.QUAD=2
CurvePath.CUBIC=3
CurvePath.ARC=4
/**
* Returns whether the curve path is incomplete
* because of an error in parsing the curve string.
* This flag will be reset if a moveTo command,
* closePath command, or another line segment
* is added to the path.
* @return {boolean} Return value.*/
CurvePath.prototype.isIncomplete=function(){
 return this.incomplete
}
CurvePath._startPoint=function(a){
 if(a[0]==CurvePath.CLOSE){
  return [0,0]
 } else {
  return [a[1],a[2]]
 }
}
CurvePath._endPoint=function(a){
 if(a[0]==CurvePath.CLOSE){
  return [0,0]
 } else {
  return [a[a.length-2],a[a.length-1]]
 }
}
CurvePath._point=function(seg,t){
 if(seg[0]==CurvePath.CLOSE){
  return [0,0]
 } else if(seg[0]==CurvePath.LINE){
  return [
   seg[1]+(seg[3]-seg[1])*t,
   seg[2]+(seg[4]-seg[2])*t
  ]
 } else if(seg[0]==CurvePath.QUAD){
  var mt=1-t;
  var mtsq=mt*mt;
  var mt2=(mt+mt);
  var a,b;
  a=seg[1]*mtsq;
  b=seg[3]*mt2;
  var x=a+t*(b+t*seg[5]);
  a=seg[2]*mtsq;
  b=seg[4]*mt2
  var y=a+t*(b+t*seg[6]);
  return [x,y]
 } else if(seg[0]==CurvePath.CUBIC){
  var a=(seg[3]-seg[1])*3;
  var b=(seg[5]-seg[3])*3-a;
  var c=seg[7]-a-b-seg[1];
  var x=seg[1]+t*(a+t*(b+t*c));
  a=(seg[4]-seg[2])*3;
  b=(seg[6]-seg[4])*3-a;
  c=seg[8]-a-b-seg[2];
  var y=seg[2]+t*(a+t*(b+t*c));
  return [x,y]
 } else {
  throw new Error("not yet implemented")
 }
}

CurvePath._calcCubicLength=function(a1,a2,a3,a4,a5,a6,a7,a8,t1,t2,list,flatness,depth){
 if(depth==null)depth=0
 if(depth>=20 || Math.abs(a1-a3-a3+a5)+Math.abs(a3-a5-a5+a7)+
    Math.abs(a2-a4-a4+a6)+Math.abs(a4-a6-a6+a8)<=flatness){
  var dx=a7-a1
  var dy=a8-a2
  var length=Math.sqrt(dx*dx+dy*dy)
  list.push(t1,t2,length)
 } else {
  var x1=(a1+a3)*0.5
  var x2=(a3+a5)*0.5
  var xc1=(x1+x2)*0.5
  var x3=(a5+a7)*0.5
  var xc2=(x2+x3)*0.5
  var xd=(xc1+xc2)*0.5
  var y1=(a2+a4)*0.5
  var y2=(a4+a6)*0.5
  var yc1=(y1+y2)*0.5
  var y3=(a6+a8)*0.5
  var yc2=(y2+y3)*0.5
  var yd=(yc1+yc2)*0.5
  var tmid=(t1+t2)*0.5
  CurvePath._calcCubicLength(a1,a2,x1,y1,xc1,yc1,xd,yd,t1,tmid,list,flatness,depth+1)
  CurvePath._calcCubicLength(xd,yd,xc2,yc2,x3,y3,a7,a8,tmid,t2,list,flatness,depth+1)
 }
}

CurvePath._calcQuadLength=function(a1,a2,a3,a4,a5,a6,t1,t2,list,flatness,depth){
 if(depth==null)depth=0
 if(depth>=20 || Math.abs(a1-a3-a3+a5)+Math.abs(a2-a4-a4+a6)<=flatness){
  var dx=a5-a1
  var dy=a6-a2
  var length=Math.sqrt(dx*dx+dy*dy)
  list.push(t1,t2,length)
 } else {
  var x1=(a1+a3)*0.5
  var x2=(a3+a5)*0.5
  var xc=(x1+x2)*0.5
  var y1=(a2+a4)*0.5
  var y2=(a4+a6)*0.5
  var yc=(y1+y2)*0.5
  CurvePath._calcQuadLength(a1,a2,x1,y1,xc,yc,t1,tmid,list,flatness,depth+1)
  CurvePath._calcQuadLength(xc,yc,x2,y2,a5,a6,tmid,t2,list,flatness,depth+1)
 }
}
/** @private */
CurvePath.prototype._start=function(){
 for(var i=0;i<this.segments.length;i++){
  var s=this.segments[i]
  if(s[0]!=CurvePath.CLOSE)return CurvePath._startPoint(s)
 }
 return [0,0]
}
/** @private */
CurvePath.prototype._end=function(){
 for(var i=this.segments.length-1;i>=0;i--){
  var s=this.segments[i]
  if(s[0]!=CurvePath.CLOSE)return CurvePath._endPoint(s)
 }
 return [0,0]
}
CurvePath._length=function(a){
 if(a[0]==CurvePath.LINE){
  var dx=a[3]-a[1]
  var dy=a[4]-a[2]
  return Math.sqrt(dx*dx+dy*dy)
 } else if(a[0]==CurvePath.CLOSE){
  return 0
 } else {
  throw new Error("not yet implemented")
 }
}
/**
 * Not documented yet.
 */
CurvePath.prototype.pathLength=function(){
 if(this.segments.length==0)return 0;
 var totalLength=0
 for(var i=0;i<this.segments.length;i++){
  var s=this.segments[i]
  var len=CurvePath._length(s)
  totalLength+=len
 }
 return totalLength;
}
/**
* Gets an array of points evenly spaced across the length
* of the path.
* @param {*} numPoints
* @param {*} flatness
* @return {Array<Array<number>>} Array of points lying on
* the path and evenly spaced across the length of the path,
* starting and ending with the path's endpoints.  Returns
* an empty array if <i>numPoints</i> is less than 1.  Returns
* an array consisting of the start point if <i>numPoints</i>
* is 1.
*/
CurvePath.prototype.getPoints=function(numPoints,flatness){
 if(numPoints<1)return []
 if(numPoints==1){
  return [this._start()]
 }
 if(numPoints==2){
  return [this._start(),this._end()]
 }
 if(flatness==null)flatness=1.0
 var steps=numPoints-1
 var lengths=[]
 var flattenedCurves=[]
 var curFlat=0
 var totalLength=0
 var curLength=0
 for(var i=0;i<this.segments.length;i++){
  var s=this.segments[i]
  var len=0
  if(s[0]==CurvePath.QUAD){
   var flat=[]
   CurvePath._calcQuadLength(s[1],s[2],s[3],s[4],
     s[5],s[6],0.0,1.0,flat,flatness*2)
   for(var j=0;j<flat.length;j+=3){
    len+=flat[j+2]
   }
   flattenedCurves.push(flat)
  } else if(s[0]==CurvePath.CUBIC){
   var flat=[]
   CurvePath._calcCubicLength(s[1],s[2],s[3],s[4],
     s[5],s[6],s[7],s[8],0.0,1.0,flat,flatness*4)
   for(var j=0;j<flat.length;j+=3){
    len+=flat[j+2]
   }
   flattenedCurves.push(flat)
  } else {
   len=CurvePath._length(s)
  }
  lengths.push(len)
  totalLength+=len
 }
 var stepLength=totalLength/(numPoints-1);
 var nextStep=stepLength
 var count=1
 var ret=[this._start()]
 for(var i=0;i<this.segments.length;i++){
  var s=this.segments[i]
  var segLength=lengths[i]
  if(s[0]==CurvePath.QUAD || s[0]==CurvePath.CUBIC){
   var flatCurve=flattenedCurves[curFlat]
   if(segLength>0){
    for(var j=0;j<flatCurve.length;j+=3){
     var flatSegLength=flatCurve[j+2]
     if(flatSegLength>0){
      var endLen=curLength+flatSegLength;
      while(endLen>=nextStep && count<numPoints-1){
       var t=(flatSegLength-(endLen-nextStep))/flatSegLength
       t=flatCurve[j]+(flatCurve[j+1]-flatCurve[j])*t;
       ret.push(CurvePath._point(s,t));
       count++
       nextStep+=stepLength
       if(count>=numPoints-1)
        break;
      }
     }
     curLength+=flatSegLength
    }
   }
   curFlat++;
  } else if(s[0]==CurvePath.LINE && segLength>0){
   var endLen=curLength+segLength;
   while(endLen>=nextStep && count<numPoints-1){
    var t=(segLength-(endLen-nextStep))/segLength
    ret.push(CurvePath._point(s,t));
    count++
    nextStep+=stepLength
    if(count>=numPoints-1)
     break;
   }
   curLength+=segLength
  }
 }
 while(ret.length<numPoints-1){
  ret.push(ret[ret.length-1])
 }
 ret.push(this._end())
 return ret
}
/**
 * Not documented yet.
 * @return {CurvePath} This object.
 */
CurvePath.prototype.closePath=function(){
 if(this.startPos[0]!=this.endPos[0] ||
   this.startPos[1]!=this.endPos[1]){
  this.lineTo(this.startPos[0],this.startPos[1])
 }
 if(this.segments.length>0){
  this.segments.push([CurvePath.CLOSE])
 }
 this.incomplete=false
 return this;
}
/**
 * Not documented yet.
 * @param {*} x
 * @param {*} y
 * @return {CurvePath} This object.
 */
CurvePath.prototype.moveTo=function(x,y){
 this.startPos[0]=x
 this.startPos[1]=y
 this.endPos[0]=x
 this.endPos[1]=y
 this.incomplete=false
 return this
}
/**
 * Not documented yet.
 * @param {*} x
 * @param {*} y
 * @return {CurvePath} This object.
 */
CurvePath.prototype.lineTo=function(x,y){
 this.segments.push([CurvePath.LINE,
  this.endPos[0],this.endPos[1],x,y])
 this.endPos[0]=x
 this.endPos[1]=y
 this.incomplete=false
 return this
}
/**
 * Not documented yet.
 * @param {*} x
 * @param {*} y
 * @param {*} x2
 * @param {*} x2
 * @return {CurvePath} This object.
 */
CurvePath.prototype.quadTo=function(x,y,x2,y2){
 this.segments.push([CurvePath.QUAD,
  this.endPos[0],this.endPos[1],x,y,x2,y2])
 this.endPos[0]=x2
 this.endPos[1]=y2
 this.incomplete=false
 return this
}
/**
 * Not documented yet.
 * @param {*} x
 * @param {*} y
 * @param {*} x2
 * @param {*} x2
 * @param {*} x3
 * @param {*} x3
 * @return {CurvePath} This object.
 */
CurvePath.prototype.cubicTo=function(x,y,x2,y2,x3,y3){
 this.segments.push([CurvePath.CUBIC,
  this.endPos[0],this.endPos[1],x,y,x2,y2,x3,y3])
 this.endPos[0]=x3
 this.endPos[1]=y3
 this.incomplete=false
 return this
}
CurvePath._nextAfterWs=function(str,index){
 while(index[0]<str.length){
  var c=str.charCodeAt(index[0])
  index[0]++
  if(c==0x20 || c==0x0d || c==0x09 || c==0x0a || c==0x0c)
   continue;
  return c
 }
 return -1
}
CurvePath._nextAfterSep=function(str,index){
 var comma=false
 while(index[0]<str.length){
  var c=str.charCodeAt(index[0])
  index[0]++
  if(c==0x20 || c==0x0d || c==0x09 || c==0x0a || c==0x0c)
   continue;
  if(!comma && c==0x2c){
   comma=true
   continue;
  }
  return c
 }
 return -1
}
CurvePath._peekNextNumber=function(str,index){
 var oldindex=index[0]
 var ret=CurvePath._nextNumber(str,index,true)!=null
 index[0]=oldindex
 return ret
}
CurvePath._nextNumber=function(str,index,afterSep){
 var oldindex=index[0]
 var c=(afterSep) ?
   CurvePath._nextAfterSep(str,index) :
   CurvePath._nextAfterWs(str,index)
 var startIndex=index[0]-1
 var dot=false
 var digit=false
 var exponent=false
 var ret;
 if(c==0x2e)dot=true
 else if(c>=0x30 && c<=0x39)digit=true
 else if(c!=0x2d && c!=0x2b){
    index[0]=oldindex
    return null
   }
 while(index[0]<str.length){
  var c=str.charCodeAt(index[0])
  index[0]++
  if(c==0x2e){
   if(dot){
    index[0]=oldindex
    return null
   }
   dot=true
  } else if(c>=0x30 && c<=0x39){
   digit=true
  } else if(c==0x45 || c==0x65){
   if(!digit){
    index[0]=oldindex
    return null
   }
   exponent=true
   break
  } else {
   if(!digit){
    index[0]=oldindex
    return null
   }
   index[0]--
   ret=parseFloat(str.substr(startIndex,index[0]-startIndex))
   if(isNaN(ret)){
    index[0]=oldindex
    return null
   }
   return ret
  }
 }
 if(exponent){
  var c=str.charCodeAt(index[0])
  if(c<0){
    index[0]=oldindex
    return null
   }
  index[0]++
  digit=false
  if(c>=0x30 && c<=0x39)digit=true
  else if(c!=0x2d && c!=0x2b){
    index[0]=oldindex
    return null
   }
  while(index[0]<str.length){
   var c=str.charCodeAt(index[0])
   index[0]++
   if(c>=0x30 && c<=0x39){
    digit=true
   } else {
    if(!digit){
    index[0]=oldindex
    return null
    }
    index[0]--
    ret=parseFloat(str.substr(startIndex,index[0]-startIndex))
    if(isNaN(ret)){
     index[0]=oldindex
     return null
    }
    return ret
   }
  }
 }
 ret=parseFloat(str.substr(startIndex,str.length-startIndex))
 if(isNaN(ret)){
  index[0]=oldindex
  return null
 }
 return ret
}

CurvePath.fromString=function(str){
 var index=[0]
 var started=false
 var ret=new CurvePath()
 var failed=false;
 while(!failed && index[0]<str.length){
  var c=CurvePath._nextAfterWs(str,index)
  if(!started && c!=0x4d && c!=0x6d){
   // not a move-to command when path
   // started
    failed=true;break;
  }
  // NOTE: Doesn't implement SVG2 meaning of Z
  // command yet because it's not yet fully specified
  // TODO: implement arcs
  switch(c){
   case 0x5a:case 0x7a:{ // 'Z', 'z'
    ret.closePath()
    break;
   }
   case 0x4d:case 0x6d:{ // 'M', 'm'
    var sep=false
    while(true){
     var curx=(c==0x6d) ? this.endPos[0] : 0
     var cury=(c==0x6d) ? this.endPos[1] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     var y=CurvePath._nextNumber(str,index,true)
     if(y==null){ failed=true;break; }
     if(sep)ret.lineTo(curx+x,cury+y)
     else ret.moveTo(curx+x,cury+y);
     sep=true;
    }
    started=true
    break;
   }
   case 0x4c:case 0x6c:{ // 'L', 'l'
    var sep=false
    while(true){
     var curx=(c==0x6c) ? this.endPos[0] : 0
     var cury=(c==0x6c) ? this.endPos[1] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     var y=CurvePath._nextNumber(str,index,true)
     if(y==null){ failed=true;break; }
     ret.lineTo(curx+x,cury+y);
     sep=true;
    }
    break;
   }
   case 0x48:case 0x68:{ // 'H', 'h'
    var sep=false
    while(true){
     var curpt=(c==0x68) ? this.endPos[0] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     ret.lineTo(curpt+x,this.endPos[1]);
     sep=true;
    }
    break;
   }
   case 0x56:case 0x76:{ // 'V', 'v'
    var sep=false
    while(true){
     var curpt=(c==0x76) ? this.endPos[1] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     ret.lineTo(this.endPos[0],curpt+x);
     sep=true;
    }
    break;
   }
   case 0x43:case 0x63:{ // 'C', 'c'
    var sep=false
    while(true){
     var curx=(c==0x63) ? this.endPos[0] : 0
     var cury=(c==0x63) ? this.endPos[1] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     var y=CurvePath._nextNumber(str,index,true)
     if(y==null){ failed=true;break; }
     var x2=CurvePath._nextNumber(str,index,true)
     if(x2==null){ failed=true;break; }
     var y2=CurvePath._nextNumber(str,index,true)
     if(y2==null){ failed=true;break; }
     var x3=CurvePath._nextNumber(str,index,true)
     if(x3==null){ failed=true;break; }
     var y3=CurvePath._nextNumber(str,index,true)
     if(y3==null){ failed=true;break; }
     ret.cubicTo(curx+x,cury+y,curx+x2,cury+y2,
       curx+x3,cury+y3);
     sep=true;
    }
    break;
   }
   case 0x51:case 0x71:{ // 'Q', 'q'
    var sep=false
    while(true){
     var curx=(c==0x71) ? this.endPos[0] : 0
     var cury=(c==0x71) ? this.endPos[1] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     var y=CurvePath._nextNumber(str,index,true)
     if(y==null){ failed=true;break; }
     var x2=CurvePath._nextNumber(str,index,true)
     if(x2==null){ failed=true;break; }
     var y2=CurvePath._nextNumber(str,index,true)
     if(y2==null){ failed=true;break; }
     ret.quadTo(curx+x,cury+y,curx+x2,cury+y2);
     sep=true;
    }
    break;
   }
   case 0x53:case 0x73:{ // 'S', 's'
    var sep=false
    while(true){
     var curx=(c==0x73) ? this.endPos[0] : 0
     var cury=(c==0x73) ? this.endPos[1] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     var y=CurvePath._nextNumber(str,index,true)
     if(y==null){ failed=true;break; }
     var x2=CurvePath._nextNumber(str,index,true)
     if(x2==null){ failed=true;break; }
     var y2=CurvePath._nextNumber(str,index,true)
     if(y2==null){ failed=true;break; }
     var xcp=curx
     var ycp=cury
     if(ret.segments.length>0 &&
        ret.segments[ret.segments.length-1][0]==CurvePath.CUBIC){
        xcp=ret.segments[ret.segments.length-1][5]
        ycp=ret.segments[ret.segments.length-1][6]
     }
     ret.cubicTo(2*curx-xcp,2*cury-ycp,x+curx,y+cury,x2+curx,y2+cury);
     sep=true;
    }
    break;
   }
   case 0x54:case 0x74:{ // 'T', 't'
    var sep=false
    while(true){
     var curx=(c==0x74) ? this.endPos[0] : 0
     var cury=(c==0x74) ? this.endPos[1] : 0
     var x=CurvePath._nextNumber(str,index,sep)
     if(x==null){ if(!sep)failed=true;break; }
     var y=CurvePath._nextNumber(str,index,true)
     if(y==null){ failed=true;break; }
     var xcp=curx
     var ycp=cury
     if(ret.segments.length>0 &&
        ret.segments[ret.segments.length-1][0]==CurvePath.QUAD){
        xcp=ret.segments[ret.segments.length-1][3]
        ycp=ret.segments[ret.segments.length-1][4]
     }
     x+=curx
     y+=cury
     ret.quadTo(2*curx-xcp,2*cury-ycp,x+curx,y+cury);
     sep=true;
    }
    break;
   }
   default:
    ret.incomplete=true;
    return ret
  }
 }
 if(failed)ret.incomplete=true
 return ret
}
