/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/* eslint no-sync: "off" */
/* global exports, require */
const path = require("jsdoc/path");
const fs = require("jsdoc/fs");
const helper = require("jsdoc/util/templateHelper");
const markdown = require("jsdoc/util/markdown");
// TODO: Document module filename for "Global" members

function normalizeLines(x) {
  if(!x)return x;
  x = x.replace(/[ \t]+(?=[\r\n]|$)/g, "");
  x = x.replace(/\r*\n(\r*\n)+/g, "\n\n");
  x = x.replace(/\r*\n/g, "\n");
  x = x.replace(/^\s*/g, "");
  x = x.replace(/\s+$/g, "");
  return x + "\n";
}

function writeFileIfNeeded(filename, str, enc) {
  let oldstr = null;
  try {
    oldstr = fs.readFileSync(filename, enc);
  } catch(ex) {
    oldstr = null;
  }
  if(oldstr !== str) {
    fs.writeFileSync(filename, str, enc);
  }
}

function resolveLinks(x) {
  let ret = helper.resolveLinks(x);
  ret = ret.replace(/href\s*=\s*\"([^\"\n>\#]+?)\.\w+(\"|\#)/, function(a, b, c) {
    return "href=\"" + b + helper.fileExtension + c;
  });
  ret = ret.replace(/href\s*=\s*\'([^\'\n>\#]+?)\.\w+(\'|\#)/, function(a, b, c) {
    return "href='" + b + helper.fileExtension + c;
  });
  return ret;
}

