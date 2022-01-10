# Question 1: What is the difference between Props vs State, when do you use each?

| Props | State |
| ------ | ------ |
| Use when you need to pass data from parent component to child component | Use when you need to change data, manage data, or need user interaction (input text, click check box, ...) |
| Child component can only read data from the parent component, can not change that data (immutable) | Can change data (mutable). But only that component can change it's state. The component will automatically re-render when the state changes. |
| Can pass props between components | State is private, used only by the component itself, cannot be used by other components. |