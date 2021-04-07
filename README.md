# List State and Repeated Rendering

Sometimes what we what the user to interact with will have list elements, so we'll explore how to render based on lists and how to update list states.

# List State

Lists are declared very similarly to other state variables, but we need to specify a type in the state declaration. Say we want a `number` list, we would have

`const [nums, setNums] = useState<number[]>([]);`

Modifying the list is also handled a little differently as well. Most of the time we want our new list state to depend on the previous state, so instead of passing the new list into `setNums`, we'll have `setNums` take a function. Say we want to append the number `8` to the end of `nums`:

`setNums((prevNums) => [...prevNums, 8]`

This says that we create a new list out of the elements of the previous list and the new `8` tagged on at the end.

# Repeated Rendering

When we want to render an element once for each element of a list, we can actually build that directly into our tsx using the `map` function. This executes the function body once for each element of the list, and we're expected to return the jsx body that we want rendered for each element.

```tsx
<div>
  {nums.map((num) => {
    return (
      <p>
        Plus 4 : {num + 4}
      </p>
    );
  })}
</div>
```