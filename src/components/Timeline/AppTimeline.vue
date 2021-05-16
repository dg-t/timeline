<template>
    <section class="container-fluid timeline-section row">

        <!-- Display simple timeline -->
        <!-- Show notification for edited posts -->
        <div v-if=isEdited class="alert alert-info">Your post was edited succesfully</div>

        <!-- Date and time of post creation -->
        <div class="date-container col-sm-3">
            <i class="far fa-clock time-icon"></i>
            <div>
                <p class="date">{{date}}</p>
                <p class="date">{{time}}</p>
            </div>
        </div>

        <!-- Post description -->
        <div class="post-description col-sm-9">
            <h5>{{title}}</h5>
            <p>{{message}}</p>

            <!-- Button trigger modal to edit post -->
            <button class="btn btn-primary custom-button" @click="openEditingModal">Edit</button>
            <!-- Display edit dialog -->
            <edit-dialog 
                v-if="isEditing" 
                :id="id"
                :title="title" 
                :message="message"
                @save-edit="saveEdit"
                @close-dialog="closeDialog" />
            
            <!-- Delete post -->
            <button type="button" class="btn delete-button custom-button" @click="deletePost">Delete</button>
        </div>

    </section>
</template>

<script>
export default {
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

/** BUTTONS */

.custom-button {
    margin-right: 30px;
    font-size: 14px;
}

.delete-button {
    background-color: rgb(255, 159, 159);
}

/* POST DESCRIPTION */

.post-description {
    padding-left: 30px;
    border-left: 2px solid green;
}

/* DATE */

.date-container {
    margin: auto 0;
    padding: 0;
    display:flex;
}

.date {
    font-size: 12px;
    margin: 0;
}

.time-icon {
    font-size: 1.2em;
    width: 2em;
    line-height: 1.8em;
    color: #fdce5c;
}

/* TIMELINE SECTION */

.timeline-section {
    border-left: 2px solid #fdce5c;
    max-width: 800px;
    background-color: #fff;
    padding: 20px 10px;
    margin-left: 40px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
}

/** MEDIA QUERY */

@media only screen and (max-width: 767px)  {

  /* TIMELINE SECTION */

    .timeline-section {
        background-color: #fff;
        padding: 20px 10px;
        margin: auto;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
    }

    /* POST DESCRIPTION */

    .post-description {
        padding-left: 30px;
        border-left: 0;
    }

    /* DATE */
    .date-container {
        margin: 10px 28px;
        padding: 0;
        display:flex;
    }
}
</style>
