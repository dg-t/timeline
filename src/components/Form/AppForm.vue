<template>
    <section class="container-fluid form-container sticky-form">

        <!-- Simple Form to create and add posts to the timeline -->
        <form @submit.prevent="postForm">

            <!-- Form title -->
            <h5 class="text-center p-2">Add to timeline</h5>
            <div class="my-2 py-2" :class="{invalidText: postMessage.isValidated == false}">
                <!--  <label class="me-2" for="post-title">Title</label> -->
                <input class="form-field" id="post-title" name="post-title" type="text" placeholder="Title *" v-model.trim="postTitle.title" />
                <!-- Form Title validation -->
                <transition name="fade" class="validation">
                    <p v-if="postTitle.isValidated == false">Please enter a title.</p>
                </transition>
            </div>

            <!-- Form message -->
            <div class="my-2" :class="{invalidText: postMessage.isValidated == false}">
                <textarea 
                class="form-text form-field" 
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
                <button class="btn btn-success m-2">Post</button>
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

<!-- 2 Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* FORM */

.form-container {
    border: 1px solid;
    padding: 10px;
    box-shadow: 2px 4px 3px 4px #888888;
    border-radius: 10px;
    top: 50px;
    max-width: 450px;
}

.sticky-form {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    font-size: 20px;
}

/* FORM VALIDATION */

.validation {
    font-size: 60%;
    color:rgba(255, 0, 0, 0.7);
    font-style: italic;
    text-decoration: underline;
    width:100%;
    padding:2px;
    margin-left: 4%;
}

.invalidText input, .invalidText textarea{
    border-color: rgba(255, 0, 0, 0.7);
}

/* VALIDATION FADE ANIMATION */

.fade-enter-from {
    opacity:0;
    transform:translateY(-8px);
}

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
