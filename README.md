# Custom Component Rendering

We don't want to have really large `App.tsx` files, so React provides a way to create and render custom components.

## Creating Components

Components in React are essentially functions that return the HTML (technically tsx) that the component will render. We typically put these components in their own files. Doing this, we need to

`export default ComponentName`

at the bottom of our new file and

`import ComponentName from './fileName'`

in the file where we want to include it. We can then use it like an HTML tag:

`<Component Name />`

## Managing State

We often want our components to be interactive for the user. Sometimes this will take the form of capturing user input and storing it in variables. We can also print the content of variables to the web page.

We have to manage our variables in a very specific way since we want to update the state of our application based on user actions. We declare them using `useState` as so:

`const [variableName, setVariableName] = useState(initialValue)`

`variableName` is how we read the state of the variable and `setVariableName` is a function to update its state.