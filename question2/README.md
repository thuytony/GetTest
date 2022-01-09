# Question 2: When should we and should we not use Redux?

## Should
- The application is large, there is a lot of states that need to be shared in many places in the application (login information, shopping cart, ...)
- The state of the application changes continuously or changing any state maybe trigger a lot of other events.
- Your application is a large application, there are many developers working as a team. Redux will centralize the data at the store, making it easy for everyone to understand where to get the data. Moreover, Redux has principles about data change, which will make it easy for programmers to debug and understand other people's code.
- The logic of state change is very complex. Redux supports redux-thunk or redux-saga to separate logic from View.
- You need to keep track of how the state changes throughout your application.

## Shouldn't
- Only use Redux to pass avoid passing data as props through too many components -> use Context to replace redux.
- Small application, only a few simple screens, no need to save data and share between screens too much.
- Data in your application is stored in separate, unrelated components.