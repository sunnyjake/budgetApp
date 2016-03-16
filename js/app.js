$(document).ready(function () {
    $("#showHide").click(function () {
        $(".table_row").slideToggle("slow");
        $(this).toggleClass("hide_button");
    });
});

/*to add new budget item to the table*/
function insertBudgetItem(amount_value, description_value) {
    var table = document.getElementById("table");
    var row = document.createElement("div");
    row.className = "table_row clearfix";
    if (amount_value > 0) {
        row.style.background = "#c1e2b3";
    } else {
        row.style.background = "#e4b9b9";
    }
    table.appendChild(row);

    var amount = document.createElement("div");
    amount.className = "value text-center";
    amount.innerHTML = amount_value;
    if (description_value === "Total") {
        row.style.background = "#fff";
    }
    row.appendChild(amount);

    var description = document.createElement("div");
    description.className = "description";
    description.innerHTML = description_value;
    row.appendChild(description);
    /*do not add delete icon to the sum field*/
    if (description_value === "Sum up(" + new Date().toLocaleDateString() + ")") {
        return;
    }
    var delete_button = document.createElement("div");
    delete_button.className = "delete";
    row.appendChild(delete_button);
}
/*if add button is clicked this fun will invoke insertBudgetItem() and add new item*/
document.getElementById("add_item").addEventListener("click", function () {
    checkTable();
    if (!document.getElementById("amount").value) {//if amount field is empty
        return;
    }
    var amount = document.getElementById("amount").value;
    var description = document.getElementById("source").value;
    insertBudgetItem(amount, description);
    /*if "Total" field is in the table - remove it when adding new items after pressing Sum Up button*/
    var table = document.getElementById("table");
    if (table.children[2].children[1].innerHTML === "Total") {
        table.removeChild(table.children[2]);
    }
    document.getElementById("source").value = "";
    document.getElementById("sum_up").disabled = false;
    /*this will monitor every delete icon and delete row when pressed*/
    var del_icons = document.getElementsByClassName("delete");
    for (var i = 0; i < del_icons.length; i++) {
        del_icons[i].addEventListener("click", function () {
            this.parentNode.parentNode.removeChild(this.parentNode);
        });
    }
});

/*filter all the items which sum is more than user's entered value*/
document.getElementById("filter").addEventListener("keyup", function () {
    var values = document.getElementsByClassName("value");
    var pattern = document.getElementById("filter").value;
    var rowsLength = document.getElementsByClassName("table_row").length;
    var finded = [];
    if (isNaN(+pattern)) {
        this.style.borderColor = "red";
        document.getElementById("error").style.display = "block";
    } else {
        this.style.borderColor = "lightgray";
        document.getElementById("error").style.display = "none";
    }
    for (var i = 0; i < values.length; i++) {
        if (Math.abs(Number(values[i].innerHTML)) > +pattern) {
            finded.push(i);
        }
    }
    if (finded.length === 0) {
        for (i = 0; i < values.length; i++) {
            values[i].parentNode.style.display = "block";
        }
    }
    for (var j = 0; j < rowsLength; j++) {
        for (var k = 0; k < finded.length; k++) {
            if (j === finded[k]) {
                values[j].parentNode.style.display = "block";
                break;
            } else {
                values[j].parentNode.style.display = "none";
            }
        }
    }
});
/*Search by description*/
document.getElementById("search_field").addEventListener("keyup", function () {
    var descriptions = document.getElementsByClassName("description");
    var pattern = document.getElementById("search_field").value;
    var rowsLength = document.getElementsByClassName("table_row").length;
    var finded = [];
    for (var i = 0; i < descriptions.length; i++) {
        if (descriptions[i].innerHTML.indexOf(pattern) !== -1) {
            finded.push(i);
        }
    }
    if (finded.length === 0) {
        for (i = 0; i < descriptions.length; i++) {
            descriptions[i].parentNode.style.display = "none";
        }
    }
    for (var j = 0; j < rowsLength; j++) {
        for (var k = 0; k < finded.length; k++) {
            if (j === finded[k]) {
                descriptions[j].parentNode.style.display = "block";
                break;
            } else {
                descriptions[j].parentNode.style.display = "none";
            }
        }
    }
});
/*Summ all the items*/
function sumAll() {
    var table = document.getElementById("table");
    var rows = document.getElementsByClassName("table_row");
    var items = document.getElementsByClassName("value");
    var rowsLength = document.getElementsByClassName("table_row").length;
    var sum = 0;
    for (var i = 0; i < items.length; i++) {
        sum += Number(items[i].innerHTML);
    }
    for (var j = 0; j < rowsLength; j++) {
        table.removeChild(rows[0]);
    }
    insertBudgetItem(sum, "Sum up(" + new Date().toLocaleDateString() + ")");
    insertBudgetItem(sum, "Total");
}
document.getElementById("sum_up").addEventListener("click", function () {
    checkTable();
    sumAll();
    this.disabled = true;
});

/*Check if the table is visible*/
function checkTable() {
    if (document.getElementsByClassName("hide_button")[0]) {
        document.getElementsByClassName("hide_button")[0].className = "show_hide show_button";
        var rows = document.getElementsByClassName("table_row");
        for (var i = 0; i < rows.length; i++) {
            rows[i].style.display = "block";
        }
    }
}
