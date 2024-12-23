import { HashMap } from "./hashmap.js";

const test = new HashMap(0.75, 16);

test.set("apple", "red");
test.set("key69", "green");
test.set("pear", "yellow");

// console.log(test.has('null'));


console.table(test.buckets);
