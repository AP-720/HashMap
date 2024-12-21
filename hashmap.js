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
			if (current.key === key) {
				current.value = value;
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
}
