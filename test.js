import {j} from './jagged.js'

await j.get('https://jsonplaceholder.typicode.com/posts', 'posts')

j.render("#header",'<input id="searchTerm" oninput="search()">')

let blogPostTemplate = ({ title, body }) => `
  <p class="postTitle">${title}</p>
  <p class="post">${body}</p>  
  <hr>
`
let blogPosts = j.pipe(
    j.map(blogPostTemplate),
    j.render("#posts"),
)
blogPosts(j.getState('posts'))

j.action("search", () => {
    let searchTerm = j.$('#searchTerm').value
    let searchFilter = x => x.title.includes(searchTerm)
    j.pipe(
        j.getState,
        j.filter(searchFilter),
        j.parallel([blogPosts])
    )('posts')
})
