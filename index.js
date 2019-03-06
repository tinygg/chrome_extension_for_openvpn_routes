// chrome extension中不能使用console.log
// 所以，需要通过发送请求给后台脚本的方式来打印日志
//const log = (...args) => chrome.extension.sendRequest({
//  tabId: chrome.devtools.tabId,
//  args,
//});

const log = (...args) => chrome.devtools.inspectedWindow.eval(`
    console.log(...${JSON.stringify(args)});
`);


// 注册回调，每一个http请求响应后，都触发该回调
//chrome.devtools.network.onRequestFinished.addListener(async (...args) => {
//  try {
//    const [{
//      // 请求的类型，查询参数，以及url
//      request: { method, queryString, url },
//
//      // 该方法可用于获取响应体
//      getContent,
//    }] = args;
//
//    log(method, queryString, url);
//
//    // 将callback转为await promise
//    // warn: content在getContent回调函数中，而不是getContent的返回值
//    const content = await new Promise((res, rej) => getContent(res));
//    //log(content);
//  } catch (err) {
//    log(err.stack || err.toString());
//  }
//});

var domains = []
chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
		var url = request.request.url;
		var index1 = url.indexOf('//');
		//log("indexOf // is", index1);
		var index2 = url.indexOf('/', index1+2);
		//log("indexof // = ", index1, "indexOf / = ", index2)
		var domain = url.substring(index1+2, index2);
		var lastIndex = domain.lastIndexOf('.');
		if(!domains.includes(domain)&&lastIndex>=domain.length-5&&domain.length>3)
		{
			domains.push(domain);
			log("route %s %s %s", domain, "255.255.255.255", "net_gateway");
		}
});