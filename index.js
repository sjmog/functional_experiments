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

const lowercaseNames = (data) => data.map(object => copy(object, lowercaseRule))
const uppercaseText  = (data) => data.map(object => copy(object, uppercaseRule))
const addOneToIds    = (data) => data.map(object => copy(object, addOneRule))

const notifyFakeDevs = (data) => {
  console.log("Now processing batch 1 of 14...")
  return data
}

let processedData = processPipeline(DATA, [lowercaseNames, uppercaseText, addOneToIds, notifyFakeDevs])
console.log(processedData)
console.log(DATA)