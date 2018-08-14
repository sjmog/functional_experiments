//// SETUP
// immutable incoming data. We don't want to mutate this.
const DATA = [
  {
    "type": "Post",
    "id": "1",
    "text": "Nice post here",
    "user": {
      "name": "Tommy Ford",
      "id": "2"
    }
  },
  {
    "type": "Comment",
    "id": "3",
    "text": "A comment on my own post!",
    "post_id": "1",
    "user": {
      "name": "Tommy Ford",
      "id": "2"
    }
  }
]

// a function to process a pipeline of functions, passing the data through each one.
const processPipeline = (data, fns) => fns.reduce((data, fn) => fn(data), data)

// a function to avoid mutating the data within functions. 
// instead, copy the data with modifications, which are supplied as rules.
const copy = (object, rule) => Object.assign({}, object, rule(object))

// rules for modifying data.
// to add a new modification: 
//   * write a rule, 
//   * create a new rule pattern, and 
//   * add the pattern to the pipeline.
const lowercaseRule = (object) => {
  return {
    user: {
      ...object.user,
      name: object.user.name.toLowerCase()
    }
  }
}

const uppercaseRule = (object) => {
  return {
    ...object,
    text: object.text.toUpperCase()
  }
}

const addOneRule = (object) => {
  return {
    ...object,
    id: String(parseInt(object.id) + 1)
  }
}

// rule patterns. These decide how rules are applied.
// in general, you probably want to copy the data one modified object at a time.
const lowercaseNames = (data) => data.map(object => copy(object, lowercaseRule))
const uppercaseText  = (data) => data.map(object => copy(object, uppercaseRule))
const addOneToIds    = (data) => data.map(object => copy(object, addOneRule))

// another function that can be inserted into the pipeline.
// here, this is just an example function that notifies the developers.
// like all pipeline functions, it has to return the data to the next part of the pipeline.
const notifyFakeDevs = (data) => {
  console.log("Now processing", data)
  return data
}

//// EXECUTION
// after all the setup, run the pipeline.
let processedData = processPipeline(DATA, [lowercaseNames, uppercaseText, addOneToIds, notifyFakeDevs])

console.log('the data going into the pipeline, which has not been mutated\n', DATA)
console.log('the data coming out of the pipeline\n', processedData)