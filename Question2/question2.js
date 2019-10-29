const positionToString = (x, y) => `${x},${y}`
const can_exit = map => {
  if (!map) return false
  if (map.length === 0) return false
  const isVisit = {}
  const mapBottom = map.length - 1
  const endPosition = { x: map[mapBottom].length - 1, y: mapBottom }
  let accessiblePosition = [{ x: 0, y: 0 }]
  while (accessiblePosition.length > 0) {
    const { x, y } = accessiblePosition.shift()

    if (y < 0 || y > mapBottom) continue
    if (x < 0 || x > map[y].length - 1) continue
    if (isVisit[positionToString(x, y)]) continue
    isVisit[positionToString(x, y)] = true

    if (map[y][x] === 0) {
      if (x === endPosition.x && y === endPosition.y) return true
      accessiblePosition.push({ x: x + 1, y })
      accessiblePosition.push({ x, y: y + 1 })
      accessiblePosition.push({ x: x - 1, y })
      accessiblePosition.push({ x, y: y - 1 })
    }
  }
  return false
}

const runTest = testCases => {
  console.log(`Run test`)
  testCases.forEach(({ input, expected }, index) => {
    const output = can_exit(input)
    if (output === expected) {
      console.log(`case ${index + 1}: Passed`)
    } else {
      console.log(
        `case ${index + 1}: Failed => expect ${expected} but got ${output}`
      )
    }
  })
}

const testCases = [
  {
    input: [
      [0, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0]
    ],
    expected: true
  },
  {
    input: [
      [0, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 1]
    ],
    expected: false
  },
  {
    input: [
      [0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1]
    ],
    expected: false
  },
  {
    input: [
      [0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 0]
    ],
    expected: true
  },
  {
    input: [
      [0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [1, 0, 1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 1, 0]
    ],
    expected: false
  },
  {
    input: [
      [0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 1, 0]
    ],
    expected: true
  },
  {
    input: [
      [0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0]
    ],
    expected: false
  },
  {
    input: [
      [0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 0, 0]
    ],
    expected: true
  },
  {
    input: [[0, 0, 0]],
    expected: true
  },
  {
    input: [[]],
    expected: false
  },
  {
    input: [],
    expected: false
  },
  {
    input: null,
    expected: false
  }
]

runTest(testCases)
