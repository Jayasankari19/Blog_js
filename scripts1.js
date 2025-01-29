const blogForm = document.getElementById('blogForm');
const blogPostsContainer = document.getElementById('blogPosts');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeEditModal = document.getElementById('closeEditModal');
const viewModal = document.getElementById('viewModal');
const closeViewModal = document.getElementById('closeViewModal');
let posts = [];

// Load posts from localStorage on page load
function loadPosts() {
  const storedPosts = localStorage.getItem('posts');
  if (storedPosts) {
    posts = JSON.parse(storedPosts);
  }
  displayPosts();
}

// Function to display posts
function displayPosts() {
  blogPostsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'bg-white p-6 rounded-lg shadow-md';
    postDiv.innerHTML = `
      <h3 class="text-2xl font-semibold">${post.title}</h3>
      <p class="text-gray-700 mb-4">${post.content.slice(0, 100)}...</p>
      <div class="flex justify-between items-center">
        <button class="bg-yellow-500 text-white px-4 py-2 rounded" onclick="editPost(${index})">Edit</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deletePost(${index})">Delete</button>
        <div class="flex items-center space-x-2">
          <button class="bg-green-500 text-white px-4 py-2 rounded" onclick="viewPost(${index})">View Full</button>
          <div class="flex items-center">
            <label for="viewCount${index}" class="mr-2 text-sm">Views:</label>
            <input type="number" id="viewCount${index}" value="${post.views}" readonly class="w-16 text-center bg-gray-200 border border-gray-300 rounded px-2 py-1">
          </div>
        </div>
      </div>
    `;
    blogPostsContainer.appendChild(postDiv);
  });
}

// Add a new post
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const newPost = { title, content, views: 0 };
  posts.push(newPost);

  // Save posts to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));

  displayPosts();
  blogForm.reset();
});

// Edit a post
function editPost(index) {
  const post = posts[index];
  document.getElementById('editPostId').value = index;
  document.getElementById('editTitle').value = post.title;
  document.getElementById('editContent').value = post.content;
  editModal.classList.remove('hidden');
}

// Save edited post
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const index = document.getElementById('editPostId').value;
  const updatedTitle = document.getElementById('editTitle').value;
  const updatedContent = document.getElementById('editContent').value;

  posts[index] = { title: updatedTitle, content: updatedContent, views: posts[index].views };

  // Save posts to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));

  displayPosts();
  editModal.classList.add('hidden');
});

// Close edit modal
closeEditModal.addEventListener('click', () => {
  editModal.classList.add('hidden');
});

// View full post
function viewPost(index) {
  const post = posts[index];
  document.getElementById('viewPostTitle').innerText = post.title;
  document.getElementById('viewPostContent').innerText = post.content;
  viewModal.classList.remove('hidden');

  // Increment the view count
  posts[index].views += 1;

  // Save posts to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));

  displayPosts();
}

// Close view modal
closeViewModal.addEventListener('click', () => {
  viewModal.classList.add('hidden');
});

// Delete a post
function deletePost(index) {
  posts.splice(index, 1);

  // Save posts to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));

  displayPosts();
}

// Load posts from localStorage when the page loads
loadPosts();
