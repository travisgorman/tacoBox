#[TacoBox]
[![tacoBox](http://i.imgur.com/HHTuXob.png)](http://travis.bingo/tacoBox/)

##Features
* add items to the list
* items are stored in localStorage, and so persist across page refresh
* check items off and on
* all items checked state are saved in localStorage, and so persist across page refresh

## `localStorage` and the Web Storage API
the `storage` interface of the Web Storage API provides access to the session storage or local storage for a particular domain, allowing you to, for example, add, modify, or delete stored data items.

### Storage methods

* `key( n )`
	- when passed a number `n`, returns the name of the nth key in storage
* `getItem( keyName )`
	- when passed a key name, returns that keys value
* `setItem( keyName, value )`
	- when passed a key name and a value, adds or updates that key in storage
* `removeItem( keyName )`
	- when passed a key name, removes that key from storage
* `clear()`
	- when invoked, emptys all keys out of the storage

## [`JSON` Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
A standard built-in object, containing methods for parsing JSON, and converting values to JSON. It has two method properties, `stringify` and `parse`. Both are used in this app.

### JSON methods
* [`JSON.stringify(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) converts a value to JSON notation representing it
* [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) parses a JSON string, constructing the value or object described by the string

## [`Element` interface](https://developer.mozilla.org/en-US/docs/Web/API/Element) 
In this project, we use the `matches` method, which returns `true` if the element would be selected by the specified selector string passed in, otherwise, returns `false`


##New / Interesting Things

* `form` elements have a `reset` method. You can use this to clear forms instead of setting it to an empty string and all that.
* `Element.matches()` Web API

##What's Going On Here
This project is an exercise in storing values to `localStorage` as well as event delegation, which takes place in the `toggleDone` function.
### `addItem(event)`

```js
function addItem(e) {
		/* prevent the default form action (page reload)	*/
	e.preventDefault()
		/* use an attribute selector and `.value` to create a `text` variable */
	const text = this.querySelector('[name=item]').value;
		/*  create an `item` object with two properties: a text property with the value
	set to the value of the `text` variable above, and a `done` property with a 
	default value of `false` */
	const item = {
		text, 
		done: false 
	}
		/* push the item into the `items` array (declared in the global scope)	*/	
	items.push(item)
		/* pass the `items` array of objects into our `populateList` function
	along with the HTML list element `itemsList`	*/
	populateList(items, itemsList)
		/* set the value of the `items` key in localStorage to a stringified version 
	of the `items` array using `JSON.stringify`	*/
	localStorage.setItem('items', JSON.stringify(items))
		// clear the form input field with `this.reset()`
	this.reset()
};
```
###`populateList(array, element)`

```js
function populateList(plates=[], platesList) {
	/* this function take the items array - `plates` and an HTML element  */
	platesList.innerHTML = plates.map((plate, i) => {
		/* maps over the array, and sets the HTML of the element to a string
			- returning a list item for each object in the array  
			- pass in an index to `map` which will be used to give each item
				- a data-index
					- which will be used to toggle the `done` property in `toggleDone`
				- and a unique id
					- which will be used to set the label to the `text`property
			- a ternary expression looks to the object, deciding if there is a 
			'checked' property or not on the checkbox input
		 */
		return `
		<li>
			<input type="checkbox" data-index=${i} id=item${i}
			${plate.done ? 'checked' : ''} />
			<label for="item${i}">${plate.text}</label>
		</li>
		`;
	}).join('')
		// join the array into a string so it can be inserted as HTML
}
```
###`toggleDone(e)`

```js
function toggleDone(e) {
		// target only ihe input elements - the children of the list element 
	if (!e.target.matches('input')) return;
	const el = e.target;
		// use `dataset` to keep track of items by the `data-index` given to items
	const index = el.dataset.index;
		// toggle the value of the done property of that particular item in `items`
	items[index].done = !items[index].done;
		// set `items` key in localStorage to a stringified version of `items` 
	localStorage.setItem('items', JSON.stringify(items));
		// call `populateList`, passing in the `items` array, and `itemsList` element
	populateList(items, itemsList);
}

// call `populateList(items, itemsList)` in the global scope
```

### event listeners
* `addItem(e)` is called on submit of the form
* `toggleDone(e)` is called on click of a child input of the `.plates` list

##How Can I Expand On This?
* **"clear all"** button
* **"check all"** button
* **delete item** button
* **delete all** button
