const Events = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2022, 5, 0),
    'end': new Date(2022, 5, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2022, 5, 7),
    'end': new Date(2022, 5, 10)
  },
  {
    'title': 'Some Event',
    'start': new Date(2022, 5, 9, 0, 0, 0),
    'end': new Date(2022, 5, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2022, 5, 11),
    'end': new Date(2022, 5, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2022, 5, 12, 10, 30, 0, 0),
    'end': new Date(2022, 5, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start': new Date(2022, 5, 12, 12, 0, 0, 0),
    'end': new Date(2022, 5, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start': new Date(2022, 5, 12, 14, 0, 0, 0),
    'end': new Date(2022, 5, 12, 15, 0, 0, 0)
  }
]

export default Events;