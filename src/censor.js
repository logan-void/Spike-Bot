// censor function

export const swearwords = ["shit", "fuck", "damn", "fucking", "testcensor"]; // sorry for the obscene code (:

export function censor(string) { // unused, but can at some point be used to censor strings
    var newString = string;
    for (let word in swearwords) {
        console.log(swearwords[word])
        newString = string.replaceAll(swearwords[word], '{censored}');
    }
    return newString;
}
