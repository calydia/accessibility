!function(i){function o(e,a){var s=0<arguments.length&&void 0!==e?e:"dark",o=1<arguments.length&&void 0!==a?a:"light";i("#color-mode");i("#color-mode option[value='"+s+"']").attr("selected",!0),i("#color-mode option[value='"+o+"']").attr("selected",!1),i("html").addClass(s),i("html").removeClass(o),i("body").addClass(s),i("body").removeClass(o),sessionStorage.mode=s,sessionStorage.remove=o}Drupal.behaviors.accessibility={attach:function(e,a){i("#setting-dark"),i("#setting-light");i(".megamenu").accessibleMegaMenu({uuidPrefix:"accessible-megamenu",menuClass:"accessible-megamenu",topNavItemClass:"accessible-megamenu-top-nav-item",panelClass:"accessible-megamenu-panel",panelGroupClass:"accessible-megamenu-panel-group",hoverClass:"hover",focusClass:"focus",openClass:"open"}),i(document).ready(function(){var e,a,s;sessionStorage.viewed?o(sessionStorage.mode,sessionStorage.remove):(e="dark",s="light",a=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches,s=a?(o("dark","light"),e="dark","light"):(o("light","dark"),e="light","dark"),sessionStorage.viewed=1,sessionStorage.mode=e,sessionStorage.remove=s),i("#views-exposed-form-site-search-page-search .form--inline").attr("role","search"),i("#color-mode").unbind().change(function(){var e=i(this).children("option:selected").val();console.log("value changed to"+e),"dark"===e?o("dark","light"):o("light","dark")})})}}}(jQuery);