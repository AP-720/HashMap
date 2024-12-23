import { HashMap } from "./hashmap.js";

const test = new HashMap(0.75, 2);

test.set("apple", "red");
test.set("pear", "yellow");


console.log(test.get('banana'));

// console.table(test.buckets);
