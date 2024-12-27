import { LinkedList } from "./linkedlist.js";

export class HashMap {
	constructor(loadFactor = 0.75, capacity = 16) {
		this.loadFactor = loadFactor;
		this.capacity = capacity;
		this.buckets = new Array(this.capacity);
		this.size = 0;
	}

	// DJB2 Hash Function
	hash(key) {
		let hash = 5381; // A starting 'magic number'
		for (let i = 0; i < key.length; i++) {
			hash = (hash * 33) ^ key.charCodeAt(i); // Multiply and XOR
		}
		return hash >>> 0; // Ensure non-negative number
	}

	set(key, value) {
		const index = this.hash(key) % this.capacity;

		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		}

		// if empty creates new linked list
		if (!this.buckets[index]) {
			this.buckets[index] = new LinkedList();
		}

		const bucket = this.buckets[index];
		let current = bucket.head;
		// traverses linked list checking if key exists if it does over writes current value
		while (current) {
			if (current.value.key === key) {
				current.value.value = value;
				return;
			}
			current = current.nextNode;
		}
		// if key isn't found adds new key value pair object and increases size
		bucket.append({ key, value });
		this.size++;

		// Checks if needs resizing
		if (this.size / this.capacity > this.loadFactor) {
			this.resize();
		}
	}

	resize() {
		this.capacity *= 2;

		const resizedBuckets = new Array(this.capacity);

		for (const bucket of this.buckets) {
			// If bucket is empty move on to next one.
			if (!bucket) {
				continue;
			}

			let current = bucket.head;

			while (current) {
				const index = this.hash(current.value.key) % this.capacity;

				// Ensure the index is within bounds before accessing resizedBuckets
				if (index < 0 || index >= resizedBuckets.length) {
					throw new Error("Trying to access index out of bounds");
				}

				if (!resizedBuckets[index]) {
					resizedBuckets[index] = new LinkedList();
				}

				resizedBuckets[index].append({
					key: current.value.key,
					value: current.value.value,
				});
				current = current.nextNode;
			}
		}
		this.buckets = resizedBuckets;
	}

	// get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
	get(key) {
		const index = this.hash(key) % this.capacity;

		// Ensure the index is within bounds
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		}

		// If the bucket at the index is empty, return null
		if (!this.buckets[index]) {
			return null;
		}

		const bucket = this.buckets[index];
		let current = bucket.head;

		// Traverse the linked list in the bucket to find the key
		while (current) {
			if (current.value.key === key) {
				return current.value.value;
			}
			current = current.nextNode;
		}

		// Key not found, return null
		return null;
	}

	// has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
	has(key) {
		const index = this.hash(key) % this.capacity;

		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		}

		if (!this.buckets[index]) {
			return false;
		}

		const bucket = this.buckets[index];
		let current = bucket.head;

		while (current) {
			if (current.value.key === key) {
				return true;
			}
			current = current.nextNode;
		}

		return false;
	}

	// remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

	remove(key) {
		const index = this.hash(key) % this.capacity;

		// Ensure the index is within the valid range of the buckets array
		if (index < 0 || index >= this.capacity) {
			throw new Error("Index out of bounds");
		}

		// Retrieve the bucket (linked list) at the calculated index
		const bucket = this.buckets[index];

		// If the bucket is empty (no linked list exists), the key is not present
		if (!bucket) {
			return false;
		}

		// Start traversing the linked list in the bucket
		let current = bucket.head;
		let position = 0;

		while (current) {
			if (current.value.key === key) {
				bucket.removeAt(position);
				this.size--;
				return true;
			}
			current = current.next;
			position++;
		}
		// If the traversal completes without finding the key, it is not present
		return false;
	}

	// Returns the number of stored keys in the hash map.
	length() {
		return this.size;
	}

	// Removes all entries in the hash map.
	clear() {
		this.buckets = new Array(this.capacity);
		this.size = 0;
		console.log("HashMap Cleared.");
	}

	// Returns an array containing all the keys inside the hash map.
	keys() {
		const keysArray = new Array();

		for (const bucket of this.buckets) {
			if (!bucket) {
				continue;
			}
			let current = bucket.head;

			while (current) {
				keysArray.push(current.value.key);
				current = current.nextNode;
			}
		}
		return keysArray;
	}

	// returns an array containing all the values.
	values() {
		const valuesArray = new Array();

		for (const bucket of this.buckets) {
			if (!bucket) {
				continue;
			}
			let current = bucket.head;

			while (current) {
				valuesArray.push(current.value.value);
				current = current.nextNode;
			}
		}
		return valuesArray;
	}

	//  returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

	entries() {
		// Initialize an empty array to store the key-value pairs
		const entriesArray = new Array();

		// Iterate over each bucket in the hash map
		for (const bucket of this.buckets) {
			// If the bucket is empty (no entries), skip to the next bucket
			if (!bucket) {
				continue;
			}

			// Start from the head of the linked list in the current bucket
			let current = bucket.head;

			// Traverse through the linked list
			while (current) {
				// Create an array containing the key and value of the current node
				let keyValue = [current.value.key, current.value.value];

				// Push the key-value pair array into the entriesArray
				entriesArray.push(keyValue);

				// Move to the next node in the linked list
				current = current.nextNode;
			}
		}
		// Return the array of key-value pairs
		return entriesArray;
	}
}
