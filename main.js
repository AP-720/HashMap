import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("apple", "green");

console.log(test.buckets[13]);
