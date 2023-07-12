var sidebar_element = document.getElementById("sidebar");

sidebar_element.addEventListener('mouseover', show_sidebar);
sidebar_element.addEventListener('mouseout', hide_sidebar);

function fix_sidebar() {
    if (sidebar_element.classList.contains("sidebar-smooth")) {
        sidebar_element.classList.remove("sidebar-smooth");
        sidebar_element.classList.add("sidebar-fixed");
        show_sidebar();
        sidebar_element.removeEventListener('mouseout', hide_sidebar);
        sidebar_element.removeEventListener('mouseover', show_sidebar);

    } else {
        sidebar_element.classList.remove("sidebar-fixed");
        sidebar_element.classList.add("sidebar-smooth");
        hide_sidebar();
        sidebar_element.addEventListener('mouseout', hide_sidebar);
        sidebar_element.addEventListener('mouseover', show_sidebar);
    }

}

function show_sidebar() {
    var sidebarss = document.getElementsByClassName('sidebar-summary');
    for (var i = 0; i < sidebarss.length; i++) {
        sidebarss[i].classList.add('show');
    }
}

function hide_sidebar() {
    var sidebarss = document.getElementsByClassName('sidebar-summary');
    for (var i = 0; i < sidebarss.length; i++) {
        sidebarss[i].classList.remove('show');
    }
}