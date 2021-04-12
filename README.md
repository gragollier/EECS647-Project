# Serverless Backend Workshop

For this workshop, most of the heavy lifting will be done in the AWS console. The little that will be done on the frontend will mainly be HTTP requests to our Serverless API.

## API Calls

There are many ways that we can make HTTP requests in React. The simplest and quickest to set up is to use the `fetch` function.

In order to use the `fetch` function, we need two things: a url to hit and a request.

The url will be that of the specific endpoint that we want to hit in the api.

The anatomy of a request is a little bit more complicated. When we make an HTTP request, there are a few different Method types that we can use. GET requests have no information stored in their body, and they simply expect the endpoint to return information. POST requests can have information in their body, so the server can perform work base on this body before returning the response data. We will mainly use POST requests. There are more, but I won't discuss them here.

We perform the request by doing

`fetch(url, request)`

and this will eventually resolve into a response.

Once this resolves into a response, we need to extract the json data from the response, and then following that we can operate on the data.

```typescript
fetch(url, request)
  .then(response => response.json())
  .then(data => {
    // use data
  });
```

Like mentioned, this is just one way of performing these HTTP requests, and honestly it's far from the best one, but I'm using it for this demo because it's fast and easy to understand.