(function ($, Drupal) {
  function setColorMode(colorMode = "dark", remove = "light") {
    let select = $("#color-mode");
    $("#color-mode option[value='" + colorMode + "']").attr("selected", true);
    $("#color-mode option[value='" + remove + "']").attr("selected", false);
    $("html").addClass(colorMode);
    $("html").removeClass(remove);
    $("body").addClass(colorMode);
    $("body").removeClass(remove);
    sessionStorage.mode = colorMode;
    sessionStorage.remove = remove;
  }

  Drupal.behaviors.accessibility = {
    attach: function (context, settings) {
      var darkMode = $("#setting-dark"),
          lightMode = $("#setting-light");

      // Megamenu
      $(".megamenu").accessibleMegaMenu({
        uuidPrefix: "accessible-megamenu",
        menuClass: "accessible-megamenu",
        topNavItemClass: "accessible-megamenu-top-nav-item",
        panelClass: "accessible-megamenu-panel",
        panelGroupClass: "accessible-megamenu-panel-group",
        hoverClass: "hover",
        focusClass: "focus",
        openClass: "open",
      });

      // All things document ready
      $(document).ready(function () {
        if (!sessionStorage.viewed) {
          var defaultMode = "dark",
            defaultRemove = "light";

          const userPrefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;

          const userPrefersLight =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: light)").matches;

          if (userPrefersDark) {
            setColorMode("dark", "light");
            defaultMode = "dark";
            defaultRemove = "light";
          } else {
            setColorMode("light", "dark");
            defaultMode = "light";
            defaultRemove = "dark";
          }
          sessionStorage.viewed = 1;
          sessionStorage.mode = defaultMode;
          sessionStorage.remove = defaultRemove;
        } else {
          setColorMode(sessionStorage.mode, sessionStorage.remove);
        }

        const searchForm = $('#views-exposed-form-site-search-page-search .form--inline');

        searchForm.attr('role', 'search');

        $("#color-mode")
          .unbind()
          .change(function () {
            var selectedMode = $(this).children("option:selected").val();

            console.log("value changed to" + selectedMode);

            if (selectedMode === "dark") {
              setColorMode("dark", "light");
            } else {
              setColorMode("light", "dark");
            }
          });
      });
    },
  };
})(jQuery, Drupal);
