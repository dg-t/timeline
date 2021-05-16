<template>
  <section class="container-fluid row">

    <!-- Show notification for create or delete posts -->
    <div v-if=isCretaedOrDeleted  class="fixed-top alert" :class="alert-success" @click="createOrDeletePostAlert">Your post was succesfully {{action}}.</div>

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

    <!-- Button for GET request with Axios -->
    <div>
      <button class="btn btn-secondary" @click="getRequestWithAxios">GET</button>
    </div>

  </section>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      posts: [
        {
          id: '0',
          date: '5/15/2021',
          time: '3:23:30 PM',
          title: 'myTitleOne',
          message: 'myMessageTwo'
        },
        {
          id: '1',
          date: '5/15/2021',
          time: '3:23:31 PM',
          title: 'myTitleTwo',
          message: 'myMessageTwo'
        },
        {
          id: '2',
          date: '5/15/2021',
          time: '3:23:32 PM',
          title: 'myTitleThree',
          message: 'myMessageThree'
        }
      ],
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
    updatePost(id, newTitle, newMessage) {
      for (let i=0; i < this.posts.length; i++) {
        if (id == this.posts[i].id) {
          this.posts[i].title = newTitle;
          this.posts[i].message = newMessage
        }
      }
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.createOrDeletePostAlert('deleted');

    },
    createOrDeletePostAlert(action) {
      this.isCretaedOrDeleted = true;
      this.action = action;
      setTimeout( () => { this.isCretaedOrDeleted = false }, 3000);
    },

    /**
     * CRUD OPERATION WITH AXIOS - OPERATION ARE MADE TO A REALTIME FIREBASE DB
     * To make it work:
     * - comment the functions with the same name declared above 
     * and uncomment the fucntion below.
     * Also, uncomment the Axios import at the beginning of the script.
     */
    
    // GET REQUEST - AXIOS
    // async getRequestWithAxios() {
    //   try {
    //     const res = await axios({
    //       method:'GET',
    //       url: 'https://http-timeline-default-rtdb.firebaseio.com/timelineposts.json'
    //     });
    //     const allPosts = [];
    //     if (res.data) {
    //       for (const id in res.data) {
    //       allPosts.push({
    //         id: id,
    //         title: res.data[id].title,
    //         message: res.data[id].message,
    //         date: res.data[id].date,
    //         time: res.data[id].time
    //       });
    //     }
    //     this.posts = allPosts;
    //     console.log(allPosts);
    //     } else {
    //       alert('No data available from the DB. \nPlease create a post first.')
    //     }
    //   } catch(error) {
    //     alert(error);
    //   }
    // },
    // POST REQUEST - AXIOS
    // async createPost(title, message) {
    //   try {
    //     const currentdateDB = new Date();
    //     await axios.post('https://http-timeline-default-rtdb.firebaseio.com/timelineposts.json', {
    //       // id: currentdateDB.toISOString(),
    //       date: currentdateDB.toLocaleDateString('en-ES'),
    //       time: currentdateDB.toLocaleTimeString('en-ES'),
    //       title: title,
    //       message: message
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // UPDATE REQUEST - AXIOS
    // async updatePost(id, newTitle, newMessage) {
    //   try {
    //     const currentdateDB = new Date();
    //     await axios.patch(`https://http-timeline-default-rtdb.firebaseio.com/timelineposts/${id}.json`, {
    //       date: currentdateDB.toLocaleDateString('en-ES'),
    //       time: currentdateDB.toLocaleTimeString('en-ES'),
    //       title: newTitle,
    //       message: newMessage
    //     });
    //     this.getRequestWithAxios();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // DELETE REQUEST - AXIOS
    // async deletePost(postId) {
    //   try {
    //     await axios.delete(`https://http-timeline-default-rtdb.firebaseio.com/timelineposts/${postId}.json`);
    //     alert("Post was succesfully delted")
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
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
