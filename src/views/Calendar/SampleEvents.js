const Events = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    // 'start': new Date(2022, 6, 0),
    // 'end': new Date(2022, 6, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2022, 6, 7),
    'end': new Date(2022, 6, 10)
  },
  {
    'title': 'Some Event',
    'start': new Date(2022, 6, 9, 0, 0, 0),
    'end': new Date(2022, 6, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2022, 6, 11),
    'end': new Date(2022, 6, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2022, 6, 12, 10, 30, 0, 0),
    'end': new Date(2022, 6, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start': new Date(2022, 6, 12, 12, 0, 0, 0),
    'end': new Date(2022, 6, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start': new Date(2022, 6, 12, 14, 0, 0, 0),
    'end': new Date(2022, 6, 12, 16, 0, 0, 0)
  },
  {
    title: "Finish and Submit Lab 4",
    'start': new Date(),
    'end': new Date()
  },
  {
    title: "Create a Pull Request for Feature #10",
    'start': new Date(),
    'end': new Date()
  }
]

export default Events;