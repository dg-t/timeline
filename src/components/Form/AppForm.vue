<template>
    <section class="container-fluid mt-5">

        <!-- Simple Form to create and add posts to the timeline -->
        <form @submit.prevent="postForm">

            <!-- Form title -->
            <div class="form-control" :class="{invalidText: postMessage.isValidated == false}">
                <label for="post-title">Title</label>
                <input id="post-title" name="post-title" type="text" v-model.trim="postTitle.title" />
                <!-- Form Title validation -->
                <transition name="fade" class="validation">
                    <p v-if="postTitle.isValidated == false">Please enter a title.</p>
                </transition>
            </div>

            <!-- Form message -->
            <div :class="{invalidText: postMessage.isValidated == false}">
                <textarea 
                class="form-text form-control" 
                id="post-message" 
                rows="3" 
                placeholder="Your message *"
                v-model.trim="postMessage.message" />
                <!-- Form message validation -->
                <transition name="fade" class="validation">
                    <p v-if="postMessage.isValidated == false" class="validation">Please, enter a message.</p>
                </transition>
            </div>

            <!-- Button to submit form -->
            <div>
                <button>Post</button>
            </div>

        </form>
    </section>
</template>

<script>
export default {
    emits: ['post-data'],
    name: 'AppForm',
    data() {
        return {
            postTitle: {
                title: '',
                isValidated: null,
            },
            postMessage: {
                message: '',
                isValidated: null
            }
        }
    },
    methods: {
        postForm() {
            // Add a simple validation for the title and message
            if (this.postTitle.title == '' && this.postMessage.message == ''){
                this.postTitle.isValidated = false;
                this.postMessage.isValidated = false;
                setTimeout( () => { 
                    this.postTitle.isValidated = true;
                    this.postMessage.isValidated = true;
                }, 3000);
            // Add a simple validation for the title
            } else if (this.postTitle.title == ''){
                this.postTitle.isValidated = false;
                setTimeout( () => { 
                    this.postTitle.isValidated = true;
                }, 3000);
            // Add a simple validation for the message
            } else if (this.postMessage.message == ''){
                this.postMessage.isValidated = false;
                setTimeout( () => { 
                    this.postMessage.isValidated = true;
                }, 3000);
            // Emit event to create post and reset form fields
            } else {
                this.$emit('post-data', this.postTitle.title, this.postMessage.message);
                this.postTitle.title = '';
                this.postMessage.message = '';
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* FORM VALIDATION */

.validation {
  font-size: 60%;
  color:rgba(255, 0, 0, 0.7);
  font-style: italic;
  text-decoration: underline;
  width:100%;
  padding:5px;
  margin-left: 2%;
}

.invalidText input, .invalidText textarea{
    border-color: rgba(255, 0, 0, 0.7);
}

/* FORM VALIDATION */

.fade-enter-from {
    opacity:0;
    transform:translateY(-8px);
}

/* VALIDATION FADE ANIMATION */
.fade-enter-active {
    font-size: 60%;
    color:#f00;
    font-style: italic;
    text-decoration: underline;
    width:100%;
    padding:5px;
    margin-left: 2%;
    transition: all 0.5s ease-out;
}

.fade-leave-active {
    font-size: 60%;
    color:#f00;
    font-style: italic;
    text-decoration: underline;
    width:100%;
    padding:5px;
    margin-left: 2%;
    transition: all 0.5s ease-out;
}

.fade-leave-to {
    opacity:0;
    transform:translateY(-8px);
}

</style>
