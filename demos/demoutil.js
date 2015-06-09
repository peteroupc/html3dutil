function formulaEditorHelp(){
alert(""+
"* The operators `+` `-` `*` `/` work as they do in "+
"normal arithmetic.  (The symbol `*` means 'times'.)\n"+
"* You may use `(` and `)` to group operations.\n"+
"* The symbol `^` means 'to the power of' (exponent).\n"+
"* Order of operations is parentheses, exponents, "+
"multiplication and division, addition and subtraction, "+
"with the following notes:\n"+
"  * Exponents are right-associative: "+
"     5^3^2 means 5^(3^2).\n"+
"  * Multiplication and division is left-associative: "+
"     2/3*4 means (2/3)*4, 2*4/3 means (2*4)/3; "+
"     5/4x means (5/4)*x.\n"+
"* The letters `a` to `z`, except `e`, stand for "+
"variables.\n"+
"* You may leave out the `*` if a number or closing "+
"parenthesis is followed by a variable.  Example: "+
"`3x` means `3*x`.\n"+
"* You may use the symbols `pi` and `e`, which stand "+
"for the corresponding constants.\n"+
"* Functions:  You may use the following functions:\n"+
 "  * `sin(angle)` - Sine (angle in radians).\n"+
 "  * `cos(angle)` - Cosine.\n"+
 "  * `tan(angle)` - Tangent.\n"+
 "  * `abs(value)` - Absolute value.\n"+
 "  * `acos(value)` - Inverse cosine.\n"+
 "  * `asin(value)` - Inverse sine.\n"+
 "  * `atan(value)` - Inverse tangent.\n"+
 "  * `sqrt(value)` - Square root.\n"+
 "  * `ln(value)` - Natural logarithm.\n")
}

function addLink(name,func){
 var s=document.createElement("span")
 var ins=document.createElement("span")
 ins.innerHTML=" - "
 var a=document.createElement("a")
 a.href="javascript:void(null)"
 a.onclick=function(){ func() }
 a.innerHTML=name
 s.appendChild(ins)
 s.appendChild(a)
 document.getElementById("links").appendChild(s)
}

function addRange(label,min,max,step,defvalue,func){
 var div=document.createElement("div")
 var lbl=document.createElement("span")
 lbl.innerHTML=label
 var defvaluelbl=document.createElement("span")
 defvaluelbl.innerHTML=defvalue
 var input=document.createElement("input")
 input.setAttribute("type","range")
 input.setAttribute("value",""+defvalue)
 input.setAttribute("min",""+min)
 input.setAttribute("max",""+max)
 input.setAttribute("step",""+step)
 var oldvalue=[defvalue];
 input.addEventListener("input",function(e){
  var val=e.target.value*1.0
  if(oldvalue[0]!=val){
   defvaluelbl.innerHTML=val+""
   if(func)func(val);
   oldvalue[0]=val
  }
 })
 div.appendChild(lbl)
 div.appendChild(input)
 div.appendChild(defvaluelbl)
 return div
}

function setRanges(ranges){
 var settings=document.getElementById("settings")
 settings.innerHTML=""
 for(var i=0;i<ranges.length;i++){
  settings.appendChild(ranges[i]);
 }
}

if(!BSplineCurve.uniform){
BSplineCurve.clamped=function(controlPoints,degree,flags){
 return new BSplineCurve(controlPoints,
   BSplineCurve.clampedKnots(controlPoints.length,degree),flags)
}
BSplineCurve.uniform=function(controlPoints,degree,flags){
 return new BSplineCurve(controlPoints,
   BSplineCurve.uniformKnots(controlPoints.length,degree),flags)
}
BSplineSurface.clamped=function(controlPoints,degreeU,degreeV,flags){
 return new BSplineSurface(controlPoints,
   BSplineCurve.clampedKnots(controlPoints[0].length,degreeU),
   BSplineCurve.clampedKnots(controlPoints.length,degreeV),flags)
}
BSplineSurface.uniform=function(controlPoints,degreeU,degreeV,flags){
 return new BSplineSurface(controlPoints,
   BSplineCurve.uniformKnots(controlPoints[0].length,degreeU),
   BSplineCurve.uniformKnots(controlPoints.length,degreeV),flags)
}
BSplineCurve.uniformKnots=function(controlPoints,degree){
  if(typeof controlPoints=="object")
   controlPoints=controlPoints.length;
  if(controlPoints<degree+1)
   throw new Error("too few control points for degree "+degree+" curve")
  var order=degree+1;
  var ret=[]
  for(var i=0;i<controlPoints+order;i++){
   ret.push(i)
  }
  return ret;
}
BSplineCurve.clampedKnots=function(controlPoints,degree){
  if(typeof controlPoints=="object")
   controlPoints=controlPoints.length;
  if(controlPoints<degree+1)
   throw new Error("too few control points for degree "+degree+" curve")
  var order=degree+1;
  var extras=controlPoints-degree;
  var ret=[];
  for(var i=0;i<order;i++){
   ret.push(0)
  }
  for(var i=0;i<extras;i++){
   ret.push(i+1);
  }
  for(var i=0;i<order;i++){
   ret.push(extras+1);
  }
  return ret;
}
}

