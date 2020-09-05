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

  function toggleSubMenuClass(button, parent, toState) {
    if (!toState) {
      button.classList.add("menu-open");
      parent.classList.add("menu-open");
    } else {
      button.classList.remove("menu-open");
      parent.classList.remove("menu-open");
    }
  }

  /**
   * Add necessary event listeners and create aria attributes
   * @param {element} el - List item element that has a submenu.
   */
  function initSubmenu(el) {
    const button = el.querySelector(".menu__link--button"),
      parent = button.parentElement;
    button.setAttribute("aria-controls", button.dataset.ariacontrols);
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", (e) =>
      toggleSubmenu(e.currentTarget, !getButtonState(e.currentTarget))
    );
    button.addEventListener("click", (e) =>
      toggleSubMenuClass(button, parent, !getButtonState(e.currentTarget))
    );
  }

  /**
   * Toggles the aria-expanded attribute of a given button to a desired state.
   * @param {element} button - Button element that should be toggled.
   * @param {boolean} toState - State indicating the end result toggle operation.
   */
  function toggleSubmenu(button, toState) {
    button.setAttribute("aria-expanded", toState);
  }

  /**
   * Get the current aria-expanded state of a given button.
   * @param {element} button - Button element to return state of.
   */
  function getButtonState(button) {
    return button.getAttribute("aria-expanded") === "true";
  }

  Drupal.behaviors.submenu = {
    attach(context) {
      context
        .querySelectorAll(".menu__item--has-children")
        .forEach((el) => initSubmenu(el));
    },
  };

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
