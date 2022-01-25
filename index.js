const form = document.querySelector('#form')

const allCount = document.querySelector('#allCount')
const teamCount = document.querySelector('#teamCount')
const absents = document.querySelector('#absents')
const resultList = document.querySelector('#resultList')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  resultList.innerText = null

  const N = parseInt(allCount.value)
  const T = parseInt(teamCount.value)
  const absentNumbers = absents.value.split(' ').map(Number)
  const lefts = (N-absentNumbers.length) % T
  const students = _.shuffle(_.range(1, N+1))

  const currentStudents = students.filter(student => !absentNumbers.includes(student))
  const teamNo = parseInt((N - absentNumbers.length) / T)
  
  for (let i=0; i<teamNo; i++) {
    console.log(lefts)
    const teammates = currentStudents.slice(i*T, (i+1)*T)
    if (i < lefts) {
      teammates.push(currentStudents[currentStudents.length - i-1])
    }
    console.log(teammates, currentStudents)
    
    // teammates.sort((x, y) => x - y)
    resultList.appendChild(createTeamInfo(i+1, teammates))
  }
})

function createTeamInfo(teamNo, teammates) {
  const li = document.createElement('li')
  li.classList.add('list-group-item')
  li.innerText =`${teamNo}조: ${teammates.join(', ')}` 
  return li
}
