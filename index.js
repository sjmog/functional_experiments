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

const processPipeline = (data, fns) => fns.reduce((data, fn) => fn(data), data)

const copy = (object, rule) => Object.assign({}, object, rule(object))

const lowercaseRule = (object) => {
  return {
    user: {
      ...object.user,
      name: object.user.name.toLowerCase()
    }
  }
}

const lowercaseNames = (data) => data.map(object => copy(object, lowercaseRule))

let processedData = processPipeline(DATA, [lowercaseNames])
console.log(processedData)
console.log(DATA)