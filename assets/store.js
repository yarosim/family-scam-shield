/* Shows Buy direct buttons only when direct_links.json has a non-empty URL. */
(function () {
  var cfgUrl = document.documentElement.getAttribute("data-direct-links") || "direct_links.json";
  function show(productId, url, label) {
    var nodes = document.querySelectorAll('[data-direct-product="' + productId + '"]');
    nodes.forEach(function (el) {
      var a = el.querySelector("a.btn.direct") || el;
      if (a && a.tagName === "A") {
        a.href = url;
        if (label) a.textContent = label;
        a.style.display = "inline-block";
        el.style.display = "";
      } else {
        el.style.display = "";
      }
    });
  }
  fetch(cfgUrl, { credentials: "same-origin" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (cfg) {
      if (!cfg || !cfg.products) return;
      Object.keys(cfg.products).forEach(function (id) {
        var p = cfg.products[id];
        if (p && p.enabled !== false && p.url && String(p.url).trim()) {
          var label = p.button_label || ("Buy direct — $" + p.price_usd);
          show(id, p.url, label);
        }
      });
    })
    .catch(function () { /* keep buttons hidden */ });
})();
