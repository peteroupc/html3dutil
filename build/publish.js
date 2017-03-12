/* eslint no-sync: "off" */
/* global env, exports, require */
var path = require("jsdoc/path");
var fs = require("jsdoc/fs");
var helper = require("jsdoc/util/templateHelper");

function normalizeLines(x) {
  if(!x)return x;
  x = x.replace(/[ \t]+(?=[\r\n]|$)/g, "");
  x = x.replace(/\r*\n(\r*\n)+/g, "\n\n");
  x = x.replace(/\r*\n/g, "\n");
  x = x.replace(/^\s*/g, "");
  x = x.replace(/\s+$/g, "");
  return x + "\n";
}

function normtags(x) {
   // Replace P tags with two line breaks
  x = helper.resolveLinks(x);
  x = x.replace(/<p>/g, "\n\n");
  x = x.replace(/<\/p>/g, "");
  x = x.replace(/\*/g, "\\*");
  x = x.replace(/<pre>\s*([\s\S]+?)<\/pre>/g, function(a, b) {
    var unescaped = b.replace(/\&lt;/g, "<");
    unescaped = unescaped.replace(/\&gt;/g, ">");
    unescaped = unescaped.replace(/\&amp;/g, "&");
    unescaped = unescaped.replace(/\\\*/g, "*");
    return "\n\n    " + unescaped.replace(/\n/g, "\n    ") + "\n\n";
  });
  return x;
}
function normspace(x) {
  return normtags(x.replace(/[ \t]+/g, " "));
}
function normspacebreak(x) {
  return normtags(x.replace(/\s+/g, " "));
}
function normexample(x) {
  var io = x.indexOf("</caption>");
  if(io >= 0) {
    var xs = x.substr(0, io + 10);
    xs = xs.replace(/<caption>/g, "<p>");
    xs = xs.replace(/<\/caption>/g, "</p>");
    return normspace(xs + "<pre>" + x.substr(io + 10) + "</pre>");
  } else {
    return normspace("<pre>" + x + "</pre>");
  }
}
function jsval(x) {
  var str = JSON.stringify(x);
  return helper.htmlsafe("`" + str + "`");
}
function jsname(x) {
  return helper.htmlsafe("`" + x + "`");
}

