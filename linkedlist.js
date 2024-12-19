export class LinkedList {
	constructor(head = null) {
		this.head = head;
	}

	// to do
	// adds a new node containing value to the end of the list
	append(value) {
		const newNode = new ListNode(value);

		if (!this.head) {
			this.head = newNode;
			return;
		}

		let current = this.head;
		while (current.nextNode) {
			current = current.nextNode;
		}

		current.nextNode = newNode;
	}

	// adds a new node containing value to the start of the list
	prepend(value) {
		const newNode = new ListNode(value);

		if (!this.head) {
			this.head = newNode;
			return;
		}

		newNode.nextNode = this.head;
		this.head = newNode;
	}

	// returns the total number of nodes in the list
	size() {
		let listLength = 0;
		if (!this.head) {
			return listLength;
		}

		let current = this.head;
		while (current) {
			// Needed to increment count before going to the next node.
			listLength++;
			current = current.nextNode;
		}
		console.log(`List Length: ${listLength}`);
		return listLength;
	}

	// returns the first node in the list
	getHead() {
		if (!this.head) {
			return null;
		}

		return this.head;
	}

	// returns the last node in the list
	tail() {
		if (!this.head) {
			return null;
		}

		let current = this.head;
		// Stop the loop before current becomes null. The condition should check if current.nextNode is null (indicating the last node).
		while (current.nextNode) {
			current = current.nextNode;
		}

		return current;
	}

	// returns the node at the given index
	at(index) {
		let listIndex = 0;

		if (!this.head) {
			return null;
		}

		let current = this.head;
		while (current) {
			if (listIndex === index) {
				return current;
			}
			// Needed to increment count before going to the next node.
			listIndex++;
			current = current.nextNode;
		}
		return null;
	}

	// removes the last element from the list
	pop() {
		if (!this.head) {
			return null;
		}
		// If there is only one node it removes it.
		if (!this.head.nextNode) {
			this.head = null;
			return;
		}

		let current = this.head;
		// Check to traverse to second to last node.
		while (current.nextNode && current.nextNode.nextNode) {
			current = current.nextNode;
		}

		// Remove the last node
		current.nextNode = null;
	}

	// returns true if the passed in value is in the list and otherwise returns false.
	contains(value) {
		if (!this.head) {
			return false;
		}

		let current = this.head;

		while (current) {
			if (current.value === value) {
				return true;
			}
			current = current.nextNode;
		}
		return false;
	}

	// returns the index of the node containing value, or null if not found.
	find(value) {
		let listIndex = 0;

		if (!this.head) {
			return null;
		}

		let current = this.head;
		while (current) {
			if (current.value === value) {
				return listIndex;
			}
			// Needed to increment count before going to the next node.
			listIndex++;
			current = current.nextNode;
		}
		return null;
	}

	// Represents your LinkedList objects as strings, so you can print them out and preview them in the console.
	// The format should be: ( value ) -> ( value ) -> ( value ) -> null
	toString() {
		let string = "";

		if (!this.head) {
			return null;
		}

		let current = this.head;
		while (current) {
			string += `( ${current.value} ) -> `;

			if (current.nextNode === null) {
				string += `null`;
			}

			current = current.nextNode;
		}
		return string;
	}

	insertAt(value, index) {
		let listIndex = 0;

		if (index === 0) {
			let newNode = new ListNode(value, this.head);
			this.head = newNode;
			return;
		}

		let current = this.head;

		while (current) {
			if (listIndex === index - 1) {
				// Find the node just before the index.
				let newNode = new ListNode(value, current.nextNode);
				current.nextNode = newNode;
				return; // Insert the node and exit.
			}
			listIndex++;
			current = current.nextNode;
		}

		return null; // If the index is out of bounds.
	}

	removeAt(index) {
		if (!this.head) {
			return null;
		}

		// Handle removal at the head (index 0)
		if (index === 0) {
			this.head = this.head.nextNode;
			return;
		}

		let listIndex = 0;
		let current = this.head;

		// Traverse the list until the node before the one to remove
		while (current) {
			if (listIndex === index - 1) {
				// Remove the node by linking the previous node to the next of the current.nextNode
				current.nextNode = current.nextNode ? current.nextNode.nextNode : null;
				return;
			}
			listIndex++;
			current = current.nextNode;
		}

		// Return null if index is out of bounds
		return null;
	}
}

export class ListNode {
	constructor(value = null, nextNode = null) {
		this.value = value;
		this.nextNode = nextNode;
	}
}
