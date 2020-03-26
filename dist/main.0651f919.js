// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $last = $siteList.find(".last");
var x = localStorage.getItem("x"); //x目前还是字符串

var xObject = JSON.parse(x); //字符串=>对象

var hashMap = xObject || [{
  logo: "A",
  url: "https://www.acfun.cn"
}, {
  logo: "B",
  url: "https://www.bilibili.com"
}, {
  logo: "G",
  url: "https://github.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  //简化下边显示的link文本
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "");
};

var render = function render() {
  //渲染hash数组
  $siteList.find("li:not(.last)").remove(); //在渲染之前，把之前的li删掉，避免重复

  hashMap.forEach(function (node, index) {
    var $li = $("<li>    \n        <div class=\"site\">\n        <div class=\"logo\">".concat(node.logo, "</div>\n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n        <div class='close'>              <!--\u6DFB\u52A0\u4E00\u4E2A\u5173\u95ED\u56FE\u6807-->\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-close-red\"></use>\n          </svg>\n        </div>\n        </div>    \n    </li>")).insertBefore($last);
    $li.on("click", function () {
      return window.open(node.url);
    }); //新开一个窗口，用JS代替a标签。因为用a标签，阻止冒泡不好用

    $li.on("click", ".close", function (e) {
      e.stopPropagation(); //阻止冒泡，点击关闭时不跳转页面，不触发爸爸的事件

      hashMap.splice(index, 1);
      render();
      console.log(hashMap);
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("你要添加什么网址？"); //url获取到用户输入的内容
  //点击.addButton，弹出弹框

  if (url.indexOf("http") === -1) {
    //window.prompt("请输入带有http的网址"); 用户体验不好
    url = "https://" + url;
  } //如果用户输入的网址不带http，就自动为用户添加


  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  //监听离开页面的事件
  console.log("离开页面");
  var string = JSON.stringify(hashMap); //localStorage只能存字符串，对象=>字符串

  localStorage.setItem("x", string); //接收key,value的形式，把hashMap存在本地
};

$(document).on("keypress", function (e) {
  var key = e.key; //const key=e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.0651f919.js.map