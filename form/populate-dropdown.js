function populate_dropdowns() {
    let selector = $("#names");

    $.getJSON('http://166.70.232.119:7465/get_data', function(data) {
        console.log(data);

        for (let name_dropdown of document.getElementsByClassName("names")) {
            console.log("Populating dropdown " + name_dropdown.id + "....");
            data.everyone.forEach(function(option_value, index) {
                name_dropdown.append(new Option(option_value, option_value));
            });
        }

        console.log("Finished population!");
    });
}

function submit_data() {
    let number_regexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    let whois_user = $("#whois-user").val();
    if (whois_user == "none") { alert("Please fill in your name!"); return; }
    let whois_number = $("#whois-number").val();
    if (whois_number == "none") { alert("Please fill in your number!"); return; }
    if (whois_number.match(number_regexp) == null) { alert("That is not a valid phone number!"); return; }

    let likes = [];
    for (let i = 0; i < 6; i++) {
        likes[i] = $("#like-" + (i+1)).val();
        if (likes[i] == "none") { alert("Please fill in the name in the " + i+1 + "(st/nd/rd/th) dropdown!"); return; }
    }

    console.log(whois_user + ": " + likes);

    console.log("Sending data....");
    $.getJSON('http://166.70.232.119:7465/submit_data/' + encodeURIComponent(whois_user) + '/' + encodeURIComponent("\"" + whois_number + "\"") + '/' + encodeURIComponent(JSON.stringify(likes)), function(data) {
        if (data.status != "ok") { alert("Something went wrong (e.g. the backend did not return ok). Please try again later!"); return; }
    })

    alert("Please press OK to continue to continue to your reward!");
    if (whois_user == "Milo Banks" || whois_user == "Eli Hatton" || whois_user == "Jack Revoy" || whois_user == "Evan Weinstein" || whois_user == "Teo Welton" || whois_user == "Merrick Davidson" || whois_user == "Henry Erickson" || whois_user == "Isaac Granger" || whois_user == "Ainsley Moore" || whois_user == "Dylan Bookhamer" || whois_user == "Abby Downes" || whois_user == "Monica Fernandez-Esquivas" || whois_user == "Gemma Ciriello" || whois_user == "Elli Ramirez" || whois_user == "Adara Shrestha" || whois_user == "James Obermark" || whois_user == "Kaia Brickson") {
        window.location.href = "https://www.youtube.com/watch?v=QtBDL8EiNZo"; // Rick roll!
    } else if (whois_user == "Owen Kiel" || whois_user.includes("Henry") || whois_user.includes("Jack")) {
        window.location.href = "https://www.youtube.com/watch?v=Zj7yLvXRDUg"; // Corperate rewarding employees
    } else {
        alert("I don't know you, so you get the regular person reward.")
        window.location.href = "https://reddit.com/r/dataisbeautiful"
    }
}

populate_dropdowns();

