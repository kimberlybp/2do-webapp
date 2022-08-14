export default function filterTasksByDate(from, to, tasks) {
  if (tasks) return tasks.filter(t => t.dueDate && t.dueDate.getTime() >= from.getTime() && t.dueDate.getTime() <= to.getTime())
  return [];
}