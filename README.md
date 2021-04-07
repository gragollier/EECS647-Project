# Props and Conditional Rendering

Often we either want to pass information into our components or render different components based on application state. For the former, we use props, and the latter we use a technique called conditional rendering.

## Props

Props are essentially arguments to our functional components. We take in the props as we would any other argument in our function definition:

```typescript
const ComponentName = (props: Props) => {
  // function body
};
```

We have to define the `Props` type to include the properties that we want to take in. For example, we could define `Props` to be

```typescript
type Props = {
  prop1: string,
  prop2: number,
  prop3: (n: number) => void,
}
```

where `prop1` is a string, `prop2` is a number, and `prop3` is a function that takes a number as an argument and returns nothing.

We then pass these arguments into our custom component when we include its tag.

`<ComponentName prop1={5} prop2="I'm a string" prop3={myFunction}>`

## Conditional Rendering

There are times where we need to make a decision about whether or not to render a component.

Let's say that we only want to render a component `ComponentName` on the condition that `myCondition` is `true`. We would put the following in our tsx:

```tsx
<div>
  {myCondition && (
    <ComponentName />
  )}
</div>
```

We can also render one component if the condition is true and a different if the condition is false:

```tsx
<div>
  {myCondition ? (
    <ComponentA />
  ) : (
    <ComponentB />
  )}
</div>
```