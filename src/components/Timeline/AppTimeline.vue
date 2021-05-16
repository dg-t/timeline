<template>
    <section class="container-fluid timeline-section">

        <!-- Display simple timeline -->
        <div class="timeline-post row">

            <!-- Show notification for edited posts -->
            <div v-if=isEdited>Your post was edited succesfully</div>

            <!-- Date and time of post creation -->
            <div class="date-container col-3">
                <p class="date">{{date}}</p>
                <p class="date">{{time}}</p>
            </div>

            <!-- Post description -->
            <div class="post-description col-9">
                <h5 class="post-title">{{title}}</h5>
                <p class="post-message">{{message}}</p>

                <!-- Button trigger modal to edit post -->
                <button class="btn btn-primary" @click="openEditingModal">Edit</button>
                <!-- Display edit dialog -->
                <edit-dialog 
                    v-if="isEditing" 
                    :id="id"
                    :title="title" 
                    :message="message"
                    @save-edit="saveEdit"
                    @close-dialog="closeDialog" />
                
                <!-- Delete post -->
                <button type="button" class="btn btn-primary" @click="deletePost">Delete</button>
            </div>
        </div>

    </section>
</template>

<script>

import EditDialog from './EditDialog.vue';
export default {
    comnponents: {
        EditDialog
    },
    emits: ['delete', 'save-edit'],
    props: {
        id: {
            type: String,
            required: true
        },
        date: {
            required: true
        },
        time: {
            required: true
        },
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
        
    },
    name: 'AppTimeline',
    data() {
        return {
            newTitle: this.title,
            newMessage: this.message,
            isEditing: false,
            isEdited: false
        }
    },
    methods: {
        deletePost() {
            this.$emit('delete', this.id);
        },
        openEditingModal() {
            this.isEditing = true;
        },
        saveEdit(id, newTitle, newMessage) {
            if (this.title == newTitle && this.message == newMessage) {
                alert("Nothing was updated. \nPlease, update the title and/or the message before saving.");
            } else {
                this.isEditing = false;
                this.$emit('save-edit', id, newTitle, newMessage);
                this.isEdited = true;
                setTimeout( () => { this.isEdited = false }, 3000);
            }
        },
        closeDialog() {
            this.isEditing = false;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* TIMELINE */

.timeline-section {
    border-left: 2px solid #ccc;
}

div.timeline-post {
    background-color: #fff;
    padding: 10px 25px;
    font-size: 16px;
    border: 1px solid #ccc;
    position: relative;
}

div.timeline-post:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    border: 3px solid #ddd;
    position: absolute;
    top: 50px;
    left: -22px;

}

div.timeline-post:after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent #ddd transparent transparent !important;
    border-width: 10px;
    position: absolute;
    border: 8px solid #ddd;
    position: absolute;
    top: 47px;
    left: -17px;

}

/* DATE */

.date {
    font-size: 12px;
}

</style>
