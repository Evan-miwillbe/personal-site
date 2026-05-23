/**
 * WIP self-marker — 仅作者本人通过 DevTools / URL 参数可见
 * ----------------------------------------------------------
 * 用法：
 *   1) 把要标记的元素加上 data-wip="slug · 一句话说明"
 *   2) 页面加载后控制台会折叠列出所有 WIP（外人不会打开控制台）
 *   3) 访问 ?wip=1 → 视觉化高亮（红色虚线 + 标签贴片）
 *   4) 在 console 里跑 wip.show() / wip.hide() 也可临时切换
 *
 * 外人看页面：完全无感
 * 自己回来 audit：F12 一眼能看到清单
 */
(function(){
  if (typeof window === 'undefined') return;

  function init(){
    var nodes = document.querySelectorAll('[data-wip]');
    var list = [];
    nodes.forEach(function(el, i){
      list.push({ idx: i+1, slug: el.dataset.wip, el: el });
    });

    if (list.length > 0) {
      try {
        console.groupCollapsed(
          '%c📌 WIP · 待补素材清单 (' + list.length + ')',
          'color:#7F2020;font-weight:600;font-family:JetBrains Mono,monospace'
        );
        list.forEach(function(item){
          console.log(
            '%c ' + item.idx + '. ' + item.slug,
            'color:#869B7E;font-family:JetBrains Mono,monospace',
            item.el
          );
        });
        console.log(
          '%c💡 在 URL 末尾加 ?wip=1 可视觉化高亮；或在 console 跑 wip.show()',
          'color:#a39d8e;font-size:11px;font-family:JetBrains Mono,monospace'
        );
        console.groupEnd();
      } catch(e) {}
    }

    function injectStyle(){
      if (document.getElementById('wip-marker-style')) return;
      var s = document.createElement('style');
      s.id = 'wip-marker-style';
      s.textContent = '[data-wip]{outline:2px dashed #7F2020!important;outline-offset:6px;position:relative!important}'
        + '[data-wip]::after{content:"WIP · "attr(data-wip);position:absolute;top:-24px;right:0;font-family:JetBrains Mono,monospace;font-size:10px;color:#fff;background:#7F2020;padding:3px 8px;border-radius:4px;letter-spacing:.06em;z-index:9999;white-space:nowrap;pointer-events:none}';
      document.head.appendChild(s);
    }
    function removeStyle(){
      var s = document.getElementById('wip-marker-style');
      if (s) s.remove();
    }

    window.wip = {
      list: list,
      show: injectStyle,
      hide: removeStyle,
      toggle: function(){
        if (document.getElementById('wip-marker-style')) removeStyle();
        else injectStyle();
      }
    };

    if (/[?&]wip(=1)?(&|$)/.test(location.search) || location.hash === '#wip') {
      injectStyle();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
