// Side Navigation button
function useNav() {
    if (document.getElementById("sidenav").style.width != "300px") {
        document.getElementById("sidenav").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
    } else {
        document.getElementById("sidenav").style.width = "0px";
        document.getElementById("main").style.marginLeft = "0px";
    }
}

// Normalization
// window.onload = function() {
//     let width = document.getElementById("sidenav").style.width + 145;
//     document.getElementById("search-txt").style.width = 300;
//     alert(document.getElementById("search-txt").style.width)
// }