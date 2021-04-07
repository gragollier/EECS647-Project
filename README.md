# Index and Styling

Our app is beautiful and special in it's own way, but... it could be nicer.

## Index

Our app tab title is currently the default "React App" and the tab icon is the default React logo. We can change these in our `public/index.html` folder.

There are many things you can do in this file, but the easiest two are changing the title and the icon.

We change the title in the `<Title>` tag, and we change the icon by replacing the `public/favicon.ico` with our logo.

When changing the logo, I recommend using online ico converters. There are many, depending on your starting image type. 

## Styling

Styling is a word to describe how we can change the appearance of components and elements in our page.

It can be quite tedious and take lots of time to define styles for every single type of component that you want to use in your app, so I instead use pre-built component packs. My favorite is [Material-UI](https://material-ui.com/).

### Installation

You can install Material-UI by using

`npm install @material-ui/core`

This will install the vast majority of Material-UI components, but some are in packages other than `core` and will need to be installed separately if you want them.

### Usage

We can then include the components we want and use them normally.

If we want to include a button component for example.

```typescript
import {Button} from '@material-ui/core/Button';
```

And then we use this like we would any other button:

```typescript
const ComponentName = () => {
  return (
    <Button 
      variant="contained" 
      color="primary"
    >
      Button Text
    </Button>
  );
};
```

The properties we pass to the Material-UI, like the `variant` and `color` props, are very well documented on the various component pages (the one for Buttons is [here](https://material-ui.com/components/buttons/)), and it gives many different use cases for the components.

Using pre-built components speeds up development a lot because it greatly simplifies the styling you have to do yourself.