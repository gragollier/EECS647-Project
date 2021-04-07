# Routing

Building our webapp as we have, a single web page with conditional rendering, is very bulky and not user friendly. We want to add routes to our page, and the easiest way to do that is with the `react-router-dom` package.

Routes are the trailing parts of our url like

`google.com/search`
`en.wikipedia.org/wiki/React_(JavaScript_library)`

and we refer to everything after the first `/` as the path. The React Router operates on these paths.

## Installation

Install it with 

`npm install --save @types/react-router-dom`

This installs the package and includes it in your `package.json` file that lists all the packages in your app.

Other developers on your team will have to run

`npm install`

once they pull your `package.json` change from the git repo to install the package.

## The React Router

Our routing component is a functional component just like any of the ones we've been defining. We need a few tools from the `react-router-dom` package that we installed. We need to import them:

```typescript
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
```

The `Router` component is the root component of the React Router. It tells the browser that we are interacting with the browser defined routes and paths that we described earlier.

Inside of the `Router`, we use a `Switch` which functions identically to a typical switch-case statement. Basically we expect one of the `Route` cases to be true, and we describe a default if none of them are.

The `Route`s themselves need a path to match against and the component to render if matched.

```jsx
<Router>
  <Switch>
    <Route
      exact
      path="/home"
      component={Home}
    />
    <Route
      exact
      path="/signin"
      component={SignIn}
    />
    <Route
      exact
      component={NotFound}
    />
  </Switch>
</Router>
```

## Links

Links in the React Router are fairly straightforward, you can just import `Link` from `react-router-dom` and tell it which path to go to:

```tsx
<Link to="/home">
  My Home Link Text
</Link>
```

We can also programmatically travel to a page if we want to travel to another page after handling button actions, for example. For this, we use the `useHistory` function from `react-router-dom`. We them `push` to the history to go to the page we want.

```typescript
const ComponentName = () => {
  const history = useHistory();

  const handleClick = () => {
    // do work
    history.push('/home');
  }

  return (
    <button onClick={handleClick} >
      My Home Button
    </button>
  )
}
```

## Slugs

Sometimes we will need parameters passed inside of our path. User profiles are a good example of this, where we can pass the username in the url to indicate that we should visit that user's profile.

The path we would visit will look something like

`website.com/user/colinfloyd`

The path here is the entire `/user/colinfloyd` string, but obviously the latter part could have been any username. We don't want to define a route for each user, of course, so we need a way to capture this value and indicate that it stands in for a variable.

We refer to these types of stand-in values as slugs. In a `Route`, we can define a slug as

```tsx
<Route
  exact
  path="/user/:slug"
  component={Profile}
/>
```

In the component, we can capture the slug with the `useParams` function from `react-router-dom` to get the slug. In Typescript, we need to define the type for `useParams` to tell it that we are expecting a slug:

```typescript
type UrlParams = {
  slug: string
};
```

And then inside of our functional component, we can capture the slug as follows:

```typescript
const ComponentName = () => {
  const { slug } = useParams<UrlParams>();
}
```