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
CurvePath._point=function(a,t){
 if(a[0]==CurvePath.CLOSE){
  return [0,0]
 } else if(a[0]==CurvePath.LINE){
  return [
   a[1]+(a[3]-a[1])*t,
   a[2]+(a[4]-a[2])*t
  ]
 } else {
  throw new Error("not yet implemented")
 }
}
CurvePath.prototype._start=function(){
 for(var i=0;i<this.segments.length;i++){
  var s=this.segments[i]
  if(s[0]!=CurvePath.CLOSE)return CurvePath._startPoint(s)  
 }
 return [0,0]
}
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
CurvePath.prototype.getPoints=function(numPoints){
 if(numPoints<1)return []
 if(numPoints==1){
  return [this._start()]
 }
 if(numPoints==2){
  return [this._start(),this._end()]
 }
 var steps=numPoints-1
 var lengths=[]
 var totalLength=0
 var curLength=0
 for(var i=0;i<this.segments.length;i++){
  var s=this.segments[i]
  var len=CurvePath._length(s)
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
  if(s[0]!=CurvePath.CLOSE && segLength>0){
   var endLen=curLength+segLength;
   while(endLen>=nextStep && count<numPoints-1){
    var t=(segLength-(endLen-nextStep))/segLength
    ret.push(CurvePath._point(s,t));
    count++
    nextStep+=stepLength
    if(count>=numPoints-1)
     break;
   }
  }
  curLength+=lengths[i]
 }
 while(ret.length<numPoints-1){
  ret.push(ret[ret.length-1])
 }
 ret.push(this._end())
 return ret
}
/**
 * Not documented yet.
 */
CurvePath.prototype.closePath=function(){
 if(this.startPos[0]!=this.endPos[0] ||
   this.startPos[1]!=this.endPos[1]){
  this.lineTo(this.startPos[0],this.startPos[1])
 }
 if(this.segments.length>0){
  this.segments.push([CurvePath.CLOSE])
 }
}
/**
 * Not documented yet.
 * @param {*} x
 * @param {*} y
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
 */
CurvePath.prototype.quadTo=function(x,y,x2,x2){
 this.segments.push([CurvePath.QUAD,
  this.endPos[0],this.endPos[1],x,y,x2,x2])
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
 */
CurvePath.prototype.cubicTo=function(x,y,x2,x2,x3,x3){
 this.segments.push([CurvePath.CUBIC,
  this.endPos[0],this.endPos[1],x,y,x2,x2,x3,x3])
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
