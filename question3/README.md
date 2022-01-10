# Question 3: When should you use HOC?

- When there are many Components using the same logic. At this time, HOC makes it possible for us to reuse these logic codes in many different Components, avoiding code repetition. When we need to update the logic, we only need to fix it in one place, avoiding taking time and missing.

- Components that use common props: color, dimension, ... HOC as a base Component. Components using HOC can pass props or get props from HOC depending on the specific case.