/** @ignore */
function TextWriter() {
  this.html = false;
}
/** @ignore */
TextWriter.prototype.normtags = function(x) {
  // Replace P tags with two line breaks
  x = resolveLinks(x);
  x = x.replace(/<p>/g, "\n\n");
  x = x.replace(/<\/p>/g, "");
  x = x.replace(/\*/g, "\\*");
  x = x.replace(/<pre>\s*([\s\S]+?)<\/pre>/g, function(a, b) {
    let unescaped = b.replace(/\&lt;/g, "<");
    unescaped = unescaped.replace(/\&gt;/g, ">");
    unescaped = unescaped.replace(/\&amp;/g, "&");
    unescaped = unescaped.replace(/\\\*/g, "*");
    return "\n\n    " + unescaped.replace(/\n/g, "\n    ") + "\n\n";
  });
  return x;
};
/** @ignore */
TextWriter.prototype.header = function() {
  return "";
};
/** @ignore */
TextWriter.prototype.footer = function() {
  return "";
};
/** @ignore */
TextWriter.prototype.heading = function(level, x) {
  let ret = "";
  if(level >= 1 && level <= 6) {
    let i;
    for (i = 0; i < level; i++) {
      ret += "#";
    }
    ret += " " + x + "\n\n";
    return ret;
  }
};
/** @ignore */
TextWriter.prototype.bold = function(x) {
  if(x.indexOf("<") < 0 && x.indexOf("*") < 0) {
    return "**" + x + "**";
  }
  return "<b>" + x + "</b>";
};
/** @ignore */
TextWriter.prototype.fromMarkdown = function(text) {
  return text;
};
/** @ignore */
TextWriter.prototype.paragraph = function(x) {
  return x + "\n\n";
};
/** @ignore */
TextWriter.prototype.textblock = function(x) {
  return x + "\n\n";
};
/** @ignore */
TextWriter.prototype.breaktext = function(x) {
  return "<br>" + x;
};
/** @ignore */
TextWriter.prototype.anchor = function(x) {
  return "<a name='" + x + "'></a>\n";
};
/** @ignore */
TextWriter.prototype.normspace = function(x) {
  return this.normtags(x.replace(/[ \t]+/g, " "));
};
/** @ignore */
TextWriter.prototype.normspacebreak = function(x) {
  return this.normtags(x.replace(/\s+/g, " "));
};
/** @ignore */
TextWriter.prototype.normexample = function(x) {
  const io = x.indexOf("</caption>");
  if(io >= 0) {
    let xs = x.substr(0, io + 10);
    xs = xs.replace(/<caption>/g, "<p>");
    xs = xs.replace(/<\/caption>/g, "</p>");
    return this.normspace(xs + "<pre>" + x.substr(io + 10) + "</pre>");
  } else {
    return this.normspace("<pre>" + x + "</pre>");
  }
};
/** @ignore */
TextWriter.prototype.jsval = function(x) {
  const str = JSON.stringify(x);
  return helper.htmlsafe("`" + str + "`");
};
/** @ignore */
TextWriter.prototype.jsname = function(x) {
  return helper.htmlsafe("`" + x + "`");
};
/** @ignore */
TextWriter.prototype.listText = function(list) {
  let ret = "";
  list.forEach(function(item) {
    ret += "* " + item + "\n";
  });
  return ret + "\n";
};
/** @ignore */
TextWriter.prototype.linkText = function(url, text) {
  return "[" + text + "](" + url + ")";
};
/** @ignore */
function HtmlWriter() {
  this.html = true;
}
HtmlWriter.prototype = Object.create(TextWriter.prototype);
HtmlWriter.prototype.constructor = HtmlWriter;
/** @ignore */
HtmlWriter.prototype.listText = function(list) {
  let ret = "<ul>";
  list.forEach(function(item) {
    ret += "<li>" + item;
  });
  return ret + "</ul>";
};
/** @ignore */
HtmlWriter.prototype.normtags = function(x) {
  x = resolveLinks(x);
  return x;
};
/** @ignore */
HtmlWriter.prototype.bold = function(x) {
  return "<b>" + x + "</b>";
};
/** @ignore */
HtmlWriter.prototype.header = function(title) {
  return "<!DOCTYPE html><html><head><meta charset=utf-8><title>" + title + "</title></head><body>";
};
/** @ignore */
HtmlWriter.prototype.footer = function() {
  return "</body></html>";
};
/** @ignore */
HtmlWriter.prototype.paragraph = function(x) {
  return "<p>" + x + "</p>";
};
/** @ignore */
HtmlWriter.prototype.breaktext = function(x) {
  return "<br>" + x;
};
/** @ignore */
HtmlWriter.prototype.textblock = function(x) {
  return x;
};
/** @ignore */
HtmlWriter.prototype.linkText = function(url, text) {
  return "<a href='" + url + "'>" + text + "</a>";
};
/** @ignore */
HtmlWriter.prototype.fromMarkdown = function(text) {
  const parser = markdown.getParser();
  if(!parser) {
    return "<pre>" + helper.htmlsafe(text) + "</pre>";
  }
  return parser(text);
};
/** @ignore */
HtmlWriter.prototype.heading = function(level, x) {
  let ret = "";
  if(level >= 1 && level <= 6) {
    ret += "<h" + level + ">";
    ret += " " + x + "</h" + level + ">";
    return ret;
  }
};
/** @ignore */
HtmlWriter.prototype.jsval = function(x) {
  const str = JSON.stringify(x);
  return "<code>" + helper.htmlsafe(str) + "</code>";
};
/** @ignore */
HtmlWriter.prototype.jsname = function(x) {
  return "<code>" + helper.htmlsafe(x) + "</code>";
};
function Doc(name) {
  this.methods = {};
  this.events = {};
  this.members = {};
  this.descriptions = {};
  this.name = name;
  this.getFileName = function(dir) {
    return path.join(dir,
      Doc.typeToName(this.name));
  };
  this.getText = function(docs, writer) {
    let entry = writer.header(helper.htmlsafe(this.name)) +
       this.entry + this.constructorEntry;
    let keys;
    function memToIndex(mem, title, docs) {
      if(Object.keys(mem).length > 0) {
        let indexStr = writer.heading(3, helper.htmlsafe(title));
        const indexList = [];
        Object.keys(mem).sort().forEach(function(name) {
          const val = mem[name];
          let hname = name;
          if(hname.lastIndexOf("#") >= 0)
            hname = hname.substr(hname.lastIndexOf("#") + 1);
          let tname = writer.linkText("#" + val[1], helper.htmlsafe(hname));
          const tdesc = docs.descriptions[val[2]];
          if(tdesc) {
            tname += writer.breaktext(tdesc);
          }
          indexList.push(tname);
        });
        indexStr += writer.listText(indexList);
        return indexStr;
      } else {
        return "";
      }
    }
    entry += memToIndex(this.members, "Members", docs);
    entry += memToIndex(this.events, "Events", docs);
    entry += memToIndex(this.methods, "Methods", docs);
    keys = Object.keys(this.members).sort();
    let i;
    for (i = 0; i < keys.length; i++) {
      entry += this.members[keys[i]][0];
    }
    keys = Object.keys(this.events).sort();
    for (i = 0; i < keys.length; i++) {
      entry += this.events[keys[i]][0];
    }
    keys = Object.keys(this.methods).sort();
    for (i = 0; i < keys.length; i++) {
      entry += this.methods[keys[i]][0];
    }
    entry += writer.paragraph(writer.linkText("index" + helper.fileExtension,
      "Back to documentation index."));
    entry += writer.footer();
    return entry;
  };
  this.constructorEntry = "";
  this.entry = "";
}
/** @ignore */
Doc.typeToName = function(type) {
  return Doc.toHash(type) + helper.fileExtension;
};
/** @ignore */
Doc.toHash = function(type) {
  const t = type.replace(/^module\:/g, "");
  return t.replace(/[^a-zA-Z0-9_\.$\u0080-\uffff]/g, "_");
};
function DocCollection() {
  this.docs = {};
  this.typeNames = {};
  this.tutorials = {"children":[]};
  this.readme = null;
  this.get = function(parent) {
    if(typeof parent === "undefined" || parent === null)throw new Error();
    if(!this.docs[parent]) {
      this.docs[parent] = new Doc(parent);
    }
    return this.docs[parent];
  };
  this.addMethod = function(parent, name, entry, longname) {
    if(typeof parent === "undefined" || parent === null) {
      console.log("tried to add method " + [parent, name, longname]);
      return;
    }
    this.get(parent).methods[name] = [entry, Doc.toHash(longname), longname];
  };
  this.addEvent = function(parent, name, entry, longname) {
    if(typeof parent === "undefined" || parent === null) {
      console.log("tried to add event " + [parent, name, longname]);
      return;
    }
    this.get(parent).events[name] = [entry, Doc.toHash(longname), longname];
  };
  this.addMember = function(parent, name, entry, longname) {
    if(typeof parent === "undefined" || parent === null) {
      console.log("tried to add member " + [parent, name, longname]);
      return false;
    }
    this.get(parent).members[name] = [entry, Doc.toHash(longname), longname];
    return true;
  };
  this.addConstructor = function(parent, entry) {
    this.get(parent).constructorEntry = entry;
  };
  this.addEntry = function(parent, entry) {
    this.get(parent).entry = entry;
  };
  this.tutorialName = function(tut) {
    return helper.tutorialToUrl(tut.name)
      .replace(/\.\w+$/, helper.fileExtension);
  };
  this.write = function(writer, dir) {
    const that = this;
    // Write individual type files
    Object.keys(this.docs).forEach(function(doc) {
      writeFileIfNeeded(that.docs[doc].getFileName(dir),
        normalizeLines(that.docs[doc].getText(that, writer)), "utf8");
    });
    // Write index
    let indexStr = writer.header("Documentation") +
        writer.heading(1, "Documentation Index");
    let indexList = [];
    const tnames = this.typeNames;
    Object.keys(this.docs).sort().forEach(function(name) {
      let tname = name;
      if(tname === "Global") {
        tname = writer.linkText("Global" + helper.fileExtension, "Global Members");
        indexList.push(tname);
      } else if(tnames[tname]) {
        tname = helper.linkto(tname, helper.htmlsafe(tname));
        const tdesc = that.descriptions[name] || "";
        if(tdesc) {
          tname += writer.breaktext(tdesc);
        }
        indexList.push(tname);
      }
    });
    indexStr += writer.listText(indexList);
    // Write tutorial links
    indexList = [];
    if(this.tutorials.children.length > 0) {
      indexStr += writer.heading(2, "Tutorials");
      this.tutorials.children.forEach(function(tut) {
        const tname = writer.linkText(that.tutorialName(tut), helper.htmlsafe(tut.title));
        indexList.push(tname);
      });
      indexStr += writer.listText(indexList);
    }
    // Write ReadMe
    if(this.readme) {
      indexStr += writer.heading(2, "Read Me");
      indexStr += writer.textblock(resolveLinks(this.readme));
    }
    indexStr += writer.footer();
    writeFileIfNeeded(
      path.join(dir, "index" + helper.fileExtension),
      normalizeLines(indexStr), "utf8");
    this.tutorials.children.forEach(function(tut) {
      let content = writer.header(helper.htmlsafe(tut.title)) +
        writer.heading(1, helper.htmlsafe(tut.title));
      const doclink = writer.paragraph(writer.linkText("index" +
      helper.fileExtension, "Back to documentation index."));
      content += doclink;
      content += writer.fromMarkdown(writer.textblock(resolveLinks(tut.content)));
      content += doclink;
      content += writer.footer();
      writeFileIfNeeded(
        path.join(dir, that.tutorialName(tut)),
        normalizeLines(content), "utf8");
    });
  };
}