function Doc(name) {
  this.methods = {};
  this.events = {};
  this.members = {};
  this.descriptions = {};
  this.name = name;
  this.getFileName = function() {
    return path.join(Doc.outputDir,
         Doc.typeToName(this.name));
  };
  this.getText = function(docs) {
    var entry = this.entry + this.constructorEntry;
    var keys;
    function memToIndex(mem, title, docs) {
      if(Object.keys(mem).length > 0) {
        var indexStr = "### " + helper.htmlsafe(title) + "\n\n";
        Object.keys(mem).sort().forEach(function(name) {
          var val = mem[name];
          var hname = name;
          if(hname.lastIndexOf("#") >= 0)
            hname = hname.substr(hname.lastIndexOf("#") + 1);
          var tname = "[" + helper.htmlsafe(hname) + "](#" + val[1] + ")";
          var tdesc = docs.descriptions[val[2]];
          if(tdesc) {
            tname += "<br>" + tdesc;
          }
          indexStr += "* " + tname + "\n";
        });
        return indexStr + "\n\n";
      } else {
        return "";
      }
    }
    entry += memToIndex(this.members, "Members", docs);
    entry += memToIndex(this.events, "Events", docs);
    entry += memToIndex(this.methods, "Methods", docs);
    keys = Object.keys(this.members).sort();
    for(var i = 0; i < keys.length; i++) {
      entry += this.members[keys[i]][0];
    }
    keys = Object.keys(this.events).sort();
    for(i = 0; i < keys.length; i++) {
      entry += this.events[keys[i]][0];
    }
    keys = Object.keys(this.methods).sort();
    for(i = 0; i < keys.length; i++) {
      entry += this.methods[keys[i]][0];
    }
    return entry;
  };
  this.constructorEntry = "";
  this.entry = "";
}
Doc.typeToName = function(type) {
  return Doc.toHash(type) + ".md";
};
Doc.toHash = function(type) {
  var t = type.replace(/^module\:/g, "");
  return t.replace(/[^a-zA-Z0-9_\.$\u0080-\uffff]/g, "_");
};
Doc.outputDir = path.normalize(env.opts.destination);
function DocCollection() {
  this.docs = {};
  this.typeNames = {};
  this.tutorials = {"children":[]};
  this.readme = null;
  this.get = function(parent) {
    if(!parent)throw new Error();
    if(!this.docs[parent]) {
      this.docs[parent] = new Doc(parent);
    }
    return this.docs[parent];
  };
  this.addMethod = function(parent, name, entry, longname) {
    if(!parent) {
      console.log("tried to add method " + [parent, name, longname]);
      return;
    }
    this.get(parent).methods[name] = [entry, Doc.toHash(longname), longname];
  };
  this.addEvent = function(parent, name, entry, longname) {
    if(!parent) {
      console.log("tried to add event " + [parent, name, longname]);
      return;
    }
    this.get(parent).events[name] = [entry, Doc.toHash(longname), longname];
  };
  this.addMember = function(parent, name, entry, longname) {
    if(!parent) {
      console.log("tried to add member " + [parent, name, longname]);
      return;
    }
    this.get(parent).members[name] = [entry, Doc.toHash(longname), longname];
  };
  this.addConstructor = function(parent, entry) {
    this.get(parent).constructorEntry = entry;
  };
  this.addEntry = function(parent, entry) {
    this.get(parent).entry = entry;
  };
  this.write = function() {
    var that = this;
     // Write individual type files
    Object.keys(this.docs).forEach(function(doc) {
      fs.writeFileSync(that.docs[doc].getFileName(),
         normalizeLines(that.docs[doc].getText(that)), "utf8");
    });
    // Write index
    var indexStr = "# Documentation Index\n\n";
    Object.keys(this.typeNames).sort().forEach(function(name) {
      var tname = name;
      tname = helper.linkto(tname, helper.htmlsafe(tname));
      var tdesc = that.descriptions[name];
      if(tdesc) {
        tname += "<br>" + tdesc;
      }
      indexStr += "* " + tname + "\n";
    });
    indexStr += "\n";
    // Write tutorial links
    if(this.tutorials.children.length > 0) {
      indexStr += "## Tutorials\n\n";
      this.tutorials.children.forEach(function(tut) {
        var tname = helper.toTutorial(tut.name, helper.htmlsafe(tut.title));
        indexStr += "* " + tname + "\n";
      });
      indexStr += "\n";
    }
    // Write ReadMe
    if(this.readme) {
      indexStr += "## Read Me\n\n";
      indexStr += helper.resolveLinks(this.readme);
      indexStr += "\n\n";
    }
    fs.writeFileSync(
         path.join(Doc.outputDir, "index.md"),
         normalizeLines(indexStr), "utf8");
    this.tutorials.children.forEach(function(tut) {
      var content = "# " + helper.htmlsafe(tut.title) + "\n\n";
      content += "[Back to documentation index.](index.md)\n\n";
      content += tut.content;
      content += "\n\n[Back to documentation index.](index.md)\n\n";
      fs.writeFileSync(
       path.join(Doc.outputDir, helper.tutorialToUrl(tut.name)),
           normalizeLines(helper.resolveLinks(content)), "utf8");
    });
  };
}

function typeval(x) {
  if(!x.names) {
    return "????";
  }
  var xnames = x.names;
  if(x.names.length === 0) {
    xnames = [x.names];
  }
  var xn = [];
  for(var i = 0; i < xnames.length; i++) {
    var tname = xnames[i];
    tname = helper.linkto(tname, helper.htmlsafe(tname));
    xn.push(tname);
  }
  return xn.join(" | ");
}

function augmentsval(x) {
  var xn = [];
  for(var i = 0; i < x.length; i++) {
    var tname = x[i];
    tname = helper.linkto(tname, helper.htmlsafe(tname));
    xn.push(tname);
  }
  return xn.join(", ");
}

function typeNames(nodes) {
  var names = {};
  nodes.forEach(function (node) {
    if(node.ignore === true)return;
    if(node.undocumented === true)return;
    if(node.kind === "constant")return;
    if(node.kind === "package")return;
    if(node.kind === "member")return;
    if(node.access === "private" || node.kind !== "class" && node.memberof) {
      return;
    }
    names[node.longname] = true;
  });
  return names;
}

