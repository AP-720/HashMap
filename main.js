import { HashMap } from "./hashmap.js";

const test = new HashMap(0.75, 2);

test.set("apple", "red");
test.set("pear", "yellow");

console.table(test.buckets);
