const hbs = require("hbs");

// CUSTOM HELPERS

// function below: add the ternary operator functionnality to .hbs files
// usage : {{ternary true "yay" "nay "}} => prints yay
// usage : {{ternary NaN "yay" "nay "}} => prints nay
hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<"}}
awesome, 1 is less thant 10 !!!
{{/compare}}

*/

hbs.registerHelper("compare", function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
        "==": function (l, r) {
            return l == r;
        },
        "===": function (l, r) {
            return l === r;
        },
        "!=": function (l, r) {
            return l != r;
        },
        "<": function (l, r) {
            return l < r;
        },
        ">": function (l, r) {
            return l > r;
        },
        "<=": function (l, r) {
            return l <= r;
        },
        ">=": function (l, r) {
            return l >= r;
        },
        typeof: function (l, r) {
            return typeof l == r;
        }
    };

    if (!operators[operator])
        throw new Error(
            "Handlerbars Helper 'compare' doesn't know the operator " + operator
        );

    var result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// ex usage : {{setCheckedbox "user" user.role }}
hbs.registerHelper("setCheckedbox", function (checkboxValue, searchedValue) {
    return checkboxValue.toString() === searchedValue.toString() ? "checked" : "";
});

// ex usage : {{setSelected this._id ../product.category}}
hbs.registerHelper("setSelected", function (optionValue, searchedValue) {
    return optionValue.toString() === searchedValue.toString() ? "selected" : "";
});

/**
 * fonction ci-dessous permet de formater les dates mongo en date lisible par l'utilisateur
 */
// hbs.registerHelper("format-date", function(rule) {
// if (!rule) rule = "YYYY-MM-DD";
// return moment(date).format(rule);
// });