function descriptions(nodes) {
  var descriptions = {};
  nodes.forEach(function (node) {
    if(node.ignore === true)return;
    if(node.undocumented === true)return;
    if(node.access === "private") {
      return;
    }
    var desc = "";
    if(typeof node.deprecated !== "undefined" && node.deprecated !== null) {
      var dep = node.deprecated === true ? "Yes" : node.deprecated;
      desc = "<b>Deprecated: " + normspace(dep) + "</b>";
    } else if(node.kind === "class") {
      desc = normspace(node.classdesc || "") + " ";
      desc += normspace(node.description || "");
   // We only need the first "sentence" of the description
      desc = desc.replace(/\.\s+[\s\S]*$/, ".");
    } else {
      desc = normspace(node.description || "");
        // We only need the first "sentence" of the description
      desc = desc.replace(/\.\s+[\s\S]*$/, ".");
    }
    desc = desc.replace(/^\s+/, "");
    desc = desc.replace(/\s+$/, "");
    desc = desc.replace(/\s+/, " ");
    if(desc.length > 0) {
      descriptions[node.longname] = desc;
    }
  });
  return descriptions;
}

function registerLinks(docCollection, nodes) {
  nodes.forEach(function(node) {
    if(node.undocumented === true) {
      return;
    }
    if(node.ignore === true) {
      return;
    }
    if(node.access === "private") {
      return;
    }
    if(docCollection.typeNames[node.longname] || !node.memberof) {
      helper.registerLink(node.longname, Doc.typeToName(node.longname));
    } else if(node.memberof) {
      helper.registerLink(node.longname, Doc.typeToName(node.memberof) +
      "#" + Doc.toHash(node.longname));
    }
  });
}

