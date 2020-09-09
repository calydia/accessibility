(function ($, Drupal) {
  function setColorMode(colorMode = "dark", remove = "light") {
    let select = $("#color-mode");
    $("#color-mode option[value='" + colorMode + "']").attr("selected", true);
    $("#color-mode option[value='" + remove + "']").attr("selected", false);
    $("body").addClass(colorMode);
    $("body").removeClass(remove);
    sessionStorage.mode = colorMode;
    sessionStorage.remove = remove;
  }

  Drupal.behaviors.accessibility = {
    attach: function (context, settings) {
      var skip = $(".skip-link"),
        $target = $("#main-content"),
        darkMode = $("#setting-dark"),
        lightMode = $("#setting-light"),
        menuToggle = $(".mobile-menu-toggle");

      skip.click(function (event) {
        event.preventDefault();
        $("html, body").animate(
          { scrollTop: $target.offset().top },
          1000,
          function () {
            location.hash = $target;
            $target.focus();
            if ($target.is(":focus")) {
              return !1;
            } else {
              $target.attr("tabindex", "-1");
              $target.focus();
            }
          }
        );
      });

      menuToggle.click(function (event) {
        event.preventDefault();
        $(this).toggleClass("menu-open");
        $(this).siblings().toggleClass("show");
      });

      $("nav#main-menu").accessibleMegaMenu({
        /* prefix for generated unique id attributes, which are required
           to indicate aria-owns, aria-controls and aria-labelledby */
        uuidPrefix: "accessible-megamenu",

        /* css class used to define the megamenu styling */
        menuClass: "nav-menu",

        /* css class for a top-level navigation item in the megamenu */
        topNavItemClass: "nav-item",

        /* css class for a megamenu panel */
        panelClass: "sub-nav",

        /* css class for a group of items within a megamenu panel */
        panelGroupClass: "sub-nav-group",

        /* css class for the hover state */
        hoverClass: "hover",

        /* css class for the focus state */
        focusClass: "focus",

        /* css class for the open state */
        openClass: "open",
      });

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
