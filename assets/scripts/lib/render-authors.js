import _ from 'underscore';

const AUTHORS = _.template(`
  <p class="authors">
    <% _.each(authors, function(author, index) { %>
      <% if (index !== 0) { print(', ') } %><span class="authors__item"><%= author %></span>
    <% }) %>
  </p>
`);

export function renderAuthors(authors) {
  return AUTHORS({
    authors,
  });
};
