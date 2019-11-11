annotator_list = ["mjasim", "pkhaloo", "tmotahar", "nazaninjafary", "alyxanderbur", "cbasiliere", "sominwadhwa", "yueyingliu", "ton", "nmahyar", "asarv"]

$("#go_button").click(function () {
    localStorage.clear()
    var annotator = $("#login").val()
    for (i = 0; i < annotator_list.length; i++) {
        if (annotator == annotator_list[i]) {
            localStorage.setItem("annotator", annotator)
            window.open('spotter.html', '_self')
        }
    }

    if (localStorage.getItem("annotator") === null)
        alert('Username not found. Try again.')
});

$('#login').keypress(function (e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        $('#go_button').click();
        return false;
    }
});