export function getDaysUntilDeadline(deadlineDate) {
    const now = new Date();
    const deadline = new Date(deadlineDate);

    now.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
  
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return diffDays;
  }
  
  export function getPriorityColor(priority) {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'green'
    };
    return colors[priority] || 'gray';
  }