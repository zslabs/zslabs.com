---
title: State Dependent Refs with Hooks
date: '2019-03-30'
---

During a recent project, I was pulling in a group of tweets from the Twitter API; using [Netlify Functions](https://www.netlify.com/docs/functions/), that ultimately would require some direct DOM manipulation with the list in which they were output.

Interacting with the DOM directly meant that I'd need to make sure the [ref](https://reactjs.org/docs/hooks-reference.html#useref) I created was available; all-the-while waiting for the endpoint to return data, which would only show when that data was returned and valid.

```js
const listRef = useRef(null);
const [tweets, setTweets] = useState([]);

useEffect(() => {
  axios
    .get(`/.netlify/functions/tweets?statuses=${statusList}`)
    .then(({ data: { statuses } }) => {
      if (!statuses) return;

      setTweets(statuses);
    });
}, []);

useEffect(() => {
  // Perform DOM manipulations here on `listRef`
}, [tweets]);

return (
  {tweets.length > 0 && (
    <ul ref={listRef}>
      {tweets.map(tweet => (
        <Tweet key={tweet.id_str} tweet={tweet} />
      ))}
    </ul>
  )}
);
```

What I quickly realized, was that my ref was assumed to be available when the state was updated; which wasn't necessarily the case.

After a bit of searching, I came across [this little gem](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node) which mentions `useCallback()` as a perfect companion for this type of decoupling by "memoizing" the value returned. The above reference to `listRef` now became:

```js
const listRef = useCallback(
  (node) => {
    if (node !== null) {
      // Safely perform DOM manipulations on `listRef` which is now equal to `node`
    }
  },
  [tweets]
)
```

After some initial skepticism, I've really enjoyed my time with Hooks so far - and with an opportunity to play around with Netlify Functions, it was a win-win!
