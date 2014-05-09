/**
 * Bottom Navigation tabs working for only 3 tabs in the bottom.
 *
 * @param parentId
 * @param links
 * @param activeIndex
 */
function createBottomNavigator(parent, links, activeIndex) {
    parent.addClass("bottom_menu_panel");

    var linksClasses = ["bottom_menu_left_tab", "bottom_menu_mid_tab", "bottom_menu_right_tab"];

    var bottomLinks = '';

    for (var link in links) {

        bottomLinks += '<a' + (links[link]['id'] ? ' id="' + links[link].id + '"' : '') + ' href="' + links[link]["url"] + '" class="bottom_menu_tab ' + linksClasses[link] + (link == activeIndex ? ' bottom_menu_tab_active"><span class="bottom_menu_span_active"></span>' : '">') + links[link]["label"] + '</a>';

        if (link != 2) {
            bottomLinks += '<span class="bottom_menu_tab_sep"></span>';
        }
    }

    bottomLinks += '</div>';

    parent.append(bottomLinks);
}