function saveString(string,type,filename){
 extension=".txt"
 type=type||"text/plain"
 if(type=="text/plain")extension=".txt"
 else if(type=="application/json")extension=".json"
 else if(type=="model/vnd.collada+xml")extension=".dae"
 else if(type.indexOf("+xml")>=0)extension=".xml"
  var a = document.createElement('a');
  var utf8=new TextEncoder("utf-8").encode(string)
  var blob = new Blob([utf8], {'type': type});
  a.href = window.URL.createObjectURL(blob);
  a.download = filename || "savefile"+extension;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function updateShape(func){
  var settings=document.getElementById("settings-link")
  if(!settings){
    settings=document.getElementById("settings")
    if(settings){
        var div=document.createElement("div")
        var a = document.createElement('a');
        a.href="javascript:void(null)"
        a.id="settings-link"
        a.innerHTML="Save this model (JSON)"
        a.addEventListener("click",function(){
           var json=MeshJSON.toJSON(func(allsettings));
           saveString(json,"application/json","model.json")
        });
        div.appendChild(a)
        settings.appendChild(div)
    }
  }
  shapeGroup.removeShape(shapeGroup.shapes[0]);
  shapeGroup.addShape(scene.makeShape(func(allsettings)).setMaterial(
    new Material().setParams({
     "diffuse":"black",
     "specular":"white",
     "shininess":10
    })))
}

function pushSettings(updateMeshFunc,settings){
 function settingOnChange(name,updateMeshFunc){
   return function(val){
     allsettings[name]=val
     updateShape(updateMeshFunc);
   }
 }
 var ranges=[];
 for(var setting in settings){
  if(settings[setting] && settings[setting].constructor==Array){
   var name=setting
   var label=settings[setting][0]
   var defvalue=settings[setting][1]
   var min=settings[setting][2]
   var max=settings[setting][3]
   var step=settings[setting][4]
   if(typeof allsettings[name]=="undefined"){
    allsettings[name]=defvalue;
   }
   ranges.push(addRange(label,min,max,step,allsettings[name],
     settingOnChange(name,updateMeshFunc)))
  }
 }
 setRanges(ranges);
 updateShape(updateMeshFunc);
};
window.addEventListener("load",function(){
 var a=document.createElement("a")
 a.setAttribute("style","margin-left:2px;margin-top:2px;margin-bottom:2px;position:absolute;left:80%;top:0;"+
   "background-color:white;text-align:center;text-decoration:none;font-weight:bold")
 a.href="javascript:void(null)"
 a.innerHTML="View Source"
 var e=document.createElement("pre")
 e.setAttribute("style","border:2px solid;margin:2px 2px 2px 2px;left:10;padding:2px 2px 2px 2px;"+
  "background:rgba(255,255,255,0.8);left:10%;width:85%;height:80%;overflow:scroll;position:absolute;float:right;top:2em")
 e.innerHTML=document.getElementById("demo").textContent.replace(/</g,"&lt;")
 e.style.display="none"
 document.body.appendChild(a)
 document.body.appendChild(e)
 var viewed=false;
 a.addEventListener("click",function(){
   if(viewed){
    viewed=false;
    a.innerHTML="View Source"
    e.style.display="none"
   } else {
    viewed=true;
    a.innerHTML="Hide Source"
    e.style.display="block"
   }
 })
})

document.write("<script src='../extras/meshjson.js'></script>")
