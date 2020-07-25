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
        lightMode = $("#setting-light");

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

      $(document).ready(function () {
        new Mmenu(
          "#main-menu",
          {
            keyboardNavigation: {
              enable: true,
              enhance: true,
            },
            extensions: ["multiline"],
          },
          {}
        );

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
          console.log(sessionStorage.viewed);
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
