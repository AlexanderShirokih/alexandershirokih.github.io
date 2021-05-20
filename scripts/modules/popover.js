import { wiki } from "./static-content.js";

/**
 * Simulates fetching info in remote knoweledge database
 * @param {String} key the key to search info
 */
function searchInfo(key) {
  return new Promise((resolve, _) => resolve(wiki[key]));
}

/**
 * Creates popover that is shows when mouse is hover on the element with certain id.
 * @param {JQuery<HTMLElement>} element the element to assign the popover
 */
function createSmartPopover(element) {
  const key = element.text();
  const id = "__current_popover_hint__";

  // Show popup on mouse enter event
  element.on("mouseenter", () => {
    searchInfo(key).then((content) => {
      if (content != null) {
        const position = element.offset();

        $("#" + id).remove();

        $("body").append(
          $("<div/>", {
            id: id,
            class: "popover",
            text: content,
          })
            .css("top", position.top)
            .css("left", position.left + element.width())
        );
      }
    });
  });

  // Remove the popup on mouse leave event
  element.on("mouseleave", () => {
    const popover = $("#" + id);

    // Check that popup already exists
    if (popover.length) {
      popover.delay(2000).queue(function () {
        $(this).remove();
      });
    }
  });
}

export { createSmartPopover };