function fillCollection(docCollection, nodes, parentlong) {
  nodes.forEach(function (node) {
    var i;
    var entry;
    if(node.ignore === true)return;
    if(node.undocumented === true)return;
    if(node.access === "private")return;
    // if(parentlong && node.kind=="function")console.log([node.longname,node.memberof,parentlong])
    if(node.memberof !== parentlong)return;
    if (node.kind === "function" || node.kind === "event" || node.kind === "class" || node.kind === "namespace") {
      var paramnames = [];
      if(node.params) {
        var p = node.params;
        for(i = 0; i < p.length; i++) {
          var pname = p[i].name;
          if(p[i].optional) {
            pname = "[" + pname + "]";
          }
          paramnames.push(helper.htmlsafe(pname));
        }
      }
      entry = "";
      var elname = helper.htmlsafe(node.longname);
      if(elname.indexOf("#") >= 0) {
        if(node.name.indexOf("#") >= 0) {
          elname = helper.htmlsafe(node.name);
        }
      }
      if(node.kind === "class" || node.kind === "namespace") {
        entry += "# " + elname + "\n\n";
        entry += "[Back to documentation index.](index.md)\n\n";
      }
      var attribs = helper.getAttribs(node);
      var attribstr = attribs && attribs.length > 0 ? "(" + attribs.join(", ") + ") " : "";
      entry += " <a name='" + Doc.toHash(node.longname) + "'></a>\n";
      entry += "### " + attribstr + elname;
      if(node.kind !== "namespace") {
        entry += "(" + paramnames.join(", ") + ")";
      }
      if(node.kind === "event") {
        entry += " (event)";
      }
      entry += (node.virtual ? " (virtual)" : "") + "\n\n";
      if(node.augments) {
        entry += "**Augments:** " + augmentsval(node.augments) + "\n\n";
      }
      if(typeof node.deprecated !== "undefined" && node.deprecated !== null) {
        var dep = node.deprecated === true ? "Yes" : node.deprecated;
        entry += "<b>Deprecated: " + normspace(dep) + "</b>\n\n";
      }
      if(node.kind === "class") {
        entry += normspace(node.classdesc || "") + "\n\n";
      }
      entry += normspace(node.description || "") + "\n\n";
      if(node.fires) {
        entry += "**Fires:** " + normspace(node.fires || "") + "\n\n";
      }
      if (node.params) {
        p = node.params;
        entry += "#### Parameters\n\n";
        for(i = 0; i < p.length; i++) {
          var pi = p[i];
          entry += "* " + jsname(pi.name);
          if(pi.type) {
            entry += " (Type: " + typeval(pi.type) + ")";
          }
          if(pi.optional) {
            entry += " (optional)";
          }
          if(pi.nullable) {
            entry += " (nullable)";
          } else if(pi.nullable === false) {
            entry += " (non-null)";
          }
          if(Object.prototype.hasOwnProperty.call(pi, "defaultvalue")) {
            entry += " (Default Value: " + jsval(pi.defaultvalue);
            entry += ")";
          }
          if(pi.description) {
            entry += "<br>\n    " + normspacebreak(pi.description);
          }
          entry += "\n";
        }
        entry += "\n\n";
      }
      if (node.returns) {
        entry += "#### Return Value\n\n";
        var r = node.returns[0];
        entry += normspace(r.description || "");
        if(r.type) {
          entry += " (Type: " + typeval(r.type) + ")";
        }
        entry += "\n\n";
      }
      if(node.examples) {
        entry += "#### Example\n\n";
        for(i = 0; i < node.examples.length; i++) {
          entry += normexample(node.examples[i]) + "\n\n";
        }
      }
      if(node.see) {
        entry += "#### See Also\n\n";
        for(i = 0; i < node.see.length; i++) {
          entry += normspace(node.see[i]) + "\n\n";
        }
      }
      if(node.kind === "function") {
        docCollection.addMethod(parentlong, node.name, entry, node.longname);
      } else if(node.kind === "class" || node.kind === "namespace") {
        docCollection.addConstructor(node.longname, entry);
        fillCollection(docCollection, nodes, node.longname);
      } else {
        docCollection.addEvent(parentlong, node.name, entry, node.longname);
      }
    } else if (node.kind === "member" || node.kind === "constant" ||
        node.kind === "namespace" || node.kind === "mixin") {
      entry = "";
      var safelongname = helper.htmlsafe(node.longname);
      if(node.kind === "namespace" || node.kind === "mixin") {
        entry += "# " + safelongname + "\n\n";
        entry += "[Back to documentation index.](index.md)\n\n";
      }
      entry += "<a id='" + Doc.toHash(node.longname) + "'></a>\n";
      entry += "### " + safelongname;
      if(node.kind === "constant") {
        entry += " (constant)";
      }
      if(node.kind === "readonly") {
        entry += " (readonly)";
      }
      entry += (node.virtual ? " (virtual)" : "") + "\n\n";
      if(typeof node.deprecated !== "undefined" && node.deprecated !== null) {
        if(node.deprecated === true) {
          entry += "<b>Deprecated: Yes</b>\n\n";
        } else {
          entry += "<b>Deprecated: " + normspace(node.deprecated || "") + "</b>\n\n";
        }
      }
      entry += normspace(node.description || "") + "\n\n";
      if(typeof node.type !== "undefined" && node.type !== null) {
        entry += "Type: " + typeval(node.type) + "\n\n";
      }
      if(Object.prototype.hasOwnProperty.call(node, "defaultvalue")) {
        entry += "Default Value: " + jsval(node.defaultvalue);
        entry += "\n\n";
      }
      if(node.examples) {
        entry += "#### Example\n\n";
        for(i = 0; i < node.examples.length; i++) {
          entry += normexample(node.examples[i]) + "\n\n";
        }
      }
      if(node.see) {
        entry += "#### See Also\n\n";
        for(i = 0; i < node.see.length; i++) {
          entry += normspace(node.see[i]) + "\n\n";
        }
      }
      if(node.kind === "member" || node.kind === "constant") {
        docCollection.addMember(parentlong, node.name, entry, node.longname);
      } else {
        docCollection.addEntry(node.longname, entry);
        fillCollection(docCollection, nodes, node.longname);
      }
    }
  });
}
exports.publish = function(input, o, t) {
  helper.fileExtension = ".md";
  helper.setTutorials(t);
  var inputget = input().get();
  var docCollection = new DocCollection();
  docCollection.tutorials = t;
  docCollection.readme = o.readme;
  docCollection.typeNames = typeNames(inputget);
  // registerLinks depends on typeNames being filled
  registerLinks(docCollection, inputget);
  // for best results, descriptions depends on registerLinks
  docCollection.descriptions = descriptions(inputget);
  fillCollection(docCollection, inputget);
  docCollection.write();
};
