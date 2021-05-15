<template>
  <section class="container-fluid row">

    <!-- Show notification for create or delete posts -->
    <div v-if=isCretaedOrDeleted  class="fixed-top" @click="createOrDeletePostAlert">Your post was succesfully {{action}}.</div>

    <!-- Display Form -->
    <div class="col-md-5 col-lg-4">
      <app-form @post-data="createPost" />
    </div>

    <!-- Display timeline -->
    <div class="col-md-7 col-lg-8">
      <app-timeline
      class="col-md-7 col-lg-8"
        v-for="post in posts" 
        :key=post.id 
        :id=post.id
        :date=post.date
        :time=post.time
        :title=post.title
        :message=post.message
        @delete="deletePost"
        @save-edit="updatePost" />
    </div>

  </section>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      posts: [
        {
          id: 0,
          date: '5/15/2021',
          time: '3:23:30 PM',
          title: 'myTitleOne',
          message: 'myMessageTwo'
        },
        {
          id: 1,
          date: '5/15/2021',
          time: '3:23:31 PM',
          title: 'myTitleTwo',
          message: 'myMessageTwo'
        },
        {
          id: 2,
          date: '5/15/2021',
          time: '3:23:32 PM',
          title: 'myTitleThree',
          message: 'myMessageThree'
        }
      ],
      isPosted: false,
      isDeleted: false,
      isCretaedOrDeleted: false,
      action: ''
    }
  },
  methods: {
    createPost(title, message) {
      const currentdate = new Date();
      const newPost = {
        id: currentdate.toISOString(),
        date: currentdate.toLocaleDateString('en-ES'),
        time: currentdate.toLocaleTimeString('en-ES'),
        title: title,
        message: message
      }
      this.posts.push(newPost);
      this.createOrDeletePostAlert('created');
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.createOrDeletePostAlert('deleted');
    },
    updatePost(id, newTitle, newMessage) {
      for (let i=0; i < this.posts.length; i++) {
        if (id == this.posts[i].id) {
          this.posts[i].title = newTitle;
          this.posts[i].message = newMessage
        }
      }
    },
    createOrDeletePostAlert(action) {
      this.isCretaedOrDeleted = true;
      this.action = action;
      setTimeout( () => { this.isCretaedOrDeleted = false }, 3000);
    }
  }
}
</script>

<style>

/* GENERAL */

* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
}

html {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: 300;
    text-rendering: optimizeLegibility;
}

</style>
