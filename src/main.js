const $siteList = $(".siteList");
const $last = $siteList.find(".last");

const x = localStorage.getItem("x"); //x目前还是字符串
const xObject = JSON.parse(x); //字符串=>对象

const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  {
    logo: "B",
    url: "https://www.bilibili.com"
  },
  { logo: "G", url: "https://github.com" }
];

const simplifyUrl = url => {
  //简化下边显示的link文本
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  //渲染hash数组
  $siteList.find("li:not(.last)").remove(); //在渲染之前，把之前的li删掉，避免重复
  hashMap.forEach((node, index) => {
    const $li = $(`<li>    
        <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class='close'>              <!--添加一个关闭图标-->
          <svg class="icon">
            <use xlink:href="#icon-close-red"></use>
          </svg>
        </div>
        </div>    
    </li>`).insertBefore($last);
    $li.on("click", () => window.open(node.url)); //新开一个窗口，用JS代替a标签。因为用a标签，阻止冒泡不好用
    $li.on("click", ".close", e => {
      e.stopPropagation(); //阻止冒泡，点击关闭时不跳转页面，不触发爸爸的事件
      hashMap.splice(index, 1);
      render();
      console.log(hashMap);
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("你要添加什么网址？"); //url获取到用户输入的内容
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

window.onbeforeunload = () => {
  //监听离开页面的事件
  console.log("离开页面");
  const string = JSON.stringify(hashMap); //localStorage只能存字符串，对象=>字符串
  localStorage.setItem("x", string); //接收key,value的形式，把hashMap存在本地
};

$(document).on("keypress", e => {
  const { key } = e; //const key=e.key;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