function typeval(x) {
  if(!x.names) {
    return "????";
  }
  let xnames = x.names;
  if(x.names.length === 0) {
    xnames = [x.names];
  }
  const xn = [];
  let i;
  for (i = 0; i < xnames.length; i++) {
    let tname = xnames[i];
    tname = helper.linkto(tname, helper.htmlsafe(tname));
    xn.push(tname);
  }
  return xn.join(" | ");
}

function augmentsval(x) {
  const xn = [];
  let i;
  for (i = 0; i < x.length; i++) {
    let tname = x[i];
    tname = helper.linkto(tname, helper.htmlsafe(tname));
    xn.push(tname);
  }
  return xn.join(", ");
}

function typeNames(nodes) {
  const names = {};
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

function descriptions(nodes, writer) {
  const descriptions = {};
  nodes.forEach(function (node) {
    if(node.ignore === true)return;
    if(node.undocumented === true)return;
    if(node.access === "private") {
      return;
    }
    let desc = "";
    if(typeof node.deprecated !== "undefined" && node.deprecated !== null) {
      const dep = node.deprecated === true ? "Yes" : node.deprecated;
      desc = writer.bold("Deprecated: " + writer.normspace(dep));
    } else if(node.kind === "class") {
      desc = writer.normspace(node.classdesc || "") + " ";
      desc += writer.normspace(node.description || "");
      desc = desc.replace(/<(p|br)[^>]*>/g, " ");
      // We only need the first "sentence" of the description
      desc = desc.replace(/\.\s+[\s\S]*$/, ".");
    } else {
      desc = writer.normspace(node.description || "");
      desc = desc.replace(/<(p|br)[^>]*>/g, " ");
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

function fillCollection(docCollection, nodes, parentlong, writer) {
  nodes.forEach(function (node) {
    let i;
    let entry;
    let heading;
    let p;
    if(node.ignore === true)return;
    if(node.undocumented === true)return;
    if(node.access === "private")return;
    if(typeof parentlong === "undefined" || parentlong === null) {
      if(typeof node.memberof !== "undefined" && node.memberof !== null) {
        return;
      }
    } else {
      const memberof = node.memberof;
      if(typeof memberof !== "undefined" && memberof !== null) {
        // Work around issue jsdoc3/jsdoc#924
        if(memberof.replace(/\~/, ".") !==
        parentlong.replace(/\~/, "."))return;
      } else return;

    }
    if (node.kind === "function" || node.kind === "event" || node.kind === "class" || node.kind === "namespace" || node.kind === "module") {
      const paramnames = [];
      if(node.params) {
        const p = node.params;
        for(i = 0; i < p.length; i++) {
          let pname = p[i].name;
          if(p[i].optional) {
            pname = "[" + pname + "]";
          }
          paramnames.push(helper.htmlsafe(pname));
        }
      }
      entry = "";
      let elname = helper.htmlsafe(node.longname);
      if(elname.indexOf("#") >= 0) {
        if(node.name.indexOf("#") >= 0) {
          elname = helper.htmlsafe(node.name);
        }
      }
      if(node.kind === "class" || node.kind === "namespace" || node.kind === "module") {
        entry += writer.heading(1, elname);
        entry += writer.paragraph(writer.linkText("index" + helper.fileExtension,
          "Back to documentation index."));
      }
      const attribs = helper.getAttribs(node);
      const attribstr = attribs && attribs.length > 0 ? "(" + attribs.join(", ") + ") " : "";
      entry += writer.anchor(Doc.toHash(node.longname));
      heading = attribstr;
      if(node.kind === "class") {
        heading += "new ";
      }
      heading += elname;
      if(node.kind !== "namespace") {
        heading += "(" + paramnames.join(", ") + ")";
      }
      if(node.kind === "event") {
        heading += " (event)";
      }
      heading += node.virtual ? " (virtual)" : "";
      entry += writer.heading(3, heading);
      if(node.augments) {
        entry += writer.paragraph(
          writer.bold("Augments:") + " " + augmentsval(node.augments));
      }
      if(typeof node.deprecated !== "undefined" && node.deprecated !== null) {
        const dep = node.deprecated === true ? "Yes" : node.deprecated;
        entry += writer.paragraph(
          writer.bold("Deprecated: " + writer.normspace(dep)));
      }
      if(node.kind === "class") {
        entry += writer.textblock(writer.normspace(node.classdesc || ""));
      }
      entry += writer.textblock(writer.normspace(node.description || ""));
      if(node.fires) {
        entry += writer.paragraph(writer.bold("Fires:") + " " + writer.normspace(node.fires || ""));
      }
      if (node.params && node.params.length > 0) {
        p = node.params;
        entry += writer.heading(4, "Parameters");
        const listItems = [];
        for(i = 0; i < p.length; i++) {
          const pi = p[i];
          let listitem = writer.jsname(pi.name);
          if(pi.type) {
            listitem += " (Type: " + typeval(pi.type) + ")";
          }
          if(pi.optional) {
            listitem += " (optional)";
          }
          if(pi.nullable) {
            listitem += " (nullable)";
          } else if(pi.nullable === false) {
            listitem += " (non-null)";
          }
          if(Object.prototype.hasOwnProperty.call(pi, "defaultvalue")) {
            listitem += " (Default Value: " + writer.jsval(pi.defaultvalue);
            listitem += ")";
          }
          if(pi.description) {
            listitem += writer.breaktext(writer.normspacebreak(pi.description));
          }
          listItems.push(listitem);
        }
        entry += writer.listText(listItems);
      }
      if (node.returns) {
        entry += writer.heading(4, "Return Value");
        const r = node.returns[0];
        let retval = writer.normspace(r.description || "");
        if(r.type) {
          retval += " (Type: " + typeval(r.type) + ")";
        }
        entry += writer.textblock(retval);
      }
      if(node.examples) {
        entry += writer.heading(4, "Examples");
        for(i = 0; i < node.examples.length; i++) {
          entry += writer.textblock(writer.normexample(node.examples[i]));
        }
      }
      if(node.see) {
        entry += writer.heading(4, "See Also");
        for(i = 0; i < node.see.length; i++) {
          entry += writer.textblock(writer.normspace(node.see[i]));
        }
      }
      if(node.kind === "function") {
        docCollection.addMethod(parentlong || "Global", node.name, entry, node.longname);
      } else if(node.kind === "class" || node.kind === "namespace" || node.kind === "module") {
        docCollection.addConstructor(node.longname, entry);
        fillCollection(docCollection, nodes, node.longname, writer);
      } else {
        docCollection.addEvent(parentlong || "Global", node.name, entry, node.longname);
      }
    } else if (node.kind === "member" || node.kind === "constant" ||
        node.kind === "namespace" || node.kind === "mixin") {
      entry = "";
      const safelongname = helper.htmlsafe(node.longname);
      if(node.kind === "namespace" || node.kind === "mixin") {
        entry += writer.heading(1, safelongname);
        entry += writer.paragraph(writer.linkText("index" + helper.fileExtension,
          "Back to documentation index."));
      }
      entry += writer.anchor(Doc.toHash(node.longname));
      heading = safelongname;
      if(node.kind === "constant") {
        heading += " (constant)";
      }
      if(node.kind === "readonly") {
        heading += " (readonly)";
      }
      heading += (node.virtual ? " (virtual)" : "") + "\n\n";
      entry += writer.heading(3, heading);
      if(typeof node.deprecated !== "undefined" && node.deprecated !== null) {
        if(node.deprecated === true) {
          entry += writer.paragraph(writer.bold("Deprecated: Yes"));
        } else {
          entry += writer.paragraph(writer.bold("Deprecated: " +
    writer.normspace(node.deprecated || "")));
        }
      }
      entry += writer.normspace(node.description || "") + "\n\n";
      if(typeof node.type !== "undefined" && node.type !== null) {
        entry += writer.paragraph("Type: " + typeval(node.type));
      }
      if(Object.prototype.hasOwnProperty.call(node, "defaultvalue")) {
        entry += writer.paragraph("Default Value: " + writer.jsval(node.defaultvalue));
      }
      if(node.examples) {
        entry += writer.heading(4, "Example");
        for(i = 0; i < node.examples.length; i++) {
          entry += writer.textblock(writer.normexample(node.examples[i]));
        }
      }
      if(node.see) {
        entry += writer.heading(4, "See Also");
        for(i = 0; i < node.see.length; i++) {
          entry += writer.textblock(writer.normspace(node.see[i]));
        }
      }
      if(node.kind === "member" || node.kind === "constant") {
        if(!docCollection.addMember(parentlong || "Global", node.name, entry, node.longname)) {
          // console.log(node);
        }
      } else {
        docCollection.addEntry(node.longname, entry);
        fillCollection(docCollection, nodes, node.longname, writer);
      }
    }
  });
}

function publishFormat(input, o, t, extension) {
  helper.fileExtension = extension;
  const writer = extension === ".html" ? new HtmlWriter() : new TextWriter();
  helper.setTutorials(t);
  const inputget = input().get();
  const docCollection = new DocCollection();
  docCollection.tutorials = t;
  docCollection.readme = o.readme;
  docCollection.typeNames = typeNames(inputget);
  // registerLinks depends on typeNames being filled
  registerLinks(docCollection, inputget);
  // for best results, descriptions depends on registerLinks
  docCollection.descriptions = descriptions(inputget, writer);
  fillCollection(docCollection, inputget, null, writer);
  docCollection.write(writer, path.normalize(o.destination));
}

exports.publish = function(input, o, t) {
  if(typeof o.query !== "undefined" && o.query !== null && (typeof o.query.f !== "undefined" && o.query.f !== null) && o.query.f === "html") {
    publishFormat(input, o, t, ".html");
  } else {
    publishFormat(input, o, t, ".md");
  }
};
