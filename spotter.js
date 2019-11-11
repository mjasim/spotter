raw_data = null;
label_data = null
index = null;
labels = []

function myFunction(){
    if(!localStorage.getItem("annotator"))
        alert('You must login to see this page')
}

d3.json("labels.json", function (data) {
    label_data = JSON.parse(JSON.stringify(data))

    console.log(label_data)

    for (i = 0; i < label_data.length; i++)
        if (label_data[i]["annotator"] == localStorage.getItem("annotator"))
            index = label_data[i]["index"]
});

d3.json("data_envcanada.json", function (data) {
    raw_data = JSON.parse(JSON.stringify(data))
    populate(JSON.parse(JSON.stringify(data)), index)
});

function populate(data, index) {
    // console.log(data)

    titleHTML = '<p><b>' + 'Title: ' + '</b>' + data[index].idea + '</p>'
    contextHTML = '<p><b>' + 'Description: ' + '</b>' + data[index].desctiption + '</p>'
    commentHTML = '<p><b>' + 'Comment ' + String(index + 1) + ' of 1099: ' + '</b>' + data[index].comment + '</p>'

    if (document.getElementById("title_box")) {
        document.getElementById("title_box").innerHTML = titleHTML
        document.getElementById("context_box").innerHTML = contextHTML
        document.getElementById("comment_box").innerHTML = commentHTML
    }

    $('.form-check-input').prop('checked', false);
}

function get_label() {
    if ($("input[id='radio_excited']:checked").val() == "Excited")
        return "Excited"
    else if ($("input[id='radio_happy']:checked").val() == "Happy")
        return "Happy"
    else if ($("input[id='radio_neutral']:checked").val() == "Neutral")
        return "Neutral"
    else if ($("input[id='radio_concerned']:checked").val() == "Concerned")
        return "Concerned"
    else if ($("input[id='radio_angry']:checked").val() == "Angry")
        return "Angry"
}

$("#next_button").click(function () {

    check_radio = $("input:radio[name='optradio']").is(":checked")
    if (check_radio) {

        var label = get_label();
        labels.push(label)
        index = index + 1
        if (index == raw_data.length) {
            // write a thank you note here
            alert("all finished")
        } else {
            populate(JSON.parse(JSON.stringify(raw_data)), index)
        }
    } else {
        alert('You must select a label!')
    }
});

$("#end_button").click(function () {

    console.log("before", JSON.stringify(label_data))
    
    for (i = 0; i < label_data.length; i++){
        if (label_data[i]["annotator"] == localStorage.getItem("annotator")){
            label_data[i]["index"] = index
            label_data[i]["labels"] = label_data[i]["labels"].concat(labels)
        }
    }
        
    var save_data = JSON.stringify(label_data);
    console.log("after", save_data)
    
    request = new XMLHttpRequest();
    console.log(request)
    request.open("POST", "save_file.php");
    request.setRequestHeader("Content-type", "application/json");
    request.send(save_data);

    window.open('session_end.html', '_self')
});